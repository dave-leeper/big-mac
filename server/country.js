const fs = require('fs');

const initializeCountries = () => {
    try {
        const rawDataset = fs.readFileSync('./big-mac-index.csv').toString().split("\n");
        let countryDataObj = {}
        let countryNamesArray = []
        for (let lineIndex = 1; lineIndex < rawDataset.length; lineIndex++) {
            const line = rawDataset[lineIndex]
            const fields = line.split(',')
            countryDataObj[fields[0]] = { name: fields[0], price: fields[2], ppp: fields[5] }
            countryNamesArray.push(fields[0])
        }
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        countryNamesArray = countryNamesArray.filter(onlyUnique);
        return { countryDataObj, countryNamesArray }
    } catch (error) {
        console.log(JSON.stringify(error))
    }
}

const getRandomCountryName = (countryNames, originalCountryName) => {
    let countryName = originalCountryName
    let randomCountryName = countryName
    while (countryName === randomCountryName || randomCountryName === '') {
        randomCountryName = countryNames[Math.floor((Math.random() * countryNames.length))]
    }
    return randomCountryName
}

const getCountry = (countriesDataset, forCountry) => {
    return countriesDataset[forCountry]
}

module.exports = {
    initializeCountries,
    getRandomCountryName,
    getCountry
}