
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import joblib

print("\nLoading datasets...")

files = [
    r"C:\Vijay\NIPDS-main\ml\datasets\Monday.csv",
    r"C:\Vijay\NIPDS-main\ml\datasets\Tuesday.csv",
    r"C:\Vijay\NIPDS-main\ml\datasets\Wednesday.csv",
    r"C:\Vijay\NIPDS-main\ml\datasets\Thursday.csv",
    r"C:\Vijay\NIPDS-main\ml\datasets\Friday.csv",
]


df_list = [pd.read_csv(f) for f in files]
data = pd.concat(df_list, ignore_index=True)

print("Dataset Shape:", data.shape)
print("\nLabel Distribution:\n", data['Label'].value_counts())

print("\nCleaning data...")

# Replace infinite with NaN
data.replace([np.inf, -np.inf], np.nan, inplace=True)

# Drop rows with NaN
data.dropna(inplace=True)

print("After Cleaning Shape:", data.shape)

print("\nEncoding labels...")

label_encoder = LabelEncoder()
data['Label'] = label_encoder.fit_transform(data['Label'])

joblib.dump(label_encoder, "label_encoder.pkl")

print("\nSelecting features...")

X = data.drop(columns=['Label', 'Flow ID', 'Src IP', 'Dst IP', 'Timestamp'], errors='ignore')
y = data['Label']

print("Features Shape:", X.shape)
print("\nSplitting dataset...")

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print("\nScaling features...")

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

joblib.dump(scaler, "scaler.pkl")

print("\nTraining model...")

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

joblib.dump(model, "ids_model.pkl")

print("\nEvaluating model...")

y_pred = model.predict(X_test)

print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))

print("\nModel Training Complete!")
