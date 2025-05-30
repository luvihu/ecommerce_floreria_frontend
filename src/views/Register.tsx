import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/actions/users/registerUser";
import { RootState } from "../redux/store";
import { useState } from "react";

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const error = useSelector((state: RootState) => state.auth.error);

  const [showPassword, setShowPassword] = useState(false);

  // Mapeo de nombres de campo en inglés a español
  const fieldLabels: Record<string, string> = {
    nombre: "Nombre",
    apellido: "Apellido",
    telefono: "Teléfono",
    email: "Correo electrónico",
    password: "Contraseña"
  };

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      password: ""
      
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras y espacios")
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .required("El nombre es obligatorio"),
      apellido: Yup.string()
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras y espacios") 
        .min(2, "El apellido debe tener al menos 2 caracteres")
        .required("El apellido es obligatorio"),
      telefono: Yup.string()
        .matches(/^9\d{8}$/, "El teléfono debe comenzar con 9 y tener 9 dígitos")
        .length(9, "El teléfono debe tener 9 caracteres")
        .required("El teléfono es obligatorio"),
      email: Yup.string()
        .email("Correo inválido")
        .required("El correo es obligatorio"),
      password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es obligatoria"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  return (
    <div className="w-full max-w-md mx-auto my-8 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
        <h2 className="text-xl md:text-2xl lg:text-2xl font-bold text-center mb-6 font-serif text-lime-800">Registro de Usuario</h2>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-center text-sm">{error}</p>
          </div>
        )}
        
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {["nombre", "apellido", "telefono", "email", "password"].map((field) => (
            <div key={field} className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                {fieldLabels[field]}
              </label>
              <div className="relative">
                <input
                  type={field === "password" ? (showPassword ? "text" : "password") : "text"}
                  name={field}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field as keyof typeof formik.values]}
                  className={`w-full px-4 py-2.5 rounded-md border transition duration-200 focus:ring-2 focus:outline-none ${
                    formik.touched[field as keyof typeof formik.touched] && 
                    formik.errors[field as keyof typeof formik.errors]
                      ? "border-red-300 focus:ring-red-100"
                      : "border-gray-300 focus:ring-lime-100 focus:border-lime-600"
                  }`}
                  placeholder={`Ingrese su ${fieldLabels[field].toLowerCase()}`}
                />
                {field === "password" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <FaEye className="text-xl" /> : <FaEyeSlash className="text-xl" />}
                  </button>
                )}
              </div>
              {formik.touched[field as keyof typeof formik.touched] && 
               formik.errors[field as keyof typeof formik.errors] && (
                <p className="mt-1 text-red-600 text-xs font-medium">
                  {formik.errors[field as keyof typeof formik.errors]}
                </p>
              )}
            </div>
          ))}

          <div className="pt-2 space-y-3">
            <button 
              type="submit" 
              className="w-full bg-lime-800 text-white py-2.5 rounded-md hover:bg-lime-700 transition duration-200 font-medium shadow-sm"
            >
              Registrarse
            </button>
            
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-md hover:bg-gray-200 transition duration-200 font-medium border border-gray-300"
            >
              Volver al inicio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
