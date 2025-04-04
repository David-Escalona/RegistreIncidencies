import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    if (autor.trim() !== "" && titulo.trim() !== "" && comentarioNuevo.trim() !== "" && fechaComentario) {
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

      setAutor("");
      setTitulo("");
      setComentarioNuevo("");
      setFechaComentario("");
    }
  };

  return (
    <div className="container-lg mt-5">
      <main className="w-100 mx-auto" style={{ maxWidth: "80%" }}>
        <div className="d-flex align-items-center">
          <h1 className="text-primary">Comentarios</h1>
          <button className="btn btn-outline-secondary ms-auto" onClick={() => navigate(-1)}>
            &lt; Volver
          </button>
        </div>

        {ticket ? (
          <div>
            <h2 className="my-4">Código ticket: <span className="text-muted">{ticket.id}</span></h2>

            {/* Formulario mejorado */}
            <div className="card p-4 shadow-lg w-100 mx-auto" style={{ maxWidth: "80%" }}>
              <h4 className="text-center mb-3 text-secondary">Añadir Comentario</h4>
              <form>
                <div className="mb-3">
                  <label className="form-label">Autor:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    placeholder="Nombre del autor"
                  />
                </div>

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
                    rows="4"
                    placeholder="Escribe tu comentario aquí..."
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Fecha:</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={fechaComentario}
                    onChange={(e) => setFechaComentario(e.target.value)}
                  />
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary px-4"
                    onClick={handleNuevoComentario}
                  >
                    Añadir Comentario
                  </button>
                </div>
              </form>
            </div>

            {/* Lista de comentarios mejorada */}
            <div className="mt-5 w-100 mx-auto" style={{ maxWidth: "80%" }}>
              <h3 className="text-secondary">Historial de Comentarios</h3>
              {comentarios.length > 0 ? (
                comentarios.map((comentario, index) => (
                  <div key={index} className="card p-4 mt-3 shadow-sm">
                    <div className="d-flex justify-content-between">
                      <h5 className="text-primary">{comentario.titulo}</h5>
                      <span className="text-muted">{new Date(comentario.fecha).toLocaleString()}</span>
                    </div>
                    <h6 className="text-end text-secondary">Autor: {comentario.autor}</h6>
                    <p className="mt-2">{comentario.comentario}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted">No hay comentarios para este ticket.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-danger">Ticket no encontrado.</p>
        )}
      </main>
    </div>
  );
}
