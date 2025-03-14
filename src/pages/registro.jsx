import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Estado para el mensaje de error
  const navigate = useNavigate();

  // Función que maneja el registro
  const handleRegister = (e) => {
    e.preventDefault();

    // Verificar si el usuario ya está registrado en localStorage
    const users = JSON.parse(localStorage.getItem('dades_usuaris')) || [];

    const userExists = users.some(user => user.email === email); // Comprobar si ya existe el usuario

    if (userExists) {
      // Si el usuario ya existe, mostrar el mensaje de error
      setError('El usuario ya está registrado');
    } else {
      // Si no existe, agregarlo al localStorage
      const newUser = { email, password };
      users.push(newUser);
      localStorage.setItem('dades_usuaris', JSON.stringify(users));
      setError(null); // Limpiar cualquier error anterior
      navigate('/login'); // Redirigir a la página de login
    }
  };

  return (
    <main className="container mt-5">
      <div className="pt-5">
        <h1 className="w-100 text-center">Registro</h1>
        <form
          onSubmit={handleRegister}
          className="form p-4 border shadow bordered mt-5 mx-auto"
          style={{ width: "400px" }}
        >
          <label htmlFor="email" className="mt-2 form-label">
            Usuario:
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

          {error && <div className="alert alert-danger mt-3">{error}</div>} {/* Mostrar el error */}

          <input
            type="submit"
            className="mt-4 w-100 btn btn-primary"
            value="Registrar"
          />
        </form>
      </div>
    </main>
  );
}
