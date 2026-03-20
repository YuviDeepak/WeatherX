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
  const cities = ["Tiruchirappalli", "Chennai", "Madurai", "Coimbatore", "Tirunelveli", "Kanyakumari", "Kodaikanal", "Udhagamandalam", "Puducherry"];
  const [weather, setWeather] = useState([])
  const [selectedCity, setSelectedCity] = useState("Tiruchirappalli")
  useEffect(() => {
    let getWeather = async () => {
      let weatherApi = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=991bc706fd859770a841f08b584b5682&units=metric`)
      
      setWeather(weatherApi.data)
    }
    getWeather()
  }, [selectedCity])
  
  console.log("weather",weather);
  console.log("selectedCity",selectedCity);


  return (
    <>
    <Header/>
      <Select setSelectedCity={setSelectedCity} />
      <CardGrid selectedCity={selectedCity} setSelectedCity={setSelectedCity} weather={weather} />
    </>
  )
}

export default App
