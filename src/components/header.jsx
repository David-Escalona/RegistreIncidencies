import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import '../index.css';

export default function Header() {
  const [usuarioActual, setUsuarioActual] = useState(JSON.parse(localStorage.getItem("usuarioActual")));

  useEffect(() => {
    const actualizarUsuario = () => {
      const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
      setUsuarioActual(usuario);
    };

    // Escuchar cambios personalizados (inicio o cierre de sesión)
    window.addEventListener("usuarioActualizado", actualizarUsuario);

    return () => {
      window.removeEventListener("usuarioActualizado", actualizarUsuario);
    };
  }, []);

  return (
    <header className="header">
      <nav className="navbar navbar-light bg-light px-3">
        <div className="container-fluid d-flex justify-content-between align-items-center w-100">
          
          {/* Izquierda: Título */}
          <div className="fw-bold">
            Gestión de Incidencias FPllefià
          </div>

          {/* Centro: Botones de navegación */}
          <div className="d-flex justify-content-center gap-2">
            {!usuarioActual ? (
              <>
                <Link className="btn btn-dark" to="/login">Inicio Sesión</Link>
                <Link className="btn btn-dark" to="/registro">Registro</Link>
              </>
            ) : (
              <>
                <Link className="btn btn-dark" to="/panel">Panel</Link>
                <Link className="btn btn-dark" to="/usuaris">Usuarios</Link>
                <Link className="btn btn-dark" to="/login">Login</Link>
                <Link className="btn btn-dark" to="/registro">Registro</Link>
              </>
            )}
          </div>

          {/* Derecha: Correo del usuario */}
          <div>
            {usuarioActual && (
              <span className="text-muted small">{usuarioActual.email}</span>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
