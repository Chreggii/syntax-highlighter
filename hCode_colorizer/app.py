import json

from flask import Flask, Response, request, app
import os, werkzeug


def create_app():
    app = Flask(__name__)
    dark = [
        {0: {"name": "ANY", "hexcode": "#ffffff"}},#1
        {1: {"name": "KEYWORD", "hexcode": "#ff8800"}}, #2
        {2: {"name": "LITERAL", "hexcode": "#add8e6"}},
        {3: {"name": "CHAR_STRING_LITERAL",  "hexcode": "#006400"}},
        {4: {"name": "COMMENT", "hexcode": "#A9A9A9"}},
        {5: {"name": "CLASS_DECLARATOR", "hexcode": "#ff8800"}}, #2
        {6: {"name": "FUNCTION_DECLARATOR", "hexcode": "#ffcd01"}},#3
        {7: {"name": "VARIABLE_DECLARATOR", "hexcode": "#1870d5"}},
        {8: {"name": "TYPE_IDENTIFIER", "hexcode": "#ffffff"}}, #1
        {9: {"name": "FUNCTION_IDENTIFIER", "hexcode": "#ffcd01"}},#3
        {10: {"name": "FIELD_IDENTIFIER", "hexcode": "#ffcd01"}},#3
        {11: {"name": "ANNOTATION_DECLARATOR", "hexcode": "#ffff00"}}
    ]
    dracula=[
        {0:{"name": "ANY", "hexcode": "#ffffff"}},  # 1 yes
        {1:{"name": "KEYWORD", "hexcode": "#8becfd"}},  # 2
        {2:{"name": "LITERAL", "hexcode": "#f1fa8c"}},
        {3:{"name": "CHAR_STRING_LITERAL", "hexcode": "#f1fa8c"}},
        {4:{"name": "COMMENT", "hexcode": "#6272a4"}}, # yes
        {5:{"name": "CLASS_DECLARATOR", "hexcode": "#8becfd"}},  # 2
        {6:{"name": "FUNCTION_DECLARATOR","hexcode": "#8becfd"}},  # 3
        {7:{"name": "VARIABLE_DECLARATOR",  "hexcode": "#1870d5"}},
        {8:{"name": "TYPE_IDENTIFIER", "hexcode": "#ffffff"}},  # 1
        {9:{"name": "FUNCTION_IDENTIFIER", "hexcode": "#8becfd"}},  # 3
        {10:{"name": "FIELD_IDENTIFIER", "hexcode": "#8becfd"}},  # 3
        {11:{"name": "ANNOTATION_DECLARATOR", "hexcode": "#6272a4"}}
    ]
    classic=[
        {0:{"name": "ANY", "hCodeValue": 0, "hexcode": "#000000"}},
        {1:{"name": "KEYWORD", "hCodeValue": 1, "hexcode": "#7f0055"}},
        {2:{"name": "LITERAL", "hCodeValue": 2, "hexcode": "#1f7199"}}, #ye
        {3:{"name": "CHAR_STRING_LITERAL", "hCodeValue": 3, "hexcode": "#006400"}},
        {4:{"name": "COMMENT", "hCodeValue": 4, "hexcode": "#888888"}},# yes
        {5:{"name": "CLASS_DECLARATOR", "hCodeValue": 5, "hexcode": "#880000"}}, #yes
        {6:{"name": "FUNCTION_DECLARATOR", "hCodeValue": 6, "hexcode": "#880000"}}, #yes
        {7:{"name": "VARIABLE_DECLARATOR", "hCodeValue": 7, "hexcode": "#000000"}}, #yes
        {8:{"name": "TYPE_IDENTIFIER", "hCodeValue": 8, "hexcode": "##1f7199"}},
        {9:{"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9, "hexcode": "#ffcd01"}},
        {10:{"name": "FIELD_IDENTIFIER", "hCodeValue": 10, "hexcode": "#ffcd01"}},
        {11:{"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11, "hexcode": "#1f7199"} }#yes
    ]


    def colorizer(packet, mode):
        if mode == "classic":
            return {"hexcode": classic[packet['hCodeValue']]['hexcode']}
        if mode == "dracula":
            pass
        if mode == "dark":
            pass

    @app.route("/color-scheme", methods=["GET"])
    @app.errorhandler(werkzeug.exceptions.BadRequest)
    def colorize():
        mode = request.args.get("mode")
        try:
            content = request.json
            print(content)
        except werkzeug.exceptions.BadRequest:
            return 'Not correct format!', 400
        if type(content) != list:
            return 'Not list format!', 400
        if not all([isinstance(item, dict) for item in content]):
            return 'Not correct format!', 400
        #result = map(colorizer, content, mode)
        print(content[0])
        return 'Not a valid mode! Try "classic", "dracula" or "dark', 406


    return app


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3030))
    app = create_app()
    app.run(
        debug=(os.getenv("FLASK_DEBUG", "True") == "True"), host="0.0.0.0", port=port
    )
