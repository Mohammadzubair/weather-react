import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

export const Weather = () => {
  const [searchValue, setSearchValue] = useState(`karachi`);
  const [apiData, setApiData] = useState({
    coord: { lon: 67.0822, lat: 24.9056 },
    weather: [{ id: 721, main: "Haze", description: "haze", icon: "50d" }],
    base: "stations",
    main: {
      temp: 306.05,
      feels_like: 311.72,
      temp_min: 306.05,
      temp_max: 306.05,
      pressure: 999,
      humidity: 58,
    },
    visibility: 5000,
    wind: { speed: 5.66, deg: 230 },
    clouds: { all: 40 },
    dt: 1631102116,
    sys: {
      type: 1,
      id: 7576,
      country: "PK",
      sunrise: 1631063718,
      sunset: 1631108632,
    },
    timezone: 18000,
    id: 1174872,
    name: "Karachi",
    cod: 200,
  });
  const getWeatherData = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=36073263ae44556d26bbdd8ba9c645d8`;
      const result = await axios.get(url);
      setApiData(result.data);
      console.log(`API Result`, result);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(`API DATA`, apiData);
  return (
    <div className="mainWeatherSection">
      <div className="searchArea">
        <input
          type="text"
          placeholder="Search by City"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <button onClick={getWeatherData}>Search</button>
      </div>
      <div className="weatherInnerSection">
        <div className="weatherIcon">
          <i className={"wi wi-day-sunny"}></i>
        </div>
        <div className="weatherCloudsWrapper">
          <div className="weatherCloud">
            <div className="temp">
              <h2>{apiData?.main?.temp}&deg;</h2>
            </div>
            <div className="country">
              <p>{apiData?.weather[0]?.main}</p>
              <p>{`${apiData?.name}, ${apiData?.sys?.country}`}</p>
            </div>
          </div>
          <div className="weatherDate">
            <h2>{new Date().toLocaleString()}</h2>
          </div>
        </div>
        <div className="weatherBottomSection">
          <div className="weatherBox">
            <i className={"wi wi-sunset"}></i>
            <p>
              {apiData?.sys?.sunset}
              <span>Sunset</span>
            </p>
          </div>
          <div className="weatherBox">
            <i className={"wi wi-humidity"}></i>
            <p>
              {apiData?.main?.humidity}
              <span>Humidity</span>
            </p>
          </div>
          <div className="weatherBox">
            <i className={"wi wi-rain"}></i>
            <p>
              {apiData?.main?.pressure}
              <span>Presure</span>
            </p>
          </div>
          <div className="weatherBox">
            <i className={"wi wi-strong-wind"}></i>
            <p>
              {apiData?.wind?.speed}
              <span>Speed</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
