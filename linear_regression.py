# Smart City Traffic Management System
# Linear Regression
# Predict Traffic Flow Rate

import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

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

target = "traffic_flow_rate"

# ---------------------------------------------------
# 3. Remove Missing Values
# ---------------------------------------------------

data = df[features + [target]].dropna()

X = data[features]
y = data[target]

print("\nNumber of records:", len(data))

# ---------------------------------------------------
# 4. Split Dataset
# ---------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42
)

# ---------------------------------------------------
# 5. Feature Scaling
# ---------------------------------------------------

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# ---------------------------------------------------
# 6. Create Linear Regression Model
# ---------------------------------------------------

model = LinearRegression()

# Train model
model.fit(X_train_scaled, y_train)

# ---------------------------------------------------
# 7. Prediction
# ---------------------------------------------------

y_pred = model.predict(X_test_scaled)

# ---------------------------------------------------
# 8. Evaluation
# ---------------------------------------------------

mae = mean_absolute_error(y_test, y_pred)

mse = mean_squared_error(y_test, y_pred)

rmse = mse ** 0.5

r2 = r2_score(y_test, y_pred)

print("\n--------------------------------")
print("LINEAR REGRESSION RESULTS")
print("--------------------------------")

print("MAE :", round(mae, 2))
print("MSE :", round(mse, 2))
print("RMSE:", round(rmse, 2))
print("R2 Score:", round(r2, 4))

# ---------------------------------------------------
# 9. Actual vs Predicted Graph
# ---------------------------------------------------

plt.figure(figsize=(8, 6))

plt.scatter(
    y_test,
    y_pred,
    alpha=0.5
)

plt.xlabel("Actual Traffic Flow Rate")
plt.ylabel("Predicted Traffic Flow Rate")

plt.title(
    "Actual vs Predicted Traffic Flow Rate"
)

plt.grid(True)

plt.show()

# ---------------------------------------------------
# 10. Test New Traffic Data
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

print("\nNew Traffic Prediction:")

print(
    "Predicted Traffic Flow Rate:",
    round(prediction[0], 2),
    "vehicles/hour"
)
