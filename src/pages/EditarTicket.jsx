import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function EditarTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const ticketsPendents = JSON.parse(localStorage.getItem("dades_tiquets_pendents")) || [];
    const ticketEncontrado = ticketsPendents.find((t) => String(t.id) === id);

    if (!ticketEncontrado) {
      setError("Ticket no encontrado");
    } else {
      setTicket(ticketEncontrado);
    }
    setLoading(false);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketsPendents = JSON.parse(localStorage.getItem("dades_tiquets_pendents")) || [];
    const index = ticketsPendents.findIndex((t) => String(t.id) === id);
    if (index !== -1) {
      ticketsPendents[index] = ticket;
      localStorage.setItem("dades_tiquets_pendents", JSON.stringify(ticketsPendents));
      alert("Ticket actualizado correctamente");
      navigate("/panel");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Cargando...</p>
      </div>
    );
  if (error)
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        {error}
      </div>
    );
  if (!ticket) return null;

  return (
    <>
      <style>{`
        .editar-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f8f9fa;
          padding: 1rem;
        }
        .editar-card {
          max-width: 480px;
          width: 100%;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(13, 110, 253, 0.15);
          padding: 2.5rem 2rem;
        }
        .editar-title {
          color: #0d6efd;
          font-weight: 700;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          text-align: center;
          text-shadow: 1px 1px 3px rgba(13, 110, 253, 0.2);
        }
        .form-label {
          font-weight: 600;
          color: #495057;
        }
        textarea.form-control {
          resize: vertical;
        }
        .btn-primary {
          background-color: #0d6efd;
          border-color: #0d6efd;
          font-weight: 600;
          box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3);
          transition: background-color 0.3s, box-shadow 0.3s;
        }
        .btn-primary:hover {
          background-color: #0b5ed7;
          border-color: #0a58ca;
          box-shadow: 0 7px 20px rgba(10, 88, 202, 0.4);
        }
        .btn-secondary {
          font-weight: 600;
        }
      `}</style>

      <div className="editar-container">
        <div className="editar-card">
          <h2 className="editar-title">Editar Ticket #{ticket.id}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="data" className="form-label">
                Fecha
              </label>
              <input
                type="text"
                id="data"
                name="data"
                value={ticket.data}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Introduce la fecha"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="aula" className="form-label">
                Aula
              </label>
              <input
                type="text"
                id="aula"
                name="aula"
                value={ticket.aula}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Introduce el aula"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="grup" className="form-label">
                Grupo
              </label>
              <input
                type="text"
                id="grup"
                name="grup"
                value={ticket.grup}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Introduce el grupo"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ordinador" className="form-label">
                Ordenador
              </label>
              <input
                type="text"
                id="ordinador"
                name="ordinador"
                value={ticket.ordinador}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Introduce el ordenador"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcio" className="form-label">
                Descripción
              </label>
              <textarea
                id="descripcio"
                name="descripcio"
                rows="4"
                value={ticket.descripcio}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Describe el problema"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="alumne" className="form-label">
                Alumno
              </label>
              <input
                type="text"
                id="alumne"
                name="alumne"
                value={ticket.alumne}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Nombre del alumno"
              />
            </div>

            <div className="d-flex justify-content-center gap-3">
              <button type="submit" className="btn btn-primary px-4">
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => navigate("/panel")}
                className="btn btn-secondary px-4"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

