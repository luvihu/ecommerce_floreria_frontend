/**
 * Formatea una fecha en formato legible
 * @param date Fecha a formatear
 * @returns Fecha formateada en formato DD/MM/YYYY
 */
export const formatDate = (date: Date): string => {
  if (!date) return '';
  
  try {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date));
  } catch (error) {
    console.error('Error al formatear fecha:', error);
    return '';
  }
};

/**
 * Formatea un precio en formato de moneda
 * @param price Precio a formatear
 * @returns Precio formateado con símbolo de moneda
 */
export const formatPrice = (price: number): string => {
  if (price === undefined || price === null) return '';
  
  try {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(price);
  } catch (error) {
    console.error('Error al formatear precio:', error);
    return '';
  }
};
