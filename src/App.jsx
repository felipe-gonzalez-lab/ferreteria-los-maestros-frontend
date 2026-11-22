
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

import Encabezado from './components/Encabezado'
import Navegacion from './components/Navegacion'
import PiePagina from './components/PiePagina'
import Inicio from './pages/Inicio'
import Productos from './pages/Productos'
import Carrito from './pages/Carrito'

function App() {
  const [carrito, setCarrito] = useState([])
  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const productoExistente = carritoActual.find(
        (item) => item.codigo === producto.codigo
      )

      if (productoExistente) {
        return carritoActual.map((item) =>
          item.codigo === producto.codigo
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }

      return [...carritoActual, { ...producto, cantidad: 1 }]
    })
  }

  const eliminarDelCarrito = (codigo) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((producto) => producto.codigo !== codigo)
    )
  }

  const modificarCantidad = (codigo, cambio) => {
    setCarrito((carritoActual) =>
      carritoActual.map((producto) => {
        if (producto.codigo !== codigo) {
          return producto
        }

        const nuevaCantidad = producto.cantidad + cambio

        if (nuevaCantidad < 1 || nuevaCantidad > producto.stock) {
          return producto
        }

        return { ...producto, cantidad: nuevaCantidad }
      })
    )
}

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
              <Productos agregarAlCarrito={agregarAlCarrito} />
            }
          />

          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                eliminarDelCarrito={eliminarDelCarrito}
                modificarCantidad={modificarCantidad}
              />
            }
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
 */
