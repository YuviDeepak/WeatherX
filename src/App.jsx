import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {

  const cities = [
    "Tiruchirappalli",
    "Chennai",
    "Madurai",
    "Coimbatore",
    "Tirunelveli",
    "Kanyakumari",
    "Kodaikanal",
    "Udhagamandalam",
    "Puducherry"
  ];

  const [selectedCity,setSelectedCity]=useState("")

  const [data, setData] = useState([])

  useEffect(() => {
    let apiData = async () => {
      try {
        const results = await Promise.allSettled(
          cities.map(city =>
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=991bc706fd859770a841f08b584b5682&units=metric`)
          )
        )
        const realData = results
          .filter(res => res.status === "fulfilled")
          .map(res => res.value.data);
        setData(realData)
      }
      catch (err) {
        console.log("Error occured");

      }
    }
    apiData()

  }, [])

  console.log(data);

  console.log(selectedCity,"selectedcity");
  let selectedCityIndex =cities.indexOf(selectedCity)

  const selectedCityData = data[selectedCityIndex]
  console.log(selectedCityData);
  
  
  
  return (
    <>
      <select name="" id="" onChange={(e)=>setSelectedCity(e.target.value)}>
        <option value=''>Select city</option>
        
        {
          cities.map((ele,index)=>(
            <option value={ele} key={index}>{ele}</option>
          ))
          
        }
      </select>

      

      {
        selectedCityData&&(
          <div className="card">
            <h1>name : {selectedCityData.city.name}</h1>
            <h1>Sunrise : {new Date(selectedCityData.city.sunrise * 1000).toLocaleTimeString()}</h1>
            <h1>Sunset : {new Date(selectedCityData.city.sunset * 1000).toLocaleTimeString()}</h1>
            {
              selectedCityData.list.map((ele,index)=>(
                <h1>{ele.dt_txt}</h1>
              ))
            }
          </div>
        )
      }
    </>
  )
}

export default App
