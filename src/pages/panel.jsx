import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function Panel() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ticketsPendientes, setTicketsPendientes] = useState([]);
  const [ticketsResueltos, setTicketsResueltos] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuarioActual'));
    if (!user) {
      navigate('/login');
    } else {
      setUsuario(user);
    }

    const storedTicketsPendientes = JSON.parse(localStorage.getItem('dades_tiquets_pendents')) || [];
    const storedTicketsResueltos = JSON.parse(localStorage.getItem('dades_tiquets_resolts')) || [];

    setTicketsPendientes(storedTicketsPendientes);
    setTicketsResueltos(storedTicketsResueltos);
    setLoading(false);
  }, [navigate]);

  const eliminarTicket = (id) => {
    const nuevosTickets = ticketsPendientes.filter(ticket => ticket.id !== id);
    setTicketsPendientes(nuevosTickets);
    localStorage.setItem('dades_tiquets_pendents', JSON.stringify(nuevosTickets));
  };

  const eliminarTicketResuelto = (id) => {
    const nuevosTickets = ticketsResueltos.filter(ticket => ticket.id !== id);
    setTicketsResueltos(nuevosTickets);
    localStorage.setItem('dades_tiquets_resolts', JSON.stringify(nuevosTickets));
  };

  const resolverTicket = (id) => {
    const ticket = ticketsPendientes.find(ticket => ticket.id === id);
    if (ticket) {
      const nuevosPendientes = ticketsPendientes.filter(t => t.id !== id);
      const nuevosResueltos = [...ticketsResueltos, { ...ticket, dataResolucio: new Date().toLocaleDateString() }];

      setTicketsPendientes(nuevosPendientes);
      setTicketsResueltos(nuevosResueltos);

      localStorage.setItem('dades_tiquets_pendents', JSON.stringify(nuevosPendientes));
      localStorage.setItem('dades_tiquets_resolts', JSON.stringify(nuevosResueltos));
    }
  };

  const handleComentarios = (id) => {
    navigate(`/comentarios/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('usuarioActual');
    navigate('/login');
  };

  if (loading || !usuario) return <p>Cargando...</p>;

  const esEstandar = usuario.rol === 'estandard' || usuario.rol === 'Usuari Estàndard';
  const esAdmin = usuario.rol === 'admin' || usuario.rol === 'Administrador';

  const ticketsUsuario = (tickets) =>
    esEstandar ? tickets.filter(t => t.email === usuario.email) : tickets;

  const nombreRol =
    usuario.rol === 'estandard' || usuario.rol === 'Usuari Estàndard'
      ? 'Usuari Estàndard'
      : usuario.rol === 'professor' || usuario.rol === 'Professor'
      ? 'Professor'
      : usuario.rol === 'admin' || usuario.rol === 'Administrador'
      ? 'Administrador'
      : 'Desconegut';

  return (
    <main className="margene">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4 p-3 bg-light rounded shadow-sm">
        <div>
          <h4 className="mb-0 text-secondary">
            <i className="bi bi-person-circle me-2 text-primary"></i>
            {usuario.email} ({nombreRol})
          </h4>
        </div>
        <div>
          <button className="btn btn-outline-dark me-2" onClick={() => navigate('/proyecto')}>
            <i className="bi bi-folder-plus me-1"></i> Crear Proyecto
          </button>

          {esAdmin && (
            <button className="btn btn-outline-primary me-2" onClick={() => navigate('/usuaris')}>
              <i className="bi bi-people-fill me-1"></i> Gestionar Usuarios
            </button>
          )}

          <button className="btn btn-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
          </button>
        </div>
      </div>

      {/* Tickets pendientes */}
      <h2 className="mt-5">Tickets pendientes</h2>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Código</th>
            <th>Fecha</th>
            <th>Aula</th>
            <th>Grupo</th>
            <th>Ordenador</th>
            <th>Descripción</th>
            <th>Alumno</th>
            {!esEstandar && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {ticketsUsuario(ticketsPendientes).length > 0 ? (
            ticketsUsuario(ticketsPendientes).map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.data}</td>
                <td>{ticket.aula}</td>
                <td>{ticket.grup}</td>
                <td>{ticket.ordinador}</td>
                <td>{ticket.descripcio}</td>
                <td>{ticket.alumne}</td>
                {!esEstandar && (
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => eliminarTicket(ticket.id)}
                      title="Eliminar"
                    >
                      🗑️ Eliminar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleComentarios(ticket.id)}
                      title="Comentarios"
                    >
                      💬 Comentarios
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={esEstandar ? 7 : 8} className="text-center">
                No hay tickets pendientes
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Tickets resueltos */}
      <h2 className="mt-5">Tickets resueltos</h2>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Código</th>
            <th>Fecha</th>
            <th>Fecha resuelto</th>
            <th>Aula</th>
            <th>Grupo</th>
            <th>Ordenador</th>
            <th>Descripción</th>
            <th>Alumno</th>
            {!esEstandar && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {ticketsUsuario(ticketsResueltos).length > 0 ? (
            ticketsUsuario(ticketsResueltos).map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.data}</td>
                <td>{ticket.dataResolucio}</td>
                <td>{ticket.aula}</td>
                <td>{ticket.grup}</td>
                <td>{ticket.ordinador}</td>
                <td>{ticket.descripcio}</td>
                <td>{ticket.alumne}</td>
                {!esEstandar && (
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => eliminarTicketResuelto(ticket.id)}
                      title="Eliminar"
                    >
                      🗑️ Eliminar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleComentarios(ticket.id)}
                      title="Comentarios"
                    >
                      💬 Comentarios
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={esEstandar ? 8 : 9} className="text-center">
                No hay tickets resueltos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
