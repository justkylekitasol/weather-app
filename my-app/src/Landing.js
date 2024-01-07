import React from 'react';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import {login, logout} from './store.ts';
import {useDispatch} from "react-redux";

const CLIENT_ID = "2b7e4957f446b236ff57";

const Landing = () => {
    const [rerender, setRerender] = useState(false);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");
        console.log(codeParam);

        if(codeParam && (localStorage.getItem("accessToken") === null)) {
            async function getUserData() {
                await fetch("http://localhost:4000/getUserData", {
                    method: "GET",
                    headers: {
                        "Authorization" : "Bearer " + localStorage.getItem("accessToken") // Bearer ACCESS TOKEN
                    }
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    console.log(data);
                    setUserData(data);
                    dispatch(login({username: data.login,url: data.html_url,rerender,logoutFunc: logout}));
                    navigate(`/home`);
                })
            }
            async function getAccessToken() {
                await fetch("http://localhost:4000/getAccessToken?code=" +codeParam, {
                    method: "GET"
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    console.log(data);
                    if(data.access_token) {
                        localStorage.setItem("accessToken", data.access_token);
                        setRerender(!rerender);
                        getUserData();
                    }
                })
            } 
            getAccessToken();
        }
    }, []);

    function loginWithGithub() {
        window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`)
    }
    function logout() {
        localStorage.removeItem("accessToken");
        setRerender(!rerender);
    }
  return (
    <div className='landing'>
        <p>Welcome to the weather forecast web application. Please login with your Github user to use the application and view the weather in your city</p>
        <button onClick={loginWithGithub}>Login with GitHub</button>
    </div>
  );
};

export default Landing;
