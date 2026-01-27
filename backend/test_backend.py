import requests
import random

# Generate fake feature vector
features = [random.random() for _ in range(79)]

payload = {
    "src_ip": "192.168.1.100",
    "features": features
}

res = requests.post("http://127.0.0.1:5000/detect", json=payload)

print(res.json())
