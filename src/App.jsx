import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/header'
import Panel from './pages/panel';
import Login from './pages/login';
import Registro from './pages/registro';
import Comentarios from './pages/comentarios';

function App() {

  return (
    <>
      <Header></Header>
      <Routes>
         <Route path="/" element={<Panel/>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/registro" element={<Registro/>} />
         <Route path="/comentarios" element={<Comentarios/>} />
      </Routes>
    </>
  )
}

export default App