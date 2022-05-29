# Training with data

## 1. Install packages

```bash
pip install -r requirements.txt
```

## 2. Run `split.py` on input files

> **Warning**: This will remove and delete your old split.

```bash
python split.py
```

## 3. Ensure _Public API_ is running

```bash
docker compose up
```

## 4. Run `train_from_files.py`

```bash
python train_from_files.py
```