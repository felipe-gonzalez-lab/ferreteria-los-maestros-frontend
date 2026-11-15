function BadgeStock({ stock, stockMinimo }) {
  let estado = 'Disponible'
  let color = 'success'

  if (stock === 0) {
    estado = 'Agotado'
    color = 'danger'
  } else if (stock <= stockMinimo) {
    estado = 'Stock crítico'
    color = 'warning'
  }

  return (
    <span className={`badge text-bg-${color}`}>
      {estado}
    </span>
  )
}

export default BadgeStock
