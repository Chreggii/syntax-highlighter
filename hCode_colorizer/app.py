import json

from flask import Flask, Response, request, app
import os, werkzeug


def create_app():
    app = Flask(__name__)

    @app.route("/color-scheme", methods=["GET"])
    @app.errorhandler(werkzeug.exceptions.BadRequest)
    def colorize():
        mode = request.args.get("mode")
        if mode == "dark":
            return json.dumps([
                {"name": "ANY", "hCodeValue": 0, "hexcode": "#ffffff"},#1
                {"name": "KEYWORD", "hCodeValue": 1, "hexcode": "#ff8800"}, #2
                {"name": "LITERAL", "hCodeValue": 2, "hexcode": "#add8e6"},
                {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3, "hexcode": "#006400"},
                {"name": "COMMENT", "hCodeValue": 4, "hexcode": "#A9A9A9"},
                {"name": "CLASS_DECLARATOR", "hCodeValue": 5, "hexcode": "#ff8800"}, #2
                {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6, "hexcode": "#ffcd01"},#3
                {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7, "hexcode": "#1870d5"},
                {"name": "TYPE_IDENTIFIER", "hCodeValue": 8, "hexcode": "#ffffff"}, #1
                {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9, "hexcode": "#ffcd01"},#3
                {"name": "FIELD_IDENTIFIER", "hCodeValue": 10, "hexcode": "#ffcd01"},#3
                {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11, "hexcode": "#ffff00"}
            ])
        if mode == "dracula":
            return json.dumps([
                {"name": "ANY", "hCodeValue": 0, "hexcode": "#ffffff"},  # 1 yes
                {"name": "KEYWORD", "hCodeValue": 1, "hexcode": "#8becfd"},  # 2
                {"name": "LITERAL", "hCodeValue": 2, "hexcode": "#f1fa8c"},
                {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3, "hexcode": "#f1fa8c"},
                {"name": "COMMENT", "hCodeValue": 4, "hexcode": "#6272a4"}, # yes
                {"name": "CLASS_DECLARATOR", "hCodeValue": 5, "hexcode": "#8becfd"},  # 2
                {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6, "hexcode": "#8becfd"},  # 3
                {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7, "hexcode": "#1870d5"},
                {"name": "TYPE_IDENTIFIER", "hCodeValue": 8, "hexcode": "#ffffff"},  # 1
                {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9, "hexcode": "#8becfd"},  # 3
                {"name": "FIELD_IDENTIFIER", "hCodeValue": 10, "hexcode": "#8becfd"},  # 3
                {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11, "hexcode": "#6272a4"}
            ])
        if mode == "classic":
            return json.dumps([
                {"name": "ANY", "hCodeValue": 0, "hexcode": "#000000"},
                {"name": "KEYWORD", "hCodeValue": 1, "hexcode": "#7f0055"},
                {"name": "LITERAL", "hCodeValue": 2, "hexcode": "#1f7199"}, #ye
                {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3, "hexcode": "#006400"},
                {"name": "COMMENT", "hCodeValue": 4, "hexcode": "#888888"},# yes
                {"name": "CLASS_DECLARATOR", "hCodeValue": 5, "hexcode": "#880000"}, #yes
                {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6, "hexcode": "#880000"}, #yes
                {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7, "hexcode": "#000000"}, #yes
                {"name": "TYPE_IDENTIFIER", "hCodeValue": 8, "hexcode": "##1f7199"},
                {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9, "hexcode": "#ffcd01"},
                {"name": "FIELD_IDENTIFIER", "hCodeValue": 10, "hexcode": "#ffcd01"},
                {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11, "hexcode": "#1f7199"} #yes
            ])
        else: return 'Not a valid mode! Try "default" or..', 406


    return app


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3030))
    app = create_app()
    app.run(
        debug=(os.getenv("FLASK_DEBUG", "True") == "True"), host="0.0.0.0", port=port
    )
