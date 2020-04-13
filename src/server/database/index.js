const sqlite3 = require('sqlite3').verbose();
const util = require('util');

const initDb = () => {
    const db = new sqlite3.Database('./src/server/database/spotify.db');

    db.run(`CREATE TABLE IF NOT EXISTS favorited (track TEXT, artist TEXT, album TEXT, url TEXT)`);

    db.close();
}

const addSong = (details, callback) => {
    const db = new sqlite3.Database('./src/server/database/spotify.db');

    db.serialize(() => {
        db.run(`INSERT INTO favorited(track, artist, album, url) VALUES(?, ?, ?, ?)`,
            [ details.trackName, details.artistName, details.albumName, details.trackUrl ],
            err => {
                if (err) {
                    return console.log(err);
                }
                console.log(`Successfully inserted ${details.trackName} into favorited`)
            }
        );

        callback(`Added ${details.trackName} to db`)
        db.close();
    });
}

const getFavorited = callback => {
    const db = new sqlite3.Database('./src/server/database/spotify.db');

    db.serialize(() => {
        db.all("SELECT * FROM favorited", function(err, allRows) {

            if (err != null) {
                console.log(`GetFavoritedErr:`, err)
                callback(err);
            }

            callback(allRows);
            db.close();
        });
    });
}

module.exports = {
    initDb: initDb,
    addSong: addSong,
    getFavorited: getFavorited
}
