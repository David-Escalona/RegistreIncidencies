import { useState, useEffect } from 'react';

export default function TiquetsResolts() {
  const [tiquetsResolts, setTiquetsResolts] = useState([]);

  useEffect(() => {
    const tiquetsResoltsData = JSON.parse(localStorage.getItem('dades_tiquets'))?.filter(tiquet => tiquet.status === 'resuelto') || [];
    setTiquetsResolts(tiquetsResoltsData);
  }, []);

  return (
    <div>
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
          {tiquetsResolts.map(tiquet => (
            <tr key={tiquet.id}>
              <td>{tiquet.id}</td>
              <td>{tiquet.fecha}</td>
              <td>{tiquet.fechaResuelto}</td>
              <td>{tiquet.aula}</td>
              <td>{tiquet.grupo}</td>
              <td>{tiquet.ordenador}</td>
              <td>{tiquet.descripcion}</td>
              <td>{tiquet.alumno}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
