import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Para manejar los errores
  const navigate = useNavigate(); // Para redirigir al usuario

  // Función para manejar el login
  const handleLogin = (e) => {
    e.preventDefault();

    // Recuperar los usuarios del localStorage
    const users = JSON.parse(localStorage.getItem('dades_usuaris')) || [];

    // Comprobar si el usuario existe y la contraseña coincide
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      // Si las credenciales son correctas, guardar la sesión en localStorage
      localStorage.setItem('usuarioActual', JSON.stringify(user));
      setError(null); // Limpiar el error en caso de éxito
      navigate('/'); // Redirigir al usuario al panel o a la página principal
    } else {
      // Si las credenciales son incorrectas, mostrar el mensaje de error
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <>
      <main className="container mt-5">
        <div className="pt-5">
          <h1 className="w-100 text-center">Login</h1>
          <form
            onSubmit={handleLogin}
            className="form p-4 border shadow bordered mt-5 mx-auto"
            style={{ width: "400px" }}
          >
            <label htmlFor="email" className="mt-2 form-label">
              User:
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="usuario@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="pass" className="mt-2 form-label">
              Contraseña:
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <div className="alert alert-danger mt-3">{error}</div>} {/* Mostrar el mensaje de error */}

            <input
              type="submit"
              className="mt-4 w-100 btn btn-primary"
              value="Entrar"
            />
          </form>
        </div>
      </main>
    </>
  );
}
