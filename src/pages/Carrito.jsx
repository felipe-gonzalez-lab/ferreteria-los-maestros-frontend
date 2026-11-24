
import { Link } from 'react-router-dom'

function Carrito({ carrito, eliminarDelCarrito, modificarCantidad, vaciarCarrito }) {
  const total = carrito.reduce(
    (acumulador, producto) =>
      acumulador + producto.precioVenta * producto.cantidad,
    0
  )

  return (
    <main className="container py-5">
      <h2>Carrito de compras</h2>

      <p className="lead">
        Revisa los productos que deseas comprar.
      </p>

      {carrito.length === 0 ? (
        <div className="alert alert-info" role="status">
          Tu carrito de compras está vacío.
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio unitario</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {carrito.map((producto) => (
                  <tr key={producto.codigo}>
                    <td>{producto.nombre}</td>

                    <td>
                      ${producto.precioVenta.toLocaleString('es-CL')}
                    </td>

                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => modificarCantidad(producto.codigo, -1)}
                          disabled={producto.cantidad <= 1}
                          aria-label={`Disminuir cantidad de ${producto.nombre}`}
                        >
                          −
                        </button>

                        <span>{producto.cantidad}</span>

                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => modificarCantidad(producto.codigo, 1)}
                          disabled={producto.cantidad >= producto.stock}
                          aria-label={`Aumentar cantidad de ${producto.nombre}`}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td>
                      ${(producto.precioVenta * producto.cantidad)
                        .toLocaleString('es-CL')}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => eliminarDelCarrito(producto.codigo)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => {
                if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
                  vaciarCarrito()
                }
              }}
            >
              Vaciar carrito
            </button>

            <h3 className="mb-0">
              Total: ${total.toLocaleString('es-CL')}
            </h3>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <Link to="/checkout" className="btn btn-primary">
              Finalizar compra
            </Link>
          </div>
        </>
      )}
    </main>
  )
}

export default Carrito

/*
 * Carrito.jsx - Página del carrito de compras.
 *
 * Muestra los productos agregados al carrito,
 * sus precios, cantidades y subtotales.
 *
 * Permite aumentar o disminuir cantidades,
 * respetando el stock disponible.
 *
 * Permite eliminar productos individualmente
 * o vaciar completamente el carrito con confirmación.
 *
 * Calcula automáticamente el total de la compra.
 *
 * Incorpora el botón Finalizar compra, que utiliza
 * Link de React Router para navegar a /checkout
 * sin recargar completamente la página.
 *
 * El botón solamente aparece cuando el carrito
 * contiene productos.
 *
 * La confirmación definitiva del pedido
 * se implementará en los siguientes pasos.
 */
