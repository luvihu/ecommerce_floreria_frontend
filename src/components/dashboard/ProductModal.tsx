import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchCategories } from '../../redux/actions/categories/fetchCategories';
import { fetchPromotions } from '../../redux/actions/promotions/fetchPromotions';
import { Category, Promotion, Product } from '../../interfaces/Interfaces';

interface UpdateProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, productData: Partial<Product>) => void;
}

interface FormData {
  nombre: string;
  descripcion: string;
  precio: number;
  activo: boolean;
  categoryIds: string[];
  promotionIds: string[];
}

const ProductModal = ({ product, isOpen, onClose, onUpdate }: UpdateProductModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    nombre: product.nombre,
    descripcion: product.descripcion || '',
    precio: product.precio,
    activo: product.activo ?? true,
    categoryIds: product.categories.map(cat => cat.id),
    promotionIds: product.promotions?.map(promo => promo.id) || []
  });

  const categories = useSelector((state: RootState) => state.products.categories as Category[]);
  const promotions = useSelector((state: RootState) => state.products.promotions as Promotion[]);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPromotions());
  }, [dispatch]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      categoryIds: selectedOptions
    });
  };

  const handlePromotionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      promotionIds: selectedOptions
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre || formData.precio <= 0) {
      alert('Por favor complete todos los campos requeridos. El precio debe ser mayor que cero.');
      return;
    }

    // Crear el objeto con la estructura correcta para el backend
    const productDataToUpdate = {
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion?.trim(),
      precio: formData.precio,
      activo: formData.activo,
      categoryIds: formData.categoryIds,
      promotionIds: formData.promotionIds
    };

    try {
     onUpdate(product.id, productDataToUpdate);
      onClose();
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center overflow-y-auto p-4 z-50">
      <div className="bg-white p-5 rounded-lg w-full max-w-md my-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-3 text-pink-700 sticky top-0 bg-white pb-2">Actualizar Producto</h2>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-gray-700 mb-1 font-medium text-sm">Nombre del Producto</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="w-full border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-pink-500 text-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 font-medium text-sm">Descripción</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              className="w-full border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-pink-500 min-h-[60px] text-sm"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 font-medium text-sm">Precio (S/)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={formData.precio}
              onChange={(e) => setFormData({...formData, precio: parseFloat(e.target.value)})}
              className="w-full border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-pink-500 text-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 font-medium text-sm">Categorías</label>
            <select
              multiple
              value={formData.categoryIds}
              onChange={handleCategoryChange}
              className="w-full border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-pink-500 min-h-[80px] text-sm"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nombre}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-0.5">Ctrl/Cmd para selección múltiple</p>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 font-medium text-sm">Promociones</label>
            <select
              multiple
              value={formData.promotionIds}
              onChange={handlePromotionChange}
              className="w-full border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-pink-500 min-h-[80px] text-sm"
            >
              {promotions.map((promotion) => (
                <option key={promotion.id} value={promotion.id}>
                  {promotion.nombre} ({promotion.valor}% descuento)
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-0.5">Ctrl/Cmd para selección múltiple</p>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 font-medium text-sm">Estado</label>
            <select
              value={formData.activo.toString()}
              onChange={(e) => setFormData({...formData, activo: e.target.value === 'true'})}
              className="w-full border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-pink-500 text-sm"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>
          
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-400 transition-colors text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-pink-600 text-white px-3 py-1.5 rounded-md hover:bg-pink-700 transition-colors text-sm"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
