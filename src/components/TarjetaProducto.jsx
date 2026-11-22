
import BadgeStock from './BadgeStock'

function TarjetaProducto({ producto, agregarAlCarrito }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100">
        <div className="card-body">
          <h3 className="card-title h5">
            {producto.nombre}
          </h3>

          <p className="card-text">
            <strong>Código:</strong> {producto.codigo}
          </p>

          <p className="card-text">
            <strong>Marca:</strong> {producto.marca}
          </p>

          <p className="card-text">
            <strong>Precio:</strong> ${producto.precioVenta.toLocaleString('es-CL')}
          </p>

          <p className="card-text">
            <strong>Stock:</strong> {producto.stock} unidades
          </p>

          <p className="card-text">
            <BadgeStock
              stock={producto.stock}
              stockMinimo={producto.stockMinimo}
            />
          </p>

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
  )
}

export default TarjetaProducto
