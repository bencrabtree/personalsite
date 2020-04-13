'use strict';
const express = require('express');
const middleware = require('./middleware').middleware;
const routes = require('./routes').routes;

const app = (settings, session) => {
    let server = express();
    server.use(session);
    middleware(server);
    routes(server, settings);
    return server;
}

module.exports = app;
