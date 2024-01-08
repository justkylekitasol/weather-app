import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";
const Home = () => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.value.username); //redux getters
  const url = useSelector((state) => state.user.value.url); //redux getters

  const goToWeatherPage = () => { //function to get city then navigate to weather page after button click
    navigate(`/weather/${city}`);
  };
  
  useEffect(() => {
    if(localStorage.getItem("accessToken")){ //if localstorage has accesstoken, proceed, else go to landing page
        console.log("ok")
    }else {
        navigate(`/`);
    }
  }, []);

  return (
    <div className='home'>
      
      {localStorage.getItem("accessToken") ?
        <>
            <h1>{username}</h1>
            <h1>{url}</h1>
            <p>
            <label><input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='City'
                />
                
            </label>
            </p>
            <button onClick={goToWeatherPage}>Display Weather</button>
        </>
        : <>
        <p>You are not logged in</p>
        </>
        }
    </div>
  );
};

export default Home;
