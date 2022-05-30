import json

from flask import Flask, request
import os, werkzeug


def create_app():
    """Creates the Flask App and holds all functions.

    Holds the Flask app and the different color schemes as well as the API functions.

    Returns
    -------
    App
        The Flask App with the API functions.
    """
    app = Flask(__name__)
    dark = [
        {"name": "ANY", "hCodeValue": 0, "hexcode": "#ffffff"},  # 1
        {"name": "KEYWORD", "hCodeValue": 1, "hexcode": "#ff8800"},  # 2
        {"name": "LITERAL", "hCodeValue": 2, "hexcode": "#add8e6"},
        {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3, "hexcode": "#006400"},
        {"name": "COMMENT", "hCodeValue": 4, "hexcode": "#A9A9A9"},
        {"name": "CLASS_DECLARATOR", "hCodeValue": 5, "hexcode": "#ff0404"},  # 2
        {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6, "hexcode": "#ff0404"},  # 3
        {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7, "hexcode": "#ff8800"},
        {"name": "TYPE_IDENTIFIER", "hCodeValue": 8, "hexcode": "#ffcd01"},  # 1
        {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9, "hexcode": "#ffcd01"},  # 3
        {"name": "FIELD_IDENTIFIER", "hCodeValue": 10, "hexcode": "#ffcd01"},  # 3
        {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11, "hexcode": "#ffff00"},
    ]
    dracula = [
        {"name": "ANY", "hCodeValue": 0, "hexcode": "#ffffff"},
        {"name": "KEYWORD", "hCodeValue": 1, "hexcode": "#8a0fff"},  # keyword wie def oder import
        {"name": "LITERAL", "hCodeValue": 2, "hexcode": "#f1fa8c"},  # number like 0
        {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3, "hexcode": "#ff5aac"},  # string like "hello"
        {"name": "COMMENT", "hCodeValue": 4, "hexcode": "#6272a4"},  # comment
        {"name": "CLASS_DECLARATOR", "hCodeValue": 5, "hexcode": "#ff0404"},  # klasse
        {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6, "hexcode": "#ff0404"},  # functions def
        {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7, "hexcode": "#8a0fff"},  # variable str int
        {"name": "TYPE_IDENTIFIER", "hCodeValue": 8, "hexcode": "#8becfd"},  # ?
        {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9, "hexcode": "#8becfd"},
        # 1 ange,len, abs, randint getcost (call function directly)
        {"name": "FIELD_IDENTIFIER", "hCodeValue": 10, "hexcode": "#8becfd"},
        # df.iloc oder select.value oder np.random
        {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11, "hexcode": "#a5dd23"},  # annotation @
    ]
    classic = [
        {"name": "ANY", "hCodeValue": 0, "hexcode": "#000000"},
        {"name": "KEYWORD", "hCodeValue": 1, "hexcode": "#ff0000"},  # keyword wie def oder import
        {"name": "LITERAL", "hCodeValue": 2, "hexcode": "#289bf1"},  # number like 0
        {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3, "hexcode": "#006400"},  # string like "hello"
        {"name": "COMMENT", "hCodeValue": 4, "hexcode": "#888888"},  # comment
        {"name": "CLASS_DECLARATOR", "hCodeValue": 5, "hexcode": "#fd06eb"},  # klasse
        {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6, "hexcode": "#fd06eb"},  # functions def
        {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7, "hexcode": "#ff0000"},  # variable str int
        {"name": "TYPE_IDENTIFIER", "hCodeValue": 8, "hexcode": "#ff8904"},  # ?
        {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9, "hexcode": "#ff8904"},
        # range,len, abs, randint getcost (call function directly)
        {"name": "FIELD_IDENTIFIER", "hCodeValue": 10, "hexcode": "#ff8904"},
        # df.iloc oder select.value oder np.random
        {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11, "hexcode": "#0906f9"}  # annotation @
    ]

    def colorizer_html(hCodes, text, mode) -> list:
        """Returns a list of colored html code

        This function converts hcodes, text and mode into a list of colored html code
        by coloring each string of the text according to the hcodes.

        Parameters
        ----------
        hCodes : list
        text : str
        mode : str

        Returns
        -------
        List
            Contains all html <span>'s .
        """
        def color_helper(hCodeValue, mode, text) -> str:
            """Helper function to map each text fragment to html code.

            First the chosen mode gets selected, then the corresponding hexcode of the hCodevalue forms
            together with the text the resulting <span>.

            Parameters
            ----------
            hCodeValue : int
            mode : string
            text : str

            Returns
            -------
            str
                <span> html snippet of the corresponding parameters.
            """
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
            if string == "\n" and text[idx - 1] == "\r":
                continue
            if string == "\r":
                span_list.append(color_helper(0, mode, text[idx: idx + 2]))
                continue
            hcode = 0
            for i in hCodes:
                if i["startIndex"] <= idx and idx <= i["endIndex"]:
                    hcode = i["hCodeValue"]
            span_list.append(color_helper(hcode, mode, text[idx]))

        return span_list

    def colorizer(packet, mode) -> dict:
        """Maps for each packet the hcode to the hexcode.

        For the selected mode it will map the hcode value to the hexcode.

        Parameters
        ----------
        packet : dict
        mode : str

        Returns
        -------
        dict
            Dictionary containing all packets with the changed hcode to hexcode.
        """
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
        """ Converts hCode values within packets into hexCode.

        The hCode values within the sent packets get mapped to colors.
        It will return the packets with the hCode values replaced.

        Attributes
        -------
        mode : String
        content : Json (hCodes)

        Returns
        -------
        Json
            Converted Json Packets with hexcode instead of hcode.
        """
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
        """ Converts hCode packets & text into colored html <span>'s.

        The hCode packets are analysed with the corresponding text sent.
        It is then converted into <span>'s according to the colored passage.

        Attributes
        -------
        mode : String
        content : Json (hCodes & text)

        Returns
        -------
        Json (html String)
            returns created html code from the packets & text as string.
        """
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
