import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Panel() {
  const navigate = useNavigate();

  // Comprobar si el usuario está logueado, si no, redirigir al login
  useEffect(() => {
    const user = localStorage.getItem('usuarioActual');
    if (!user) {
      navigate('/login'); // Redirigir al login si no hay usuario logueado
    }
  }, [navigate]);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('usuarioActual'); // Eliminar la sesión de localStorage
    navigate('/login'); // Redirigir al login
  };

  return (
    <>
      <main className="container mt-5">
        <h1>Administración de incidencias</h1>

        {/* Botón para cerrar sesión */}
        <button
          className="btn btn-danger mt-4"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>

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
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>123459</td>
              <td>18/04/2023</td>
              <td>T6</td>
              <td>DAW1</td>
              <td>PC3</td>
              <td>Error de impresora</td>
              <td>Ana Martínez</td>
              <td>
                <button className="btn btn-success" title="Resolver ticket">Resolver</button>
              </td>
              <td>
                <button className="btn btn-warning" title="Añadir comentario">
                  <i className="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                </button>
              </td>
              <td>
                <button className="btn btn-info" title="Ver comentarios">
                  <i className="bi bi-chat-left-text"></i>
                </button>
              </td>
              <td>
                <button className="btn btn-danger" title="Eliminar ticket">
                  <i className="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
            {/* Aquí puedes añadir más tickets como en tu ejemplo */}
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
            <tr>
              <td>123457</td>
              <td>16/04/2023</td>
              <td>15/05/2023</td>
              <td>T7</td>
              <td>DAW2</td>
              <td>PC1</td>
              <td>Problema de conexión a Internet</td>
              <td>Maria López</td>
              <td>
                <button className="btn btn-info" title="Ver comentarios">
                  <i className="bi bi-chat-left-text"></i>
                </button>
              </td>
              <td>
                <button className="btn btn-danger" title="Eliminar ticket">
                  <i className="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
            {/* Aquí puedes añadir más tickets resueltos */}
          </tbody>
        </table>
      </main>

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Observaciones</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Código incidencia: <span>123546</span></p>
              <label htmlFor="comentario" className="form-label">Comentario:</label>
              <input className="form-control" defaultValue="Este es un comentario sobre esta incidencia" />
              <p className="small text-end">Autor: <span>Pepe Loco</span></p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary">Guardar cambios</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
