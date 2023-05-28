import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { WeatherCard } from "./components/WeatherCard";
import { IsLoading } from "./components/IsLoading";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temperatures, setTemperatures] = useState();

  useEffect(() => {
    const success = (position) => {
      const positionObj = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setCoords(positionObj);
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const apiKey = "fdc5f943d8f0483aa9e984f6b9aa8811";
      const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}`;
      axios
        .get(weatherApi)
        .then((res) => {
          setWeather(res.data);
          const temperatures = {
            kelvin: res.data.main.temp.toFixed(2),
            celsius: (res.data.main.temp - 273.15).toFixed(2),
            farhenheit: (((res.data.main.temp - 273.15) * 9) / 5 + 32).toFixed(
              2
            ),
          };

          setTemperatures(temperatures);
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  return (
    <>
      {!weather ? (
        <IsLoading />
      ) : (
        <WeatherCard weather={weather} temperatures={temperatures} />
      )}
    </>
  );
}

export default App;
