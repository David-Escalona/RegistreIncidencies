import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Crear el contexto
const UserContext = createContext();

// Componente que provee el contexto
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Verificar si hay un usuario en localStorage al cargar la aplicación
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Función para iniciar sesión
  const login = (email, password) => {
    const userData = JSON.parse(localStorage.getItem("dades_usuaris")) || [];

    // Buscar el usuario por email y contraseña
    const foundUser = userData.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      // Guardar el usuario en el estado y en localStorage
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook para acceder al contexto
export const useUser = () => useContext(UserContext);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { user, login } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    const isLoggedIn = login(email, password);
    if (isLoggedIn) {
      // Redirigir al panel si el login es exitoso
      navigate("/");
    } else {
      // Mostrar mensaje de error si el login falla
      setErrorMessage("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <main className="container mt-5">
      <div className="pt-5">
        <h1 className="w-100 text-center">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="form p-4 border shadow bordered mt-5 mx-auto"
          style={{ width: "400px" }}
        >
          <label htmlFor="email" className="mt-2 form-label">
            Usuario:{" "}
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="usuario@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="pass" className="mt-2 form-label">
            Contraseña:{" "}
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMessage && (
            <div className="alert alert-danger mt-2">{errorMessage}</div>
          )}

          <input
            type="submit"
            className="mt-4 w-100 btn btn-primary"
            value="Entrar"
          />
        </form>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Observaciones
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Código incidencia: <span>123546</span>
              </p>
              <label htmlFor="comentario" className="form-label">
                Comentario:
              </label>
              <input
                className="form-control"
                defaultValue="Este es un comentario sobre esta incidencia"
              />
              <p className="small text-end">
                Autor: <span>Pepe Loco</span>
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="button" className="btn btn-primary">
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
