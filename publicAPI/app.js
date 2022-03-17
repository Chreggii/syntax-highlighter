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

// Demo endpoint
app.get('/ml-endpoint', runAsync(async (req, res) => {
    // Make request through internal network
    const reponse = await axios.get('http://mlclassifier:3000/');
    res.send("The followind data was received from the ML classifier:\n\n" + reponse.data)
}));

// Another demo enpoint
app.get('/fsh-endpoint', runAsync(async (req, res) => {
    // Make request through internal network
    const reponse = await axios.get('http://formalSyntaxHighlighter:8080/');
    res.send("The followind data was received from the Formal Syntax Highlighter:\n\n" + reponse.data)
}));

module.exports = app;
