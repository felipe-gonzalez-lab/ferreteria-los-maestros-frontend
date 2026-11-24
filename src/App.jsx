
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
import Registro from './pages/Registro'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import CompraExitosa from './pages/CompraExitosa'
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

  const confirmarPedido = (pedido) => {
    if (carrito.length === 0) {
      return false
    }

    try {
      const pedidosGuardados = localStorage.getItem('pedidosFerreteria')

      const pedidos = pedidosGuardados
        ? JSON.parse(pedidosGuardados)
        : []

      if (!Array.isArray(pedidos)) {
        return false
      }

      const pedidoConfirmado = {
        ...pedido,
        id: crypto.randomUUID(),
        fecha: new Date().toISOString(),
        estado: 'confirmado'
      }

      localStorage.setItem(
        'pedidosFerreteria',
        JSON.stringify([...pedidos, pedidoConfirmado])
      )

      localStorage.setItem(
        'ultimoPedidoFerreteria',
        JSON.stringify(pedidoConfirmado)
      )

      setCarrito([])

      return true
    } catch {
      return false
    }
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

          <Route path="/registro" element={<Registro />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/checkout"
            element={
              <Checkout
                carrito={carrito}
                confirmarPedido={confirmarPedido}
              />
            }
          />

          <Route
            path="/compra-exitosa"
            element={<CompraExitosa />}
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
 * Organiza la estructura general del sitio web mediante
 * React Router, componentes y diferentes páginas.
 *
 * Administra los estados de productos y carrito.
 *
 * Implementa las operaciones CRUD de productos:
 * agregar, consultar, actualizar y eliminar.
 *
 * Mantiene sincronizada la información del catálogo
 * con los productos que se encuentran en el carrito.
 *
 * Los productos y el carrito utilizan localStorage
 * para conservar sus datos al recargar la aplicación.
 *
 * Incorpora las páginas de registro de usuarios,
 * inicio de sesión de demostración y checkout.
 *
 * La función confirmarPedido recibe los datos
 * del formulario de checkout.
 *
 * Registra cada pedido simulado en localStorage,
 * asignándole un identificador, una fecha y un estado.
 *
 * También guarda el último pedido confirmado
 * para mostrar posteriormente su resumen.
 *
 * Si el pedido se registra correctamente,
 * se vacía el carrito de compras.
 *
 * Incorpora la ruta /compra-exitosa para mostrar
 * los datos del último pedido registrado.
 *
 * La navegación automática hacia esa página
 * se implementará desde Checkout.jsx.
 *
 * No se procesan pagos reales ni se envían
 * pedidos a un servidor.
 */
