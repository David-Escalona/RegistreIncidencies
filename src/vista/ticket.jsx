import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Tiquet({ addTiquet }) {
  const [aula, setAula] = useState("");
  const [ordinador, setOrdinador] = useState("");
  const [descripcio, setDescripcio] = useState("");
  const [grup, setGrup] = useState("");
  const [alumne, setAlumne] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!aula || !ordinador || !descripcio || !grup || !alumne) {
      alert("Tots els camps són obligatoris.");
      return;
    }

    const nouTiquet = {
      aula,
      ordinador,
      descripcio,
      grup,
      alumne,
      data: new Date().toLocaleDateString(),
    };

    addTiquet(nouTiquet);
    alert("Tiquet creat correctament.");
    navigate("/"); // Volver al panel
  };

  return (

    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "50%", maxWidth: "600px", borderRadius: "12px" }}>
        <h2 className="mb-4 text-center">Crear Nou Tiquet</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Aula</label>
            <input type="text" className="form-control" value={aula} onChange={(e) => setAula(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Ordinador</label>
            <input type="text" className="form-control" value={ordinador} onChange={(e) => setOrdinador(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripció</label>
            <textarea className="form-control" value={descripcio} onChange={(e) => setDescripcio(e.target.value)} rows="3"></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Grup</label>
            <input type="text" className="form-control" value={grup} onChange={(e) => setGrup(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Alumne</label>
            <input type="text" className="form-control" value={alumne} onChange={(e) => setAlumne(e.target.value)} />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success w-100">
              ✅ Crear Tiquet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
