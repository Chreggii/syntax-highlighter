"""

"""
import pytest
import mock
import requests

import app
from app import create_app

# Mocking the get Lexing Function
with create_app().app_context():
    DATA = [
        {"startIndex": 0, "endIndex": 4, "tokenId": 42},
        {"startIndex": 5, "endIndex": 7, "tokenId": 3},
    ]
    response = requests.Response()
    response.code = "expired"
    response.error_type = "expired"
    response.status_code = 200
    response._content = (
        b'[{ "startIndex": 0, "endIndex": 4, "tokenId": 42}, {"startIndex": 5, "endIndex": 7, '
        b'"tokenId": 3}] '
    )
    app.get_lexing = mock.Mock(return_value=response)

# Mocking the get Highlighting Function
with create_app().app_context():
    response = requests.Response()
    response.code = "expired"
    response.error_type = "expired"
    response._content = (
        b'[{"hCodeValue": 9, "startIndex": 0, "endIndex": 4, "tokenId": 42}, {"hCodeValue": 0, '
        b'"startIndex": 5, "endIndex": 5, "tokenId": 54}] '
    )
    app.get_highlight_string = mock.Mock(return_value=response)


@pytest.fixture()
def app():
    app = create_app()
    yield app


@pytest.fixture()
def client(app):
    return app.test_client()


# Basic Test for predicting
def test_predict_200(client):
    response_200 = client.get(
        "/ml-highlight", query_string=dict(text="print", type="python")
    )
    assert response_200.status_code == 200


# Should throw error if invalid language is chosen
def test_predict_bad_request(client):
    response_400 = client.get(
        "/ml-highlight", query_string=dict(text="print", type="invalid_language")
    )
    assert response_400.status_code == 400


# Basic Test for training
def test_learn_200(client):
    response_200 = client.put("/ml-train", json=dict(text="print", type="python"))
    assert response_200.status_code == 200


# Should throw error if invalid language is chosen
def test_learn_bad_request(client):
    response_400 = client.put("/ml-train", json=dict(text="print", type="invalid_language"))
    assert response_400.status_code == 400
