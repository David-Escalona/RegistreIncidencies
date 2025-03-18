import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Comentarios() {
  const { id } = useParams();  // Obtener el id del ticket de la URL
  const [ticket, setTicket] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [comentarioNuevo, setComentarioNuevo] = useState("");
  const [fechaComentario, setFechaComentario] = useState("");
  const navigate = useNavigate(); // Para navegar a la página anterior
  
  useEffect(() => {
    // Simulación de la carga de datos de los tickets
    const storedTickets = JSON.parse(localStorage.getItem('dades_tiquets_pendents')) || [];
    const ticketEncontrado = storedTickets.find(ticket => ticket.id === parseInt(id));

    if (ticketEncontrado) {
      setTicket(ticketEncontrado);
      // Simulando la carga de comentarios
      const storedComentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
      const comentariosTicket = storedComentarios.filter(comentario => comentario.ticketId === parseInt(id));
      setComentarios(comentariosTicket);
    }
  }, [id]);

  const handleNuevoComentario = () => {
    if (comentarioNuevo.trim() !== "" && fechaComentario) {
      const nuevoComentario = {
        ticketId: parseInt(id),
        autor: "Administrador", // El autor podría ser el usuario logueado
        comentario: comentarioNuevo,
        fecha: fechaComentario
      };

      // Guardar el nuevo comentario en localStorage
      const comentariosActualizados = [...comentarios, nuevoComentario];
      localStorage.setItem('comentarios', JSON.stringify(comentariosActualizados));

      // Actualizar el estado
      setComentarios(comentariosActualizados);
      setComentarioNuevo("");
      setFechaComentario("");
    }
  };

  return (
    <div className="container mt-5">
      
      <main>
        <div className="d-flex">
          <h1>Comentarios</h1>
          <button className="btn btn-link ms-auto" onClick={() => navigate(-1)}>&lt; Volver</button>
        </div>

        {ticket ? (
          <div>
            <h2 className="my-4">Código ticket: <span>{ticket.id}</span></h2>

            <form className="form card p-3 shadow">
              <label htmlFor="comentario" className="form-label">Comentario: </label>
              <textarea
                className="form-control"
                value={comentarioNuevo}
                onChange={(e) => setComentarioNuevo(e.target.value)}
                rows="3"
              ></textarea>
              <label htmlFor="fecha" className="form-label me-2 mt-3">Fecha: </label>
              <div className="d-flex align-items-center">
                <input
                  type="datetime-local"
                  className="form-control w-25"
                  value={fechaComentario}
                  onChange={(e) => setFechaComentario(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-success ms-auto"
                  onClick={handleNuevoComentario}
                >
                  Añadir comentario
                </button>
              </div>
            </form>

            <div className="mt-4">
              {comentarios.length > 0 ? (
                comentarios.map((comentario, index) => (
                  <div key={index} className="card p-3 mt-2">
                    <h5 className="text-end">
                      Autor: <span>{comentario.autor}</span>
                      <span className="ms-4">{new Date(comentario.fecha).toLocaleString()}</span>
                    </h5>
                    <p>{comentario.comentario}</p>
                  </div>
                ))
              ) : (
                <p>No hay comentarios para este ticket.</p>
              )}
            </div>
          </div>
        ) : (
          <p>Ticket no encontrado.</p>
        )}
      </main>
    </div>
  );
}
