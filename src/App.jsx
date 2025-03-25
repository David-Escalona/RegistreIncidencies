import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Panel from './pages/panel';
import Login from './pages/login';
import Registro from './pages/registro';
import Comentarios from './pages/comentarios';
import Tiquet from './vista/ticket';

// 🔹 Funció per obtenir els tiquets des de localStorage
function getTiquets(key) {
  const tiquets = localStorage.getItem(key);
  return tiquets ? JSON.parse(tiquets) : [];
}

// 🔹 Funció per guardar els tiquets a localStorage
function setTiquets(key, tiquets) {
  localStorage.setItem(key, JSON.stringify(tiquets));
}

// 🔹 Funció per afegir un nou tiquet
function addTiquet(nouTiquet) {
  const tiquetsPendents = getTiquets('dades_tiquets_pendents');
  nouTiquet.id = tiquetsPendents.length > 0 ? tiquetsPendents[tiquetsPendents.length - 1].id + 1 : 1; // Generar un nou ID
  const tiquetsActualitzats = [...tiquetsPendents, nouTiquet];
  setTiquets('dades_tiquets_pendents', tiquetsActualitzats);  // Guardem els tiquets actualitzats
}

function App() {
  const [tiquetsPendents, setTiquetsPendents] = useState([]);
  const [tiquetsResolts, setTiquetsResolts] = useState([]);

  // Carregar els tiquets en el primer renderitzat
  useEffect(() => {
    const tiquetsPendentsData = getTiquets('dades_tiquets_pendents');
    const tiquetsResoltsData = getTiquets('dades_tiquets_resolts');

    // Si no hi ha dades a localStorage, utilitzem les dades de prova
    if (tiquetsPendentsData.length === 0) {
      const tiquetsPendentsProva = [
        { id: 123459, data: '18/04/2023', aula: 'T6', grup: 'DAW1', ordinador: 'PC3', descripcio: 'Error d’impressora', alumne: 'Ana Martínez' },
        { id: 123460, data: '19/04/2023', aula: 'T8', grup: 'DAW2', ordinador: 'PC4', descripcio: 'Problema d’accés a arxius', alumne: 'Pedro Gómez' },
        { id: 123461, data: '20/04/2023', aula: 'T6', grup: 'DAW1', ordinador: 'PC1', descripcio: 'Aplicació es tanca inesperadament', alumne: 'Sofía Fernández' },
        { id: 123462, data: '21/04/2023', aula: 'T7', grup: 'DAW2', ordinador: 'PC2', descripcio: 'Problema de connexió a la xarxa', alumne: 'Luis Torres' },
        { id: 123463, data: '22/04/2023', aula: 'T8', grup: 'DAW1', ordinador: 'PC3', descripcio: 'Arxius corruptes', alumne: 'Carolina Ramírez' },
      ];
      setTiquetsPendents(tiquetsPendentsProva);
      setTiquets('dades_tiquets_pendents', tiquetsPendentsProva);
    } else {
      setTiquetsPendents(tiquetsPendentsData);
    }

    if (tiquetsResoltsData.length === 0) {
      const tiquetsResoltsProva = [
        { id: 123457, data: '16/04/2023', dataResolucio: '15/05/2023', aula: 'T7', grup: 'DAW2', ordinador: 'PC1', descripcio: 'Problema de connexió a Internet', alumne: 'Maria López' },
        { id: 123458, data: '17/04/2023', dataResolucio: '15/05/2023', aula: 'T8', grup: 'DAW1', ordinador: 'PC2', descripcio: 'Pantalla en blanc', alumne: 'Juan Rodríguez' },
        { id: 123459, data: '18/04/2023', dataResolucio: '15/05/2023', aula: 'T8', grup: 'DAW1', ordinador: 'PC3', descripcio: 'Error d’impressora', alumne: 'Ana Martínez' },
      ];
      setTiquetsResolts(tiquetsResoltsProva);
      setTiquets('dades_tiquets_resolts', tiquetsResoltsProva);
    } else {
      setTiquetsResolts(tiquetsResoltsData);
    }
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Panel tiquetsPendents={tiquetsPendents} tiquetsResolts={tiquetsResolts} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/comentarios/:id" element={<Comentarios />} />
        <Route path="/panel" element={<Panel tiquetsPendents={tiquetsPendents} tiquetsResolts={tiquetsResolts} />} />
        <Route path="/tiquet" element={<Tiquet addTiquet={addTiquet} />} />
      </Routes>
    </>
  );
}

export default App;
