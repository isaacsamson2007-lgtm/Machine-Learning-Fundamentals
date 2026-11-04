
# Smart City Traffic Management System
# Logistic Regression
# Predict Traffic Congestion Level

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# ---------------------------------------------------
# 1. Load Dataset
# ---------------------------------------------------

df = pd.read_csv("smart_city_traffic_mobility.csv")

print("Dataset loaded successfully!")
print("Shape:", df.shape)

# ---------------------------------------------------
# 2. Select Features
# ---------------------------------------------------

features = [
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

target = "congestion_level"

# ---------------------------------------------------
# 3. Remove Missing Values
# ---------------------------------------------------

data = df[features + [target]].dropna()

X = data[features]
y = data[target]

print("\nTarget Classes:")
print(y.value_counts())

# ---------------------------------------------------
# 4. Convert Target into Numbers
# ---------------------------------------------------

# Low = 0
# Moderate = 1
# High = 2
# Severe = 3

target_mapping = {
    "Low": 0,
    "Moderate": 1,
    "High": 2,
    "Severe": 3
}

y = y.map(target_mapping)

# ---------------------------------------------------
# 5. Split Dataset
# ---------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# ---------------------------------------------------
# 6. Feature Scaling
# ---------------------------------------------------

scaler = StandardScaler()

X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# ---------------------------------------------------
# 7. Create Logistic Regression Model
# ---------------------------------------------------

model = LogisticRegression(
    max_iter=1000,
    random_state=42
)

# Train model
model.fit(X_train, y_train)

# ---------------------------------------------------
# 8. Prediction
# ---------------------------------------------------

y_pred = model.predict(X_test)

# ---------------------------------------------------
# 9. Accuracy
# ---------------------------------------------------

accuracy = accuracy_score(y_test, y_pred)

print("\n--------------------------------")
print("LOGISTIC REGRESSION RESULTS")
print("--------------------------------")

print("Accuracy:", round(accuracy * 100, 2), "%")

# ---------------------------------------------------
# 10. Classification Report
# ---------------------------------------------------

print("\nClassification Report:")

print(
    classification_report(
        y_test,
        y_pred,
        target_names=["Low", "Moderate", "High", "Severe"]
    )
)

# ---------------------------------------------------
# 11. Confusion Matrix
# ---------------------------------------------------

cm = confusion_matrix(y_test, y_pred)

plt.figure(figsize=(7, 5))

sns.heatmap(
    cm,
    annot=True,
    fmt="d",
    cmap="Blues",
    xticklabels=["Low", "Moderate", "High", "Severe"],
    yticklabels=["Low", "Moderate", "High", "Severe"]
)

plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.title("Traffic Congestion - Confusion Matrix")

plt.show()

# ---------------------------------------------------
# 12. Test New Traffic Data
# ---------------------------------------------------

new_traffic = [[
    850,       # vehicle_count
    25,        # average_speed
    40,        # heavy_vehicle_count
    80,        # motorcycle_count
    30,        # public_transport_count
    140,       # traffic_density
    100,       # queue_length
    15,        # average_wait_time
    8,         # hour
    0,         # is_weekend
    0,         # is_holiday
    1,         # rush_hour
    25,        # temperature
    0,         # rainfall_mm
    9,         # visibility_km
    70,        # air_quality_index
    60,        # parking_occupancy
    0,         # construction_activity
    0,         # accident_reported
    1,         # traffic_camera_count
    120,       # signal_cycle_seconds
    80,        # green_light_duration
    0          # emergency_vehicle_detected
]]

new_traffic_scaled = scaler.transform(new_traffic)

prediction = model.predict(new_traffic_scaled)

class_names = {
    0: "Low",
    1: "Moderate",
    2: "High",
    3: "Severe"
}

print("\nNew Traffic Prediction:")
print("Congestion Level:", class_names[prediction[0]])
