function Navegacion() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container">
        <span className="navbar-brand">Los Maestros</span>

        <div className="d-flex flex-wrap gap-3">
          <a className="nav-link" href="#inicio">Inicio</a>
          <a className="nav-link" href="#productos">Productos</a>
          <a className="nav-link" href="#nosotros">Nosotros</a>
          <a className="nav-link" href="#contacto">Contacto</a>
        </div>
      </div>
    </nav>
  )
}

export default Navegacion
