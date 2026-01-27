import joblib
import numpy as np

# Load trained components
model = joblib.load(r"D:\Vijay\NIPDS-main\ml\ids_model.pkl")
scaler = joblib.load(r"D:\Vijay\NIPDS-main\ml\scaler.pkl")
label_encoder = joblib.load(r"D:\Vijay\NIPDS-main\ml\label_encoder.pkl")

def detect_intrusion(feature_vector):
    """
    feature_vector: list or numpy array (1D)
    """
    X = np.array(feature_vector, dtype=np.float32).reshape(1, -1)
    X_scaled = scaler.transform(X)

    prediction = model.predict(X_scaled)[0]
    attack_type = label_encoder.inverse_transform([prediction])[0]

    # Threat score (simple logic)
    threat_score = 0 if attack_type == "BENIGN" else np.random.randint(70, 100)

    return {
        "attack_type": attack_type,
        "threat_score": threat_score
    }
