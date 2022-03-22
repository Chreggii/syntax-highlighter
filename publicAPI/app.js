var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require('axios');

const runAsync =  (callback) => {
    return function (req, res, next) {
        callback(req, res, next)
            .catch(next)
    }
}

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send("Hi from the public API"));


// Another demo enpoint
app.get('/highlight-text', runAsync(async (req, res) => {

  const source_text = req.query.source_text;
  const language = req.query.language;

  const language_options = ["python", "kotlin", "java"];

  if (!source_text){
    res.status(400).send({message: "source_text parameter is required!"});
  }

  if(!language){
    res.status(400).send({message: "language parameter required!"});
  }


  if(language_options.indexOf(language) === -1){
    res.status(400).send({message: "language parameter should be either 'python', 'kotlin' or 'java'!"});
  }

  // Make request through internal network
  const reponse = await axios.get('http://localhost:8080/');
  res.send("The following data was received from the Formal Syntax Highlighter:\n\n" + reponse.data + ".\n The text is: " + source_text + "The language is: " + language)
}));




module.exports = app;
