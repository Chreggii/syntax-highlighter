from Base_Learner.SHModelUtils import SHModel
from flask import Flask
import os
import requests

app = Flask(__name__)


@app.route('/ml-highlight',  methods=['GET'])
def predict(lexing, language):
    formal_syntax_highligter = requests.get("http://formalSyntaxHighlighter:8080/lex-string", params={'text': lexing, 'type': language})
    response = formal_syntax_highligter.json()
    data = response[0]
    tokens= []
    for id in data:
        tokens.append(id['tokenId'])
    if language == 'python':
        language = 'python3'
    model = SHModel(language, 'model_data')
    model.setup_for_prediction()
    highlighted_data = model.predict(tokens)

    return highlighted_data


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3000))
    app.run(debug=True, host='0.0.0.0', port=port)
