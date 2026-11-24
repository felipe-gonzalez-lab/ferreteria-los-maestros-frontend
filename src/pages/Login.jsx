
import { useState } from 'react'
import { Link } from 'react-router-dom'

const usuarioDemo = {
  correo: 'cliente@demo.cl',
  contrasena: 'Demo1234',
  nombre: 'Cliente de prueba'
}

function Login() {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('')

  const manejarIngreso = (evento) => {
    evento.preventDefault()

    const correoIngresado = correo.trim().toLowerCase()

    if (!correoIngresado || !contrasena) {
      setTipoMensaje('danger')
      setMensaje('Debes completar todos los campos.')
      return
    }

    if (
      correoIngresado === usuarioDemo.correo &&
      contrasena === usuarioDemo.contrasena
    ) {
      setTipoMensaje('success')
      setMensaje(
        `Bienvenido, ${usuarioDemo.nombre}. Inicio de sesión de demostración correcto.`
      )

      setContrasena('')
    } else {
      setTipoMensaje('danger')
      setMensaje('Credenciales de demostración incorrectas.')
    }
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <h2 className="mb-3">Iniciar sesión</h2>

          <p className="text-muted">
            Ingresa tus datos para acceder a
            Ferretería Los Maestros.
          </p>

          <form
            onSubmit={manejarIngreso}
            className="border rounded bg-white p-4"
          >
            <div className="mb-3">
              <label htmlFor="correoLogin" className="form-label">
                Correo electrónico
              </label>

              <input
                id="correoLogin"
                type="email"
                className="form-control"
                value={correo}
                onChange={(evento) => {
                  setCorreo(evento.target.value)
                  setMensaje('')
                }}
                autoComplete="email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contrasenaLogin" className="form-label">
                Contraseña
              </label>

              <input
                id="contrasenaLogin"
                type="password"
                className="form-control"
                value={contrasena}
                onChange={(evento) => {
                  setContrasena(evento.target.value)
                  setMensaje('')
                }}
                autoComplete="current-password"
                required
              />
            </div>

            {mensaje && (
              <div
                className={`alert alert-${tipoMensaje}`}
                role="alert"
              >
                {mensaje}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Iniciar sesión
            </button>

            <p className="text-center mt-3 mb-0">
              ¿No tienes una cuenta?{' '}
              <Link to="/registro">
                Regístrate aquí
              </Link>
            </p>
          </form>

          <div className="alert alert-info mt-4">
            <strong>Acceso de demostración</strong>

            <p className="mb-1 mt-2">
              Correo: cliente@demo.cl
            </p>

            <p className="mb-0">
              Contraseña: Demo1234
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login

/*
 * Login.jsx - Formulario de inicio de sesión.
 *
 * Permite ingresar correo electrónico y contraseña.
 *
 * Utiliza useState para gestionar los campos del formulario
 * y mostrar mensajes de éxito o error.
 *
 * Implementa validaciones de campos obligatorios mediante
 * los controles HTML y una comprobación adicional en React.
 *
 * Utiliza credenciales ficticias para demostrar el
 * funcionamiento visual del inicio de sesión.
 *
 * Incluye un enlace al formulario de registro de usuarios.
 *
 * Importante: esta es una simulación frontend.
 * No autentica usuarios reales, no crea una sesión
 * persistente y no otorga permisos de administrador.
 *
 * La autenticación real deberá implementarse mediante
 * el backend Spring Boot, con contraseñas protegidas
 * y control de acceso basado en roles.
 */
