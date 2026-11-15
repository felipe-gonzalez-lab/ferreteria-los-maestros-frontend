
import { NavLink } from 'react-router-dom'

function Navegacion() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container">
        <span className="navbar-brand">Los Maestros</span>

        <div className="d-flex flex-wrap gap-3">
          <NavLink className="nav-link" to="/">
            Inicio
          </NavLink>

          <NavLink className="nav-link" to="/productos">
            Productos
          </NavLink>

          <NavLink className="nav-link" to="/nosotros">
            Nosotros
          </NavLink>

          <NavLink className="nav-link" to="/contacto">
            Contacto
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navegacion
