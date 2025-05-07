import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { FaTimes, FaSearch } from 'react-icons/fa';
import { fetchProducts } from '../../redux/actions/products/fetchProducts';
import { applyPromotionToProducts } from '../../redux/actions/promotions/applyPromotionToProducts';
import { Product, Promotion } from '../../interfaces/Interfaces';

interface ApplyPromotionModalProps {
  promotion: Promotion;
  onClose: () => void;
  onSuccess: () => void;
}

const ApplyPromotionModal = ({ promotion, onClose, onSuccess }: ApplyPromotionModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const allProducts = useSelector((state: RootState) => state.products.products || []);
  
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Productos ya asociados a la promoción
  const promotionProductIds = useMemo(() => 
    promotion.products?.map(p => typeof p === 'string' ? p : p.id) || [], 
    [promotion.products]
  );
  
  // Cargar productos solo una vez
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      await dispatch(fetchProducts());
      setIsLoading(false);
    };
    
    loadProducts();
  }, [dispatch]);
  
  // Inicializar productos seleccionados cuando cambian los productos de la promoción
  useEffect(() => {
    // Usar Set para eliminar posibles duplicados
    setSelectedProductIds([...new Set(promotionProductIds)]);
  }, [promotionProductIds]);
  
  // Filtrar productos por término de búsqueda y solo mostrar activos
  const filteredProducts = useMemo(() => 
    allProducts.filter((product: Product) => 
      product.activo && 
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [allProducts, searchTerm]
  );
  
  const handleToggleProduct = useCallback((productId: string) => {
    setSelectedProductIds(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);
  
  const handleSelectAll = useCallback(() => {
    const allFilteredIds = filteredProducts.map((p: Product) => p.id);
    const allSelected = allFilteredIds.every(id => selectedProductIds.includes(id));
    
    if (allSelected) {
      // Si todos están seleccionados, deseleccionar solo los filtrados
      setSelectedProductIds(prev => 
        prev.filter(id => !allFilteredIds.includes(id))
      );
    } else {
      // Seleccionar todos los productos filtrados (manteniendo otros seleccionados)
      setSelectedProductIds(prev => {
        const newSelection = [...prev];
        allFilteredIds.forEach(id => {
          if (!newSelection.includes(id)) {
            newSelection.push(id);
          }
        });
        return newSelection;
      });
    }
  }, [filteredProducts, selectedProductIds]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Asegurarse de que estamos enviando un array de IDs válidos
      const validProductIds = [...new Set(
        selectedProductIds.filter(id => id && typeof id === 'string')
      )];
      
      if (validProductIds.length === 0) {
        alert('Por favor selecciona al menos un producto');
        return;
      }
  
      console.log('Aplicando promoción a productos:', {
        promotionId: promotion.id,
        productIds: validProductIds
      });
      const result = await dispatch(applyPromotionToProducts(promotion.id, validProductIds));

      console.log('Resultado de la aplicación:', result);
      onSuccess();
      onClose();

    } catch (error) {
      console.error('Error al aplicar la promoción:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const visibleSelectedCount = filteredProducts.filter(p => selectedProductIds.includes(p.id)).length;

  // Verificar si todos los productos filtrados están seleccionados
  const allFilteredSelected = useMemo(() => 
    filteredProducts.length > 0 && 
    filteredProducts.every(p => selectedProductIds.includes(p.id)),
    [filteredProducts, selectedProductIds]
  );
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Aplicar promoción: {promotion.nombre} ({promotion.valor}%)
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="p-4 border-b">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent w-full outline-none"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-500">
                   {visibleSelectedCount} productos seleccionados en esta vista
                   
                </div>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-sm text-pink-600 hover:text-pink-800"
                >
                  {allFilteredSelected ? 'Deseleccionar todos' : 'Seleccionar todos'}
                </button>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map((product: Product) => {
                    const isSelected = selectedProductIds.includes(product.id);
                    const precio = Number(product.precio);
                    const discountedPrice = precio * (1 - promotion.valor / 100);
                    
                    return (
                      <div
                        key={product.id}
                        className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                          isSelected
                            ? 'border-pink-500 bg-pink-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleToggleProduct(product.id)}
                      >
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}} // Manejado por el onClick del div
                            className="h-5 w-5 text-pink-600 rounded mt-1"
                          />
                          <div className="ml-3">
                            <div className="font-medium text-gray-900">{product.nombre}</div>
                            <div className="text-sm text-gray-500">
                              Precio: S/{precio.toFixed(2)}
                            </div>
                            {isSelected && (
                              <div className="text-sm text-green-600 mt-1">
                                Con descuento: S/{discountedPrice.toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No se encontraron productos que coincidan con la búsqueda
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:opacity-50"
              disabled={isSubmitting || selectedProductIds.length === 0}
            >
              {isSubmitting ? 'Aplicando...' : 'Aplicar promoción'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplyPromotionModal;
