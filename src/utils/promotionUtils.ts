import { Product, Promotion } from '../interfaces/Interfaces';

export interface PromotionData {
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  promotionName: string;
  promotionId: string;
}

/**
 * Convierte una fecha a objeto Date, manejando tanto strings como objetos Date
 */
const ensureDate = (date: Date | string): Date => {
  if (date instanceof Date) {
    return date;
  }
  
  // Si es string ISO (ej: '2025-05-01T00:00:00.000Z')
  if (typeof date === 'string') {
    const parsed = new Date(date);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  
  console.error('Fecha inválida:', date);
  return new Date(); // Fallback a fecha actual
};

/**
 * Verifica si una promoción está actualmente activa
 */
export const isPromotionActive = (promotion: Promotion): boolean => {
  if (!promotion || !promotion.activo) return false;
  
  const now = new Date();
  const startDate = ensureDate(promotion.fecha_inicio);
  const endDate = ensureDate(promotion.fecha_fin);
  
  // Considerar todo el día de finalización (hasta 23:59:59)
  const adjustedEndDate = new Date(endDate);
  adjustedEndDate.setHours(23, 59, 59, 999);
  
  return now >= startDate && now <= adjustedEndDate;
};

/**
 * Calcula el precio con descuento para un producto
 */
export const calculateDiscountedPrice = (product: Product): PromotionData | null => {
  if (!product?.promotions || product.promotions.length === 0) {
    return null;
  }

  // Ordenar promociones por valor de descuento (mayor primero)
  const sortedPromotions = [...product.promotions].sort((a, b) => b.valor - a.valor);
  
  // Encontrar la primera promoción activa (la que tiene mayor descuento)
  const activePromotion = sortedPromotions.find(isPromotionActive);
  
  if (!activePromotion) {
    return null;
  }

  // Validar y convertir valores numéricos
  const discountPercentage = Number(activePromotion.valor);
  const originalPrice = Number(product.precio);
  
  if (isNaN(discountPercentage) || discountPercentage <= 0 || discountPercentage >= 100) {
    console.error(`Porcentaje de descuento inválido: ${activePromotion.valor}`);
    return null;
  }
  
  if (isNaN(originalPrice) || originalPrice <= 0) {
    console.error(`Precio de producto inválido: ${product.precio}`);
    return null;
  }

  // Calcular precio con descuento
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);
  
  return {
    originalPrice,
    discountedPrice: Math.round(discountedPrice * 100) / 100, // Redondear a 2 decimales
    discountPercentage,
    promotionName: activePromotion.nombre,
    promotionId: activePromotion.id
  };
};