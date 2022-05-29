import glob
import requests
from tqdm import tqdm

train_files = [glob.glob(f"train_data/**/*.{e}") for e in ["java", "kt", "py"]]

for file in tqdm(train_files):
    print(f"Requesting: {file}")
    files = {"file": open("input_data/java/AES.java", "rb")}
    requests.post("http://localhost:3000/highlight-file", files=files)
