
function Carrito({ carrito, eliminarDelCarrito, modificarCantidad }) {
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

          <div className="text-end mt-4">
            <h3>
              Total: ${total.toLocaleString('es-CL')}
            </h3>
          </div>
        </>
      )}
    </main>
  )
}

export default Carrito
