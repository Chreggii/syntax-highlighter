import glob
import time

import requests
from tqdm import tqdm

train_files = [
    item for sublist in [
        glob.glob(f"train_data/**/*.{e}") for e in ["java", "kt", "py"]
    ] for item in sublist
]

failed_files = []

for file in tqdm(train_files):
    files = {"file": open(file, "rb")}
    try:
        r = requests.post("http://localhost:3000/highlight-file", files=files)
        r.raise_for_status()
    except:
        time.sleep(10)  # Sleep to allow restart
        failed_files.append(file)

print(failed_files)
