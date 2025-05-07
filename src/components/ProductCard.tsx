import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../interfaces/Interfaces';
import { PromotionData } from '../utils/promotionUtils';

interface ProductCardProps {
  product: Product;
  promotionData?: PromotionData | null;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, promotionData }) => {
  // Si el producto no está activo, no renderizamos nada
  if (!product.activo) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      <Link to={`/product/${product.id}`}>
        <div className="relative h-56 overflow-hidden">
          {promotionData && (
            <div className="absolute top-0 right-0 bg-rose-400 text-white text-xs font-bold px-3 py-1.5 rounded-bl-lg z-10">
              {promotionData.discountPercentage}% OFF
            </div>
          )}
          <img
            src={product.images[0]?.url || 'placeholder-image-url'}
            alt={product.nombre}
            className="w-full h-full object-contain transition-transform duration-500 hover:scale-110 mt-2"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'placeholder-image-url';
            }}
          />
        </div>
        <div className="pt-4 pl-4 pb-4">
          <h3 className="text-base md:text-lg lg:text-xl font-medium text-gray-800 mb-2 line-clamp-2 h-9 ml-3">
            {product.nombre}
          </h3>
          <div className="flex items-baseline mt-2">
            {promotionData ? (
              <>
                <span className="text-xl font-bold text-orange-800 ml-3">
                  S/{promotionData.discountedPrice.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  S/{promotionData.originalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-orange-800 ml-3">
                 S/{typeof product.precio === 'string' ? parseFloat(product.precio).toFixed(2) : product.precio.toFixed(2)}
              </span>
            )}
          </div>
          {promotionData && (
            <div className="mt-2 text-xs bg-rose-100 text-orange-900 font-medium py-1 px-2 rounded-full inline-block ml-2">
              {promotionData.promotionName}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;