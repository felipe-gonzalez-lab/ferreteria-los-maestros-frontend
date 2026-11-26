
import BadgeStock from './BadgeStock'
import { calcularPrecioFinal } from '../utils/precios'

function TarjetaProducto({ producto, agregarAlCarrito }) {
  const descuento = Number(producto.descuento) || 0

  const tieneDescuento =
    descuento > 0 && descuento <= 100

  const precioOferta = calcularPrecioFinal(producto)

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100">
        <div className="card-body d-flex flex-column">
          {tieneDescuento && (
            <span className="badge bg-danger align-self-start mb-3">
              {descuento}% de descuento
            </span>
          )}

          <h3 className="card-title h5">
            {producto.nombre}
          </h3>

          <p className="card-text">
            <strong>Código:</strong> {producto.codigo}
          </p>

          <p className="card-text">
            <strong>Marca:</strong> {producto.marca}
          </p>

          {tieneDescuento ? (
            <>
              <p className="card-text mb-1">
                <strong>Precio normal:</strong>{' '}
                <span className="text-decoration-line-through">
                  ${producto.precioVenta.toLocaleString('es-CL')}
                </span>
              </p>

              <p className="card-text text-success fw-bold">
                Precio oferta: ${precioOferta.toLocaleString('es-CL')}
              </p>
            </>
          ) : (
            <p className="card-text">
              <strong>Precio:</strong>{' '}
              ${producto.precioVenta.toLocaleString('es-CL')}
            </p>
          )}

          <p className="card-text">
            <strong>Stock:</strong> {producto.stock} unidades
          </p>

          <p className="card-text">
            <BadgeStock
              stock={producto.stock}
              stockMinimo={producto.stockMinimo}
            />
          </p>

          <div className="mt-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => agregarAlCarrito(producto)}
              disabled={producto.stock === 0}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TarjetaProducto

/*
 * TarjetaProducto.jsx - Tarjeta individual del catálogo.
 *
 * Recibe los datos del producto mediante props.
 *
 * Muestra nombre, código, marca, precio y stock.
 *
 * Utiliza BadgeStock para indicar la disponibilidad.
 *
 * Importa calcularPrecioFinal desde utils/precios.js.
 *
 * La función compartida calcula el precio
 * promocional cuando existe un descuento válido.
 *
 * Cuando el producto tiene descuento, muestra
 * el porcentaje, el precio original tachado
 * y el precio final de oferta.
 *
 * Los productos sin descuento mantienen
 * su presentación y precio habitual.
 *
 * Conserva el botón Añadir al carrito
 * y su restricción cuando no existe stock.
 *
 * Centralizar el cálculo evita repetir
 * la misma fórmula en distintos componentes.
 */
