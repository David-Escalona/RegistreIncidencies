import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Tiquet.css'; 

const Tiquet = () => {
  const [aula, setAula] = useState('');
  const [ordinador, setOrdinador] = useState('');
  const [descripcio, setDescripcio] = useState('');
  const navigate = useNavigate();

  // Función para obtener tickets de localStorage
  const getTiquets = () => {
    return JSON.parse(localStorage.getItem('dades_tiquets_pendents')) || [];
  };

  // Función para guardar tickets en localStorage
  const setTiquets = (tiquets) => {
    localStorage.setItem('dades_tiquets_pendents', JSON.stringify(tiquets));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!aula || !ordinador || !descripcio) {
      alert('Tots els camps són obligatoris.');
      return;
    }

    // 1️⃣ Obtener tickets actuales
    const tiquetsPendents = getTiquets();

    // 2️⃣ Crear el nuevo ticket con ID único
    const nouTiquet = {
      id: tiquetsPendents.length > 0 ? tiquetsPendents[tiquetsPendents.length - 1].id + 1 : 1,
      aula,
      ordinador,
      descripcio,
    };

    // 3️⃣ Agregar el nuevo ticket y guardar en localStorage
    const tiquetsActualitzats = [...tiquetsPendents, nouTiquet];
    setTiquets(tiquetsActualitzats);

    // 4️⃣ Redirigir al panel
    navigate('/panel');
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Crear un Nou Ticket</h2>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Aula:</label>
            <input type="text" value={aula} onChange={(e) => setAula(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Ordinador:</label>
            <input type="text" value={ordinador} onChange={(e) => setOrdinador(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Descripció:</label>
            <textarea value={descripcio} onChange={(e) => setDescripcio(e.target.value)} required />
          </div>

          <div className="button-group">
            <button type="button" className="cancel-button" onClick={() => navigate('/panel')}>Cancel·lar</button>
            <button type="submit" className="submit-button">Crear Ticket</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Tiquet;
