import app
import mock
import unittest

class FlaskTest(unittest.TestCase):

    # Mocking the helper method
    app.getLexing = mock.Mock(return_value="mocked stuff")

    def test_predict(self):
        return True




