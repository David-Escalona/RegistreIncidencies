import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Panel from './pages/panel'; // Panel donde se cargarán los tiques
import Login from './pages/login';
import Registro from './pages/registro';
import Comentarios from './pages/comentarios';

function App() {
  const [tiquetsPendents, setTiquetsPendents] = useState([]);
  const [tiquetsResolts, setTiquetsResolts] = useState([]);

  useEffect(() => {
    // Cargar tiquets desde localStorage al inicio
    const tiquets = JSON.parse(localStorage.getItem('dades_tiquets')) || [];

    // Filtrar los tiquets pendientes y resueltos
    const pendents = tiquets.filter(tiquet => tiquet.status === 'pendiente');
    const resolts = tiquets.filter(tiquet => tiquet.status === 'resuelto');

    setTiquetsPendents(pendents);
    setTiquetsResolts(resolts);
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Panel tiquetsPendents={tiquetsPendents} tiquetsResolts={tiquetsResolts} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/comentarios" element={<Comentarios />} />
      </Routes>
    </>
  );
}

export default App;
