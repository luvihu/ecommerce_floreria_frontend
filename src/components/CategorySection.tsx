import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { FaBirthdayCake, FaGlassCheers, FaThList, FaSearch, FaTimes } from 'react-icons/fa';
import { FaPagelines, FaSpa, FaHeart } from "react-icons/fa6";
import { fetchCategories, setSelectedCategory } from '../redux/actions/categories/fetchCategories';
import { fetchProducts } from '../redux/actions/products/fetchProducts';
import { RootState, AppDispatch } from '../redux/store';
import ProductCard from './ProductCard';
import PromotionCarousel from './PromotionCarousel';
import { calculateDiscountedPrice, PromotionData } from '../utils/promotionUtils';

const categoryIcons: Record<string, React.ReactNode> = {
  "Amor": <FaHeart className="icons" />,
  "Cumpleaños": <FaBirthdayCake className="icons" />,
  "Felicitaciones": <FaGlassCheers className="icons" />,
  "Ramos": <FaSpa className="icons" />,
  "Rosas": <FaPagelines className="icons" />
};

const CategorySection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeHoverCategory, setActiveHoverCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { categories, products, selectedCategory } = useSelector((state: RootState) => state.products);
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get('categoria');
  const action = searchParams.get('action');
  const categorySectionRef = useRef<HTMLDivElement>(null);
  const productsSectionRef = useRef<HTMLDivElement>(null);
  const ofertasSectionRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);
  
  useEffect(() => {
    const hash = window.location.hash;
    
    if (action === 'showAllProducts') {
      dispatch(setSelectedCategory(null));
      
      setTimeout(() => {
        const productsElement = document.getElementById('productos');
        if (productsElement) {
          productsElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        } else if (productsSectionRef.current) {
          productsSectionRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 200); // Aumentar el tiempo para asegurar que el DOM esté listo
    }
    
    if (hash === '#ofertas') {
      setTimeout(() => {
        ofertasSectionRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }

    if (hash === '#categorias') {
      setTimeout(() => {
        categorySectionRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [action, dispatch]);
  
  useEffect(() => {
    if (categoryName && categories.length > 0) {
      const category = categories.find(cat => 
        cat.nombre.toLowerCase() === categoryName.toLowerCase()
      );
      
      if (category) {
        dispatch(setSelectedCategory(category.id));
        
        setTimeout(() => {
          categorySectionRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, [categoryName, categories, dispatch]);
  
  // Filtrar productos por categoría seleccionada y término de búsqueda
  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || 
      product.categories.some(cat => cat.id === selectedCategory);
    const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && (searchTerm === '' || matchesSearch);
  });

  const handleCategoryClick = (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId === selectedCategory ? null : categoryId));
    setSearchTerm(''); // Limpiar búsqueda al cambiar categoría
  };
  
  const handleShowAllClick = () => {
    dispatch(setSelectedCategory(null));
    setSearchTerm(''); // Limpiar búsqueda al mostrar todo
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    searchInputRef.current?.focus();
  };

  const promotionsData = products.reduce((acc, product) => {
    const promotionData = calculateDiscountedPrice(product);
    if (promotionData !== null) {
      acc[product.id] = promotionData;
    }
    return acc;
  }, {} as Record<string, PromotionData>);
  
  return (
    <div className="py-4 md:py-8 lg:py-10 px-4 md:px-6 max-w-7xl mx-auto bg-gradient-to-t from-purple-50/50 to-transparent">
      {/* Carrusel de ofertas */}
      <div ref={ofertasSectionRef} id="ofertas">
        <PromotionCarousel 
          products={products} 
          promotionsData={promotionsData} 
        />
      </div>
      
      {/* Sección de categorías */}
      <div 
        ref={categorySectionRef} 
        id= "categorias"
        className="mb-4 mt-4 sm:mb-6 sm:mt-6 md:mb-10 md:mt-10 lg:mb-12 lg:mt-12"
      >
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6">
          <div 
            className={`flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all duration-300 
              ${!selectedCategory 
                ? 'bg-gradient-to-br from-rose-100 to-amber-50 shadow-lg' 
                : 'bg-zinc-100 hover:bg-zinc-50 hover:shadow-lg'} 
              w-24 sm:w-28 md:w-36 h-24 relative group`}
            onClick={handleShowAllClick}
            onMouseEnter={() => setActiveHoverCategory('all')}
            onMouseLeave={() => setActiveHoverCategory(null)}
          >
            <div className="text-3xl sm:text-4xl mb-2 icons transition-colors">
              <FaThList />
            </div>
            <h3 className="text-xs sm:text-sm md:text-base font-medium text-center text-gray-700">Mostrar todo</h3>
            
            {activeHoverCategory === 'all' && selectedCategory && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-gray-700 text-xs py-1 px-3 rounded-full whitespace-nowrap z-10 shadow-md border border-gray-100">
                Ver todos los productos
              </div>
            )}
          </div>

          {categories.map(category => (
            <div 
              key={category.id}
              className={`flex flex-col items-center p-2 rounded-xl cursor-pointer transition-all duration-300 group
                ${selectedCategory === category.id 
                  ? 'bg-gradient-to-br from-rose-100 to-amber-50 shadow-lg' 
                  : 'bg-zinc-100 hover:bg-zinc-50 hover:shadow-lg'} 
                w-24 sm:w-28 md:w-36 h-20 md:h-24 relative`}
              onClick={() => handleCategoryClick(category.id)}
              onMouseEnter={() => setActiveHoverCategory(category.id)}
              onMouseLeave={() => setActiveHoverCategory(null)}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl mb-2 transition-colors">
                {categoryIcons[category.nombre] || <FaPagelines className="icons" />}
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-medium text-center text-gray-700 truncate w-full">
                {category.nombre}
              </h3>
              
              {activeHoverCategory === category.id && !selectedCategory && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-gray-700 text-xs py-1 px-3 rounded-full whitespace-nowrap z-10 shadow-md border border-gray-100">
                  Ver productos de {category.nombre}
                </div>
              )}
            </div>
          ))}
          <div className="border-b border-gray-200 w-full opacity-70 mt-2"></div>
        </div>
      </div>

      {/* Buscador Responsive */}
      <div className="mb-6 md:mb-8 lg:mb-10 mt-6 md:mt-8 lg:mt-10">
        <div className={`relative max-w-2xl mx-auto transition-all duration-200 ${isSearchFocused ? 'ring-1 ring-rose-200 rounded-xl' : ''}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            ref={searchInputRef}
            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-rose-200 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all"
            placeholder="Buscar por nombre de producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FaTimes className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            </button>
          )}
        </div>
      </div>
      
      {/* Sección de productos */}
      <div className="mb-16" ref={productsSectionRef} id='productos'>
        {filteredProducts.length > 0 ? (
          <>
            <h2 className="text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold text-lime-950 font-serif mb-8">
              {searchTerm 
                ? `Resultados para "${searchTerm}"`
                : selectedCategory 
                  ? `${categories.find(c => c.id === selectedCategory)?.nombre || 'Productos'}`
                  : 'Todos nuestros productos'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  promotionData={calculateDiscountedPrice(product)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-50 rounded-xl p-8">
            <FaSearch className="text-4xl text-gray-300 mb-4" />
            <p className="text-center text-gray-500 text-lg">
              {searchTerm 
                ? `No encontramos resultados para "${searchTerm}"`
                : 'No hay productos disponibles en esta categoría'}
            </p>
            {searchTerm && (
              <button 
                onClick={handleClearSearch}
                className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;