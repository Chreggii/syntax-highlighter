import json
from flask import Flask, jsonify

import app
import mock
import unittest

from app import configure_routes

class FlaskTest(unittest.TestCase):

    # Mocking the get Lexing Function
    with app.app.app_context():
        data = [{"startIndex":0,"endIndex":4,"tokenId":42},{"startIndex":5,"endIndex":7,"tokenId":3}]
        response = jsonify(data)
        app.getLexing = mock.Mock(return_value=jsonify(data))

    #Basic Test
    def test_predict(client):
        app = Flask(__name__)
        configure_routes(app)
        client = app.test_client()
        response = client.get(
            '/ml-highlight',
            query_string=dict(text='print', type='python')
        )
        assert response.status_code == 200


