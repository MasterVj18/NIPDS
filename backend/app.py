from flask import Flask, request, jsonify
from detector import detect_intrusion
from alert_engine import log_alert

app = Flask(__name__)

@app.route("/detect", methods=["POST"])
def detect():
    data = request.json

    features = data.get("features")
    src_ip = data.get("src_ip", "Unknown")

    result = detect_intrusion(features)

    if result["threat_score"] > 80:
        log_alert(src_ip, result["attack_type"], result["threat_score"])

    return jsonify({
        "status": "success",
        "attack_type": result["attack_type"],
        "threat_score": result["threat_score"]
    })

if __name__ == "__main__":
    app.run(debug=True)
