import React from 'react';
import ReactDOM from 'react-dom/client';
//import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './global.css';

import Home from './Pages/Home/index.js'
import Plataformas from './Pages/Plataformas/Plataformas.js'
import Login from './Pages/Login/Login.js';
import Jogos from './Pages/Jogos/Jogos.js';
import Erro from './Pages/Error/Error.js';
import CadastroJogos from './Pages/CadastroJogos/CadastroJogos.js';
import Contas from './Pages/Contas/Contas.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/> 
      <Route path="/plataformas/" element={<Plataformas/>}/> 
      <Route path="/jogos/" element={<Jogos/>}/> 
      <Route path="/login/" element={<Login/>}/>
      <Route path="/erro/" element={<Erro/>}/> 
      <Route path="/cadastroJogos/" element={<CadastroJogos/>}/> 
      <Route path="/contas/" element={<Contas/>}/> 
    </Routes>
  </BrowserRouter>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
