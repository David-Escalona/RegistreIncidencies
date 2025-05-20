import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('dades_usuaris')) || [];
    const user = users.find(user => user.email === email && user.contrasenya === password);

    if (user) {
      localStorage.setItem('usuarioActual', JSON.stringify(user));
      window.dispatchEvent(new Event('usuarioActualizado'));
      setError(null);
      navigate('/panel');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <main className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow-lg p-4 border-0" style={{ maxWidth: '420px', width: '100%' }}>
        <h2 className="text-center mb-4 fw-bold text-primary">
          <i className="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesión
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="usuario@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="pass" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger mt-2">{error}</div>}

          <button type="submit" className="btn btn-dark w-100 mt-3">
            <i className="bi bi-arrow-right-circle me-2"></i>Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
