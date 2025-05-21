import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [email, setEmail] = useState('');
  const [contrasenya, setContrasenya] = useState('');
  const [rol, setRol] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuaris = JSON.parse(localStorage.getItem('dades_usuaris')) || [];
    const usuariExisteix = usuaris.some(usuari => usuari.email === email);

    if (usuariExisteix) {
      alert('Usuario ya registrado');
      return;
    }

    if (!rol) {
      alert('Por favor, selecciona un rol');
      return;
    }

    const nouUsuari = { email, contrasenya, rol };
    usuaris.push(nouUsuari);
    localStorage.setItem('dades_usuaris', JSON.stringify(usuaris));

    navigate('/login');
  };

  return (
    <main className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow-lg p-4 border-0" style={{ maxWidth: '420px', width: '100%' }}>
        <h2 className="text-center mb-4 fw-bold text-primary">
          <i className="bi bi-person-plus-fill me-2"></i>Registro
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="usuario@mail.com"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contrasenya" className="form-label">Contraseña</label>
            <input
              id="contrasenya"
              type="password"
              className="form-control"
              value={contrasenya}
              onChange={(e) => setContrasenya(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="rol" className="form-label">Selecciona un rol</label>
            <select
              id="rol"
              className="form-select"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
            >
              <option value="">-- Elige un rol --</option>
              <option value="estandard">Usuari Estàndard</option>
              <option value="professor">Professor/Admin</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>

          <button type="submit" className="btn btn-dark w-100 mt-3">
            <i className="bi bi-person-check-fill me-2"></i>Registrar
          </button>
        </form>
      </div>
    </main>
  );
}

export default Registro;
