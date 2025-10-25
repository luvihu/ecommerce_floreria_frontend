import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Product } from '../interfaces/Interfaces';
import { PromotionData } from '../utils/promotionUtils';
import collageBann from '../assets/tulipanes.png';
import './banner.css';

// Importar los estilos de react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface PromotionCarouselProps {
  products: Product[];
  promotionsData: Record<string, PromotionData>;
}

const PromotionCarousel: React.FC<PromotionCarouselProps> = ({ products, promotionsData }) => {
  // Filtrar solo productos activos y con promoción
  const productsWithPromotion = products.filter(
    (product) => product.activo && promotionsData[product.id]
  );

  // Si no hay productos con promoción, no renderizamos nada
  if (productsWithPromotion.length === 0) {
    return null;
  }

  // Configuración mejorada del carrusel
  const settings = {
    dots: true,
    infinite: productsWithPromotion.length > 1,
    speed: 500,
    slidesToShow: Math.min(2, productsWithPromotion.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: productsWithPromotion.length > 1,
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, productsWithPromotion.length),
          slidesToScroll: 1,
          centerMode: false
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          arrows: productsWithPromotion.length > 1
        }
      }
    ]
  };

  return (
    <div className="promotion-section py-12 bg-rose-50/60 w-full" id="ofertas">
      <div className="container mx-auto px-3">
        <h2 className=" text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold mb-8 text-center text-lime-950 font-serif">
          Ofertas Especiales
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Imagen a la izquierda - Solo en pantallas grandes */}
          <div className="hidden lg:block lg:w-1/3 h-96 relative overflow-hidden rounded-2xl shadow-xl">
            <img 
              src={collageBann} 
              alt="Collage de flores" 
              className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-lime-900/60 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Flores de Temporada</h3>
                <p className="text-sm opacity-90">Descubre nuestras promociones exclusivas en arreglos florales</p>
              </div>
            </div>
          </div>
          
          {/* Carrusel - Ocupa todo el ancho en móviles */}
          <div className="w-full lg:w-2/3">
            <Slider {...settings} className="promotion-slider">
              {productsWithPromotion.map((product) => {
                const promotionData = promotionsData[product.id];
                return (
                  <div key={product.id} className="px-2 focus:outline-none ">
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full mx-1 ">
                      <Link to={`/product/${product.id}`} className="block h-full">
                        <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
                          <div className="absolute top-0 right-0 bg-rose-400 text-white text-xs font-bold px-3 py-1.5 rounded-bl-lg z-10">
                            {promotionData.discountPercentage}% OFF
                          </div>
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
                        <div className="p-4">
                          <h3 className="text-base md:text-lg lg:text-xl font-medium text-gray-800 mb-2 line-clamp-2 h-9">
                            {product.nombre}
                          </h3>
                          <div className="flex items-baseline mt-2">
                            <span className="text-xl font-bold text-orange-800">
                              S/{promotionData.discountedPrice.toFixed(2)}
                            </span>
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              S/{promotionData.originalPrice.toFixed(2)}
                            </span>
                          </div>
                          <div className="mt-2 text-xs bg-rose-100 text-orange-900 font-medium py-1 px-2 rounded-full inline-block">
                            {promotionData.promotionName}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionCarousel;