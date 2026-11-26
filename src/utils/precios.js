
export function calcularPrecioFinal(producto) {
  const precioVenta = Number(producto.precioVenta)
  const descuento = Number(producto.descuento) || 0

  if (descuento > 0 && descuento <= 100) {
    return Math.round(
      precioVenta * (1 - descuento / 100)
    )
  }

  return precioVenta
}

/*
 * precios.js - Funciones compartidas de precios.
 *
 * calcularPrecioFinal recibe un producto
 * y obtiene su precio de venta.
 *
 * Si el producto tiene un descuento válido
 * entre 1% y 100%, calcula el precio promocional.
 *
 * Redondea el resultado al peso chileno
 * más cercano utilizando Math.round.
 *
 * Si el producto no tiene descuento,
 * devuelve su precio de venta original.
 *
 * Esta función será utilizada por las páginas
 * y componentes que muestran o calculan precios.
 *
 * Permite mantener una regla de cálculo
 * consistente en toda la aplicación.
 */
