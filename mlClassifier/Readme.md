# ML Classifier

## Dependencies

This serivce uses `pip-tools` to manage the dependencies. (`pip install pip-tools`)

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

## Formatinng

Use black to automatically format `app.py`:

```bash
black app.yp
```