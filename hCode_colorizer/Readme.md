# hCode Colorizer
The hCode Colorizer is a Python Flask application that acts as a microservice withing the syntax-highlighter project.
It is responsible to map the incoming hCode values to hexCodes or convert the incoming hCode values and text into html Code.
The colorizer is embedded into the docker-compose file of the syntax-highlighter project. Adjustments have to be taken in the Dockerfile and the requirements files.
Tests are written in the test_app.py file. API Specifications can be read in the Docs folder.
It can be run locally as a stand-alone service following the next steps:
## Dependencies
Before starting the application run the following command to install the dependencies:
```
pip install -r requirements.txt
```

## Run Application
To run the Flask Application run the following command:
```
python app.py
```