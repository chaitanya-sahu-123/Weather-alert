import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../Assets/search.png'
import cloud from '../Assets/cloud.png'
import clear from '../Assets/clear.png'
import drizzle from '../Assets/drizzle.png'
import humidity from '../Assets/humidity.png'
import rain from '../Assets/rain.png'
import wind from '../Assets/wind.png'
import snow from '../Assets/snow.png'

const Weather = () => {
  const [weatherData,setWeatherData]=useState(false);

  const inputRef=useRef()

  const allIcons={
    "01d":clear,
    "01n":clear,
    "02d":cloud,
    "02n":cloud,
    "03d":cloud,
    "03n":cloud,
    "04d":drizzle,
    "04n":drizzle,
    "09d":rain,
    "09n":rain,
    "10d":rain,
    "10n":rain,
    "13d":snow,
    "13n":snow,


  }
  const search=async(city)=>{
    if(city === ""){
      alert("Enter a city name");
      return;
    }
    try {
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const res=await fetch(url);
      const data=await res.json();
      if(!res.ok){
        // alert(data.message);
        return;
      }
      console.log(data);
      const icon=allIcons[data.weather[0].icon] || clear;

      setWeatherData({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temp:Math.floor(data.main.temp),
        location:data.name,
        icon:icon

      });
    } catch (error) {
      setWeatherData(false);
      console.error('error in fetching weather data ',error);
    }
  }
  useEffect(()=>{
    search();
  },[])
  return (
    <>
      <div className='weather'>
        <h1 className='head1'>Weather Alerts</h1>
        <h2 className='head'>Get the <span className='spann'>LIVE</span> weather of your city</h2>
        <div className="search">
            
            <input ref={inputRef} type='text' placeholder='Search' />
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>

        {weatherData?
        <>
            <img src={weatherData.icon} alt="" className='weather-icon' />
          <h3 className='temp'>{weatherData.temp}°C</h3>
          <h3 className='city'>{weatherData.location}</h3>
          <div className="weather-data">
          <div className="col">
              <img src={humidity} alt="" />
              <div>
                  <p>{weatherData.humidity} %</p>
                  <span>Humidity</span>
              </div>
          </div>
          <div className="col">
              <img src={humidity} alt="" />
              <div>
                  <p>{Math.floor(weatherData.windSpeed)} Km/h</p>
                  <span>Wind Speed</span>
              </div>
          </div>
          </div>
        </>:
        <>
        
        </>}
        
    </div>
    </>
  )
}

export default Weather;
