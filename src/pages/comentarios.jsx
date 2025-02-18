export default function Comentarios() {
    return (
      <>
        <main className="container mt-5">
          <div className="d-flex">
            <h1>Comentarios</h1>
            <button className="btn btn-link ms-auto"> &lt; Volver</button>
          </div>
          
          <h2 className="my-4">Código ticket: <span>123456</span></h2>
          <div>
            <form action="" className="form card p-3 shadow">
              <label htmlFor="comentario" className="form-label">Comentario: </label>
              <textarea className="form-control" cols="3"></textarea>
              <label htmlFor="fecha" className="form-label me-2 mt-3">Fecha: </label>
              <div className="d-flex align-items-center">
                <input type="datetime-local" className="form-control w-25" />
                <button className="btn btn-success ms-auto">Añadir comentario</button>
              </div>
            </form>
  
            <div className="mt-4">
              <div className="card p-3">
                <h5 className="text-end">Autor: <span>Javier Caraculo</span><span className="ms-4">12/10/2022</span></h5>
                <p>Este es un comentario Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit amet dignissimos laudantium blanditiis fuga recusandae sed culpa, earum pariatur repellat esse provident eaque totam quo sint iste, inventore deleniti quis.</p>
              </div>
              <div className="card p-3 mt-2">
                <h5 className="text-end">Autor: <span>Javier Caraculo</span><span className="ms-4">12/10/2022</span></h5>
                <p>Este es un comentario Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit amet dignissimos laudantium blanditiis fuga recusandae sed culpa, earum pariatur repellat esse provident eaque totam quo sint iste, inventore deleniti quis.</p>
              </div>
              <div className="card p-3 mt-2">
                <h5 className="text-end">Autor: <span>Javier Caraculo</span><span className="ms-4">12/10/2022</span></h5>
                <p>Este es un comentario Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit amet dignissimos laudantium blanditiis fuga recusandae sed culpa, earum pariatur repellat esse provident eaque totam quo sint iste, inventore deleniti quis.</p>
              </div>
              <div className="card p-3 mt-2">
                <h5 className="text-end">Autor: <span>Javier Caraculo</span><span className="ms-4">12/10/2022</span></h5>
                <p>Este es un comentario Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit amet dignissimos laudantium blanditiis fuga recusandae sed culpa, earum pariatur repellat esse provident eaque totam quo sint iste, inventore deleniti quis.</p>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }