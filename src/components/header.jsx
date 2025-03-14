import { Link } from "react-router-dom";
import '../index.css'; // Asegúrate de importar el archivo CSS

export default function Header() {
  // Verificar si el usuario está autenticado en localStorage
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

  return (
    <>
      <header className="header">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-center">
              {/* Mostrar solo las opciones de login y registro si no hay un usuario autenticado */}
              {!usuarioActual ? (
                <>
                  <button className="btn btn-secondary ms-2">
                    <Link className="nav-link" to="/login">LOGIN</Link>
                  </button>
                  <button className="btn btn-secondary ms-2">
                    <Link className="nav-link" to="/registro">REGISTRO</Link>
                  </button>
                </>
              ) : (
                // Mostrar las opciones del panel si el usuario está autenticado
                <>
                  <button className="btn btn-secondary ms-2">
                    <Link className="nav-link" to="/panel">PANEL</Link>
                  </button>
                  <button className="btn btn-secondary ms-2">
                    <Link className="nav-link" to="/comentarios">COMENTARIOS</Link>
                  </button>
                  <button className="btn btn-secondary ms-2">
                    <Link className="nav-link" to="/" onClick={() => {
                      // Eliminar la información de la sesión al hacer logout
                      localStorage.removeItem("usuarioActual");
                      window.location.href = "/"; // Redirigir al inicio después de cerrar sesión
                    }}>
                      LOGOUT
                    </Link>
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
