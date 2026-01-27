from scapy.all import sniff, IP, TCP, UDP
import numpy as np
import joblib
import time

# Load trained components
model = joblib.load(r"D:\Vijay\NIPDS-main\ml\ids_model.pkl")
scaler = joblib.load(r"D:\Vijay\NIPDS-main\ml\scaler.pkl")
label_encoder = joblib.load(r"D:\Vijay\NIPDS-main\ml\label_encoder.pkl")

# Simple flow storage
flows = {}

# Feature count must match training (example: 79)
FEATURE_SIZE = 79


def extract_features(packet):
    features = np.zeros(FEATURE_SIZE, dtype=np.float32)

    if IP in packet:
        features[0] = packet[IP].len
        features[1] = packet[IP].ttl

    if TCP in packet:
        features[2] = packet[TCP].sport
        features[3] = packet[TCP].dport
        features[4] = packet[TCP].flags

    if UDP in packet:
        features[5] = packet[UDP].sport
        features[6] = packet[UDP].dport

    features[7] = time.time() % 60  # time-based variation

    return features


def detect_attack(features):
    features = features.reshape(1, -1)
    features_scaled = scaler.transform(features)

    pred = model.predict(features_scaled)[0]
    attack = label_encoder.inverse_transform([pred])[0]

    return attack


def packet_handler(packet):
    try:
        features = extract_features(packet)
        attack = detect_attack(features)

        src_ip = packet[IP].src if IP in packet else "Unknown"

        if attack != "BENIGN":
            print(f"[ALERT] Attack Detected from {src_ip} → {attack}")
        else:
            print(f"[OK] {src_ip} → BENIGN")

    except Exception as e:
        print("Error:", e)


print("🚨 Real-Time IDS Started...")
sniff(prn=packet_handler, store=False)
