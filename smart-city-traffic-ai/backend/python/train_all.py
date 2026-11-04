import os
import sys
import json
import time
import joblib
import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score, accuracy_score

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "..", "models")
DATA_DIR = os.path.join(BASE_DIR, "..", "data")
CSV_PATH = os.path.join(DATA_DIR, "smart_city_traffic_mobility.csv")

if not os.path.exists(CSV_PATH):
    # fallback to root if not found in data
    CSV_PATH = os.path.join(BASE_DIR, "..", "..", "smart_city_traffic_mobility.csv")

os.makedirs(MODELS_DIR, exist_ok=True)

FEATURES = [
    "vehicle_count",
    "average_speed",
    "heavy_vehicle_count",
    "motorcycle_count",
    "public_transport_count",
    "traffic_density",
    "queue_length",
    "average_wait_time",
    "hour",
    "is_weekend",
    "is_holiday",
    "rush_hour",
    "temperature",
    "rainfall_mm",
    "visibility_km",
    "air_quality_index",
    "parking_occupancy",
    "construction_activity",
    "accident_reported",
    "traffic_camera_count",
    "signal_cycle_seconds",
    "green_light_duration",
    "emergency_vehicle_detected"
]

TARGET_MAPPING = {
    "Low": 0,
    "Moderate": 1,
    "High": 2,
    "Severe": 3
}
REVERSE_MAPPING = {v: k for k, v in TARGET_MAPPING.items()}

def train_all():
    print(f"Loading dataset from: {CSV_PATH}")
    t0 = time.time()
    df = pd.read_csv(CSV_PATH)
    print(f"Dataset loaded: {df.shape[0]} rows, {df.shape[1]} columns in {time.time() - t0:.2f}s")

    # Clean missing values
    data = df[FEATURES + ["traffic_flow_rate", "congestion_level"]].dropna()
    print(f"Usable clean records: {len(data)}")

    # Stratified or randomized representative sample for optimal training speed & accuracy
    sample_size = min(len(data), 60000)
    sampled = data.sample(n=sample_size, random_state=42)

    X = sampled[FEATURES]
    y_flow = sampled["traffic_flow_rate"]
    y_cong_str = sampled["congestion_level"]
    y_cong = y_cong_str.map(TARGET_MAPPING)

    # ----------------------------------------------------
    # 1. LINEAR REGRESSION
    # ----------------------------------------------------
    print("\n--- Training Model 1: Linear Regression ---")
    X_tr_lr, X_te_lr, y_tr_lr, y_te_lr = train_test_split(X, y_flow, test_size=0.2, random_state=42)
    scaler_lr = StandardScaler()
    X_tr_lr_s = scaler_lr.fit_transform(X_tr_lr)
    X_te_lr_s = scaler_lr.transform(X_te_lr)

    lr_model = LinearRegression()
    lr_model.fit(X_tr_lr_s, y_tr_lr)
    y_pred_lr = lr_model.predict(X_te_lr_s)

    mae = mean_absolute_error(y_te_lr, y_pred_lr)
    mse = mean_squared_error(y_te_lr, y_pred_lr)
    rmse = float(np.sqrt(mse))
    r2 = r2_score(y_te_lr, y_pred_lr)

    lr_payload = {
        "model": lr_model,
        "scaler": scaler_lr,
        "features": FEATURES,
        "metrics": {
            "mae": round(float(mae), 2),
            "mse": round(float(mse), 2),
            "rmse": round(float(rmse), 2),
            "r2": round(float(r2), 4)
        }
    }
    joblib.dump(lr_payload, os.path.join(MODELS_DIR, "linear_regression.joblib"))
    print(f"Linear Regression saved! R2={r2:.4f}, MAE={mae:.2f}, RMSE={rmse:.2f}")

    # ----------------------------------------------------
    # Classification Split
    # ----------------------------------------------------
    X_tr_c, X_te_c, y_tr_c, y_te_c = train_test_split(
        X, y_cong, test_size=0.2, random_state=42, stratify=y_cong
    )

    # ----------------------------------------------------
    # 2. LOGISTIC REGRESSION
    # ----------------------------------------------------
    print("\n--- Training Model 2: Logistic Regression ---")
    scaler_log = StandardScaler()
    X_tr_log_s = scaler_log.fit_transform(X_tr_c)
    X_te_log_s = scaler_log.transform(X_te_c)

    log_model = LogisticRegression(max_iter=1000, random_state=42)
    log_model.fit(X_tr_log_s, y_tr_c)
    y_pred_log = log_model.predict(X_te_log_s)
    log_acc = accuracy_score(y_te_c, y_pred_log)

    log_payload = {
        "model": log_model,
        "scaler": scaler_log,
        "features": FEATURES,
        "classes": [REVERSE_MAPPING[i] for i in range(4)],
        "target_mapping": TARGET_MAPPING,
        "reverse_mapping": REVERSE_MAPPING,
        "metrics": {
            "accuracy": round(float(log_acc * 100), 2)
        }
    }
    joblib.dump(log_payload, os.path.join(MODELS_DIR, "logistic_regression.joblib"))
    print(f"Logistic Regression saved! Accuracy={log_acc * 100:.2f}%")

    # ----------------------------------------------------
    # 3. DECISION TREE
    # ----------------------------------------------------
    print("\n--- Training Model 3: Decision Tree ---")
    dt_model = DecisionTreeClassifier(
        max_depth=10,
        class_weight="balanced",
        random_state=42
    )
    dt_model.fit(X_tr_c, y_tr_c)
    y_pred_dt = dt_model.predict(X_te_c)
    dt_acc = accuracy_score(y_te_c, y_pred_dt)

    # Calculate feature importances
    dt_importances = [
        {"feature": feat, "importance": round(float(imp), 4), "percentage": round(float(imp * 100), 1)}
        for feat, imp in zip(FEATURES, dt_model.feature_importances_)
    ]
    dt_importances.sort(key=lambda x: x["importance"], reverse=True)

    dt_payload = {
        "model": dt_model,
        "features": FEATURES,
        "classes": [REVERSE_MAPPING[i] for i in range(4)],
        "target_mapping": TARGET_MAPPING,
        "reverse_mapping": REVERSE_MAPPING,
        "feature_importances": dt_importances,
        "metrics": {
            "accuracy": round(float(dt_acc * 100), 2),
            "max_depth": 10
        }
    }
    joblib.dump(dt_payload, os.path.join(MODELS_DIR, "decision_tree.joblib"))
    print(f"Decision Tree saved! Accuracy={dt_acc * 100:.2f}%")

    # ----------------------------------------------------
    # 4. RANDOM FOREST
    # ----------------------------------------------------
    print("\n--- Training Model 4: Random Forest ---")
    rf_model = RandomForestClassifier(
        n_estimators=200,
        max_depth=15,
        class_weight="balanced",
        n_jobs=-1,
        random_state=42
    )
    rf_model.fit(X_tr_c, y_tr_c)
    y_pred_rf = rf_model.predict(X_te_c)
    rf_acc = accuracy_score(y_te_c, y_pred_rf)

    rf_importances = [
        {"feature": feat, "importance": round(float(imp), 4), "percentage": round(float(imp * 100), 1)}
        for feat, imp in zip(FEATURES, rf_model.feature_importances_)
    ]
    rf_importances.sort(key=lambda x: x["importance"], reverse=True)

    rf_payload = {
        "model": rf_model,
        "features": FEATURES,
        "classes": [REVERSE_MAPPING[i] for i in range(4)],
        "target_mapping": TARGET_MAPPING,
        "reverse_mapping": REVERSE_MAPPING,
        "feature_importances": rf_importances,
        "metrics": {
            "accuracy": round(float(rf_acc * 100), 2),
            "n_estimators": 200,
            "max_depth": 15
        }
    }
    joblib.dump(rf_payload, os.path.join(MODELS_DIR, "random_forest.joblib"))
    print(f"Random Forest saved! Accuracy={rf_acc * 100:.2f}%")

    print("\nAll 4 models successfully trained and serialized into backend/models/!")

if __name__ == "__main__":
    train_all()

