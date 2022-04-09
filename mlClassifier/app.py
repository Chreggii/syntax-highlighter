import http

from Base_Learner.SHModelUtils import *
from flask import Flask, Response, request
import os, werkzeug
import requests

app = Flask(__name__)

types = [PYTHON3_LANG_NAME, KOTLIN_LANG_NAME, JAVA_LANG_NAME, "python"]

# Helper method to make testing easier
def getLexing(text, type):
    return requests.get(
        "http://localhost:8080/lex-string",  # for docker: http://formalSyntaxHighlighter:8080/lex-string
        params={"text": text, "type": type},
    )

def getHighlightString(text, type):
    return requests.get(
            "http://localhost:8080/highlight-string",
            # for docker: http://formalSyntaxHighlighter:8080/highlight-string
            params={"text": text, "type": type},
        )



def configure_routes(app):
    @app.route("/ml-highlight", methods=["GET"])
    @app.errorhandler(werkzeug.exceptions.BadRequest)
    def predict():
        # define the parameter that we expect
        text = request.args.get('text')
        type = request.args.get('type')

        # check type of 'text' and 'type', return 400 error if is wrong
        if type not in types:
            return "The type should be either 'java', 'kotlin', 'python'!", 400
        if not isinstance(text, str):
            return "Text should be a string!", 400

        # convert 'python3' variable to python for the formalSyntaxHighlighter API call
        if type == PYTHON3_LANG_NAME:
            type = 'python'
        formal_syntax_highlighter = getLexing(text, type)
        fsh_response = formal_syntax_highlighter.json

        # collect tokenId from formalSyntaxHighlighter API response
        tokens = []
        for ltok in fsh_response:
            tokens.append(ltok["tokenId"])

        # convert type to 'python3' for the SHModel
        if type == 'python':
            type = PYTHON3_LANG_NAME
        model = SHModel(
            type, "model_data"
        )
        model.setup_for_prediction()
        highlighted_data = model.predict(tokens)

        response_data = {
            'lexingData': fsh_response,
            'hCodeValues': highlighted_data
        }

        return response_data

    @app.route("/ml-train", methods=["PUT"])
    def learn():
        text = request.args.get('text')
        type = request.args.get('type')

        if type not in types:
            return "The type should be either 'java', 'kotlin', 'python'!", 400

        if not isinstance(text, str):
            return "Text should be a string!", 400

        if type == PYTHON3_LANG_NAME:
            type = 'python'

        formal_syntax_highlighter = getHighlightString(text, type)
        fsh_response = formal_syntax_highlighter.json

        tokens = []
        highlighted = []
        for id in fsh_response:
            tokens.append(id["tokenId"])
            highlighted.append(id["hCodeValue"])

        if type == "python":
            type = PYTHON3_LANG_NAME

        model = SHModel(type, "model_data")
        model.setup_for_finetuning()

        finetuning = model.finetune_on(tokens, highlighted)
        model.persist_model()

        return "Training loss: {}".format(finetuning)

    if __name__ == "__main__":
        port = int(os.environ.get("PORT", 3000))
        app.run(debug=True, host="0.0.0.0", port=port)
