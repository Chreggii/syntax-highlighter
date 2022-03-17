from flask import Flask
import os

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hi from the ML classifier'


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3000))
    app.run(debug=True, host='0.0.0.0', port=port)
