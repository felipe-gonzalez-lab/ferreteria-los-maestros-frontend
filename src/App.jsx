
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
import CompraFallida from './pages/CompraFallida'
import Ofertas from './pages/Ofertas'
import productosIniciales from './data/productos.json'

function recuperarProductos() {
  try {
    const productosGuardados = localStorage.getItem('productosFerreteria')

    if (productosGuardados !== null) {
      const productosRecuperados = JSON.parse(productosGuardados)

      if (Array.isArray(productosRecuperados)) {
        return productosRecuperados.map((producto) => {
          const productoOriginal = productosIniciales.find(
            (item) => item.codigo === producto.codigo
          )

          return {
            ...producto,
            descuento:
              producto.descuento !== undefined
                ? producto.descuento
                : productoOriginal?.descuento ?? 0
          }
        })
      }
    }

    return productosIniciales
  } catch {
    return productosIniciales
  }
}

function recuperarCarrito(productos) {
  try {
    const carritoGuardado = localStorage.getItem('carritoFerreteria')

    if (!carritoGuardado) {
      return []
    }

    const carritoRecuperado = JSON.parse(carritoGuardado)

    if (!Array.isArray(carritoRecuperado)) {
      return []
    }

    return carritoRecuperado
      .map((itemCarrito) => {
        const productoActual = productos.find(
          (producto) => producto.codigo === itemCarrito.codigo
        )

        if (!productoActual || productoActual.stock <= 0) {
          return null
        }

        const cantidadGuardada = Number(itemCarrito.cantidad)

        if (!Number.isInteger(cantidadGuardada) || cantidadGuardada < 1) {
          return null
        }

        return {
          ...productoActual,
          cantidad: Math.min(
            cantidadGuardada,
            productoActual.stock
          )
        }
      })
      .filter((producto) => producto !== null)
  } catch {
    return []
  }
}

function App() {
  const [productos, setProductos] = useState(recuperarProductos)

  const [carrito, setCarrito] = useState(() =>
    recuperarCarrito(productos)
  )

  useEffect(() => {
    localStorage.setItem(
      'productosFerreteria',
      JSON.stringify(productos)
    )
  }, [productos])

  useEffect(() => {
    localStorage.setItem(
      'carritoFerreteria',
      JSON.stringify(carrito)
    )
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
      {
        ...nuevoProducto,
        descuento: nuevoProducto.descuento ?? 0
      }
    ])

    return true
  }

  const actualizarProducto = (productoActualizado) => {
    setProductos((productosActuales) =>
      productosActuales.map((producto) =>
        producto.codigo === productoActualizado.codigo
          ? {
              ...producto,
              ...productoActualizado,
              descuento:
                productoActualizado.descuento ??
                producto.descuento ??
                0
            }
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
            ...producto,
            ...productoActualizado,
            descuento:
              productoActualizado.descuento ??
              producto.descuento ??
              0,
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
    const productoActual = productos.find(
      (item) => item.codigo === producto.codigo
    )

    if (!productoActual || productoActual.stock <= 0) {
      return
    }

    setCarrito((carritoActual) => {
      const productoExistente = carritoActual.find(
        (item) => item.codigo === productoActual.codigo
      )

      if (productoExistente) {
        if (productoExistente.cantidad >= productoActual.stock) {
          return carritoActual
        }

        return carritoActual.map((item) =>
          item.codigo === productoActual.codigo
            ? {
                ...productoActual,
                cantidad: item.cantidad + 1
              }
            : item
        )
      }

      return [
        ...carritoActual,
        {
          ...productoActual,
          cantidad: 1
        }
      ]
    })
  }

  const eliminarDelCarrito = (codigo) => {
    setCarrito((carritoActual) =>
      carritoActual.filter(
        (producto) => producto.codigo !== codigo
      )
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

        if (
          nuevaCantidad < 1 ||
          nuevaCantidad > producto.stock
        ) {
          return producto
        }

        return {
          ...producto,
          cantidad: nuevaCantidad
        }
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
          <Route
            path="/"
            element={<Inicio />}
          />

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
            path="/ofertas"
            element={
              <Ofertas productos={productos} />
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

          <Route
            path="/registro"
            element={<Registro />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

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

          <Route
            path="/compra-fallida"
            element={<CompraFallida />}
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
 * Organiza las páginas de la aplicación
 * utilizando React Router.
 *
 * Administra el catálogo de productos
 * y el carrito mediante useState.
 *
 * recuperarProductos obtiene el catálogo
 * guardado en localStorage.
 *
 * Cuando un producto antiguo no tiene descuento,
 * recupera el valor inicial desde productos.json.
 *
 * recuperarCarrito obtiene los productos guardados
 * y los sincroniza con el catálogo actualizado.
 *
 * La sincronización permite recuperar precios,
 * descuentos y stock vigentes al recargar la página.
 *
 * Si un producto fue eliminado del catálogo
 * o ya no tiene stock, se retira del carrito.
 *
 * Si la cantidad guardada supera el stock,
 * se ajusta a la disponibilidad actual.
 *
 * Conserva las operaciones CRUD de productos:
 * agregar, actualizar y eliminar.
 *
 * Cuando se edita un producto desde el administrador,
 * se actualiza también su información en el carrito.
 *
 * agregarAlCarrito utiliza los datos más recientes
 * del catálogo y respeta el stock disponible.
 *
 * El carrito permite agregar y eliminar productos,
 * modificar cantidades y vaciar su contenido.
 *
 * Los cambios del catálogo y del carrito
 * se conservan mediante localStorage.
 *
 * Incorpora las páginas de registro,
 * inicio de sesión y administración de productos.
 *
 * Incluye las páginas de Ofertas,
 * Checkout, Compra exitosa y Compra fallida.
 *
 * confirmarPedido registra pedidos simulados
 * y guarda el último pedido confirmado.
 *
 * El carrito se vacía después de registrar
 * correctamente el pedido.
 *
 * Los descuentos se calculan actualmente
 * en los componentes de presentación y compra.
 *
 * Posteriormente se centralizará ese cálculo
 * para mantener una única regla de precios.
 *
 * No realiza pagos reales ni utiliza un servidor.
 */
