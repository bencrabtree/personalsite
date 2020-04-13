const { testService } = require('../services/');

const emailHook = async (req, res) => {
    try {
        await res.status(200).send(await testService.emailHook(req.body));
    } catch (err) {
        console.log('EmailHookErr:', err)
    }
};

const spotifyHook = async (req, res) => {
    try {
        await res.status(200).send(await testService.spotifyHook(req.body))
    } catch (err) {
        console.log('SpotifyHookErr:', err);
    }
};

const getSpotifyFavorited = async (req, res) => {
    try {
        await testService.getSpotifyFavorited(async result => {
            await res.status(200).send(result)
        });
    } catch (err) {
        console.log('GetSpotifyFavoritedErr:', err);
    }
}

const getCovidData = async (req, res) => {
    const spawn = require("child_process").spawn
    const process = spawn('python', ['./src/server/services/covidPlot.py']);

    try {
        let result = ""
        process.stdout.on('data', data => {
            result += data.toString()
        })

        process.on('close', code => {
            console.log(`child process exited with code ${code}`);
            res.status(200).send(testService.processCovidData(result))
        })

    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    emailHook,
    spotifyHook,
    getSpotifyFavorited,
    getCovidData
};
