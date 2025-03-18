import { Link } from "react-router-dom";
import '../index.css';

export default function Header() {
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

  return (
    <>
      <header className="header">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-center">
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
                <>
                  <button className="btn btn-secondary ms-2">
                    <Link className="nav-link" to="/panel">PANEL</Link>
                  </button>
                  <button className="btn btn-secondary ms-2">
                    <Link className="nav-link" to="/comentarios">COMENTARIOS</Link>
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
