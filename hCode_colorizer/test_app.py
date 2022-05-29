"""
Tests for the hCode_colorizer
"""
import pytest
from app import create_app


@pytest.fixture()
def app():
    """gets the app"""
    created_app = create_app()
    yield created_app


@pytest.fixture()
def client(app):
    """gets the test client"""
    return app.test_client()


# Basic Test for color scheme
def test_color_text_html_classic(client):
    """Tests the classic mode"""
    response = client.post(
        '/color-text-html',
        query_string=dict(mode='classic'), json={"hCodes": [{
            "hCodeValue": 4,
            "startIndex": 0,
            "endIndex": 0,
            "tokenId": 42
        },
            {
                "hCodeValue": 5,
                "startIndex": 1,
                "endIndex": 1,
                "tokenId": 42
            }], "text": "ta"
        }
    )
    # assert response.text == '"<span><span style=\\"color: #888888\\">t</span><span style=\\"color: #880000\\">a</span></span>"'
    assert response.status_code == 200


def test_color_text_html_dracula(client):
    """Tests the dracula mode"""
    response = client.post(
        '/color-text-html',
        query_string=dict(mode='dracula'), json={"hCodes": [{
            "hCodeValue": 4,
            "startIndex": 0,
            "endIndex": 0,
            "tokenId": 42
        },
            {
                "hCodeValue": 5,
                "startIndex": 1,
                "endIndex": 1,
                "tokenId": 42
            }], "text": "ta"
        }
    )
    # '"<span><span style=\\"color: #6272a4\\">t</span><span style=\\"color: #8becfd\">a</span></span>"'
    assert response.status_code == 200


def test_color_text_html_dark(client):
    """Tests the dark mode"""
    response = client.post(
        '/color-text-html',
        query_string=dict(mode='dark'), json={"hCodes": [{
            "hCodeValue": 4,
            "startIndex": 0,
            "endIndex": 0,
            "tokenId": 42
        },
            {
                "hCodeValue": 5,
                "startIndex": 1,
                "endIndex": 1,
                "tokenId": 42
            }], "text": "ta"
        }
    )
    # '"<span><span style=\\"color: #A9A9A9\\">t</span><span style=\\"color: #ff8800\\">a</span></span>"'
    assert response.status_code == 200

def test_color_text_html_wrong_content(client):
    """Tests sending wrong content"""
    response = client.post(
        '/color-text-html',
        query_string=dict(mode='dark'), json={"hCodes": [{
            "tokenId": 42
        },
            {
                "tokenId": 42
            }], "text": "ta"
        }
    )
    # '"<span><span style=\\"color: #A9A9A9\\">t</span><span style=\\"color: #ff8800\\">a</span></span>"'
    assert response.status_code == 400

def test_color_text_html_wrong_mode(client):
    """Tests any mode"""
    response = client.post(
        '/color-text-html',
        query_string=dict(mode='something'), json={"hCodes": [{
            "hCodeValue": 4,
            "startIndex": 0,
            "endIndex": 0,
            "tokenId": 42
        },
            {
                "hCodeValue": 5,
                "startIndex": 1,
                "endIndex": 1,
                "tokenId": 42
            }], "text": "ta"
        }
    )
    assert response.status_code == 406

# Should throw error if invalid mode is chosen

def test_color_text_classic(client):
    """Tests classic mode"""
    response = client.post(
        '/color-text',
        query_string=dict(mode='classic'), json=[{
            "hCodeValue": 0,
            "startIndex": 0,
            "endIndex": 1,
            "tokenId": 42
        },
            {
                "hCodeValue": 0,
                "startIndex": 2,
                "endIndex": 3,
                "tokenId": 42
            }
        ]
    )
    assert response.status_code == 200


def test_color_text_dark(client):
    """Tests dark mode"""
    response = client.post(
        '/color-text',
        query_string=dict(mode='dark'), json=[{
            "hCodeValue": 0,
            "startIndex": 0,
            "endIndex": 1,
            "tokenId": 42
        },
            {
                "hCodeValue": 0,
                "startIndex": 2,
                "endIndex": 3,
                "tokenId": 42
            }
        ]
    )
    assert response.status_code == 200


def test_color_text_dracula(client):
    """Tests dracula mode"""
    response = client.post(
        '/color-text',
        query_string=dict(mode='dracula'), json=[{
            "hCodeValue": 0,
            "startIndex": 0,
            "endIndex": 1,
            "tokenId": 42
        },
            {
                "hCodeValue": 0,
                "startIndex": 2,
                "endIndex": 3,
                "tokenId": 42
            }
        ]
    )
    assert response.status_code == 200


def test_color_text_wrong_mode(client):
    """Tests any mode"""
    response = client.post(
        '/color-text',
        query_string=dict(mode='something'), json=[{
            "hCodeValue": 0,
            "startIndex": 0,
            "endIndex": 1,
            "tokenId": 42
        },
            {
                "hCodeValue": 0,
                "startIndex": 2,
                "endIndex": 3,
                "tokenId": 42
            }
        ]
    )
    assert response.status_code == 406

def test_color_text_wrong_content(client):
    """Tests sending wrong content"""
    response = client.post(
        '/color-text',
        query_string=dict(mode='classic'), json=[{
            "tokenId": 42
        },
            {
                "tokenId": 42
            }
        ]
    )
    assert response.status_code == 400