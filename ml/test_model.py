import pandas as pd
import numpy as np
import joblib
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns
import matplotlib.pyplot as plt

# Load model components
# Load saved objects
model = joblib.load(r"C:\Vijay\NIPDS-main\ml\ids_model.pkl")
scaler = joblib.load(r"C:\Vijay\NIPDS-main\ml\scaler.pkl")
label_encoder = joblib.load(r"C:\Vijay\NIPDS-main\ml\label_encoder.pkl")


# Load multiple days (ATTACK + BENIGN)
files = [
    r"C:\Vijay\NIPDS-main\ml\datasets\Tuesday.csv",
    r"C:\Vijay\NIPDS-main\ml\datasets\Wednesday.csv",
    r"C:\Vijay\NIPDS-main\ml\datasets\Thursday.csv",
    r"C:\Vijay\NIPDS-main\ml\datasets\Friday.csv"
    
]

df_list = [pd.read_csv(f) for f in files]
data = pd.concat(df_list, ignore_index=True)

# Clean
data.replace([np.inf, -np.inf], np.nan, inplace=True)
data.dropna(inplace=True)

drop_cols = ['Flow ID', 'Src IP', 'Dst IP', 'Timestamp']
data.drop(columns=drop_cols, inplace=True, errors='ignore')

print("Original label distribution:\n", data['Label'].value_counts())

sample_size = 50000

data = data.groupby('Label', group_keys=False).apply(
    lambda x: x.sample(min(len(x), sample_size), random_state=42)
)

print("\nBalanced label distribution:\n", data['Label'].value_counts())

# Prepare X & y
X = data.drop(columns=['Label']).astype(np.float32)
y = data['Label']

# Encode labels
y_enc = label_encoder.transform(y)

# Scale & predict
X_scaled = scaler.transform(X)
y_pred = model.predict(X_scaled)

# Find used label
used_labels = np.unique(y_enc)
used_names = label_encoder.inverse_transform(used_labels)

# Classification report
print("\nClassification Report:\n")
print(
    classification_report(
        y_enc,
        y_pred,
        labels=used_labels,
        target_names=used_names
    )
)

# Confusion Matrix
cm = confusion_matrix(y_enc, y_pred, labels=used_labels)

plt.figure(figsize=(12, 9))
sns.heatmap(
    cm,
    annot=True,
    fmt="d",
    cmap="Blues",
    xticklabels=used_names,
    yticklabels=used_names
)
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.title("Confusion Matrix - Random Mixed CICIDS 2017")
plt.tight_layout()
plt.show()
