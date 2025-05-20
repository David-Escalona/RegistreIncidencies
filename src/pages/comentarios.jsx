import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../Comentarios.css';


export default function Comentarios() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [autor, setAutor] = useState("");
  const [titulo, setTitulo] = useState("");
  const [comentarioNuevo, setComentarioNuevo] = useState("");
  const [fechaComentario, setFechaComentario] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem('dades_tiquets_pendents')) || [];
    const ticketEncontrado = storedTickets.find(ticket => ticket.id === parseInt(id));

    if (ticketEncontrado) {
      setTicket(ticketEncontrado);
      const storedComentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
      const comentariosTicket = storedComentarios.filter(comentario => comentario.ticketId === parseInt(id));
      setComentarios(comentariosTicket);
    }
  }, [id]);

  const handleNuevoComentario = () => {
    if (autor.trim() && titulo.trim() && comentarioNuevo.trim() && fechaComentario) {
      const nuevoComentario = {
        ticketId: parseInt(id),
        autor,
        titulo,
        comentario: comentarioNuevo,
        fecha: fechaComentario
      };

      const storedComentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
      const comentariosActualizados = [...storedComentarios, nuevoComentario];

      localStorage.setItem('comentarios', JSON.stringify(comentariosActualizados));
      setComentarios(comentariosActualizados.filter(c => c.ticketId === parseInt(id)));

      // Reset
      setAutor("");
      setTitulo("");
      setComentarioNuevo("");
      setFechaComentario("");
    }
  };

  return (
    <div className="comentarios-wrapper">
      <div className="comentarios-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-secondary">Comentarios</h2>
          <button className="btn btn-link" onClick={() => navigate(-1)}>&lt; Volver</button>
        </div>

        {ticket && (
          <>
            <h5 className="mb-4 text-muted">Código ticket: <strong>{ticket.id}</strong></h5>

            <div className="card p-4 shadow-sm comentario-form">
              <div className="mb-3">
                <label className="form-label">Título:</label>
                <input
                  type="text"
                  className="form-control"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Título del comentario"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Comentario:</label>
                <textarea
                  className="form-control"
                  value={comentarioNuevo}
                  onChange={(e) => setComentarioNuevo(e.target.value)}
                  rows="3"
                  placeholder="Escribe tu comentario"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Fecha:</label>
                <input
                  type="date"
                  className="form-control"
                  value={fechaComentario}
                  onChange={(e) => setFechaComentario(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Autor:</label>
                <input
                  type="text"
                  className="form-control"
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                  placeholder="Tu nombre"
                />
              </div>

              <div className="text-end">
                <button className="btn btn-success px-4" onClick={handleNuevoComentario}>
                  Añadir comentario
                </button>
              </div>
            </div>

            <div className="mt-5">
              {comentarios.length > 0 ? (
                comentarios.map((comentario, index) => (
                  <div key={index} className="card p-3 mb-3 shadow-sm comentario-card">
                    <p className="mb-2">{comentario.comentario}</p>
                    <div className="d-flex justify-content-between text-muted small">
                      <span>Autor: <strong>{comentario.autor}</strong></span>
                      <span>{new Date(comentario.fecha).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No hay comentarios aún.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
