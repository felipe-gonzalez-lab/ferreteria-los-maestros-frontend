
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <div className="min-vh-100 bg-light text-dark">
      <header className="bg-dark text-white py-3">
        <div className="container">
          <h1 className="h3 mb-0">Ferretería Los Maestros</h1>
        </div>
      </header>

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

      <main className="container py-5">
        <section id="inicio" className="mb-5">
          <h2>Bienvenido a Ferretería Los Maestros</h2>
          <p className="lead">
            Materiales de construcción, herramientas y artículos de
            ferretería para tus proyectos.
          </p>
          <a href="#productos" className="btn btn-primary">
            Ver productos
          </a>
        </section>

        <section id="productos" className="mb-5">
          <h2>Nuestros productos</h2>
          <p>Próximamente encontrarás nuestro catálogo de productos.</p>
        </section>

        <section id="nosotros" className="mb-5">
          <h2>Sobre nosotros</h2>
          <p>
            Somos una ferretería familiar ubicada en La Serena,
            con 22 años de trayectoria.
          </p>
        </section>

        <section id="contacto">
          <h2>Contacto</h2>
          <p>Estamos disponibles para ayudarte con tus proyectos.</p>
        </section>
      </main>

      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">
          © 2026 Ferretería Los Maestros
        </p>
      </footer>
    </div>
  )
}

export default App
