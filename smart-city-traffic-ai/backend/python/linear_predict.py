import os
import sys
import json
import warnings
import numpy as np

# Suppress warnings to guarantee clean JSON on stdout
warnings.filterwarnings("ignore")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "..", "models")
MODEL_PATH = os.path.join(MODELS_DIR, "linear_regression.joblib")
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

def load_or_train_model():
    import joblib
    if os.path.exists(MODEL_PATH):
        try:
            return joblib.load(MODEL_PATH)
        except Exception as e:
            sys.stderr.write(f"Error loading model: {e}\n")

    # Option B: Train on the fly
    sys.stderr.write("Training Linear Regression from CSV...\n")
    import pandas as pd
    from sklearn.model_selection import train_test_split
    from sklearn.preprocessing import StandardScaler
    from sklearn.linear_model import LinearRegression
    from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

    df = pd.read_csv(CSV_PATH)
    data = df[FEATURES + ["traffic_flow_rate"]].dropna()
    sample_size = min(len(data), 50000)
    data = data.sample(n=sample_size, random_state=42)

    X = data[FEATURES]
    y = data["traffic_flow_rate"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    scaler = StandardScaler()
    X_train_s = scaler.fit_transform(X_train)
    X_test_s = scaler.transform(X_test)

    model = LinearRegression()
    model.fit(X_train_s, y_train)

    y_pred = model.predict(X_test_s)
    mae = mean_absolute_error(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    rmse = float(np.sqrt(mse))
    r2 = r2_score(y_test, y_pred)

    os.makedirs(MODELS_DIR, exist_ok=True)
    payload = {
        "model": model,
        "scaler": scaler,
        "features": FEATURES,
        "metrics": {
            "mae": round(float(mae), 2),
            "mse": round(float(mse), 2),
            "rmse": round(float(rmse), 2),
            "r2": round(float(r2), 4)
        }
    }
    joblib.dump(payload, MODEL_PATH)
    return payload

def main():
    try:
        # Read input from argv or stdin
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
        scaler = payload["scaler"]
        metrics = payload.get("metrics", {})

        row = [float(input_data.get(feat, 0)) for feat in FEATURES]
        row_scaled = scaler.transform([row])
        prediction = model.predict(row_scaled)
        traffic_flow = max(0.0, float(prediction[0]))

        response = {
            "success": True,
            "trafficFlowRate": round(traffic_flow, 2),
            "mae": metrics.get("mae", 0.0),
            "mse": metrics.get("mse", 0.0),
            "rmse": metrics.get("rmse", 0.0),
            "r2": metrics.get("r2", 1.0),
            "status": "Active (StandardScaler + LinearRegression)"
        }
        print(json.dumps(response))

    except Exception as e:
        sys.stderr.write(f"Prediction error: {str(e)}\n")
        print(json.dumps({"success": False, "error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()

