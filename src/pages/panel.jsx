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

  const resolverTicket = (id) => {
    const ticket = ticketsPendientes.find(ticket => ticket.id === id);

    if (ticket) {
      const nuevosTicketsPendientes = ticketsPendientes.filter(ticket => ticket.id !== id);
      setTicketsPendientes(nuevosTicketsPendientes);
      localStorage.setItem('dades_tiquets_pendents', JSON.stringify(nuevosTicketsPendientes));

      const nuevosTicketsResueltos = [...ticketsResueltos, ticket];
      setTicketsResueltos(nuevosTicketsResueltos);
      localStorage.setItem('dades_tiquets_resolts', JSON.stringify(nuevosTicketsResueltos));
    }
  };

  const handleComentarios = (id) => {
    navigate(`/comentarios/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('usuarioActual');
    navigate('/login');
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <main className="margene">
      <div className="d-flex flex-column align-items-center mt-5">
        <h1>Bienvenido, {usuario?.email}</h1>
        <button className="btn btn-danger mt-3" onClick={handleLogout}>Cerrar sesión</button>
      </div>

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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ticketsPendientes.length > 0 ? (
            ticketsPendientes.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.data}</td>
                <td>{ticket.aula}</td>
                <td>{ticket.grup}</td>
                <td>{ticket.ordinador}</td>
                <td>{ticket.descripcio}</td>
                <td>{ticket.alumne}</td>
                <td>
                  <button className="btn btn-success me-2" onClick={() => resolverTicket(ticket.id)}>Resolver</button>
                  <button 
  className="btn btn-warning me-2" 
  onClick={() => navigate('/tiquet')}
>
  Crear Tiquet
</button>

                  <button className="btn btn-primary me-2" onClick={() => handleComentarios(ticket.id)}>Comentarios</button>
                  <button className="btn btn-danger" onClick={() => eliminarTicket(ticket.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No hay tickets pendientes</td>
            </tr>
          )}
        </tbody>
      </table>

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
          </tr>
        </thead>
        <tbody>
          {ticketsResueltos.length > 0 ? (
            ticketsResueltos.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.data}</td>
                <td>{ticket.dataResolucio}</td>
                <td>{ticket.aula}</td>
                <td>{ticket.grup}</td>
                <td>{ticket.ordinador}</td>
                <td>{ticket.descripcio}</td>
                <td>{ticket.alumne}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No hay tickets resueltos</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
