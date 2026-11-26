
import { Link } from 'react-router-dom'
import { calcularPrecioFinal } from '../utils/precios'

function Carrito({ carrito, eliminarDelCarrito, modificarCantidad, vaciarCarrito }) {
  const total = carrito.reduce(
    (acumulador, producto) =>
      acumulador + calcularPrecioFinal(producto) * producto.cantidad,
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
                {carrito.map((producto) => {
                  const descuento = Number(producto.descuento) || 0
                  const tieneDescuento =
                    descuento > 0 && descuento <= 100

                  const precioFinal = calcularPrecioFinal(producto)

                  return (
                    <tr key={producto.codigo}>
                      <td>
                        {producto.nombre}

                        {tieneDescuento && (
                          <div className="mt-1">
                            <span className="badge bg-danger">
                              {descuento}% de descuento
                            </span>
                          </div>
                        )}
                      </td>

                      <td>
                        {tieneDescuento && (
                          <div className="text-muted small text-decoration-line-through">
                            ${producto.precioVenta.toLocaleString('es-CL')}
                          </div>
                        )}

                        <span className={tieneDescuento ? 'text-success fw-bold' : ''}>
                          ${precioFinal.toLocaleString('es-CL')}
                        </span>
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
                        ${(precioFinal * producto.cantidad)
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
                  )
                })}
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
 * Importa calcularPrecioFinal desde utils/precios.js
 * para aplicar los descuentos del catálogo.
 *
 * Muestra el porcentaje de descuento y el
 * precio original tachado cuando corresponde.
 *
 * Calcula subtotales y total utilizando
 * el precio final de cada producto.
 *
 * Los productos sin descuento mantienen
 * sus precios habituales.
 *
 * Permite aumentar y disminuir cantidades
 * respetando el stock disponible.
 *
 * Permite eliminar productos individualmente
 * o vaciar el carrito con confirmación.
 *
 * Conserva el botón Finalizar compra
 * que navega a /checkout.
 *
 * La función compartida permite mantener
 * consistentes los cálculos de precios
 * entre las distintas páginas del sitio.
 */
