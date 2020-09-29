import React, { useEffect, useState }  from 'react';
import './App.css';
const axios = require('axios').default;

function App() {
  // State
  const [country, setCountry] = useState('Unknown');
  const [countryInfo, setCountryInfo] = useState({});
  const [currency, setCurrency] = useState(0);

  // Calculations
  const calcBigMacs = (currency, localPrice, otherDollarPrice) => {
    const result = (currency / localPrice) * (localPrice / otherDollarPrice)
    return Math.floor(result)
  }

  // Fetch
  const getPurchaseInfo = async (puchaseCountry) => {
    const url = `/purchase?country=${puchaseCountry}`

    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      console.log(error);
    }
  }

  // Lifecycle
  useEffect(() => {
    const getCountry = async () => {
      const url = '/country'

      try {
          const response = await axios.get(url)
          setCountry(response.data.country)
      } catch (error) {
          console.log(error);
      }
    }
    getCountry()
  }, [country]);

  // Events
  let handleChange = (event) => {
    setCurrency(event.target.value)
  }

  let handleSubmit = async (event) => {
    event.preventDefault();
    if (!country || country === 'undefined') {
      return
    }
    let response = await getPurchaseInfo(country)
    setCountryInfo(response)
  }

  // Render
  const MiddlePanelContent = () => {
    if (countryInfo && countryInfo.country) {
      const bigMacCount = calcBigMacs(currency, countryInfo.country.price, countryInfo.country.price)
      return (
        <div>
          <div>You could buy {bigMacCount} Big Macs in your country</div>
          <div>Your Dollar Purchasing Parity (PPP) is {countryInfo.country.ppp}</div>
        </div>
      )
    } else {
      return (
        <div> </div>
      )
    }
  }

  const BottomPanelContent = () => {
    if (countryInfo && countryInfo.country && countryInfo.randomCountry) {
      const worth = countryInfo.country.price / countryInfo.randomCountry.price
      const bigMacCount = calcBigMacs(currency, countryInfo.country.price, countryInfo.randomCountry.price)
      return (
        <div>
          <div>You could buy {bigMacCount} Big Macs in {countryInfo.randomCountry.name}</div>
          <div>Your {currency} is worth about {worth.toFixed(2)} in {countryInfo.randomCountry.name}</div>
        </div>
      )
    } else {
      return (
        <div> </div>
      )
    }
  }

  return (
    <div className="App">
      <div className="TopPanel">
        <form className="Form" onSubmit={handleSubmit}>
          <div className="TextInputColumn">
            <div className="Country">You are in {country}</div>
            <label htmlFor="name">Please enter an amount of money in your local currency: </label>
            <input
              id="name"
              type="text"
              value={currency}
              onChange={handleChange}
            />
          </div>
          <button className="Button" type="submit">Submit</button>
        </form>
        <div>{currency}</div>
      </div>
      <div className="MiddlePanel"> 
        <MiddlePanelContent></MiddlePanelContent>
      </div>
      <div className="BottomPanel"> 
        <BottomPanelContent></BottomPanelContent>
      </div>
    </div>
  );
}

export default App;
