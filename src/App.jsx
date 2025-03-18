import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Panel from './pages/panel';
import Login from './pages/login';
import Registro from './pages/registro';
import Comentarios from './pages/comentarios';

function App() {
  const [tiquetsPendents, setTiquetsPendents] = useState([]);
  const [tiquetsResolts, setTiquetsResolts] = useState([]);

  useEffect(() => {
    const tiquetsPendentsData = [
      { id: 123459, data: '18/04/2023', aula: 'T6', grup: 'DAW1', ordinador: 'PC3', descripcio: 'Error d’impressora', alumne: 'Ana Martínez' },
      { id: 123460, data: '19/04/2023', aula: 'T8', grup: 'DAW2', ordinador: 'PC4', descripcio: 'Problema d’accés a arxius', alumne: 'Pedro Gómez' },
      { id: 123461, data: '20/04/2023', aula: 'T6', grup: 'DAW1', ordinador: 'PC1', descripcio: 'Aplicació es tanca inesperadament', alumne: 'Sofía Fernández' },
      { id: 123462, data: '21/04/2023', aula: 'T7', grup: 'DAW2', ordinador: 'PC2', descripcio: 'Problema de connexió a la xarxa', alumne: 'Luis Torres' },
      { id: 123463, data: '22/04/2023', aula: 'T8', grup: 'DAW1', ordinador: 'PC3', descripcio: 'Arxius corruptes', alumne: 'Carolina Ramírez' },
    ];

    const tiquetsResoltsData = [
      { id: 123457, data: '16/04/2023', dataResolucio: '15/05/2023', aula: 'T7', grup: 'DAW2', ordinador: 'PC1', descripcio: 'Problema de connexió a Internet', alumne: 'Maria López' },
      { id: 123458, data: '17/04/2023', dataResolucio: '15/05/2023', aula: 'T8', grup: 'DAW1', ordinador: 'PC2', descripcio: 'Pantalla en blanc', alumne: 'Juan Rodríguez' },
      { id: 123459, data: '18/04/2023', dataResolucio: '15/05/2023', aula: 'T8', grup: 'DAW1', ordinador: 'PC3', descripcio: 'Error d’impressora', alumne: 'Ana Martínez' },
    ];

    localStorage.setItem('dades_tiquets_pendents', JSON.stringify(tiquetsPendentsData));
    localStorage.setItem('dades_tiquets_resolts', JSON.stringify(tiquetsResoltsData));

    setTiquetsPendents(tiquetsPendentsData);
    setTiquetsResolts(tiquetsResoltsData);
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Panel tiquetsPendents={tiquetsPendents} tiquetsResolts={tiquetsResolts} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/comentarios" element={<Comentarios />} />
        <Route path="/panel" element={<Panel />} />
      </Routes>
    </>
  );
}

export default App;
