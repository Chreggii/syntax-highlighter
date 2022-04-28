"""
Tests for the mlClassifier
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
    RESPONSE = requests.Response()
    RESPONSE.code = "expired"
    RESPONSE.error_type = "expired"
    RESPONSE.status_code = 200
    RESPONSE._content = (
        b'[{ "startIndex": 0, "endIndex": 4, "tokenId": 42}, {"startIndex": 5, "endIndex": 7, '
        b'"tokenId": 3}] '
    )
    app.get_lexing = mock.Mock(return_value=RESPONSE)

# Mocking the get Highlighting Function
with create_app().app_context():
    RESPONSE = requests.Response()
    RESPONSE.code = "expired"
    RESPONSE.error_type = "expired"
    RESPONSE._content = (
        b'[{"hCodeValue": 9, "startIndex": 0, "endIndex": 4, "tokenId": 42}, {"hCodeValue": 0, '
        b'"startIndex": 5, "endIndex": 5, "tokenId": 54}] '
    )
    app.get_highlight_string = mock.Mock(return_value=RESPONSE)


@pytest.fixture()
def get_app():
    """gets the app"""
    created_app = create_app()
    yield created_app


@pytest.fixture()
def test_client(flask_app):
    """gets the test client"""
    return flask_app.test_client()


def test_predict_200(client):
    """Basic Test for predicting"""
    response_200 = client.get(
        "/ml-highlight", query_string=dict(text="print", type="python")
    )
    assert response_200.status_code == 200


def test_predict_bad_request(client):
    """Should throw error if invalid language is chosen"""
    response_400 = client.get(
        "/ml-highlight", query_string=dict(text="print", type="invalid_language")
    )
    assert response_400.status_code == 400


def test_learn_200(client):
    """Basic Test for training"""
    response_200 = client.put("/ml-train", json=dict(text="print", type="python"))
    assert response_200.status_code == 200


def test_learn_bad_request(client):
    """Should throw error if invalid language is chosen"""
    response_400 = client.put(
        "/ml-train", json=dict(text="print", type="invalid_language")
    )
    assert response_400.status_code == 400
