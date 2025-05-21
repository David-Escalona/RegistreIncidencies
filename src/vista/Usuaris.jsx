import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const rolsVisibles = {
  estandard: "Usuari Estàndard",
  professor: "Professor",
  admin: "Administrador",
};

const rolsInterns = {
  "Usuari Estàndard": "estandard",
  "Professor": "professor",
  "Administrador": "admin",
};

const Usuaris = () => {
  const [usuaris, setUsuaris] = useState([]);
  const [usuariActiu, setUsuariActiu] = useState(null);
  const [rolsTemporals, setRolsTemporals] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const usuarisGuardats = JSON.parse(localStorage.getItem("dades_usuaris")) || [];
    const usuariActiuData = JSON.parse(localStorage.getItem("usuarioActual")) || null;

    const usuarisAmbRol = usuarisGuardats.map((user) => ({
      ...user,
      rol: user.rol || "estandard",
    }));

    const rolsInicials = {};
    usuarisAmbRol.forEach((u) => {
      rolsInicials[u.email] = u.rol;
    });

    setUsuaris(usuarisAmbRol);
    setUsuariActiu(usuariActiuData);
    setRolsTemporals(rolsInicials);
  }, []);

  const eliminarUsuari = (email) => {
    const usuarisActualitzats = usuaris.filter((user) => user.email !== email);
    setUsuaris(usuarisActualitzats);
    localStorage.setItem("dades_usuaris", JSON.stringify(usuarisActualitzats));

    if (usuariActiu && usuariActiu.email === email) {
      alert("Usuari actiu eliminat. Redirigint al registre...");
      localStorage.removeItem("usuarioActual");
      navigate("/registro");
    }
  };

  const actualitzarRol = (email, rolSeleccionat) => {
    setRolsTemporals((prev) => ({
      ...prev,
      [email]: rolSeleccionat,
    }));
  };

  const aplicarCanvis = (email) => {
    const nouRol = rolsTemporals[email];

    const usuarisActualitzats = usuaris.map((user) =>
      user.email === email ? { ...user, rol: nouRol } : user
    );

    setUsuaris(usuarisActualitzats);
    localStorage.setItem("dades_usuaris", JSON.stringify(usuarisActualitzats));

    if (usuariActiu?.email === email) {
      const nouUsuariActiu = { ...usuariActiu, rol: nouRol };
      localStorage.setItem("usuarioActual", JSON.stringify(nouUsuariActiu));
    }

    alert("Rol actualitzat correctament.");
    navigate("/panel");
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
                <th>Rol</th>
                <th className="text-center">Accions</th>
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
                        value={rolsTemporals[user.email]}
                        onChange={(e) => actualitzarRol(user.email, e.target.value)}
                      >
                        <option value="estandard">Usuari Estàndard</option>
                        <option value="professor">Professor</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => aplicarCanvis(user.email)}
                        >
                          Aplicar
                        </button>
                        <button
                          className="btn btn-delete btn-sm"
                          onClick={() => eliminarUsuari(user.email)}
                        >
                          Eliminar
                        </button>
                      </div>
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
