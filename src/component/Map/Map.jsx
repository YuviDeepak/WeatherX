import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "./Map.css";

// Auto move map
function ChangeMap({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], 10);
    }
  }, [lat, lon, map]);

  return null;
}

const Map = ({ selectedCity, weather }) => {
  const [selectedDate, setSelectedDate] = useState("");

  const lat = weather?.city?.coord?.lat;
  const lon = weather?.city?.coord?.lon;

  // ✅ Get unique 5 days
  let uniqueDays =
    weather?.list?.reduce((acc, item) => {
      const [date] = item.dt_txt.split(" ");
      if (!acc.includes(date)) acc.push(date);
      return acc;
    }, []) || [];

  // ✅ Limit to 5 days only
  uniqueDays = uniqueDays.slice(0, 5);

  // ✅ Set default selected date
  useEffect(() => {
    if (uniqueDays.length > 0 && !selectedDate) {
      setSelectedDate(uniqueDays[0]);
    }
  }, [uniqueDays, selectedDate]);

  // ✅ Filter data for selected day
  const filteredData =
    weather?.list?.filter((item) =>
      item.dt_txt.startsWith(selectedDate)
    ) || [];

  if (!lat || !lon) {
    return <p>Loading map...</p>;
  }

  return (
    <div className="mapWrapper">
      
      {/* 🔽 SELECT BOX */}
      <div className="selectBox selectBox1">
        <label htmlFor="">Select Date :</label>
        <select
        className="dateSelect"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      >
        {uniqueDays.map((date, index) => (
          <option key={index} value={date}>
            {new Date(date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              weekday: "long",
            })}
          </option>
        ))}
      </select>
      </div>

      {/* 🗺 MAP */}
      <MapContainer
        center={[lat, lon]}
        zoom={10}
        className="mapContainer"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[lat, lon]}>
          <Popup>
            <h3>{selectedCity}</h3>
            <p>{selectedDate}</p>
          </Popup>
        </Marker>

        <ChangeMap lat={lat} lon={lon} />
      </MapContainer>

      {/* 📊 WEATHER CARDS */}
      <div className="weatherCards">
        {filteredData.map((item, index) => (
          <div key={index} className="card">
            <h4>
              {new Date(item.dt_txt).toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "numeric",
              })}
            </h4>

            <p>🌡 {item.main.temp}°C</p>
            <p>☁️ {item.weather[0].description}</p>
            <p>💧 {item.main.humidity}%</p>
            <p>🌬 {item.wind.speed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map;