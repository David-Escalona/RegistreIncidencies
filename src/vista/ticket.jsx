import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Tiquet.css';

const Tiquet = () => {
  const [aula, setAula] = useState('');
  const [ordinador, setOrdinador] = useState('');
  const [descripcio, setDescripcio] = useState('');
  const navigate = useNavigate();

  const getTiquets = () => JSON.parse(localStorage.getItem('dades_tiquets_pendents')) || [];
  const setTiquets = (tiquets) => localStorage.setItem('dades_tiquets_pendents', JSON.stringify(tiquets));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!aula || !ordinador || !descripcio) {
      alert('Tots els camps són obligatoris.');
      return;
    }

    const tiquetsPendents = getTiquets();

    const nouTiquet = {
      id: tiquetsPendents.length > 0 ? tiquetsPendents[tiquetsPendents.length - 1].id + 1 : 1,
      aula,
      ordinador,
      descripcio,
    };

    const tiquetsActualitzats = [...tiquetsPendents, nouTiquet];
    setTiquets(tiquetsActualitzats);

    navigate('/panel');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="form-box p-4 shadow rounded" style={{ width: '100%', maxWidth: '480px', backgroundColor: '#fff' }}>
        <h2 className="mb-4 text-center text-primary fw-bold">Crear un Nou Ticket</h2>
        <form onSubmit={handleSubmit}>

          <div className="form-group mb-3">
            <label className="form-label fw-semibold">Aula:</label>
            <input
              type="text"
              value={aula}
              onChange={(e) => setAula(e.target.value)}
              required
              className="form-control"
              placeholder="Ex: Aula 1"
              style={{ borderRadius: '8px' }}
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label fw-semibold">Ordinador:</label>
            <input
              type="text"
              value={ordinador}
              onChange={(e) => setOrdinador(e.target.value)}
              required
              className="form-control"
              placeholder="Ex: PC-23"
              style={{ borderRadius: '8px' }}
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label fw-semibold">Descripció:</label>
            <textarea
              value={descripcio}
              onChange={(e) => setDescripcio(e.target.value)}
              required
              className="form-control"
              placeholder="Descriu el problema"
              rows={4}
              style={{ borderRadius: '8px', resize: 'none' }}
            />
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              onClick={() => navigate('/panel')}
              className="btn btn-outline-secondary px-4"
              style={{ borderRadius: '8px' }}
            >
              Cancel·lar
            </button>
            <button
              type="submit"
              className="btn btn-primary px-4"
              style={{ borderRadius: '8px' }}
            >
              Crear Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tiquet;
