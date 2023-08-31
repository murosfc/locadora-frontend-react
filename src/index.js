import React from 'react';
import ReactDOM from 'react-dom/client';
//import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './global.css';

import Home from './Pages/Home/index.js'
import Plataformas from './Pages/Plataforma/Plataformas.js'
import Login from './Pages/Login/Login.js';
import Jogos from './Pages/Jogos/Jogos.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/> 
      <Route path="/plataformas/" element={<Plataformas/>}/> 
      <Route path="/jogos/" element={<Jogos/>}/> 
      <Route path="/login/" element={<Login/>}/> 
    </Routes>
  </BrowserRouter>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
