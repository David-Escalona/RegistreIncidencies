import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Usuaris = () => {
  const [usuaris, setUsuaris] = useState([]);
  const [usuariActiu, setUsuariActiu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarisGuardats = JSON.parse(localStorage.getItem("dades_usuaris")) || [];
    const usuariActiuData = JSON.parse(localStorage.getItem("usuarioActual")) || null; // nombre que usas en login

    const usuarisAmbRol = usuarisGuardats.map((user) => ({
      ...user,
      rol: user.rol || "Usuari",
    }));

    setUsuaris(usuarisAmbRol);
    setUsuariActiu(usuariActiuData);
    localStorage.setItem("dades_usuaris", JSON.stringify(usuarisAmbRol));
  }, []);

  // Función para eliminar usuario por email (único)
  const eliminarUsuari = (email) => {
    const usuarisActualitzats = usuaris.filter((user) => user.email !== email);
    setUsuaris(usuarisActualitzats);
    localStorage.setItem("dades_usuaris", JSON.stringify(usuarisActualitzats));

    if (usuariActiu && usuariActiu.email === email) {
      alert("Usuario activo eliminado. Redirigiendo al registro...");
      localStorage.removeItem("usuarioActual");
      navigate("/registro");
    }
  };

  // Cambiar rol solo del usuario seleccionado (por email)
  const canviarRol = (email, nouRol) => {
    const usuarisActualitzats = usuaris.map((user) =>
      user.email === email ? { ...user, rol: nouRol } : user
    );

    setUsuaris(usuarisActualitzats);
    localStorage.setItem("dades_usuaris", JSON.stringify(usuarisActualitzats));
  };

  return (
    <>
      <style>{`
        .main-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: white;
          padding: 2rem 1rem;
        }
        .usuaris-container {
          width: 100%;
          max-width: 900px;
        }
        .usuaris-title {
          font-weight: 700;
          font-size: 2.5rem;
          color: #0d6efd;
          margin-bottom: 2rem;
          text-align: center;
          text-shadow: 1px 1px 3px rgba(13, 110, 253, 0.3);
        }
        .user-table {
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border-radius: 8px;
          overflow: hidden;
          background: white;
        }
        .user-table thead {
          background-color: #0d6efd;
          color: white;
        }
        .user-table tbody tr:hover {
          background-color: #e7f1ff;
        }
        .user-table select.form-select {
          min-width: 120px;
        }
        .btn-delete {
          background-color: #dc3545;
          border: none;
          transition: background-color 0.3s ease;
          color: white;
        }
        .btn-delete:hover {
          background-color: #b02a37;
          color: white;
        }
        @media (max-width: 576px) {
          .usuaris-title {
            font-size: 2rem;
          }
          .user-table select.form-select {
            min-width: 100px;
          }
        }
      `}</style>

      <div className="main-wrapper">
        <div className="usuaris-container">
          <h2 className="usuaris-title">Gestió d'Usuaris</h2>

          <table className="table user-table table-hover align-middle">
            <thead>
              <tr>
                <th>Email</th>
                <th style={{ width: "140px" }}>Rol</th>
                <th style={{ width: "120px" }} className="text-center">
                  Accions
                </th>
              </tr>
            </thead>
            <tbody>
              {usuaris.length > 0 ? (
                usuaris.map((user) => (
                  <tr key={user.email}>
                    <td className="fw-semibold">{user.email}</td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={user.rol}
                        onChange={(e) => canviarRol(user.email, e.target.value)}
                        aria-label={`Canviar rol de ${user.email}`}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Usuari">Usuari</option>
                      </select>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-delete btn-sm"
                        onClick={() => eliminarUsuari(user.email)}
                        title={`Eliminar usuari ${user.email}`}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center fst-italic py-4 text-muted">
                    No hi ha usuaris registrats.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Usuaris;
