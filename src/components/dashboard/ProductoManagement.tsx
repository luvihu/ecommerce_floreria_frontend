import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaPlus, FaImage } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { deleteProduct } from "../../redux/actions/products/deleteProduct";
import { updateProduct } from "../../redux/actions/products/updateProduct";
import { fetchProducts } from "../../redux/actions/products/fetchProducts";
import { Product } from "../../interfaces/Interfaces";
import { useEffect, useState } from "react";
import ProductModal from "./ProductModal";
import ProductFormModal from "./ProductFormModal";
import ProductImagesModal from "./ProductImagesModal";

const ProductManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
 
  const initialFilters = {
    nombre: '',
    categoria: '',
    activo: '',
    precioMin: '',
    precioMax: ''
  };

  const [filters, setFilters] = useState(initialFilters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImagesModalOpen, setIsImagesModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpenRegist, setIsModalOpenRegist] = useState(false);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const filteredProducts = products
    .filter(product => {
      const matchNombre = product.nombre.toLowerCase().includes(filters.nombre.toLowerCase());
      
      const matchCategoria = filters.categoria === '' ? true : 
        product.categories.some(cat => cat.nombre.toLowerCase().includes(filters.categoria.toLowerCase()));
      
      const matchActivo = filters.activo === '' ? true : product.activo?.toString() === filters.activo;
      
      const precio = parseFloat(product.precio.toString());
      const precioMin = filters.precioMin === '' ? 0 : parseFloat(filters.precioMin);
      const precioMax = filters.precioMax === '' ? Infinity : parseFloat(filters.precioMax);
      const matchPrecio = precio >= precioMin && precio <= precioMax;
      
      return matchNombre && matchCategoria && matchActivo && matchPrecio;
    })
    .sort((a, b) => a.nombre.localeCompare(b.nombre));
   
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El producto será desactivado pero no eliminado permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
      }
    });
  };
 
  const handleUpdateClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleImagesClick = (product: Product) => {
    setSelectedProduct(product);
    setIsImagesModalOpen(true);
  };
 
  const handleUpdate = async (id: string, productData: Partial<Product>) => {
    await dispatch(updateProduct(id, productData));
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(price);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">Gestión de Productos</h2>
        <button
          onClick={resetFilters}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded"
        >
          Resetear Filtros
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            placeholder="Buscar por nombre"
            className="w-full px-3 py-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={filters.nombre}
            onChange={(e) => setFilters({...filters, nombre: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
          <input
            type="text"
            placeholder="Filtrar por categoría"
            className="w-full px-3 py-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={filters.categoria}
            onChange={(e) => setFilters({...filters, categoria: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select
            className="w-full px-3 py-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={filters.activo}
            onChange={(e) => setFilters({...filters, activo: e.target.value})}
          >
            <option value="">Todos</option>
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Precio mínimo</label>
          <input
            type="number"
            placeholder="Precio mínimo"
            className="w-full px-3 py-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={filters.precioMin}
            onChange={(e) => setFilters({...filters, precioMin: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Precio máximo</label>
          <input
            type="number"
            placeholder="Precio máximo"
            className="w-full px-3 py-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={filters.precioMax}
            onChange={(e) => setFilters({...filters, precioMax: e.target.value})}
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
          No se encontraron productos con los filtros seleccionados
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-pink-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Categorías</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Imágenes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Promociones</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0].url} 
                          alt={product.nombre} 
                          className="h-10 w-10 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-gray-500">🌹</span>
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.nombre}</div>
                        <div className="text-xs text-gray-500 max-w-xs truncate">{product.descripcion}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {product.categories.map(category => (
                        <span 
                          key={category.id} 
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-pink-100 text-pink-800"
                        >
                          {category.nombre}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {formatPrice(parseFloat(product.precio.toString()))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.activo 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.images ? product.images.length : 0} imágenes
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {product.promotions && product.promotions.map(promo => (
                        <span 
                          key={promo.id} 
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                        >
                          {promo.nombre} ({promo.valor}%)
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateClick(product)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Editar Producto"
                      >
                        <FaEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleImagesClick(product)}
                        className="text-purple-600 hover:text-purple-900"
                        title="Gestionar Imágenes"
                      >
                        <FaImage className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Desactivar Producto"
                      >
                        <FaTrash className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedProduct && (
        <>
          <ProductModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onUpdate={handleUpdate}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedProduct(null);
            }}
          />
          <ProductImagesModal
            product={selectedProduct}
            isOpen={isImagesModalOpen}
            onClose={() => {
              setIsImagesModalOpen(false);
              setSelectedProduct(null);
              dispatch(fetchProducts());
            }}
          />
        </>
      )}

      <div className="mt-6">
        <button
          onClick={() => setIsModalOpenRegist(true)}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 flex items-center shadow-md"
        >
          <FaPlus className="mr-2" /> Agregar Producto
        </button>
        <ProductFormModal
          isOpen={isModalOpenRegist}
          onClose={() => {
            setIsModalOpenRegist(false);
            dispatch(fetchProducts());
          }}
        />
      </div>
    </div>
  );
};

export default ProductManagement;
