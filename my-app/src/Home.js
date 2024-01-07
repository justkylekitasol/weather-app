import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";
const Home = () => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const goToWeatherPage = () => {
    navigate(`/weather/${city}`);
  };
  const username = useSelector((state) => state.user.value.username);
  const url = useSelector((state) => state.user.value.url);
  useEffect(() => {
    if(localStorage.getItem("accessToken")){
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
