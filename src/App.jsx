
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { useState } from 'react'

import Encabezado from './components/Encabezado'
import Navegacion from './components/Navegacion'
import PiePagina from './components/PiePagina'
import Inicio from './pages/Inicio' 
import Productos from './pages/Productos'
import Carrito from './pages/Carrito'

function App() {
  const [carrito, setCarrito] = useState([])
  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-light text-dark">
        <Encabezado />
        <Navegacion />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/productos"
            element={
              <Productos
                carrito={carrito}
                setCarrito={setCarrito}
              />
            }
          />
          <Route
            path="/carrito"
            element={<Carrito carrito={carrito} />}
          />
        </Routes>

        <PiePagina />
      </div>
    </BrowserRouter>
  )
}

export default App




/*
 * App.jsx - Componente principal de Ferretería Los Maestros.
 *
 * Organiza la estructura general del sitio web, integrando
 * el encabezado, la navegación, las páginas y el pie de página.
 *
 * Utiliza React Router para gestionar las rutas y permitir
 * la navegación entre Inicio, Productos y Carrito sin
 * recargar completamente la página.
 *
 * Actúa como punto central de organización de los componentes
 * y las vistas de la aplicación.
 * 
 * Importante: App.jsx no contiene necesariamente toda la lógica del sitio. 
 * Su función principal es coordinar los componentes que conforman la aplicación.
 * 
 */