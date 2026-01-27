import pandas as pd
import requests
import numpy as np

# Load attack traffic
data = pd.read_csv(r"D:\Vijay\NIPDS-main\ml\datasets\Friday.csv")

# Pick ONLY attack rows
attack_data = data[data['Label'] != 'BENIGN'].sample(5)

# Drop non-numeric
drop_cols = ['Flow ID', 'Src IP', 'Dst IP', 'Timestamp', 'Label']
X = attack_data.drop(columns=drop_cols, errors='ignore')

X = X.astype(np.float32)

for _, row in X.iterrows():
    payload = {
        "src_ip": "192.168.1.50",
        "features": row.tolist()
    }

    res = requests.post("http://127.0.0.1:5000/detect", json=payload)
    print(res.status_code)
    print(res.text)

