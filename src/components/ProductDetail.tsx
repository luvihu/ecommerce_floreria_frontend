
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchProductById } from '../redux/actions/products/fetchProductById';
import { Category } from '../interfaces/Interfaces';
import { calculateDiscountedPrice, PromotionData } from '../utils/promotionUtils';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const product = useSelector((state: RootState) => state.products.productById);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);
  
  const [promotionData, setPromotionData] = useState<PromotionData | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);
  
  useEffect(() => {
    if (product) {
      const promoData = calculateDiscountedPrice(product);
      setPromotionData(promoData);
    }
  }, [product]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-700">{error || 'Producto no encontrado'}</p>
        <button
          onClick={handleGoBack}
          className="mt-4 bg-lime-700 hover:bg-lime-600 text-white py-2 px-4 rounded-md inline-flex items-center transition-colors duration-200"
        >
          <FaArrowLeft className="mr-2" />
          Volver
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 md:py-12 mt-16 sm:mt-20 md:mt-24">
      <button
        onClick={handleGoBack}
        className="mb-6 text-lime-800 hover:text-lime-700 inline-flex items-center transition-colors duration-200"
      >
        <FaArrowLeft className="mr-2" />
        Volver
      </button>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Sección de imágenes */}
          <div className="lg:w-1/2 p-4 sm:p-6">
            <div className="relative bg-gray-50 rounded-lg overflow-hidden">
              {promotionData && (
                <div className="absolute top-0 right-0 bg-rose-400 text-white text-xs font-bold px-2 py-1.5 rounded-bl-lg z-10 shadow-md">
                  {promotionData.discountPercentage}% OFF
                </div>
              )}
              <img
                src={product.images[selectedImage]?.url || product.images[0]?.url}
                alt={product.nombre}
                className="w-full h-56 sm:h-60 md:h-64 lg:h-96 object-contain transition-opacity duration-300"
              />
            </div>
            
            {/* Miniaturas de imágenes */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-lime-500' : 'border-transparent'}`}
                  >
                    <img
                      src={image.url}
                      alt={`Miniatura ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Detalles del producto */}
          <div className="lg:w-1/2 p-4 sm:p-6 md:p-8 items-center flex flex-col justify-center">
           <div >
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 mb-4">
              {product.nombre}
            </h1>
            
            {/* Categorías */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.categories.map((category: Category) => (
                <span
                  key={category.id}
                  className="bg-lime-100 text-lime-800 text-xs px-2.5 py-1 rounded"
                >
                  {category.nombre}
                </span>
              ))}
            </div>
            
            {/* Precio */}
            <div className="mb-6">
              {promotionData ? (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xl sm:text-2xl md:text-2xl font-bold text-orange-800">
                    S/{promotionData.discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-base sm:text-xl md:text-lg text-gray-500 line-through">
                    S/{promotionData.originalPrice.toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs md:text-sm font-medium">
                    Ahorras {promotionData.discountPercentage}%
                  </span>
                </div>
              ) : (
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-orange-800">
                   S/{typeof product.precio === 'string' ? parseFloat(product.precio).toFixed(2) : product.precio.toFixed(2)}
                </span>
              )}
              
              {/* Nombre de la promoción si existe */}
              {promotionData && (
                <div className="mt-3 text-xs bg-rose-100 text-orange-900 font-medium py-1 px-2 rounded-full inline-block">
                  {promotionData.promotionName}
                </div>
              )}
            </div>
                                 
            {/* Descripción */}
            <div className="mb-6 lg:mt-8">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">Descripción</h2>
              <p className="text-gray-600 leading-relaxed">{product.descripcion}</p>
            </div>
            </div>       
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;