import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Panel from './pages/panel';
import Login from './pages/login';
import Registro from './pages/registro';
import Comentarios from './pages/comentarios';
import Tiquet from './vista/ticket';

// 🔹 Función para obtener tickets desde localStorage
function getTiquets(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// 🔹 Función para guardar tickets en localStorage
function setTiquets(key, tiquets) {
  localStorage.setItem(key, JSON.stringify(tiquets));
}

// 🔹 Función para agregar un nuevo ticket
function addTiquet(nuevoTiquet) {
  const tiquetsPendents = getTiquets('dades_tiquets_pendents');
  nuevoTiquet.id = tiquetsPendents.length > 0 ? tiquetsPendents[tiquetsPendents.length - 1].id + 1 : 1; // Generar un nuevo ID
  const tiquetsActualizados = [...tiquetsPendents, nuevoTiquet];
  setTiquets('dades_tiquets_pendents', tiquetsActualizados);
}

function App() {
  const [tiquetsPendents, setTiquetsPendents] = useState([]);
  const [tiquetsResolts, setTiquetsResolts] = useState([]);

  useEffect(() => {
    const tiquetsPendentsData = getTiquets('dades_tiquets_pendents');
    const tiquetsResoltsData = getTiquets('dades_tiquets_resolts');

    setTiquetsPendents(tiquetsPendentsData);
    setTiquetsResolts(tiquetsResoltsData);
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Panel tiquetsPendents={tiquetsPendents} tiquetsResolts={tiquetsResolts} addTiquet={addTiquet} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/comentarios/:id" element={<Comentarios />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/nou-tiquet" element={<Tiquet addTiquet={addTiquet} />} />
      </Routes>
    </>
  );
}

export default App;
