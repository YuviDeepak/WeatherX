import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import "./Map.css";

// 🔁 Move map smoothly
function ChangeMap({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    if (lat && lon) {
      map.flyTo([lat, lon], 10, { duration: 1.5 });
    }
  }, [lat, lon, map]);

  return null;
}

const Map = ({ selectedCity, weather }) => {
  const [selectedDate, setSelectedDate] = useState("");

  const lat = weather?.city?.coord?.lat;
  const lon = weather?.city?.coord?.lon;

  // ✅ Get unique 5 days (optimized)
  const uniqueDays = useMemo(() => {
    if (!weather?.list) return [];

    const dates = [];
    const seen = new Set();

    weather.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!seen.has(date)) {
        seen.add(date);
        dates.push(date);
      }
    });

    return dates.slice(0, 5);
  }, [weather]);

  // ✅ Default select first day
  useEffect(() => {
    if (uniqueDays.length > 0) {
      setSelectedDate(uniqueDays[0]);
    }
  }, [uniqueDays]);

  // ✅ Filter data
  const filteredData = useMemo(() => {
    if (!selectedDate) return [];
    return weather?.list?.filter((item) =>
      item.dt_txt.startsWith(selectedDate)
    );
  }, [weather, selectedDate]);

  if (!lat || !lon) return <p className="loading">Loading map...</p>;

  return (
    <div className="mapWrapper">

      {/* 📅 SELECT */}
      <div className="selectBox">
        <label>Select Date:</label>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {uniqueDays.map((date, i) => (
            <option key={i} value={date}>
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
      <MapContainer center={[lat, lon]} zoom={10} className="mapContainer">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[lat, lon]}>
          <Popup>
            <h3>{selectedCity}</h3>
            <p>{selectedDate}</p>
          </Popup>
        </Marker>

        <ChangeMap lat={lat} lon={lon} />
      </MapContainer>

      {/* 🌦 CARDS */}
      <div className="weatherCards">
        {filteredData.length > 0 ? (
          filteredData.map((item, i) => (
            <div key={i} className="card">
              <h4>
                {new Date(item.dt_txt).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h4>

              <p>🌡 {item.main.temp}°C</p>
              <p>☁️ {item.weather[0].description}</p>
              <p>💧 {item.main.humidity}%</p>
              <p>🌬 {item.wind.speed} m/s</p>
            </div>
          ))
        ) : (
          <p className="noData">No data available</p>
        )}
      </div>
    </div>
  );
};

export default Map;