const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const axios = require('axios').default;
const requestIp = require('request-ip');
const publicIp = require('public-ip');
const ip2cc = require('ip2cc');
const countrynames = require('countrynames');
const app = express();
const { getCountry, getRandomCountryName, initializeCountries } = require('./country.js');
const toTitleCase = require('./string-utils');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(requestIp.mw());

let countryData = null;
let countryNames = null;

app.get('/country', async (req,res) => {
    var ip = req.clientIp;
    if (ip === "127.0.0.1") {
        ip = await publicIp.v4()
    }
    let country = 'unknown'
    const url = `https://ipvigilante.com/json/${ip}/country_name/`

    try {
        let response = await axios.get(url)
        country = response.data.data.country_name
        res.status(200)
        res.send(JSON.stringify({ country }));
    } catch (error) {
        ip2cc.lookUp(ip, function(ip, countryResult) {
            if (countryResult) {
                const countryName = countrynames.getName(countryResult)
                country = toTitleCase(countryName)
                res.status(200)
                res.send(JSON.stringify({ country }));
                return
            } else {
                res.status(500)
                res.send('Server Error');
            }
        });
    }
});

app.get('/purchase', (req,res) => {
    const currentCountry = req.query.country || 'Unknown';

    if (currentCountry === 'Unknown') {
        res.status(400)
        res.send('Country required.');
        return
    }
    if (!countryData || !countryNames) {
        let initializedData = initializeCountries(countryData, countryNames)
        countryData = initializedData.countryDataObj
        countryNames = initializedData.countryNamesArray
        if (!countryData || !countryNames) {
            res.status(500)
            res.send('Server Error');
            return
        }
    }
    const country = getCountry(countryData, currentCountry)
    const randomCountryName = getRandomCountryName(countryNames, currentCountry)
    const randomCountry = getCountry(countryData, randomCountryName)
    const result = { country, randomCountry }

    res.status(200)
    res.send(JSON.stringify(result));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);