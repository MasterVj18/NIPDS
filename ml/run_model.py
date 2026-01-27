
import pandas as pd
import numpy as np
import joblib

# Load saved objects
model = joblib.load(r"C:\Vijay\NIPDS-main\ml\ids_model.pkl")
scaler = joblib.load(r"C:\Vijay\NIPDS-main\ml\scaler.pkl")
label_encoder = joblib.load(r"C:\Vijay\NIPDS-main\ml\label_encoder.pkl")

# Load any CICIDS file for testing
data = pd.read_csv(r"C:\Vijay\NIPDS-main\ml\datasets\Monday.csv")

# Clean
data.replace([np.inf, -np.inf], np.nan, inplace=True)
data.dropna(inplace=True)

# Drop non-numeric columns
drop_cols = ['Flow ID', 'Src IP', 'Dst IP', 'Timestamp']
data.drop(columns=drop_cols, inplace=True, errors='ignore')

# Separate features
X = data.drop(columns=['Label'])
X = X.astype(np.float32)

# Scale
X_scaled = scaler.transform(X)

# Predict
predictions = model.predict(X_scaled)
attack_names = label_encoder.inverse_transform(predictions)

# Show results
print("\nSample Predictions:\n")
for i in range(1000,1100):
    print(f"Packet {i+1} -> {attack_names[i]}")

