import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Weather = () => {
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getWeatherData = async () => {    //gets weather data from API
      try {
        const apiKey = '0c3da92fdfefca69903592f2b8f29a7a';
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`
        );

        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    getWeatherData();

    // Get the current date when the component mounts
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
  
    setCurrentDate(formattedDate);

    if(localStorage.getItem("accessToken")){    //if localstorage has accesstoken, proceed, else go to landing page
        console.log("ok")
    }else {
        navigate(`/`);
    }
  }, [city]);

  const goBack = () => {    // Use the navigate function to go back to the previous page
    navigate(-1);
  };

  return (
    <div className='weather'>
      <h1>Weather in {city}</h1>
      {weatherData && (
        <div className='table-container'>
            <table className="centered-table">
                <thead>
                    <tr>
                    <th>
                        <span>Date</span><br></br>
                        <span>(mm/dd/yyyy)</span>
                    </th>
                    <th>
                        <p>Temp</p>
                    </th>
                    <th className='mobile-none'>
                        <p>Description</p>
                    </th>
                    <th className='mobile-none'>
                        <p>Main</p>
                    </th>
                    <th className='mobile-none'>
                        <p>Pressure</p>
                    </th>
                    <th className='mobile-none'>
                        <p>Humidity</p>
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{currentDate}</td>
                        <td>{weatherData.main.temp}</td>
                        <td className='mobile-none'>{weatherData.weather[0].description}</td>
                        <td className='mobile-none'>{weatherData.weather[0].main}</td>
                        <td className='mobile-none'>{weatherData.main.pressure}</td>
                        <td className='mobile-none'>{weatherData.main.humidity}</td>
                    </tr>
                </tbody>
            </table>
        </div>
      )}
      <button onClick={goBack}>Go Back</button>
    </div>
  );
};

export default Weather;
