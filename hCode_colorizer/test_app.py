import pytest
from app import create_app


@pytest.fixture()
def app():
    app = create_app()
    yield app


@pytest.fixture()
def client(app):
    return app.test_client()


# Basic Test for color scheme
def test_color_scheme(client):
    response = client.get(
        '/color-scheme',
        query_string=dict(mode='default')
    )
    assert response.status_code == 200


# Should throw error if invalid mode is chosen
def test_color_scheme_bad_request(client):
    response = client.get(
        '/color-scheme',
        query_string=dict(mode='invalid_mode')
    )
    assert response.status_code == 406
