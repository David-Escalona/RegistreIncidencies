import { login } from "../vistas/login"
import { panel } from "../vistas/panel"
import { registro } from "../vistas/registro"

export const header = {
    template: // html
    `
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">Gestión de incidencias FPLLEFIA</a>
        <div>
          <button id="login" class="btn btn-secondary ms-2">LOGIN</button>
          <button id="registro" class="btn btn-secondary ms-2">REGISTRO</button>
        </div>
        <div>
          <span id="correo">administrador@fpllefia.com</span>
          <button id="cierreSesion" class="btn btn-secondary ms-2 me-2 d-none">CERRAR SESIÓN</button> 
        </div>
      </div>
    </nav>
    `,
    script: () => {
      // let usuarios = []

      // localStorage.setItem("usuarios", JSON.stringify(usuarios))
      let usuarios = localStorage.getItem("usuarios")

      if (usuarios) {
        usuarios = JSON.parse(usuarios)
      } else {
        usuarios = []
      } 

      localStorage.setItem("usuarios", JSON.stringify(usuarios))
      
      for(let i=0 ; i < usuarios.length ; i++){
        if(usuarios[i].login == 1){
          document.querySelector('main').innerHTML = panel.template
          panel.script()
          document.querySelector('#correo').innerHTML = usuarios[i].email
        }
      }

      document.querySelector('#login').addEventListener('click', () => {
          document.querySelector('main').innerHTML = login.template
          login.script()
      })

      document.querySelector('#registro').addEventListener('click', () => {
          document.querySelector('main').innerHTML = registro.template
          registro.script()
      })
    }
}