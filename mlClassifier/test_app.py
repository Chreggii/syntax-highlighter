from flask import Flask, jsonify
import app
import mock
import unittest
from app import configure_routes

class FlaskTest(unittest.TestCase):

    # Mocking the get Lexing Function
    with app.app.app_context():
        data = [{"startIndex": 0, "endIndex": 4, "tokenId": 42}, {"startIndex": 5, "endIndex": 7, "tokenId": 3}]
        response = jsonify(data)
        app.getLexing = mock.Mock(return_value=jsonify(data))

    # Mocking the get Highlighting Function
    with app.app.app_context():
        data = [{"hCodeValue": 9, "startIndex": 0, "endIndex": 4, "tokenId": 42}, {"hCodeValue": 0, "startIndex": 5, "endIndex": 5, "tokenId": 54}]
        response = jsonify(data)
        app.getHighlightString = mock.Mock(return_value=jsonify(data))

    #Basic Test for predicting
    def test_predict_200(client):
        app = Flask(__name__)
        configure_routes(app)
        client = app.test_client()
        response = client.get(
            '/ml-highlight',
            query_string=dict(text='print', type='python')
        )
        assert response.status_code == 200

    # Should throw error if invalid language is chosen
    def test_predict_bad_request(client):
        app = Flask(__name__)
        configure_routes(app)
        client = app.test_client()
        response = client.get(
            '/ml-highlight',
            query_string=dict(text='print', type='invalid_language')
        )
        assert response.status_code == 400

    # Basic Test for training
    def test_learn_200(client):
        app = Flask(__name__)
        configure_routes(app)
        client = app.test_client()
        response = client.put(
            '/ml-train',
            query_string=dict(text='print', type='python')
        )
        assert response.status_code == 200

    # Should throw error if invalid language is chosen
    def test_learn_bad_request(client):
        app = Flask(__name__)
        configure_routes(app)
        client = app.test_client()
        response = client.put(
            '/ml-train',
            query_string=dict(text='print', type='invalid_language')
        )
        assert response.status_code == 400



