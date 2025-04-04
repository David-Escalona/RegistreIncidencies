import { useState, useEffect } from 'react';

export default function TiquetsPendents() {
  const [tiquetsPendents, setTiquetsPendents] = useState([]);

  useEffect(() => {
    const tiquetsPendentsData = JSON.parse(localStorage.getItem('dades_tiquets'))?.filter(tiquet => tiquet.status === 'pendiente') || [];
    setTiquetsPendents(tiquetsPendentsData);
  }, []);

  return (
    <div>
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
          {tiquetsPendents.map(tiquet => (
            <tr key={tiquet.id}>
              <td>{tiquet.id}</td>
              <td>{tiquet.fecha}</td>
              <td>{tiquet.aula}</td>
              <td>{tiquet.grupo}</td>
              <td>{tiquet.ordenador}</td>
              <td>{tiquet.descripcion}</td>
              <td>{tiquet.alumno}</td>
              <td>
                <button className="btn btn-success" title="Resolver ticket">Resolver</button>
              </td>
              <td>
              </td>
              <td>
                <button className="btn btn-warning" title="Añadir comentario">
                  <i className="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                </button>
              </td>
              <td>
                <button className="btn btn-info" title="Ver comentarios"><i className="bi bi-chat-left-text"></i></button>
              </td>
              <td>
                <button className="btn btn-danger" title="Eliminar ticket"><i className="bi bi-trash3"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
