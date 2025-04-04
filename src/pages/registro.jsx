import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [email, setEmail] = useState('');
  const [contrasenya, setContrasenya] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuaris = JSON.parse(localStorage.getItem('dades_usuaris')) || [];
    const usuariExisteix = usuaris.some(usuari => usuari.email === email);

    if (usuariExisteix) {
      alert('Usuario ya registrado');
      return;
    }

    const nouUsuari = { email, contrasenya };
    usuaris.push(nouUsuari);
    localStorage.setItem('dades_usuaris', JSON.stringify(usuaris));

    navigate('/login');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Registre</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contrasenya" className="form-label">Contrasenya:</label>
            <input
              id="contrasenya"
              type="password"
              className="form-control"
              value={contrasenya}
              onChange={(e) => setContrasenya(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Registrar</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
