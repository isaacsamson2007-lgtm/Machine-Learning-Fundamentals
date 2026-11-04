import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OrdinalEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score, classification_report, confusion_matrix

# 1. Load data
df = pd.read_csv("smart_city_traffic_mobility.csv")

# 2. Target and features (leaky / ID columns dropped)
target = "congestion_level"
drop_cols = ["record_id", "road_id", "intersection_id", "timestamp",
             "congestion_score", "emission_estimate", "fuel_waste_estimate"]
X = df.drop(columns=drop_cols + [target])
y = df[target]

# 3. Encode text columns
cat_cols = X.select_dtypes(exclude="number").columns.tolist()
pre = ColumnTransformer(
    [("cat", OrdinalEncoder(handle_unknown="use_encoded_value", unknown_value=-1), cat_cols)],
    remainder="passthrough")

# 4. Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y)

# 5. Train Random Forest
clf = RandomForestClassifier(n_estimators=200, max_depth=15, class_weight="balanced",
                             n_jobs=-1, random_state=42)
pipe = Pipeline([("pre", pre), ("model", clf)])
pipe.fit(X_train, y_train)

# 6. Evaluate
pred = pipe.predict(X_test)
print("Accuracy  :", round(accuracy_score(y_test, pred), 4))
print("F1 (macro):", round(f1_score(y_test, pred, average="macro"), 4))
print(classification_report(y_test, pred))
print("Confusion matrix:\n", confusion_matrix(y_test, pred, labels=clf.classes_))

# 7. Feature importance
feat_names = cat_cols + [c for c in X.columns if c not in cat_cols]
imp = pd.Series(clf.feature_importances_, index=feat_names).sort_values(ascending=False)
print("Top features:\n", imp.head(10).round(4))