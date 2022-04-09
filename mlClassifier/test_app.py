import json

import pytest
import requests
import requests_mock

from flask import Flask, Response

import app
import mock
import unittest

from app import configure_routes

class FlaskTest(unittest.TestCase):

    # Mocking the helper method - Old Try
    #app.getLexing = mock.Mock(return_value=['name', 'name2'])

    # Mocks a Json Response
    data = {"name":"John", "age":30, "city":"New York"}
    data = json.dumps(data)
    response = app.app.response_class(response=data, mimetype='application/json')
    app.getLexing = mock.Mock(return_value=response)

    # Todo Currently we get an internal server error -> For some reason the fsh_response = formal_syntax_highlighter.json() is unable to get the correct json
    def test_predict(client):
        app = Flask(__name__)
        configure_routes(app)
        client = app.test_client()
        url = "/ml-highlight/"
        response = client.get(
            '/ml-highlight',
            query_string=dict(text='print("Hello World)', type='python')
        )
        assert response.status_code == 200


