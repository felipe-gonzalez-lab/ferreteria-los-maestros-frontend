
import { useState } from 'react'

const formularioInicial = {
  nombre: '',
  apellido: '',
  correo: '',
  telefono: '',
  contrasena: '',
  confirmarContrasena: ''
}

function Registro() {
  const [formulario, setFormulario] = useState(formularioInicial)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('')

  const actualizarCampo = (evento) => {
    const { name, value } = evento.target

    setFormulario((datosActuales) => ({
      ...datosActuales,
      [name]: value
    }))

    setMensaje('')
  }

  const manejarRegistro = (evento) => {
    evento.preventDefault()

    const nombre = formulario.nombre.trim()
    const apellido = formulario.apellido.trim()
    const correo = formulario.correo.trim().toLowerCase()
    const telefono = formulario.telefono.trim()

    if (
      !nombre ||
      !apellido ||
      !correo ||
      !telefono ||
      !formulario.contrasena ||
      !formulario.confirmarContrasena
    ) {
      setTipoMensaje('danger')
      setMensaje('Debes completar todos los campos.')
      return
    }

    if (formulario.contrasena.length < 8) {
      setTipoMensaje('danger')
      setMensaje('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    if (formulario.contrasena !== formulario.confirmarContrasena) {
      setTipoMensaje('danger')
      setMensaje('Las contraseñas no coinciden.')
      return
    }

    try {
      const usuariosGuardados = localStorage.getItem('usuariosFerreteria')
      const usuarios = usuariosGuardados
        ? JSON.parse(usuariosGuardados)
        : []

      if (!Array.isArray(usuarios)) {
        throw new Error('Datos de usuarios no válidos')
      }

      const correoExiste = usuarios.some(
        (usuario) => usuario.correo === correo
      )

      if (correoExiste) {
        setTipoMensaje('danger')
        setMensaje('Ya existe un usuario registrado con ese correo.')
        return
      }

      const nuevoUsuario = {
        id: crypto.randomUUID(),
        nombre,
        apellido,
        correo,
        telefono,
        rol: 'cliente'
      }

      localStorage.setItem(
        'usuariosFerreteria',
        JSON.stringify([...usuarios, nuevoUsuario])
      )

      setTipoMensaje('success')
      setMensaje('Usuario registrado correctamente.')
      setFormulario({ ...formularioInicial })
    } catch {
      setTipoMensaje('danger')
      setMensaje('No fue posible guardar el registro. Intenta nuevamente.')
    }
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-9 col-lg-7">
          <h2 className="mb-3">Registro de usuario</h2>

          <p className="text-muted">
            Completa tus datos para registrarte en
            Ferretería Los Maestros.
          </p>

          <form
            onSubmit={manejarRegistro}
            className="border rounded bg-white p-4"
          >
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  className="form-control"
                  value={formulario.nombre}
                  onChange={actualizarCampo}
                  autoComplete="given-name"
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="apellido" className="form-label">
                  Apellido
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  className="form-control"
                  value={formulario.apellido}
                  onChange={actualizarCampo}
                  autoComplete="family-name"
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="correo" className="form-label">
                  Correo electrónico
                </label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  className="form-control"
                  value={formulario.correo}
                  onChange={actualizarCampo}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="telefono" className="form-label">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  className="form-control"
                  value={formulario.telefono}
                  onChange={actualizarCampo}
                  autoComplete="tel"
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="contrasena" className="form-label">
                  Contraseña
                </label>
                <input
                  id="contrasena"
                  name="contrasena"
                  type="password"
                  className="form-control"
                  value={formulario.contrasena}
                  onChange={actualizarCampo}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
                <div className="form-text">
                  Mínimo 8 caracteres.
                </div>
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="confirmarContrasena"
                  className="form-label"
                >
                  Confirmar contraseña
                </label>
                <input
                  id="confirmarContrasena"
                  name="confirmarContrasena"
                  type="password"
                  className="form-control"
                  value={formulario.confirmarContrasena}
                  onChange={actualizarCampo}
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            {mensaje && (
              <div
                className={`alert alert-${tipoMensaje} mt-4`}
                role="alert"
              >
                {mensaje}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary mt-4"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Registro

/*
 * Registro.jsx - Formulario de registro de usuarios.
 *
 * Permite ingresar nombre, apellido, correo, teléfono
 * y una contraseña con confirmación.
 *
 * Utiliza useState para administrar los campos del formulario
 * y mostrar mensajes de validación.
 *
 * Comprueba que los campos estén completos, que la contraseña
 * tenga al menos 8 caracteres y que ambas contraseñas coincidan.
 *
 * Evita registrar dos usuarios con el mismo correo electrónico.
 *
 * Almacena un perfil de usuario de demostración en localStorage,
 * sin guardar la contraseña.
 *
 * El registro es una simulación frontend. No crea cuentas seguras
 * ni permite autenticación real. Estas funciones necesitarán
 * implementarse en el backend.
 */
