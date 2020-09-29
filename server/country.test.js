const { getCountry, getRandomCountryName, initializeCountries } = require('./country.js');

test('initializes country data', () => {
    const countryDataset = initializeCountries()
    expect(countryDataset).not.toBe(null)
    expect(countryDataset.countryDataObj).not.toBe(null)
    expect(countryDataset.countryNamesArray).not.toBe(null)
    expect(countryDataset.countryNamesArray.length).toBe(59)
});

test('gets country data', () => {
    const countryDataset = initializeCountries()
    const countryData = getCountry(countryDataset.countryDataObj, 'United States')
    expect(countryData).not.toBe(null)
    expect(countryData.name).toBe('United States')
    expect(countryData.price).toBe('4.93')
    expect(countryData.ppp).toBe('1.0')
});

test('gets random country name', () => {
    const countryDataset = initializeCountries()
    const countryName = getRandomCountryName(countryDataset.countryNamesArray, 'United States')
    expect(countryName).not.toBe(null)
    expect(countryName).not.toBe('')
    expect(countryName).not.toBe('United States')
    let found = false
    for (let countryNameIndex = 0; countryNameIndex < countryDataset.countryNamesArray.length; countryNameIndex++) {
        const name = countryDataset.countryNamesArray[countryNameIndex]
        if (name === countryName) {
            found = true
            break
        }
    }
    expect(found).toBe(true)
});