
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

import Encabezado from './components/Encabezado'
import Navegacion from './components/Navegacion'
import PiePagina from './components/PiePagina'
import Inicio from './pages/Inicio'
import Productos from './pages/Productos'
import Carrito from './pages/Carrito'
import AdministrarProductos from './pages/AdministrarProductos'
import productosIniciales from './data/productos.json'

function App() {
  const [productos, setProductos] = useState(() => {
    try {
      const productosGuardados = localStorage.getItem('productosFerreteria')

      if (productosGuardados !== null) {
        const productosRecuperados = JSON.parse(productosGuardados)

        if (Array.isArray(productosRecuperados)) {
          return productosRecuperados
        }
      }

      return productosIniciales
    } catch {
      return productosIniciales
    }
  })

  const [carrito, setCarrito] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem('carritoFerreteria')
      return carritoGuardado ? JSON.parse(carritoGuardado) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('productosFerreteria', JSON.stringify(productos))
  }, [productos])

  useEffect(() => {
    localStorage.setItem('carritoFerreteria', JSON.stringify(carrito))
  }, [carrito])

  const agregarProducto = (nuevoProducto) => {
    const codigoExiste = productos.some(
      (producto) => producto.codigo === nuevoProducto.codigo
    )

    if (codigoExiste) {
      return false
    }

    setProductos((productosActuales) => [
      ...productosActuales,
      nuevoProducto
    ])

    return true
  }

  const actualizarProducto = (productoActualizado) => {
    setProductos((productosActuales) =>
      productosActuales.map((producto) =>
        producto.codigo === productoActualizado.codigo
          ? productoActualizado
          : producto
      )
    )

    setCarrito((carritoActual) =>
      carritoActual
        .map((producto) => {
          if (producto.codigo !== productoActualizado.codigo) {
            return producto
          }

          if (productoActualizado.stock <= 0) {
            return null
          }

          return {
            ...productoActualizado,
            cantidad: Math.min(
              producto.cantidad,
              productoActualizado.stock
            )
          }
        })
        .filter((producto) => producto !== null)
    )
  }

  const eliminarProducto = (codigo) => {
    setProductos((productosActuales) =>
      productosActuales.filter(
        (producto) => producto.codigo !== codigo
      )
    )

    setCarrito((carritoActual) =>
      carritoActual.filter(
        (producto) => producto.codigo !== codigo
      )
    )
  }

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const productoExistente = carritoActual.find(
        (item) => item.codigo === producto.codigo
      )

      if (productoExistente) {
        if (productoExistente.cantidad >= producto.stock) {
          return carritoActual
        }

        return carritoActual.map((item) =>
          item.codigo === producto.codigo
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }

      if (producto.stock <= 0) {
        return carritoActual
      }

      return [...carritoActual, { ...producto, cantidad: 1 }]
    })
  }

  const eliminarDelCarrito = (codigo) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((producto) => producto.codigo !== codigo)
    )
  }

  const vaciarCarrito = () => {
    setCarrito([])
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
        <Navegacion carrito={carrito} />

        <Routes>
          <Route path="/" element={<Inicio />} />

          <Route
            path="/productos"
            element={
              <Productos
                productos={productos}
                agregarAlCarrito={agregarAlCarrito}
              />
            }
          />

          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                eliminarDelCarrito={eliminarDelCarrito}
                modificarCantidad={modificarCantidad}
                vaciarCarrito={vaciarCarrito}
              />
            }
          />

          <Route
            path="/administrar-productos"
            element={
              <AdministrarProductos
                productos={productos}
                agregarProducto={agregarProducto}
                actualizarProducto={actualizarProducto}
                eliminarProducto={eliminarProducto}
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
 * la navegación sin recargar completamente la página.
 *
 * Administra los estados de productos y carrito.
 *
 * Implementa las operaciones CRUD del catálogo:
 * agregar, consultar, actualizar y eliminar productos.
 *
 * Los productos se cargan desde localStorage cuando existen
 * datos guardados previamente.
 *
 * Si no hay productos guardados, se utiliza el catálogo
 * inicial del archivo productos.json.
 *
 * Cada modificación del catálogo se guarda automáticamente
 * en localStorage mediante useEffect.
 *
 * Cuando se actualiza un producto, también se actualiza
 * su información en el carrito, incluyendo precio y stock.
 *
 * Si el nuevo stock es menor que la cantidad del carrito,
 * se ajusta la cantidad al máximo disponible.
 *
 * Si el stock llega a cero, el producto se retira del carrito.
 *
 * Cuando se elimina un producto del catálogo, también
 * se elimina del carrito.
 *
 * El carrito también utiliza localStorage para conservar
 * su contenido al recargar la página.
 *
 * App.jsx coordina los componentes y las vistas
 * que conforman la aplicación.
 */
