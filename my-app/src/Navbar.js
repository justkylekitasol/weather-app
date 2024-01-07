import React from 'react';
import { Link } from 'react-router-dom';
import logo from './icone-de-nuage-noir.png';
import {useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file

const Navbar = () => {
    const logout = useSelector((state) => state.user.value.logoutFunc);
    const navigate = useNavigate();
    const logoutFunc = () => {
        if (logout) {
            logout();
            navigate(`/`);
          }
    }
    return (
        <nav className="navbar">
        <div className="navbar-left">
            <img src={logo} alt="Logo" className="navbar-logo" />
            <span className="navbar-title"><b>Weather Forecast</b></span>
        </div>
        <ul className="navList">
            <li>
            {localStorage.getItem("accessToken") ?
            <>
                <button onClick={logoutFunc}>Log out</button>
            </>
            : <>
            </>
            }
            </li>
        </ul>
        </nav>
    );
};

export default Navbar;