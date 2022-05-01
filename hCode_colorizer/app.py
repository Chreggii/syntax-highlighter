from flask import Flask, Response, request, app
import os, werkzeug


def create_app():
    app = Flask(__name__)

    @app.route("/color-scheme", methods=["GET"])
    @app.errorhandler(werkzeug.exceptions.BadRequest)
    def colorize():
        mode = request.args.get("mode")
        if mode == "default":
            return [
                {"name": "ANY", "hCodeValue": 0, "hexcode": "#000000"},
                {"name": "KEYWORD", "hCodeValue": 1, "hexcode": "#000000"},
                {"name": "LITERAL", "hCodeValue": 2, "hexcode": "#000000"},
                {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3, "hexcode": "#000000"},
                {"name": "COMMENT", "hCodeValue": 4, "hexcode": "#000000"},
                {"name": "CLASS_DECLARATOR", "hCodeValue": 5, "hexcode": "#000000"},
                {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6, "hexcode": "#000000"},
                {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7, "hexcode": "#000000"},
                {"name": "TYPE_IDENTIFIER", "hCodeValue": 8, "hexcode": "#000000"},
                {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9, "hexcode": "#000000"},
                {"name": "FIELD_IDENTIFIER", "hCodeValue": 10, "hexcode": "#000000"},
                {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11, "hexcode": "#000000"}
            ]
        return None

    return app


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3030))
    app = create_app()
    app.run(
        debug=(os.getenv("FLASK_DEBUG", "True") == "True"), host="0.0.0.0", port=port
    )
