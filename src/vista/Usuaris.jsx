import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Usuaris.css";

const Usuaris = () => {
  const [usuaris, setUsuaris] = useState([]);
  const [usuariActiu, setUsuariActiu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarisGuardats = JSON.parse(localStorage.getItem("dades_usuaris")) || [];
    const usuariActiuData = JSON.parse(localStorage.getItem("usuari_actiu")) || null;

    // 🔹 Si un usuario no tiene rol, se asigna "Usuari" por defecto
    const usuarisAmbRol = usuarisGuardats.map((user) => ({
      ...user,
      rol: user.rol || "Usuari",
    }));

    setUsuaris(usuarisAmbRol);
    setUsuariActiu(usuariActiuData);
    localStorage.setItem("dades_usuaris", JSON.stringify(usuarisAmbRol));
  }, []);

  const eliminarUsuari = (id) => {
    const usuarisActualitzats = usuaris.filter((user) => user.id !== id);
    setUsuaris(usuarisActualitzats);
    localStorage.setItem("dades_usuaris", JSON.stringify(usuarisActualitzats));

    if (usuariActiu && usuariActiu.id === id) {
      alert("Has borrado tu propio usuario. Redirigiendo al registro...");
      navigate("/registro");
    }
  };

  const canviarRol = (id, nouRol) => {
    const usuarisActualitzats = usuaris.map((user) =>
      user.id === id ? { ...user, rol: nouRol } : user
    );

    setUsuaris(usuarisActualitzats);
    localStorage.setItem("dades_usuaris", JSON.stringify(usuarisActualitzats));
  };

  return (
    <div className="container">
      <h2>Gestió d'Usuaris</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Rol</th>
            <th>Accions</th>
          </tr>
        </thead>
        <tbody>
          {usuaris.length > 0 ? (
            usuaris.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>
                  <select value={user.rol} onChange={(e) => canviarRol(user.id, e.target.value)}>
                    <option value="Admin">Admin</option>
                    <option value="Usuari">Usuari</option>
                  </select>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => eliminarUsuari(user.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hi ha usuaris registrats.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Usuaris;
