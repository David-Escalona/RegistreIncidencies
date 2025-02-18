export default function Login() {
    return (
      <>
        <main className="container mt-5">
          <div className="pt-5">
            <h1 className="w-100 text-center">Login</h1>
            <form
              action=""
              className="form p-4 border shadow bordered mt-5 mx-auto"
              style={{ width: "400px" }}
            >
              <label htmlFor="email" className="mt-2 form-label">
                User:{" "}
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="usuario@mail.com"
              />
  
              <label htmlFor="pass" className="mt-2 form-label">
                Contraseña:{" "}
              </label>
              <input type="password" className="form-control" />
  
              <input
                type="submit"
                className="mt-4 w-100 btn btn-primary"
                value="Entrar"
                id="enviar"
              />
            </form>
          </div>
        </main>
  
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Observaciones
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Código incidencia: <span>123546</span>
                </p>
                <label htmlFor="comentario" className="form-label">
                  Comentario:
                </label>
                <input
                  className="form-control"
                  defaultValue="Este es un comentario sobre esta incidencia"
                />
                <p className="small text-end">
                  Autor: <span>Pepe Loco</span>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary">
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }