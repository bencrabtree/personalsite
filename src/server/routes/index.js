const Router = require('express');
const path = require('path');
const ClientEvents = require('../events/clientEvents');
const { testController } = require('../controllers/');

const routes = (app, settings) => {
    const router = Router();

    router.get('/events/spotify', (req, res) => {
        ClientEvents.addClient(req, res)
    });

    router.get('/covid/info', testController.getCovidData)

    router.post('/email', testController.emailHook);

    router.post('/spotify', testController.spotifyHook);
    router.get('/spotify/favorited', testController.getSpotifyFavorited)

    router.get('*/', (req, res) => {
        res.sendFile(path.join(__dirname, '../src/client/index.html'), (err) => {
            if (err) {
                console.log(`Routes Err:`, err)
            }
        })
    });

    app.use('/', router);
}

exports.routes = routes;
