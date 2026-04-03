import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Select from './component/Select/Select';
import './component/Select/Select.css'
import Card from './component/Card/Card';
import './component/Card/Card.css'
import CardGrid from './component/CardGrid/CardGrid';
import './component/CardGrid/CardGrid.css'
import Header from './component/Header/Header';
import './component/Header/Header.css'

function App() {
  const [all, setAll] = useState([])
  const [country, setCountry] = useState({})
  const [weather, setWeather] = useState([])

  useEffect(() => {
    let getCountry = async () => {
      let fullCountry = await axios("https://countriesnow.space/api/v0.1/countries")
      setAll(fullCountry.data.data)
    }
    getCountry()

  }, [])
  useEffect(() => {
    let countryArray = all.reduce((acc, item) => {
      if (!acc[item.country]) {
        acc[item.country] = [];
      }

      acc[item.country].push(...item.cities);

      return acc;
    }, {});
    setCountry(countryArray)
  }, [all])

  const [selectedCity, setSelectedCity] = useState("Chennai")
  const [sc, setSc] = useState("India")

  // useEffect(() => {
  //   if (Object.keys(country).length > 0) {
  //     if (country["India"]?.length > 0) {
  //       setSc("India")
  //       setSelectedCity("Chennai")
  //     } else {
  //       const firstCountry = Object.keys(country)[0]
  //       setSc(firstCountry)
  //       setSelectedCity(country[firstCountry][0])
  //     }
  //   }
  // }, [country])


  useEffect(() => {
    if (!selectedCity) return
    let getWeather = async () => {
      let weatherApi = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=991bc706fd859770a841f08b584b5682&units=metric`)
      setWeather(weatherApi.data)
    }
    getWeather()
    console.log(sc);
    console.log(selectedCity);
    
  }, [selectedCity])

  
  

  return (
    <>
      <Header />
      <Select setSelectedCity={setSelectedCity} selectedCity={selectedCity} country={country} sc={sc} setSc={setSc} />
      <CardGrid selectedCity={selectedCity} setSelectedCity={setSelectedCity} weather={weather} />
    </>
  )
}

export default App
