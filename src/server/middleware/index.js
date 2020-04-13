const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');

const middleware = (app) => {
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.text())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, '../public')));
    console.log(path.join(__dirname, '../src/client/index.html'))
}

exports.middleware = middleware;
