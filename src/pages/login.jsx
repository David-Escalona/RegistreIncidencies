import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (usuarioEncontrado) {
      localStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado));
      navigate("/panel");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <main className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4 text-primary">
          <i className="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesión
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="usuario@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger mt-2">{error}</div>}

          <button type="submit" className="btn btn-dark w-100">
            <i className="bi bi-arrow-right-circle me-2"></i>Entrar
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
