'use strict';
let sseChannel = require('sse-channel');
let ClientChannel = new sseChannel({ jsonEncode: true });

const addSong = (details) => {
    console.log('sending:', details)
    ClientChannel.send({
        event: 'addSong',
        data: details
    })
}

const addClient = (req, res) => {
    ClientChannel.addClient(req, res);
    console.log('Added Client');
}

module.exports = {
    addSong,
    addClient
};
