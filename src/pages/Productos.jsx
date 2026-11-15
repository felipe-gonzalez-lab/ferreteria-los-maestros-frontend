
import { useState } from 'react'
import productosIniciales from '../data/productos.json'
import categorias from '../data/categorias.json'
import TarjetaProducto from '../components/TarjetaProducto'

function Productos() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')

  const productosFiltrados = categoriaSeleccionada === 'Todas'
    ? productosIniciales
    : productosIniciales.filter(
        (producto) => producto.categoria === categoriaSeleccionada
      )

  return (
    <main className="container py-5">
      <h2>Catálogo de productos</h2>

      <p className="lead">
        Encuentra herramientas, materiales de construcción
        y artículos de ferretería para tus proyectos.
      </p>

      <div className="mb-4">
        <label htmlFor="filtroCategoria" className="form-label">
          Filtrar por categoría
        </label>

        <select
          id="filtroCategoria"
          className="form-select"
          value={categoriaSeleccionada}
          onChange={(evento) => setCategoriaSeleccionada(evento.target.value)}
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

      <p>
        Productos encontrados: <strong>{productosFiltrados.length}</strong>
      </p>

      <div className="row g-4">
        {productosFiltrados.map((producto) => (
          <TarjetaProducto
            key={producto.codigo}
            producto={producto}
          />
        ))}
      </div>
    </main>
  )
}

export default Productos
