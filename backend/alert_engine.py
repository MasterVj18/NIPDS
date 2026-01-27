from datetime import datetime

LOG_FILE = r"D:\Vijay\NIPDS-main\logs\alerts.log"

def log_alert(ip, attack_type, score):
    with open(LOG_FILE, "a") as f:
        f.write(
            f"{datetime.now()} | IP: {ip} | Attack: {attack_type} | Score: {score}\n"
        )
