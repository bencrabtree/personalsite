const express = require('express');
const http = require('http');
const app = require('./app');
const { initDb } = require('./database');
const settings = require('./config/settings.json');

const run = () => {
    let _session = express({});
    const _app = app(settings, _session);
    let server = http.createServer(_app);
    initDb();

    server.listen(settings.port, () => {
        console.log(`\nrunning on port: ${settings.port}`);
        console.log(`----------------------------------------\n`);
    });
}

run();
