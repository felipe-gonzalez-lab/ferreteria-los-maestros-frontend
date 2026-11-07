
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Encabezado from './components/Encabezado'
import PiePagina from './components/PiePagina'
import Navegacion from './components/Navegacion'

function App() {
  return (
    <div className="min-vh-100 bg-light text-dark">
      <Encabezado />

      <Navegacion />

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

      <PiePagina />
    </div>
  )
}

export default App
