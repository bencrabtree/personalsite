'use strict';
const ClientEvents = require('../events/clientEvents');
const { addSong, getFavorited } = require('../database');

class TestService {

    emailHook(body) {
        return body;
    }

    spotifyHook(details) {
        addSong(details, () => {});
        ClientEvents.addSong(details);
        return details;
    }

    getSpotifyFavorited(callback) {
        getFavorited(allFavorited => {
            callback(allFavorited);
        })
    }

    processCovidData(data) {
        let dataframes = data.split("}\n{");
        dataframes = dataframes.map(df => {
            df = df.replace(/\\/g, '')
            df = df.replace(/'/g, `"`)
            df = df.replace(/"{"/g, '{"')
            df = df.replace(/}}"/g, '}')
            return df;
        })

        let results = dataframes.join('},{');

        return results;
    }
}

let testService = new TestService();
module.exports = testService;
