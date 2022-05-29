import requests

files = {'file': open('input_data/java/AES.java', 'rb')}

r = requests.post("http://localhost:3000/highlight-file", files=files)

print(r.json())
