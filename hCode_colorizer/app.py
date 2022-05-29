import json

from flask import Flask, request
import os, werkzeug


def create_app():
    app = Flask(__name__)
    dark = [
        {"name": "ANY", "hCodeValue": 0, "hexcode": "#ffffff"},  # 1
        {"name": "KEYWORD", "hCodeValue": 1, "hexcode": "#ff8800"},  # 2
        {"name": "LITERAL", "hCodeValue": 2, "hexcode": "#add8e6"},
        {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3, "hexcode": "#006400"},
        {"name": "COMMENT", "hCodeValue": 4, "hexcode": "#A9A9A9"},
        {"name": "CLASS_DECLARATOR", "hCodeValue": 5, "hexcode": "#ff8800"},  # 2
        {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6, "hexcode": "#ffcd01"},  # 3
        {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7, "hexcode": "#1870d5"},
        {"name": "TYPE_IDENTIFIER", "hCodeValue": 8, "hexcode": "#ffffff"},  # 1
        {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9, "hexcode": "#ffcd01"},  # 3
        {"name": "FIELD_IDENTIFIER", "hCodeValue": 10, "hexcode": "#ffcd01"},  # 3
        {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11, "hexcode": "#ffff00"},
    ]
    dracula = [
        {"name": "ANY", "hCodeValue": 0, "hexcode": "#ffffff"},  # 1 yes
        {"name": "KEYWORD", "hCodeValue": 1, "hexcode": "#8becfd"},  # 2
        {"name": "LITERAL", "hCodeValue": 2, "hexcode": "#f1fa8c"},
        {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3, "hexcode": "#f1fa8c"},
        {"name": "COMMENT", "hCodeValue": 4, "hexcode": "#6272a4"},  # yes
        {"name": "CLASS_DECLARATOR", "hCodeValue": 5, "hexcode": "#8becfd"},  # 2
        {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6, "hexcode": "#8becfd"},  # 3
        {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7, "hexcode": "#1870d5"},
        {"name": "TYPE_IDENTIFIER", "hCodeValue": 8, "hexcode": "#ffffff"},  # 1
        {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9, "hexcode": "#8becfd"},  # 3
        {"name": "FIELD_IDENTIFIER", "hCodeValue": 10, "hexcode": "#8becfd"},  # 3
        {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11, "hexcode": "#6272a4"},
    ]
    classic = [
        {"name": "ANY", "hCodeValue": 0, "hexcode": "#000000"},
        {"name": "KEYWORD", "hCodeValue": 1, "hexcode": "#7f0055"},
        {"name": "LITERAL", "hCodeValue": 2, "hexcode": "#1f7199"},  # ye
        {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3, "hexcode": "#006400"},
        {"name": "COMMENT", "hCodeValue": 4, "hexcode": "#888888"},  # yes
        {"name": "CLASS_DECLARATOR", "hCodeValue": 5, "hexcode": "#880000"},  # yes
        {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6, "hexcode": "#880000"},  # yes
        {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7, "hexcode": "#000000"},  # yes
        {"name": "TYPE_IDENTIFIER", "hCodeValue": 8, "hexcode": "##1f7199"},
        {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9, "hexcode": "#ffcd01"},
        {"name": "FIELD_IDENTIFIER", "hCodeValue": 10, "hexcode": "#ffcd01"},
        {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11, "hexcode": "#1f7199"}  # yes
    ]

    def colorizer_html(hCodes, text, mode):
        def color_helper(hCodeValue, mode, text):
            if mode == "classic":
                return f'<span style="color: {classic[hCodeValue]["hexcode"]}">{text}</span>'
            if mode == "dracula":
                return f'<span style="color: {dracula[hCodeValue]["hexcode"]}">{text}</span>'
            if mode == "dark":
                return (
                    f'<span style="color: {dark[hCodeValue]["hexcode"]}">{text}</span>'
                )

        span_list = []
        for idx, string in enumerate(text):
            if string == "\n":
                continue
            if string == "\r":
                span_list.append(color_helper(0, mode, text[idx : idx + 2]))
                continue
            hcode = 0
            for i in hCodes:
                if i["startIndex"] <= idx and idx <= i["endIndex"]:
                    hcode = i["hCodeValue"]
            span_list.append(color_helper(hcode, mode, text[idx]))

        return span_list

    def colorizer(packet, mode):
        if mode == "classic":
            return {
                "hexcode": classic[packet["hCodeValue"]]["hexcode"],
                "startIndex": packet["startIndex"],
                "endIndex": packet["endIndex"],
            }
        if mode == "dracula":
            return {
                "hexcode": dracula[packet["hCodeValue"]]["hexcode"],
                "startIndex": packet["startIndex"],
                "endIndex": packet["endIndex"],
            }
        if mode == "dark":
            return {
                "hexcode": dark[packet["hCodeValue"]]["hexcode"],
                "startIndex": packet["startIndex"],
                "endIndex": packet["endIndex"],
            }

    @app.route("/color-text", methods=["POST"])
    @app.errorhandler(werkzeug.exceptions.BadRequest)
    def colorize():
        try:
            mode = request.args.get("mode")
            if mode != "classic" and mode != "dracula" and mode != "dark":
                return (
                    "Chosen mode does not exist! Please try classic, dark or dracula",
                    406,
                )
            try:
                content = request.json
            except werkzeug.exceptions.BadRequest:
                return "Please sent a Json package!", 400
            if type(content) != list:
                return "The Json is not in list format!", 400
            if not all([isinstance(item, dict) for item in content]):
                return "The list does not contain format of hCodes!", 400

            result = list(map(lambda p: colorizer(p, mode), content))
            return json.dumps(result)
        except Exception:
            return "There is something wrong with your Json or mode you have sent! Check format!", 400

    @app.route("/color-text-html", methods=["POST"])
    @app.errorhandler(werkzeug.exceptions.BadRequest)
    def colorize_html():
        try:
            mode = request.args.get("mode")
            if mode != "classic" and mode != "dracula" and mode != "dark":
                return (
                    "Chosen mode does not exist! Please try classic, dark or dracula",
                    406,
                )
            try:
                content = request.json
            except werkzeug.exceptions.BadRequest:
                return "Please sent a Json package!", 400
            if type(content) == list:
                print(type(content))
                return "The Json is in list format! Check your format", 400

            span_list = colorizer_html(content["hCodes"], content["text"], mode)

            result = "<span>" + "".join(span_list) + "</span>"
        except Exception:
            return "There is something wrong with your Json or mode you have sent. Check format!", 400
        return json.dumps(result)

    return app


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3030))
    app = create_app()
    app.run(
        debug=(os.getenv("FLASK_DEBUG", "True") == "True"), host="0.0.0.0", port=port
    )
