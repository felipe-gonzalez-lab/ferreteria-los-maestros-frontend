
import { useState, useEffect } from 'react'
import categorias from '../data/categorias.json'

const formularioVacio = {
  codigo: '',
  nombre: '',
  categoria: '',
  subcategoria: '',
  marca: '',
  unidad: '',
  precioCompra: '',
  precioVenta: '',
  descuento: 0,
  stock: '',
  stockMinimo: ''
}

function FormularioProducto({
  agregarProducto,
  actualizarProducto,
  productoSeleccionado,
  setProductoSeleccionado
}) {
  const [formulario, setFormulario] = useState(formularioVacio)

  useEffect(() => {
    if (productoSeleccionado) {
      setFormulario({
        ...productoSeleccionado,
        descuento: productoSeleccionado.descuento ?? 0
      })
    } else {
      setFormulario({ ...formularioVacio })
    }
  }, [productoSeleccionado])

  const actualizarCampo = (evento) => {
    const { name, value } = evento.target

    setFormulario((formularioActual) => ({
      ...formularioActual,
      [name]: value
    }))
  }

  const manejarEnvio = (evento) => {
    evento.preventDefault()

    const descuento = Number(formulario.descuento)

    if (
      !Number.isFinite(descuento) ||
      descuento < 0 ||
      descuento > 100
    ) {
      alert('El descuento debe estar entre 0% y 100%.')
      return
    }

    const productoFormulario = {
      ...formulario,
      codigo: productoSeleccionado
        ? productoSeleccionado.codigo
        : formulario.codigo.trim().toUpperCase(),
      nombre: formulario.nombre.trim(),
      precioCompra: Number(formulario.precioCompra),
      precioVenta: Number(formulario.precioVenta),
      descuento,
      stock: Number(formulario.stock),
      stockMinimo: Number(formulario.stockMinimo)
    }

    if (productoSeleccionado) {
      actualizarProducto(productoFormulario)
      alert('Producto actualizado correctamente.')
      setProductoSeleccionado(null)
    } else {
      const agregado = agregarProducto(productoFormulario)

      if (!agregado) {
        alert('Ya existe un producto con ese código.')
        return
      }

      alert('Producto agregado correctamente.')
    }

    setFormulario({ ...formularioVacio })
  }

  return (
    <form onSubmit={manejarEnvio} className="border rounded p-4 mb-4 bg-white">
      <h3 className="h5 mb-3">
        {productoSeleccionado ? 'Editar producto' : 'Agregar producto'}
      </h3>

      <div className="row g-3">
        <div className="col-md-4">
          <label htmlFor="codigo" className="form-label">Código</label>
          <input
            id="codigo"
            name="codigo"
            className="form-control"
            value={formulario.codigo}
            onChange={actualizarCampo}
            disabled={Boolean(productoSeleccionado)}
            required
          />
        </div>

        <div className="col-md-8">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            className="form-control"
            value={formulario.nombre}
            onChange={actualizarCampo}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="categoria" className="form-label">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            className="form-select"
            value={formulario.categoria}
            onChange={actualizarCampo}
            required
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.categoria} value={categoria.categoria}>
                {categoria.categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="subcategoria" className="form-label">Subcategoría</label>
          <input
            id="subcategoria"
            name="subcategoria"
            className="form-control"
            value={formulario.subcategoria}
            onChange={actualizarCampo}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="marca" className="form-label">Marca</label>
          <input
            id="marca"
            name="marca"
            className="form-control"
            value={formulario.marca}
            onChange={actualizarCampo}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="unidad" className="form-label">Unidad</label>
          <input
            id="unidad"
            name="unidad"
            className="form-control"
            value={formulario.unidad}
            onChange={actualizarCampo}
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="precioCompra" className="form-label">Precio compra</label>
          <input
            id="precioCompra"
            name="precioCompra"
            type="number"
            min="0"
            step="1"
            className="form-control"
            value={formulario.precioCompra}
            onChange={actualizarCampo}
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="precioVenta" className="form-label">Precio venta</label>
          <input
            id="precioVenta"
            name="precioVenta"
            type="number"
            min="0"
            step="1"
            className="form-control"
            value={formulario.precioVenta}
            onChange={actualizarCampo}
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="descuento" className="form-label">
            Descuento (%)
          </label>
          <input
            id="descuento"
            name="descuento"
            type="number"
            min="0"
            max="100"
            step="1"
            className="form-control"
            value={formulario.descuento}
            onChange={actualizarCampo}
            required
          />
          <div className="form-text">
            0 significa sin descuento.
          </div>
        </div>

        <div className="col-md-3">
          <label htmlFor="stock" className="form-label">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            className="form-control"
            value={formulario.stock}
            onChange={actualizarCampo}
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="stockMinimo" className="form-label">Stock mínimo</label>
          <input
            id="stockMinimo"
            name="stockMinimo"
            type="number"
            min="0"
            step="1"
            className="form-control"
            value={formulario.stockMinimo}
            onChange={actualizarCampo}
            required
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-4">
        {productoSeleccionado ? 'Guardar cambios' : 'Guardar producto'}
      </button>

      {productoSeleccionado && (
        <button
          type="button"
          className="btn btn-outline-secondary mt-4 ms-2"
          onClick={() => setProductoSeleccionado(null)}
        >
          Cancelar edición
        </button>
      )}
    </form>
  )
}

export default FormularioProducto

/*
 * FormularioProducto.jsx - Formulario de administración.
 *
 * Permite agregar nuevos productos y editar
 * productos existentes del catálogo.
 *
 * Utiliza useState para manejar los campos
 * y useEffect para cargar el producto seleccionado.
 *
 * Mantiene las categorías definidas en categorias.json.
 *
 * Incorpora el campo Descuento (%), que permite
 * configurar porcentajes entre cero y cien.
 *
 * Un descuento de cero indica que el producto
 * se vende a su precio normal.
 *
 * Valida el porcentaje antes de guardar el producto.
 *
 * Convierte precios, descuento y cantidades
 * a valores numéricos.
 *
 * Conserva las validaciones del formulario
 * y la comprobación de códigos duplicados.
 *
 * Utiliza agregarProducto y actualizarProducto
 * recibidas desde App.jsx.
 *
 * Los descuentos quedan almacenados en el
 * catálogo administrado mediante localStorage.
 *
 * Los productos con descuentos válidos aparecerán
 * automáticamente en la página Ofertas,
 * siempre que tengan stock disponible.
 */
