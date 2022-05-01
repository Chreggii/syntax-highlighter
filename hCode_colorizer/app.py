import json

from flask import Flask, Response, request, app
import os, werkzeug


def create_app():
    app = Flask(__name__)

    @app.route("/color-scheme", methods=["GET"])
    @app.errorhandler(werkzeug.exceptions.BadRequest)
    def colorize():
        mode = request.args.get("mode")
        if mode == "default":
            return json.dumps([
                {"name": "ANY", "hCodeValue": 0, "hexcode": "#ffffff"},
                {"name": "KEYWORD", "hCodeValue": 1, "hexcode": "#ff8800"},
                {"name": "LITERAL", "hCodeValue": 2, "hexcode": "#add8e6"},
                {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3, "hexcode": "#006400"},
                {"name": "COMMENT", "hCodeValue": 4, "hexcode": "#A9A9A9"},
                {"name": "CLASS_DECLARATOR", "hCodeValue": 5, "hexcode": "#ff8800"},
                {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6, "hexcode": "#ffcd01"},
                {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7, "hexcode": "#1870d5"},
                {"name": "TYPE_IDENTIFIER", "hCodeValue": 8, "hexcode": "#ffffff"},
                {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9, "hexcode": "#ffcd01"},
                {"name": "FIELD_IDENTIFIER", "hCodeValue": 10, "hexcode": "#ffcd01"},
                {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11, "hexcode": "#ffff00"}
            ])
        else: return 'Not a valid mode! Try "default" or..', 406


    return app


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3030))
    app = create_app()
    app.run(
        debug=(os.getenv("FLASK_DEBUG", "True") == "True"), host="0.0.0.0", port=port
    )
