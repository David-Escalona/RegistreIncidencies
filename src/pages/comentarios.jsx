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
    <div className="container-lg mt-5 mb-5">
      <main className="mx-auto" style={{ maxWidth: "900px" }}>
        <div className="d-flex align-items-center mb-4">
          <h1 className="text-primary fw-bold">Comentarios</h1>
          <button
            className="btn btn-outline-secondary ms-auto"
            onClick={() => navigate(-1)}
            aria-label="Volver"
          >
            &lt; Volver
          </button>
        </div>

        {ticket ? (
          <>
            <h2 className="mb-4 text-center">
              Código ticket: <span className="text-muted">{ticket.id}</span>
            </h2>

            {/* Formulario */}
            <div className="card shadow-sm p-4 mb-5 rounded-3 border-primary border-2">
              <h4 className="text-center text-secondary mb-4 fw-semibold">Añadir Comentario</h4>
              <form onSubmit={(e) => { e.preventDefault(); handleNuevoComentario(); }}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label htmlFor="autor" className="form-label fw-semibold">Autor:</label>
                    <input
                      id="autor"
                      type="text"
                      className="form-control"
                      value={autor}
                      onChange={(e) => setAutor(e.target.value)}
                      placeholder="Nombre del autor"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="titulo" className="form-label fw-semibold">Título:</label>
                    <input
                      id="titulo"
                      type="text"
                      className="form-control"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      placeholder="Título del comentario"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="comentario" className="form-label fw-semibold">Comentario:</label>
                  <textarea
                    id="comentario"
                    className="form-control"
                    value={comentarioNuevo}
                    onChange={(e) => setComentarioNuevo(e.target.value)}
                    rows="4"
                    placeholder="Escribe tu comentario aquí..."
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="fecha" className="form-label fw-semibold">Fecha:</label>
                  <input
                    id="fecha"
                    type="datetime-local"
                    className="form-control"
                    value={fechaComentario}
                    onChange={(e) => setFechaComentario(e.target.value)}
                    required
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary px-5 fw-semibold shadow-sm"
                  >
                    Añadir Comentario
                  </button>
                </div>
              </form>
            </div>

            {/* Lista de comentarios */}
            <section>
              <h3 className="text-secondary mb-3 fw-semibold border-bottom pb-2">Historial de Comentarios</h3>
              {comentarios.length > 0 ? (
                comentarios.map((comentario, index) => (
                  <article key={index} className="card shadow-sm p-4 mb-3 rounded-3 border border-secondary">
                    <div className="d-flex justify-content-between mb-2">
                      <h5 className="text-primary fw-bold">{comentario.titulo}</h5>
                      <time className="text-muted fst-italic" dateTime={comentario.fecha}>
                        {new Date(comentario.fecha).toLocaleString()}
                      </time>
                    </div>
                    <h6 className="text-end text-secondary fst-italic mb-3">Autor: {comentario.autor}</h6>
                    <p className="mb-0">{comentario.comentario}</p>
                  </article>
                ))
              ) : (
                <p className="text-muted fst-italic">No hay comentarios para este ticket.</p>
              )}
            </section>
          </>
        ) : (
          <p className="text-danger text-center fw-semibold mt-5">Ticket no encontrado.</p>
        )}
      </main>
    </div>
  );
}
