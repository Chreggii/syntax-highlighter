import os

import requests
import werkzeug
from flask import Flask, request

from Base_Learner.SHModelUtils import (
    PYTHON3_LANG_NAME,
    KOTLIN_LANG_NAME,
    JAVA_LANG_NAME,
    SHModel,
)

docker_network = os.getenv("DOCKER_NETWORK", "False") == "True"
BASE_URL = (
    "http://formalSyntaxHighlighter:8080" if docker_network else "http://localhost:8080"
)


# Helper method to make testing easier
def get_lexing(text, lang):
    return requests.get(
        BASE_URL + "/lex-string",
        params={"text": text, "type": lang},
    )


# Helper method to make testing easier
def get_highlight_string(text, lang):
    return requests.get(
        BASE_URL + "/highlight-string",
        params={"text": text, "type": lang},
    )


def create_app():
    app = Flask(__name__)
    types = [PYTHON3_LANG_NAME, KOTLIN_LANG_NAME, JAVA_LANG_NAME, "python"]

    @app.route("/ml-highlight", methods=["GET"])
    @app.errorhandler(werkzeug.exceptions.BadRequest)
    def predict():
        # define the parameter that we expect
        text = request.args.get("text")
        lang = request.args.get("type")

        # check type of 'text' and 'lang', return 400 error if is wrong
        if lang not in types:
            return "The type should be either 'java', 'kotlin', 'python'!", 400
        if not isinstance(text, str):
            return "Text should be a string!", 400

        # convert 'python3' variable to python for the formalSyntaxHighlighter
        # API call
        if lang == PYTHON3_LANG_NAME:
            lang = "python"
        formal_syntax_highlighter = get_lexing(text, lang)
        fsh_response = formal_syntax_highlighter.json()

        # collect tokenId from formalSyntaxHighlighter API response
        tokens = []
        for ltok in fsh_response:
            tokens.append(ltok["tokenId"])

        # convert type to 'python3' for the SHModel
        if lang == "python":
            lang = PYTHON3_LANG_NAME
        model = SHModel(lang, "model_data")
        model.setup_for_prediction()
        highlighted_data = model.predict(tokens)

        response_data = {"lexingData": fsh_response, "hCodeValues": highlighted_data}

        return response_data

    @app.route("/ml-train", methods=["PUT"])
    def learn():
        data = request.json

        text = data["text"]
        lang = data["type"]

        if lang not in types:
            return "The type should be either 'java', 'kotlin', 'python'!", 400

        if not isinstance(text, str):
            return "Text should be a string!", 400

        if lang == PYTHON3_LANG_NAME:
            lang = "python"

        formal_syntax_highlighter = get_highlight_string(text, lang)
        fsh_response = formal_syntax_highlighter.json()

        tokens = []
        highlighted = []
        for ltok in fsh_response:
            tokens.append(ltok["tokenId"])
            highlighted.append(ltok["hCodeValue"])

        if lang == "python":
            lang = PYTHON3_LANG_NAME

        model = SHModel(lang, "model_data")
        model.setup_for_finetuning()

        finetuning = model.finetune_on(tokens, highlighted)
        model.persist_model()

        return f"Training loss: {finetuning}"

    return app


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3000))
    mlClassifier = create_app()
    mlClassifier.run(
        debug=(os.getenv("FLASK_DEBUG", "True") == "True"), host="0.0.0.0", port=port
    )
