
import { useState } from 'react'
import FormularioProducto from '../components/FormularioProducto'

function AdministrarProductos({
  productos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto
}) {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)

  const confirmarEliminacion = (producto) => {
    const confirmado = window.confirm(
      `¿Estás seguro de que deseas eliminar el producto "${producto.nombre}" (${producto.codigo})?`
    )

    if (!confirmado) {
      return
    }

    eliminarProducto(producto.codigo)

    if (productoSeleccionado?.codigo === producto.codigo) {
      setProductoSeleccionado(null)
    }

    alert('Producto eliminado correctamente.')
  }

  return (
    <main className="container py-5">
      <h2>Administración de productos</h2>

      <p className="lead">
        Gestiona los productos disponibles en la ferretería.
      </p>

      <FormularioProducto
        agregarProducto={agregarProducto}
        actualizarProducto={actualizarProducto}
        productoSeleccionado={productoSeleccionado}
        setProductoSeleccionado={setProductoSeleccionado}
      />

      {productoSeleccionado && (
        <div className="alert alert-info" role="status">
          Producto seleccionado para editar:
          <strong> {productoSeleccionado.nombre}</strong>
          {' '}({productoSeleccionado.codigo})
        </div>
      )}

      <p>
        Total de productos: <strong>{productos.length}</strong>
      </p>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Código</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((producto) => (
              <tr key={producto.codigo}>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>
                  ${producto.precioVenta.toLocaleString('es-CL')}
                </td>
                <td>{producto.stock}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setProductoSeleccionado(producto)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => confirmarEliminacion(producto)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default AdministrarProductos

/*
 * AdministrarProductos.jsx - Administración del catálogo.
 *
 * Muestra los productos disponibles en una tabla.
 *
 * Permite seleccionar productos para editarlos mediante
 * el componente FormularioProducto.
 *
 * Incorpora un botón Eliminar para cada producto.
 * Antes de eliminar, solicita confirmación al usuario.
 *
 * Si el producto eliminado estaba seleccionado para editar,
 * se limpia la selección para evitar editar un producto inexistente.
 *
 * La eliminación se realiza mediante la función eliminarProducto,
 * recibida desde App.jsx.
 */
