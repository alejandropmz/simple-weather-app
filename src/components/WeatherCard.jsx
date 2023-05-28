import React, { useState } from "react";

export const WeatherCard = ({ weather, temperatures }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const handleTemp = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <article className="card__container">
      <h1>Weather app</h1>
      <h3>
        {weather?.name}, {weather?.sys.country}
      </h3>
      <div className="weather__info">
        <div className="temp__cloud">
          <img
            src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
            alt=""
          />
          <p className="temp__num">
            {isCelsius ? temperatures?.celsius : temperatures?.farhenheit}°
            {isCelsius ? "C" : "F"}
          </p>
          <button className="change__button" onClick={handleTemp}>
            Change <i className="bx bx-loader"></i>
          </button>
        </div>
        <div className="temp__info">
          <p className="temp__desc">"{weather?.weather[0].description}"</p>
          <div className="weather__spc">
            <p className="wind__speed">
              <i className="bx bx-wind"></i> Wind Speed: {weather?.wind.speed}
              m/s
            </p>
            <p className="clouds">
              <i className="bx bx-cloud"></i> Clouds: {weather?.clouds.all}%
            </p>
            <p className="pressure">
              <i className="bx bxs-thermometer"></i> Pressure: {weather?.main.pressure}mb
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
