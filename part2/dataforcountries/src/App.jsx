import { useState, useEffect, use } from 'react';
import axios from 'axios';
import Weather from './components/Weather';

function App() {
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [all, setAll] = useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/all`).then(response => setAll(response.data))
  }, [])
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    const filteredCountries = all.filter(country =>
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    )
    const countriesToShow = event.target.value ? filteredCountries : all
    setCountries(countriesToShow)
  }
  
  return (
    <div>
      find countries:
      <input value={search} onChange={handleSearchChange} />
      {!search ? null : countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countries.length === 0 ? <p>No Matches Found</p> 
      : countries.length === 1 ? (
        countries.map(country => (
          <div key={country.cca2}>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h3>Languages:</h3>
            <ul>
              {Object.values(country.languages).map(language => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
            <Weather capital={country.capital} />
          </div>
        ))
      ) : (
        countries.map(country => (
          <div key={country.cca2}>
            {country.name.common}
            <button onClick={() => {
              setCountries([country])
              setSearch(country.name.common)
            }}>
              show
            </button>
          </div>
        ))
      )}
      <hr />
      <h2>Data for countries</h2>
      <p>Data from <a href="https://studies.cs.helsinki.fi/restcountries/">https://studies.cs.helsinki.fi/restcountries/</a></p>
    </div>
  )
}

export default App
