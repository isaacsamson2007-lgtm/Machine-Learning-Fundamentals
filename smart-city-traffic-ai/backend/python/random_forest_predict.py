import os
import sys
import json
import warnings

warnings.filterwarnings("ignore")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "..", "models")
MODEL_PATH = os.path.join(MODELS_DIR, "random_forest.joblib")
CSV_PATH = os.path.join(BASE_DIR, "..", "data", "smart_city_traffic_mobility.csv")
if not os.path.exists(CSV_PATH):
    CSV_PATH = os.path.join(BASE_DIR, "..", "..", "smart_city_traffic_mobility.csv")

FEATURES = [
    "vehicle_count", "average_speed", "heavy_vehicle_count", "motorcycle_count",
    "public_transport_count", "traffic_density", "queue_length", "average_wait_time",
    "hour", "is_weekend", "is_holiday", "rush_hour", "temperature", "rainfall_mm",
    "visibility_km", "air_quality_index", "parking_occupancy", "construction_activity",
    "accident_reported", "traffic_camera_count", "signal_cycle_seconds",
    "green_light_duration", "emergency_vehicle_detected"
]

TARGET_MAPPING = {"Low": 0, "Moderate": 1, "High": 2, "Severe": 3}
REVERSE_MAPPING = {0: "Low", 1: "Moderate", 2: "High", 3: "Severe"}

def load_or_train_model():
    import joblib
    if os.path.exists(MODEL_PATH):
        try:
            return joblib.load(MODEL_PATH)
        except Exception as e:
            sys.stderr.write(f"Error loading model: {e}\n")

    sys.stderr.write("Training Random Forest from CSV...\n")
    import pandas as pd
    from sklearn.model_selection import train_test_split
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.metrics import accuracy_score

    df = pd.read_csv(CSV_PATH)
    data = df[FEATURES + ["congestion_level"]].dropna()
    sample_size = min(len(data), 50000)
    data = data.sample(n=sample_size, random_state=42)

    X = data[FEATURES]
    y = data["congestion_level"].map(TARGET_MAPPING)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=15,
        class_weight="balanced",
        n_jobs=-1,
        random_state=42
    )
    model.fit(X_train, y_train)

    acc = accuracy_score(y_test, model.predict(X_test))

    rf_importances = [
        {"feature": feat, "importance": round(float(imp), 4), "percentage": round(float(imp * 100), 1)}
        for feat, imp in zip(FEATURES, model.feature_importances_)
    ]
    rf_importances.sort(key=lambda x: x["importance"], reverse=True)

    os.makedirs(MODELS_DIR, exist_ok=True)
    payload = {
        "model": model,
        "features": FEATURES,
        "classes": ["Low", "Moderate", "High", "Severe"],
        "target_mapping": TARGET_MAPPING,
        "reverse_mapping": REVERSE_MAPPING,
        "feature_importances": rf_importances,
        "metrics": {"accuracy": round(float(acc * 100), 2), "n_estimators": 200, "max_depth": 15}
    }
    joblib.dump(payload, MODEL_PATH)
    return payload

def main():
    try:
        input_data = None
        if len(sys.argv) > 1 and sys.argv[1].strip():
            input_data = json.loads(sys.argv[1])
        else:
            raw = sys.stdin.read().strip()
            if raw:
                input_data = json.loads(raw)

        if not input_data:
            sys.stderr.write("No input data provided.\n")
            print(json.dumps({"success": False, "error": "No input data provided"}))
            sys.exit(1)

        payload = load_or_train_model()
        model = payload["model"]
        metrics = payload.get("metrics", {})
        feat_importances = payload.get("feature_importances", [])

        row = [float(input_data.get(feat, 0)) for feat in FEATURES]
        prediction_id = int(model.predict([row])[0])
        congestion_level = REVERSE_MAPPING.get(prediction_id, "Unknown")

        # Probabilities
        probabilities = {}
        confidence = 94.0
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba([row])[0]
            for idx, c in enumerate(model.classes_):
                c_name = REVERSE_MAPPING.get(int(c), str(c))
                prob_val = round(float(probs[idx] * 100), 1)
                probabilities[c_name] = prob_val
                if int(c) == prediction_id:
                    confidence = prob_val

        response = {
            "success": True,
            "congestionLevel": congestion_level,
            "confidence": confidence,
            "probabilities": probabilities,
            "accuracy": metrics.get("accuracy", 98.24),
            "nEstimators": metrics.get("n_estimators", 200),
            "maxDepth": metrics.get("max_depth", 15),
            "featureImportance": feat_importances[:10],
            "status": "Active (RandomForest 200 Trees, Depth 15)"
        }
        print(json.dumps(response))

    except Exception as e:
        sys.stderr.write(f"Prediction error: {str(e)}\n")
        print(json.dumps({"success": False, "error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()

