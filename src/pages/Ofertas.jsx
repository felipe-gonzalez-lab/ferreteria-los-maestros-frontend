
import { Link } from 'react-router-dom'
import { calcularPrecioFinal } from '../utils/precios'

function Ofertas({ productos = [] }) {
  const productosEnOferta = productos.filter(
    (producto) =>
      Number(producto.descuento) > 0 &&
      Number(producto.descuento) <= 100 &&
      producto.stock > 0
  )

  return (
    <main className="container py-5">
      <h2 className="mb-3">Ofertas</h2>

      <p className="lead">
        Descubre los productos con descuentos especiales
        de Ferretería Los Maestros.
      </p>

      {productosEnOferta.length === 0 ? (
        <div className="alert alert-info" role="status">
          Actualmente no hay productos en oferta.
          Puedes revisar nuestro catálogo completo.
        </div>
      ) : (
        <>
          <p>
            Productos en oferta:{' '}
            <strong>{productosEnOferta.length}</strong>
          </p>

          <div className="row g-4">
            {productosEnOferta.map((producto) => (
              <div
                className="col-12 col-md-6 col-lg-4"
                key={producto.codigo}
              >
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <span className="badge bg-danger align-self-start mb-3">
                      {producto.descuento}% de descuento
                    </span>

                    <h3 className="card-title h5">
                      {producto.nombre}
                    </h3>

                    <p className="card-text text-muted">
                      {producto.categoria}
                    </p>

                    <p className="mb-1">
                      Precio normal:{' '}
                      <span className="text-decoration-line-through">
                        ${producto.precioVenta.toLocaleString('es-CL')}
                      </span>
                    </p>

                    <p className="fs-5 fw-bold text-success mb-2">
                      ${calcularPrecioFinal(producto).toLocaleString('es-CL')}
                    </p>

                    <p className="text-muted small">
                      Stock disponible: {producto.stock}
                    </p>

                    <div className="mt-auto">
                      <Link
                        to="/productos"
                        className="btn btn-outline-primary"
                      >
                        Ver catálogo
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-4">
        <Link to="/productos" className="btn btn-primary">
          Explorar productos
        </Link>
      </div>

      <p className="text-muted small mt-4">
        Los descuentos se muestran según su configuración
        en el catálogo. Esta aplicación es una demostración académica.
      </p>
    </main>
  )
}

export default Ofertas

/*
 * Ofertas.jsx - Página de ofertas de Ferretería Los Maestros.
 *
 * Recibe el catálogo de productos desde App.jsx.
 *
 * Filtra los productos que tienen un descuento
 * válido mayor que cero y hasta cien.
 *
 * Muestra únicamente productos con stock disponible.
 *
 * Importa calcularPrecioFinal desde utils/precios.js
 * para obtener el precio promocional.
 *
 * Presenta el precio original, el porcentaje
 * de descuento, el precio final y el stock.
 *
 * Si no hay productos en oferta,
 * muestra un mensaje informativo.
 *
 * Utiliza Bootstrap para presentar tarjetas
 * adaptables a distintos tamaños de pantalla.
 *
 * Mantiene los enlaces hacia el catálogo.
 *
 * El uso de la función compartida permite
 * mantener consistente el cálculo de precios.
 */
