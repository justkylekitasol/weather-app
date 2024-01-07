import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Landing from './Landing';
import Home from './Home';
import Weather from './Weather';
import { Provider } from "react-redux";
import {store} from "./store.ts"
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/weather/:city" element={<Weather />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
      </Provider>
    </div>
    
  );
};

export default App;