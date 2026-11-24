
import { Link } from 'react-router-dom'

function CompraExitosa() {
  let pedido = null

  try {
    const pedidoGuardado = localStorage.getItem('ultimoPedidoFerreteria')

    if (pedidoGuardado) {
      pedido = JSON.parse(pedidoGuardado)
    }
  } catch {
    pedido = null
  }

  if (
    !pedido ||
    !pedido.cliente ||
    !pedido.entrega ||
    !Array.isArray(pedido.productos)
  ) {
    return (
      <main className="container py-5">
        <div className="alert alert-warning" role="alert">
          No se encontró un pedido confirmado para mostrar.
        </div>

        <Link to="/productos" className="btn btn-primary">
          Volver a productos
        </Link>
      </main>
    )
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">

          <div className="alert alert-success" role="status">
            <h2 className="h4 mb-2">
              ¡Pedido registrado correctamente!
            </h2>

            <p className="mb-0">
              Tu solicitud de compra fue registrada
              en nuestro sistema de demostración.
            </p>
          </div>

          <div className="border rounded bg-white p-4 mb-4">
            <h3 className="h5 mb-3">
              Información del pedido
            </h3>

            <p>
              <strong>Número de pedido:</strong>{' '}
              {pedido.id}
            </p>

            <p>
              <strong>Fecha:</strong>{' '}
              {new Date(pedido.fecha).toLocaleString('es-CL')}
            </p>

            <p className="mb-0">
              <strong>Estado:</strong>{' '}
              {pedido.estado}
            </p>
          </div>

          <div className="border rounded bg-white p-4 mb-4">
            <h3 className="h5 mb-3">
              Datos del cliente
            </h3>

            <p>
              <strong>Nombre:</strong>{' '}
              {pedido.cliente.nombre}{' '}
              {pedido.cliente.apellido}
            </p>

            <p>
              <strong>Correo:</strong>{' '}
              {pedido.cliente.correo}
            </p>

            <p className="mb-0">
              <strong>Teléfono:</strong>{' '}
              {pedido.cliente.telefono}
            </p>
          </div>

          <div className="border rounded bg-white p-4 mb-4">
            <h3 className="h5 mb-3">
              Información de entrega
            </h3>

            <p>
              <strong>Modalidad:</strong>{' '}
              {pedido.entrega.tipo === 'despacho'
                ? 'Despacho a domicilio'
                : 'Retiro en tienda'}
            </p>

            {pedido.entrega.tipo === 'despacho' && (
              <>
                <p>
                  <strong>Dirección:</strong>{' '}
                  {pedido.entrega.direccion}
                </p>

                <p>
                  <strong>Comuna:</strong>{' '}
                  {pedido.entrega.comuna}
                </p>
              </>
            )}

            {pedido.observaciones && (
              <p className="mb-0">
                <strong>Observaciones:</strong>{' '}
                {pedido.observaciones}
              </p>
            )}
          </div>

          <div className="border rounded bg-white p-4 mb-4">
            <h3 className="h5 mb-3">
              Resumen de productos
            </h3>

            <div className="table-responsive">
              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio unitario</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {pedido.productos.map((producto) => (
                    <tr key={producto.codigo}>
                      <td>{producto.nombre}</td>

                      <td>
                        ${producto.precioVenta.toLocaleString('es-CL')}
                      </td>

                      <td>{producto.cantidad}</td>

                      <td>
                        ${(producto.precioVenta * producto.cantidad)
                          .toLocaleString('es-CL')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-end mt-3">
              <h3 className="h5">
                Total: ${pedido.total.toLocaleString('es-CL')}
              </h3>
            </div>
          </div>

          <div className="alert alert-info">
            Este pedido es una simulación académica.
            No se ha realizado ningún pago real ni
            se ha solicitado un despacho.
          </div>

          <Link to="/productos" className="btn btn-primary">
            Seguir comprando
          </Link>

        </div>
      </div>
    </main>
  )
}

export default CompraExitosa

/*
 * CompraExitosa.jsx - Página de confirmación del pedido.
 *
 * Recupera desde localStorage la información del
 * último pedido registrado en la aplicación.
 *
 * Muestra el identificador, fecha y estado del pedido.
 *
 * Presenta los datos del cliente y la modalidad
 * de entrega seleccionada.
 *
 * Muestra una tabla con los productos comprados,
 * sus cantidades, precios y subtotales.
 *
 * Calcula y presenta el total registrado del pedido.
 *
 * Si no existe un pedido guardado, muestra un aviso
 * y permite regresar al catálogo.
 *
 * Incluye un enlace para continuar comprando.
 *
 * Esta página forma parte de una simulación académica.
 * No confirma pagos reales ni despachos.
 */
