import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Comentarios() {
  const [comentarios, setComentarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedComentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    setComentarios(storedComentarios);
  }, []);

  return (
    <div className="container-lg mt-5">
      <main className="w-100 mx-auto" style={{ maxWidth: "80%" }}>
        <div className="d-flex align-items-center">
          <h1 className="text-primary">Todos los Comentarios</h1>
          <button className="btn btn-outline-secondary ms-auto" onClick={() => navigate(-1)}>
            &lt; Volver
          </button>
        </div>

        <div className="mt-5 w-100 mx-auto" style={{ maxWidth: "80%" }}>
          {comentarios.length > 0 ? (
            comentarios.map((comentario, index) => (
              <div key={index} className="card p-4 mt-3 shadow-sm">
                <h5 className="text-primary">{comentario.titulo}</h5>
                <div className="d-flex justify-content-between text-muted">
                  <span>Autor: {comentario.autor}</span>
                  <span>{new Date(comentario.fecha).toLocaleString()}</span>
                </div>
                <p className="mt-2">{comentario.comentario}</p>
              </div>
            ))
          ) : (
            <p className="text-muted">No hay comentarios registrados.</p>
          )}
        </div>
      </main>
    </div>
  );
}
