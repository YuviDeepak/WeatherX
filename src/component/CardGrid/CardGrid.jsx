import React, { useEffect, useState } from 'react'
import Card from '../Card/Card';

const CardGrid = ({ weather }) => {

  const [selectedDate, setSelectedDate] = useState("");

  let uniqueDays = weather?.list?.reduce((acc, item) => {

    const [date] = item.dt_txt.split(" ");

    if (!acc.includes(date)) {
      acc.push(date);
    }

    return acc;

  }, []) || [];

  useEffect(() => {
    if (uniqueDays.length > 0 && !selectedDate) {
      setSelectedDate(uniqueDays[0]);
    }
  }, [uniqueDays, selectedDate]);




  return (
    <>
      <div className="se">
        <h1>Select Day :</h1>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
      
      {uniqueDays.map((e, index) => (
        <option key={index} value={e}>
          {new Date(e).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            weekday: "long"
          })}
        </option>
      ))}
    </select >
    </div>
      <div className="cardGrid">

        <Card selectedDate={selectedDate} weatherList={weather.list} />
      </div>
    </>
  );
};

export default CardGrid;