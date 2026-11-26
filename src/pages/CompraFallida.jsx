
import { Link } from 'react-router-dom'

function CompraFallida() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-9 col-lg-7">

          <div className="alert alert-danger" role="alert">
            <h2 className="h4 mb-3">
              No se pudo registrar el pedido
            </h2>

            <p className="mb-0">
              Ocurrió un problema al intentar registrar
              tu solicitud de compra.
            </p>
          </div>

          <div className="border rounded bg-white p-4 mb-4">
            <h3 className="h5 mb-3">
              ¿Qué puedes hacer?
            </h3>

            <p>
              Puedes regresar al checkout para revisar
              los datos ingresados e intentar nuevamente.
            </p>

            <p>
              Si el problema continúa, puedes volver
              al carrito y revisar los productos seleccionados.
            </p>

            <p className="mb-0 text-muted">
              Si el pedido no pudo registrarse,
              los productos permanecen en el carrito.
            </p>
          </div>

          <div className="d-flex flex-wrap gap-3">
            <Link
              to="/checkout"
              className="btn btn-primary"
            >
              Intentar nuevamente
            </Link>

            <Link
              to="/carrito"
              className="btn btn-outline-secondary"
            >
              Volver al carrito
            </Link>

            <Link
              to="/productos"
              className="btn btn-outline-secondary"
            >
              Ver productos
            </Link>
          </div>

          <div className="alert alert-info mt-4">
            Esta aplicación es una simulación académica.
            No se realizan pagos reales ni transacciones bancarias.
          </div>

        </div>
      </div>
    </main>
  )
}

export default CompraFallida

/*
 * CompraFallida.jsx - Página de error al registrar pedidos.
 *
 * Informa al usuario cuando no es posible
 * registrar una solicitud de compra.
 *
 * Permite regresar al checkout para
 * intentar registrar nuevamente el pedido.
 *
 * También ofrece enlaces para volver
 * al carrito o consultar el catálogo.
 *
 * Utiliza Link de React Router para navegar
 * sin recargar completamente la aplicación.
 *
 * Esta página no procesa pagos reales.
 *
 * Se conectará con Checkout.jsx para mostrarla
 * cuando falle el registro del pedido.
 *
 * El carrito se conserva cuando confirmarPedido
 * devuelve false.
 */

