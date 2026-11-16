
import { useState } from 'react'
import productosIniciales from '../data/productos.json'
import categorias from '../data/categorias.json'
import TarjetaProducto from '../components/TarjetaProducto'

function Productos() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')

  const productosFiltrados = productosIniciales.filter((producto) => {
    const coincideCategoria =
      categoriaSeleccionada === 'Todas' ||
      producto.categoria === categoriaSeleccionada

    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase())

    return coincideCategoria && coincideBusqueda
  })

  return (
    <main className="container py-5">
      <h2>Catálogo de productos</h2>

      <p className="lead">
        Encuentra herramientas, materiales de construcción
        y artículos de ferretería para tus proyectos.
      </p>

      <div className="row mb-4 g-3">
        <div className="col-12 col-md-6">
          <label htmlFor="filtroCategoria" className="form-label">
            Filtrar por categoría
          </label>

          <select
            id="filtroCategoria"
            className="form-select"
            value={categoriaSeleccionada}
            onChange={(evento) =>
              setCategoriaSeleccionada(evento.target.value)
            }
          >
            <option value="Todas">Todas las categorías</option>

            {categorias.map((categoria) => (
              <option
                key={categoria.categoria}
                value={categoria.categoria}
              >
                {categoria.categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="buscarProducto" className="form-label">
            Buscar producto
          </label>

          <input
            id="buscarProducto"
            type="search"
            className="form-control"
            placeholder="Ejemplo: martillo, cemento, taladro..."
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0" role="status">
          Productos encontrados: <strong>{productosFiltrados.length}</strong>
        </p>

        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => {
            setCategoriaSeleccionada('Todas')
            setBusqueda('')
          }}
          disabled={categoriaSeleccionada === 'Todas' && busqueda === ''}
        >
          Limpiar filtros
        </button>
      </div>

      {productosFiltrados.length === 0 ? (
        <div className="alert alert-info" role="status">
          No se encontraron productos con los filtros seleccionados.
        </div>
      ) : (
        <div className="row g-4">
          {productosFiltrados.map((producto) => (
            <TarjetaProducto
              key={producto.codigo}
              producto={producto}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default Productos
