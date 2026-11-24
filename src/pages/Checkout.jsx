
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const datosIniciales = {
  nombre: '',
  apellido: '',
  correo: '',
  telefono: '',
  tipoEntrega: 'despacho',
  direccion: '',
  comuna: '',
  observaciones: ''
}

function Checkout({ carrito = [], confirmarPedido }) {
  const [datos, setDatos] = useState(datosIniciales)
  const [mensaje, setMensaje] = useState('')
  const [procesando, setProcesando] = useState(false)

  const navigate = useNavigate()

  const total = carrito.reduce(
    (acumulado, producto) =>
      acumulado + producto.precioVenta * producto.cantidad,
    0
  )

  const actualizarCampo = (evento) => {
    const { name, value } = evento.target

    setDatos((datosActuales) => ({
      ...datosActuales,
      [name]: value
    }))

    setMensaje('')
  }

  const manejarCompra = (evento) => {
    evento.preventDefault()

    if (procesando) {
      return
    }

    if (carrito.length === 0) {
      setMensaje('Debes agregar productos al carrito antes de continuar.')
      return
    }

    if (
      !datos.nombre.trim() ||
      !datos.apellido.trim() ||
      !datos.correo.trim() ||
      !datos.telefono.trim()
    ) {
      setMensaje('Debes completar todos los datos del cliente.')
      return
    }

    if (
      datos.tipoEntrega === 'despacho' &&
      (!datos.direccion.trim() || !datos.comuna.trim())
    ) {
      setMensaje('Debes completar la dirección y comuna de despacho.')
      return
    }

    const pedido = {
      cliente: {
        nombre: datos.nombre.trim(),
        apellido: datos.apellido.trim(),
        correo: datos.correo.trim().toLowerCase(),
        telefono: datos.telefono.trim()
      },
      entrega: {
        tipo: datos.tipoEntrega,
        direccion:
          datos.tipoEntrega === 'despacho'
            ? datos.direccion.trim()
            : '',
        comuna:
          datos.tipoEntrega === 'despacho'
            ? datos.comuna.trim()
            : ''
      },
      observaciones: datos.observaciones.trim(),
      productos: carrito.map((producto) => ({
        codigo: producto.codigo,
        nombre: producto.nombre,
        cantidad: producto.cantidad,
        precioVenta: producto.precioVenta
      })),
      total
    }

    if (typeof confirmarPedido !== 'function') {
      setMensaje('No fue posible procesar el pedido.')
      return
    }

    setProcesando(true)

    try {
      const confirmado = confirmarPedido(pedido)

      if (confirmado) {
        navigate('/compra-exitosa', { replace: true })
      } else {
        setMensaje(
          'No fue posible registrar el pedido. Intenta nuevamente.'
        )
      }
    } catch {
      setMensaje(
        'Ocurrió un error al confirmar el pedido. Intenta nuevamente.'
      )
    } finally {
      setProcesando(false)
    }
  }

  return (
    <main className="container py-5">
      <h2 className="mb-3">Finalizar compra</h2>

      <p className="lead">
        Completa tus datos y revisa el resumen de tu pedido.
      </p>

      {carrito.length === 0 && (
        <div className="alert alert-warning" role="alert">
          Tu carrito está vacío. Agrega productos antes de finalizar la compra.
        </div>
      )}

      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <form
            onSubmit={manejarCompra}
            className="border rounded bg-white p-4"
          >
            <h3 className="h5 mb-3">Datos del cliente</h3>

            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="nombreCheckout" className="form-label">
                  Nombre
                </label>

                <input
                  id="nombreCheckout"
                  name="nombre"
                  type="text"
                  className="form-control"
                  value={datos.nombre}
                  onChange={actualizarCampo}
                  autoComplete="given-name"
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="apellidoCheckout" className="form-label">
                  Apellido
                </label>

                <input
                  id="apellidoCheckout"
                  name="apellido"
                  type="text"
                  className="form-control"
                  value={datos.apellido}
                  onChange={actualizarCampo}
                  autoComplete="family-name"
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="correoCheckout" className="form-label">
                  Correo electrónico
                </label>

                <input
                  id="correoCheckout"
                  name="correo"
                  type="email"
                  className="form-control"
                  value={datos.correo}
                  onChange={actualizarCampo}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="telefonoCheckout" className="form-label">
                  Teléfono
                </label>

                <input
                  id="telefonoCheckout"
                  name="telefono"
                  type="tel"
                  className="form-control"
                  value={datos.telefono}
                  onChange={actualizarCampo}
                  autoComplete="tel"
                  required
                />
              </div>
            </div>

            <hr className="my-4" />

            <h3 className="h5 mb-3">Tipo de entrega</h3>

            <div className="form-check mb-2">
              <input
                id="despacho"
                name="tipoEntrega"
                type="radio"
                className="form-check-input"
                value="despacho"
                checked={datos.tipoEntrega === 'despacho'}
                onChange={actualizarCampo}
              />

              <label htmlFor="despacho" className="form-check-label">
                Despacho a domicilio
              </label>
            </div>

            <div className="form-check mb-3">
              <input
                id="retiro"
                name="tipoEntrega"
                type="radio"
                className="form-check-input"
                value="retiro"
                checked={datos.tipoEntrega === 'retiro'}
                onChange={actualizarCampo}
              />

              <label htmlFor="retiro" className="form-check-label">
                Retiro en tienda
              </label>
            </div>

            {datos.tipoEntrega === 'despacho' && (
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="direccion" className="form-label">
                    Dirección de despacho
                  </label>

                  <input
                    id="direccion"
                    name="direccion"
                    type="text"
                    className="form-control"
                    value={datos.direccion}
                    onChange={actualizarCampo}
                    autoComplete="street-address"
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="comuna" className="form-label">
                    Comuna
                  </label>

                  <input
                    id="comuna"
                    name="comuna"
                    type="text"
                    className="form-control"
                    value={datos.comuna}
                    onChange={actualizarCampo}
                    required
                  />
                </div>
              </div>
            )}

            <div className="mt-3">
              <label htmlFor="observaciones" className="form-label">
                Observaciones (opcional)
              </label>

              <textarea
                id="observaciones"
                name="observaciones"
                className="form-control"
                rows="3"
                value={datos.observaciones}
                onChange={actualizarCampo}
                placeholder="Indicaciones adicionales para tu pedido"
              />
            </div>

            {mensaje && (
              <div className="alert alert-danger mt-4" role="alert">
                {mensaje}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={carrito.length === 0 || procesando}
            >
              {procesando ? 'Procesando pedido...' : 'Confirmar pedido'}
            </button>
          </form>
        </div>

        <div className="col-12 col-lg-5">
          <div className="border rounded bg-white p-4">
            <h3 className="h5 mb-3">Resumen del pedido</h3>

            {carrito.length === 0 ? (
              <p className="text-muted mb-0">
                No hay productos en el carrito.
              </p>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-sm align-middle">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cant.</th>
                        <th className="text-end">Subtotal</th>
                      </tr>
                    </thead>

                    <tbody>
                      {carrito.map((producto) => (
                        <tr key={producto.codigo}>
                          <td>{producto.nombre}</td>
                          <td>{producto.cantidad}</td>
                          <td className="text-end">
                            $
                            {(
                              producto.precioVenta *
                              producto.cantidad
                            ).toLocaleString('es-CL')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <hr />

                <div className="d-flex justify-content-between">
                  <strong>Total productos:</strong>

                  <strong>
                    ${total.toLocaleString('es-CL')}
                  </strong>
                </div>

                <p className="text-muted small mt-3 mb-0">
                  El costo de despacho no está incluido.
                  Este checkout es una simulación académica.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Checkout

/*
 * Checkout.jsx - Formulario de finalización de compra.
 *
 * Solicita los datos personales del cliente.
 *
 * Permite elegir entre despacho a domicilio
 * y retiro en tienda.
 *
 * Cuando se selecciona despacho, solicita
 * dirección y comuna.
 *
 * Muestra los productos agregados al carrito,
 * sus cantidades, subtotales y total.
 *
 * Utiliza useState para manejar los campos,
 * los mensajes de validación y el procesamiento.
 *
 * Prepara un objeto con los datos del pedido
 * y lo envía a confirmarPedido de App.jsx.
 *
 * Si el pedido se registra correctamente,
 * utiliza useNavigate de React Router para
 * redirigir a la página /compra-exitosa.
 *
 * Si ocurre un error al registrar el pedido,
 * muestra un mensaje y permanece en Checkout.
 *
 * Deshabilita el botón durante el procesamiento
 * para evitar confirmaciones repetidas.
 *
 * No procesa pagos reales ni envía información
 * a un servidor.
 */
