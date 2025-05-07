import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../redux/store";
import { createProduct } from "../../redux/actions/products/createProduct";
import { fetchCategories } from "../../redux/actions/categories/fetchCategories";
import { fetchPromotions } from "../../redux/actions/promotions/fetchPromotions";

interface Category {
  id: string;
  nombre: string;
}

interface Promotion {
  id: string;
  nombre: string;
  valor: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProductFormValues {
  nombre: string;
  descripcion?: string;
  precio: number;
  activo: boolean;
  categoryIds: string[];
  promotionIds: string[];
}

const ProductFormModal = ({ isOpen, onClose }: ModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.products.error);
  const categories = useSelector((state: RootState) => state.products.categories as Category[]);
  const promotions = useSelector((state: RootState) => state.products.promotions as Promotion[]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPromotions());
  }, [dispatch]);

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };
 
  const formik = useFormik<ProductFormValues>({
    initialValues: {
      nombre: "",
      descripcion: "",
      precio: 0,
      activo: true,
      categoryIds: [],
      promotionIds: []
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required("El nombre es obligatorio")
        .max(100, "El nombre no puede exceder los 100 caracteres"),
      descripcion: Yup.string()
        .max(500, "La descripción no puede exceder los 500 caracteres"),
      precio: Yup.number()
        .required("El precio es obligatorio")
        .positive("El precio debe ser positivo")
        .min(0.01, "El precio mínimo es 0.01"),
      categoryIds: Yup.array()
        .min(1, "Debe seleccionar al menos una categoría")
        .required("Las categorías son obligatorias"),
      activo: Yup.boolean(),
      promotionIds: Yup.array()
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      
      try {
        await dispatch(createProduct(values));
        handleClose();
      } catch (error) {
        console.error('Error al crear producto:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });
 
  // Manejador para la selección de categorías
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    formik.setFieldValue('categoryIds', selectedOptions);
  };

  // Manejador para la selección de promociones
  const handlePromotionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    formik.setFieldValue('promotionIds', selectedOptions);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto p-4 pt-10">
      <div className="bg-white rounded-lg p-6 max-w-md w-full my-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-center mb-4 text-pink-700">Nuevo Producto</h2>
        
        {error && <p className="text-red-700 text-center mb-3 p-2 bg-red-100 rounded text-sm">{error}</p>}
        
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
            <input
              type="text"
              name="nombre"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombre}
              className="block w-full px-3 py-1.5 rounded-md border border-gray-300 focus:ring-pink-500 focus:border-pink-500 text-sm"
            />
            {formik.touched.nombre && formik.errors.nombre && (
              <p className="text-red-700 text-xs mt-1">{formik.errors.nombre}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              name="descripcion"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.descripcion}
              className="block w-full px-3 py-1.5 rounded-md border border-gray-300 focus:ring-pink-500 focus:border-pink-500 text-sm min-h-[60px]"
            />
            {formik.touched.descripcion && formik.errors.descripcion && (
              <p className="text-red-700 text-xs mt-1">{formik.errors.descripcion}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio (S/)</label>
            <input
              type="number"
              name="precio"
              step="0.01"
              min="0.01"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.precio}
              className="block w-full px-3 py-1.5 rounded-md border border-gray-300 focus:ring-pink-500 focus:border-pink-500 text-sm"
            />
            {formik.touched.precio && formik.errors.precio && (
              <p className="text-red-700 text-xs mt-1">{formik.errors.precio}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categorías</label>
            <select
              multiple
              name="categoryIds"
              onChange={handleCategoryChange}
              onBlur={formik.handleBlur}
              value={formik.values.categoryIds}
              className="block w-full px-3 py-1.5 rounded-md border border-gray-300 focus:ring-pink-500 focus:border-pink-500 text-sm min-h-[80px]"
            >
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nombre}
                  </option>
                ))
              ) : (
                <option value="" disabled>No hay categorías disponibles</option>
              )}
            </select>
            <p className="text-xs text-gray-500 mt-1">Ctrl/Cmd para selección múltiple</p>
            {formik.touched.categoryIds && formik.errors.categoryIds && (
              <p className="text-red-700 text-xs mt-1">{formik.errors.categoryIds}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Promociones (Opcional)</label>
            <select
              multiple
              name="promotionIds"
              onChange={handlePromotionChange}
              onBlur={formik.handleBlur}
              value={formik.values.promotionIds}
              className="block w-full px-3 py-1.5 rounded-md border border-gray-300 focus:ring-pink-500 focus:border-pink-500 text-sm min-h-[80px]"
            >
              {promotions && promotions.length > 0 ? (
                promotions.map((promotion) => (
                  <option key={promotion.id} value={promotion.id}>
                    {promotion.nombre} ({promotion.valor}% descuento)
                  </option>
                ))
              ) : (
                <option value="" disabled>No hay promociones disponibles</option>
              )}
            </select>
            <p className="text-xs text-gray-500 mt-1">Ctrl/Cmd para selección múltiple</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              name="activo"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.activo.toString()}
              className="block w-full px-3 py-1.5 rounded-md border border-gray-300 focus:ring-pink-500 focus:border-pink-500 text-sm"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !formik.isValid}
              className={`w-full ${
                isSubmitting || !formik.isValid
                  ? 'bg-gray-400'
                  : 'bg-pink-600 hover:bg-pink-700'
              } text-white py-1.5 rounded-md transition-colors text-sm font-medium`}
            >
              {isSubmitting ? 'Creando...' : 'Crear Producto'}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="w-full bg-gray-500 text-white py-1.5 rounded-md hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
