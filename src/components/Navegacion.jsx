
import { NavLink } from 'react-router-dom'

function Navegacion({ carrito }) {
  const cantidadCarrito = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  )

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

          <NavLink className="nav-link" to="/carrito">
            Carrito ({cantidadCarrito})
          </NavLink>

          <NavLink className="nav-link" to="/administrar-productos">
            Administrar productos
          </NavLink>
          
        </div>
      </div>
    </nav>
  )
}

export default Navegacion

/*
 * Navegacion.jsx - Barra de navegación de Ferretería Los Maestros.
 *
 * Muestra los enlaces que permiten al usuario desplazarse
 * entre las distintas páginas del sitio web.
 *
 * Utiliza NavLink de React Router para navegar sin recargar
 * completamente la página y reconocer la ruta activa.
 *
 * Es un componente reutilizable que se integra en App.jsx,
 * donde se encuentran definidas las rutas de la aplicación.
 */
