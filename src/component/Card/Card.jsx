import React from 'react'

const Card = ({ selectedDate, weatherList }) => {



    return (
        <>
            {
                weatherList?.map((ele, index) => (
                    (ele.dt_txt.split(" ")[0] == selectedDate) ? (
                        <div key={index} className="card">
                            <div className="time">
                                <h3>Time : {ele.dt_txt.split(" ")[1]}</h3>

                            </div>
                            <div className="content">
                                <div className="temperature">
                                    <div className="temp">
                                        <p>Temp. : {ele.main.temp}°C</p>
                                        <p>Apparent : {ele.main.feels_like}°C</p>
                                    </div>
                                    <div className="others">
                                        <p>pressure : {ele.main.pressure}Pa</p>
                                        <p>Humidity : {ele.main.humidity}%</p>
                                    </div>
                                    <div className="wind">
                                        <p>wind Speed : {ele.wind.speed}</p>
                                    </div>
                                    <div className="desc">
                                        <div className="i">
                                            <img  src={`https://openweathermap.org/img/wn/${ele.weather[0].icon}@2x.png`}  alt="" />
                                        </div>
                                        <div className="comment">
                                            <p>{ele.weather[0].description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ) : ""
                ))
            }
        </>
    )
}

export default Card