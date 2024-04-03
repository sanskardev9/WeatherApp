import React, { useState } from "react";
import './Weather.css'

const api = {
    key: "9666678a8c0cc7872df5357acc46d035",
    base:"https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (event)=>{
    if(event.key === "Enter"){
        fetch(`${api.base}weather?q=${query.toLowerCase()}&units=metric&appid=${api.key}`)
        .then(res=>res.json())
        .then(result=>{
            setWeather(result);
            setQuery('');
            console.log(result);
        })
    }
  }

  const dateBuilder = (d) => {

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
      const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
      ];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      
      return `${day} ${date} ${month} ${year}`;
      
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp >16) ? 'app-warm' : 'app'): 'app'}>
      <main>
        <div className="search">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.main != "undefined")?(
            <div className="location-box">
            {weather.name && (
                    <>
                    <div className="location">
                    {weather.name}{weather.sys && `,${weather.sys.country}`}
                    </div>
                    <div className="date">
                        {dateBuilder(new Date())}
                    </div>
                    </>
                )}
                
                <div className="weather-box">
                    <div className="temp">
                        {Math.round(weather.main.temp)}°C
                    </div>
                    <div className="weather">
                        {weather.weather[0].main}
                    </div>
                </div>
        </div>
        ):('')}

        
      </main>
    </div>
  );
};

export default Weather;
