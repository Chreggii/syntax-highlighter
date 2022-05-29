# ML Classifier
The ML Classifier is a Python Flask application that acts as a microservice
within the syntax-highlighter project. It trains the ML model and makes predictions.
It can also be run locally as a stand-alone service following the next steps:
## Dependencies

This service uses `pip-tools` to manage the dependencies. (`pip install pip-tools`)

### Install dependencies

```
pip install -r requirements.txt
```

### Add dependencies

1. Add your dependency, optionally with a version string to `requirements.in`.
2. Compile dependencies by running `pip-compile`
3. Install your dependencies by running `pip-sync` (will remove stuff from your current environment if not needed)

### Upgrade dependencies

Dependencies that are not pinned in `requirements.in` can automatically be upgraded using `pip-compile --upgrade`.

## Formatting

Use black to automatically format `app.py`:

```bash
black app.py
```

## Model storage
The models are stored in the `.pt` files. These files contain in my knowledge binary data that cannot be merged 
in a useful way. As a general rule never merge them with git and just decide for the larger file in case of a conflict.

## Run Application
To run MlClassifier run the following command:
```
python app.py
```