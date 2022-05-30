"""
Small Flask app that used the Base Learner and applies it to API requests.
"""

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


def get_lexing(text, lang):
    """API request to formalSyntaxHighlighter /lex-string"""
    return requests.post(
        BASE_URL + "/lex-string",
        json={"text": text, "type": lang},
    )


def get_highlight_string(text, lang):
    """API request to formalSyntaxHighlighter /highlight-string"""
    return requests.post(
        BASE_URL + "/highlight-string",
        json={"text": text, "type": lang},
    )


def get_text_and_lang(request):
    request_data = request.get_json()
    text = request_data["text"]
    lang = request_data["type"]
    return text, lang


def create_app():
    """Create the Flask APP with the endpoints"""
    app = Flask(__name__)
    types = [PYTHON3_LANG_NAME, KOTLIN_LANG_NAME, JAVA_LANG_NAME, "python"]

    @app.route("/ml-highlight", methods=["POST"])
    @app.errorhandler(werkzeug.exceptions.BadRequest)
    def predict():
        """Predict the highlighting of a string using the SHModel.

        Given the tokenIds it predicts the highlighting of a text using the SHModel.

        Attributes
        -------
        text : string
        type : string: ["python", "kotlin", "java"]

        Returns
        -------
        Json
            contains the formalSyntaxHighlighter /lex-string response and the
            hCodeValues prediction of the SHModel.
        """
        # define the parameter that we expect
        text, lang = get_text_and_lang(request)

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
        """Train the SHModel.

        Given the tokenIds and hCodeValues obtained through a request done to
        the formalSyntaxHighlighter, it instantiate the SHModel, it performs
        the finetuning and it persists the model.

        Attributes
        -------
        text : string
        type : string: ["python", "kotlin", "java"]

        Returns
        -------
        String
            Message showing the loss of the training process.
        """
        text, lang = get_text_and_lang(request)

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
