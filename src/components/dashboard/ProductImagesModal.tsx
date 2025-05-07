import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchProductImages } from '../../redux/actions/images/fetchProductImages';
import { uploadProductImage } from '../../redux/actions/images/uploadProductImage';
import { deleteProductImage } from '../../redux/actions/images/deleteProductImage';
import { setMainProductImage } from '../../redux/actions/images/setMainProductImage';
import { ImageDashboard } from '../../interfaces/Interfaces';

interface Product {
  id: string;
  nombre: string;
};

interface ProductImagesModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
};

const ProductImagesModal = ({ product, isOpen, onClose }: ProductImagesModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const images = useSelector((state: RootState) => state.dashboard.productImages);
  const loading = useSelector((state: RootState) => state.dashboard.loading);
  const error = useSelector((state: RootState) => state.dashboard.error);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [altText, setAltText] = useState<string>('');
  const [isPrincipal, setIsPrincipal] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  
  useEffect(() => {
    if (isOpen && product.id) {
      dispatch(fetchProductImages(product.id));
    }
  }, [dispatch, isOpen, product.id]);
  
  useEffect(() => {
    // Crear URL de vista previa para la imagen seleccionada
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    
    // Limpiar URL al desmontar
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }
    
    const file = e.target.files[0];
    
    // Validar que sea una imagen
    if (!file.type.startsWith('image')) {
      alert('Por favor seleccione un archivo de imagen válido');
      return;
    }
    
    setSelectedFile(file);
    // Establecer alt_text predeterminado basado en el nombre del producto
    setAltText(`Imagen de ${product.nombre}`);
  };
  
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor seleccione una imagen para subir');
      return;
    }
    
    setUploading(true);
    
    try {
      // Convertir imagen a base64 para enviar al backend
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        
        await dispatch(uploadProductImage({
          productId: product.id,
          imageData: {
            image: base64data,
            alt_text: altText,
            principal: isPrincipal
          }
        }));
        
        // Limpiar formulario después de subir
        setSelectedFile(null);
        setPreview(null);
        setAltText('');
        setIsPrincipal(false);
        
        // Recargar imágenes
        dispatch(fetchProductImages(product.id));
      };
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    } finally {
      setUploading(false);
    }
  };
  
  const handleDelete = async (imageId: string) => {
    if (window.confirm('¿Está seguro que desea eliminar esta imagen?')) {
      try {
        await dispatch(deleteProductImage(imageId));
        dispatch(fetchProductImages(product.id));
      } catch (error) {
        console.error('Error al eliminar la imagen:', error);
      }
    }
  };
  
  const handleSetMainImage = async (imageId: string) => {
    try {
      await dispatch(setMainProductImage({
        imageId,
        productId: product.id
      }));
      dispatch(fetchProductImages(product.id));
    } catch (error) {
      console.error('Error al establecer la imagen principal:', error);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-700">Imágenes de {product.nombre}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Formulario de carga */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="text-lg font-medium mb-4">Subir nueva imagen</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seleccionar imagen
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                />
              </div>
              
              {preview && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Vista previa:</p>
                  <img 
                    src={preview} 
                    alt="Vista previa" 
                    className="max-h-40 rounded border"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Texto alternativo
                </label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Descripción de la imagen"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPrincipal"
                  checked={isPrincipal}
                  onChange={(e) => setIsPrincipal(e.target.checked)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label htmlFor="isPrincipal" className="ml-2 block text-sm text-gray-700">
                  Establecer como imagen principal
                </label>
              </div>
              
              <button
                type="button"
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className={`w-full py-2 px-4 rounded-lg ${
                  !selectedFile || uploading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-pink-600 hover:bg-pink-700 text-white'
                }`}
              >
                {uploading ? 'Subiendo...' : 'Subir imagen'}
              </button>
            </div>
          </div>
          
          {/* Galería de imágenes */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Imágenes actuales</h3>
            
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <p>Cargando imágenes...</p>
              </div>
            ) : images.length === 0 ? (
              <div className="flex justify-center items-center h-40 bg-gray-50 rounded border">
                <p className="text-gray-500">No hay imágenes para este producto</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-2">
                {images.map((image: ImageDashboard) => (
                  <div 
                    key={image.id} 
                    className={`relative border rounded overflow-hidden ${
                      image.principal ? 'ring-2 ring-pink-500' : ''
                    }`}
                  >
                    <img 
                      src={image.url} 
                      alt={image.alt_text} 
                      className="w-full h-32 object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                      <div className="flex space-x-2">
                        {!image.principal && (
                          <button
                            onClick={() => handleSetMainImage(image.id)}
                            className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
                            title="Establecer como principal"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleDelete(image.id)}
                          className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                          title="Eliminar imagen"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                      {image.principal && (
                        <span className="bg-pink-500 text-white text-xs px-1 rounded mr-1">
                          Principal
                        </span>
                      )}
                      {image.alt_text}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductImagesModal;
