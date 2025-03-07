import { useState } from "react";

export default function Registro() {
  const [nomUsuari, setNomUsuari] = useState("");
  const [contrasenya, setContrasenya] = useState("");
  const [missatge, setMissatge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const dadesUsuaris = JSON.parse(localStorage.getItem("dades_usuaris")) || [];
    const usuariExisteix = dadesUsuaris.some((usuari) => usuari.nomUsuari === nomUsuari);

    if (usuariExisteix) {
      setMissatge("⚠️ Aquest usuari ja existeix.");
      return;
    }

    const nouUsuari = { nomUsuari, contrasenya };
    dadesUsuaris.push(nouUsuari);
    localStorage.setItem("dades_usuaris", JSON.stringify(dadesUsuaris));

    setMissatge("✅ Usuari registrat correctament.");
    setNomUsuari("");
    setContrasenya("");
  };

  return (
    <main className="container mt-5">
      <div className="pt-5">
        <h1 className="w-100 text-center">Registre</h1>
        <form
          onSubmit={handleSubmit}
          className="form p-4 border shadow rounded mt-5 mx-auto"
          style={{ width: "400px", backgroundColor: "#f9f9f9" }}
        >
          <label className="mt-2 form-label">Nom d'usuari:</label>
          <input
            type="text"
            className="form-control"
            value={nomUsuari}
            onChange={(e) => setNomUsuari(e.target.value)}
            required
          />

          <label className="mt-2 form-label">Contrasenya:</label>
          <input
            type="password"
            className="form-control"
            value={contrasenya}
            onChange={(e) => setContrasenya(e.target.value)}
            required
          />

          <button type="submit" className="mt-4 w-100 btn btn-primary">
            Registrar
          </button>
        </form>
      </div>
    </main>
  );
}
