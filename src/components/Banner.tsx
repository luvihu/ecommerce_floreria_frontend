// import { FaPhoneAlt, FaInstagram, FaWhatsapp, FaArrowDown } from 'react-icons/fa';
// import { MdLocalFlorist, MdOutlineDeliveryDining } from 'react-icons/md';
// import { GiFlowerPot } from 'react-icons/gi';
// import imageUrl from "../assets/heroRosas.png";

// const Banner = () => {
//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100/30">
//       {/* Fondos decorativos */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Formas orgánicas de fondo */}
//         <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-pink-300/15 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-rose-300/10 rounded-full blur-2xl"></div>
        
//         {/* Patrón de puntos sutiles */}
//         <div className="absolute inset-0 opacity-30">
//           <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-rose-400/40 rounded-full"></div>
//           <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-pink-400/30 rounded-full"></div>
//           <div className="absolute top-3/4 right-1/4 w-4 h-4 bg-rose-300/20 rounded-full"></div>
//         </div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
//           {/* Contenido textual - Lado derecho */}
//           <div className="text-center lg:text-left space-y-8 order-2 lg:order-1">
//             {/* Badge elegante */}
//             <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 border border-rose-200 shadow-sm">
//               <GiFlowerPot className="text-rose-500 text-xl" />
//               <span className="text-rose-700 font-medium text-sm">🌸 Flores Frescas & Entregas Same Day</span>
//             </div>

//             {/* Título principal */}
//             <div className="space-y-6">
//               <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-tight">
//                 <span className="block text-rose-800 font-light">Regala</span>
//                 <span className="block text-transparent bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 bg-clip-text font-medium">
//                   Emociones
//                 </span>
//               </h1>
              
//               <p className="text-xl sm:text-2xl text-rose-600/80 leading-relaxed max-w-2xl font-light">
//                 Donde cada pétalo cuenta una historia de amor, amistad y momentos especiales
//               </p>
//             </div>

//             {/* Línea decorativa sutil */}
//             <div className="w-32 h-0.5 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full mx-auto lg:mx-0 opacity-60"></div>

//             {/* Información de contacto elegante */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               {/* Teléfono */}
//               <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-4 border border-rose-100 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer hover:bg-white/80">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-rose-200/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
//                   <FaPhoneAlt className="text-rose-500 text-lg relative z-10" />
//                 </div>
//                 <div className="text-left">
//                   <p className="text-xs text-rose-600/60 font-medium">Llámanos ahora</p>
//                   <p className="text-rose-700 font-semibold">+51 993 456 621</p>
//                 </div>
//               </div>

//               {/* Instagram */}
//               <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-4 border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer hover:bg-white/80">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-pink-200/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
//                   <FaInstagram className="text-pink-500 text-lg relative z-10" />
//                 </div>
//                 <div className="text-left">
//                   <p className="text-xs text-rose-600/60 font-medium">Síguenos</p>
//                   <p className="text-rose-700 font-semibold">@flores__estela</p>
//                 </div>
//               </div>
//             </div>

//             {/* Botones de acción */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
//               <button className="group bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white px-8 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//                 <span className="flex items-center justify-center gap-3">
//                   Ver Colección
//                   <MdLocalFlorist className="group-hover:rotate-12 transition-transform duration-300 text-lg" />
//                 </span>
//               </button>
              
//               <button className="group border-2 border-rose-300 text-rose-600 hover:bg-rose-50/50 px-8 py-4 rounded-2xl font-medium shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
//                 <span className="flex items-center justify-center gap-3">
//                   <MdOutlineDeliveryDining className="group-hover:animate-bounce" />
//                   Pedir Ahora
//                 </span>
//               </button>
//             </div>

//             {/* Beneficios rápidos */}
//             <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-8">
//               <div className="flex items-center gap-2 text-rose-600/70">
//                 <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
//                 <span className="text-sm">✅ Entregas el mismo día</span>
//               </div>
//               <div className="flex items-center gap-2 text-rose-600/70">
//                 <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
//                 <span className="text-sm">🌸 Flores frescas garantizadas</span>
//               </div>
//               <div className="flex items-center gap-2 text-rose-600/70">
//                 <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
//                 <span className="text-sm">🎁 Empaques premium</span>
//               </div>
//             </div>
//           </div>

//           {/* Imagen del ramo - Esquina inferior izquierda */}
//           <div className="relative order-1 lg:order-2">
//             <div className="relative lg:ml-8">
//               {/* Contenedor de la imagen con efecto flotante */}
//               <div className="relative animate-float">
//                 {/* Efecto de sombra y brillo */}
//                 <div className="absolute -inset-6 bg-gradient-to-br from-rose-200/40 to-pink-200/30 rounded-3xl blur-lg opacity-60"></div>
                
//                 {/* Marco de la imagen */}
//                 <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm">
//                   <img 
//                     src={imageUrl} 
//                     alt="Elegante ramo de rosas frescas"
//                     className="w-full h-[500px] lg:h-[600px] object-cover object-left-bottom"
//                   />
                  
//                   {/* Overlay gradiente sutil */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-rose-900/10 via-transparent to-pink-50/5"></div>
//                 </div>
//               </div>

//               {/* Elementos decorativos flotantes */}
//               <div className="absolute -top-4 -right-4 w-6 h-6 bg-rose-300 rounded-full opacity-50 animate-pulse"></div>
//               <div className="absolute -bottom-2 -left-4 w-8 h-8 bg-pink-300 rounded-full opacity-40 animate-pulse delay-75"></div>
              
//               {/* Tarjeta de WhatsApp flotante */}
//               <div className="absolute -bottom-6 -right-6 bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-rose-200/60">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
//                     <FaWhatsapp className="text-white text-lg" />
//                   </div>
//                   <div>
//                     <p className="text-rose-800 font-semibold text-sm">WhatsApp</p>
//                     <p className="text-rose-600 text-xs">Pedidos 24/7</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Indicador de scroll elegante */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//         <div className="flex flex-col items-center gap-2 text-rose-500/50">
//           <span className="text-sm font-light">Descubre la magia</span>
//           <FaArrowDown className="text-lg" />
//         </div>
//       </div>

//       {/* Efecto de polvo de hadas (partículas) */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-20 right-20 w-2 h-2 bg-rose-300/30 rounded-full animate-float delay-100"></div>
//         <div className="absolute top-40 left-40 w-1 h-1 bg-pink-300/20 rounded-full animate-float delay-300"></div>
//         <div className="absolute bottom-40 right-60 w-1.5 h-1.5 bg-rose-200/40 rounded-full animate-float delay-500"></div>
//       </div>
//     </section>
//   );
// };

// export default Banner;

// import { FaPhoneAlt, FaInstagram, FaWhatsapp, FaArrowDown } from 'react-icons/fa';
// import imageUrl from "../assets/heroRosas.png";

// const Banner = () => {
//   return (
//     <section className="relative h-100vh flex items-center justify-center overflow-hidden">
//       {/* Imagen de fondo completa */}
//       <div className="absolute inset-0">
//         <img 
//           src={imageUrl} 
//           alt="Fondo con ramo de rosas en esquina inferior izquierda"
//           className="w-full h-full object-cover"
//         />
        
//       </div>

//       {/* Contenido sobre la imagen */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-[84vh]">
//            <div className="hidden lg:block"></div>

//           {/* Contenido textual - Lado derecho */}
//           <div className="text-center lg:text-left space-y-8  rounded-3xl p-8 lg:p-12">
           
//             {/* Título principal */}
//             <div className="space-y-6">
//               <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
//                 <span className="block text-lime-800">Regala</span>
//                 <span className="block text-transparent bg-gradient-to-r from-rose-400 to-amber-200 bg-clip-text">
//                   Emociones
//                 </span>
//               </h1>
              
//               <p className="text-xl sm:text-2xl text-lime-700/80 leading-relaxed max-w-2xl font-medium">
//                 Donde cada pétalo cuenta una historia de amor, amistad y momentos especiales
//               </p>
//             </div>

//             {/* Línea decorativa */}
//             <div className="w-32 h-1 bg-gradient-to-r from-lime-400 to-rose-400 rounded-full mx-auto lg:mx-0"></div>

//             {/* Información de contacto */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               {/* Teléfono */}
//               <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl px-2 py-2 border border-amber-200/60 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer hover:bg-white/90">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-amber-300/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
//                   <FaPhoneAlt className="text-amber-600 text-lg relative z-10" />
//                 </div>
//                 <div className="text-left">
//                   <p className="text-xs  text-emerald-600/70 font-medium">Llámanos </p>
//                   <p className="text-emerald-800 font-semibold">+51 993 456 621</p>
//                 </div>
//               </div>

//               {/* Instagram */}
//               <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 border border-rose-200/60 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer hover:bg-white/90">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-rose-300/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
//                   <FaInstagram className="text-rose-500 text-lg relative z-10" />
//                 </div>
//                 <div className="text-left">
//                   <p className="text-xs text-emerald-600/70 font-medium">Síguenos</p>
//                   <p className="text-emerald-800 font-semibold">@flores__estela</p>
//                 </div>
//               </div>
//             </div>

           
//             {/* Beneficios rápidos */}
//             <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-8">
//               <div className="flex items-center gap-2 text-emerald-700/80 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2">
//                 <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
//                 <span className="text-sm font-medium">✅ Entregas el mismo día</span>
//               </div>
//               <div className="flex items-center gap-2 text-rose-700/80 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2">
//                 <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
//                 <span className="text-sm font-medium">🌸 Flores frescas garantizadas</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Elementos decorativos flotantes */}
//       <div className="absolute top-20 right-20 w-6 h-6 bg-emerald-300/40 rounded-full animate-pulse hidden lg:block"></div>
//       <div className="absolute bottom-40 right-40 w-8 h-8 bg-rose-300/30 rounded-full animate-pulse delay-75 hidden lg:block"></div>
//       <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-amber-300/50 rounded-full animate-pulse delay-150 hidden lg:block"></div>

//       {/* Tarjeta de WhatsApp flotante */}
//       <div className="fixed bottom-8 right-8 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-emerald-200/60 z-20 hover:scale-105 transition-transform duration-300">
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
//             <FaWhatsapp className="text-white text-xl" />
//           </div>
//           <div>
//             <p className="text-emerald-800 font-semibold">WhatsApp</p>
//             <p className="text-emerald-600 text-sm">Pedidos 24/7</p>
//           </div>
//         </div>
//       </div>

//       {/* Indicador de scroll */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
//         <div className="flex flex-col items-center gap-2 text-emerald-600/70">
//           <span className="text-sm font-medium">Descubre más</span>
//           <FaArrowDown className="text-lg" />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Banner;


import imageUrl from "../assets/heroRosas.png";

const Banner = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      
      {/* Imagen de fondo completa */}
      <div className="absolute inset-0">
        <img 
          src={imageUrl} 
          alt="Fondo con ramo de rosas en esquina inferior izquierda"
          className="w-full h-full object-cover"
        />
        
      </div>
      
      {/* Contenido sobre la imagen */}
      <div className="relative z-10 max-w-7xl mx-auto ml-20 sm:ml-0 px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center h-[84vh]">
          <div className="hidden sm:block"></div>

          {/* Contenido textual - Lado derecho */}
          <div className="text-left space-y-12 sm:space-y-8 rounded-3xl p-8 sm:p-6 lg:p-10 backdrop-blur-sm bg-white/10">
           
            {/* Título principal - ligeramente más a la izquierda */}
            <div className="space-y-3 ml-1 sm:ml-2 ">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight pb-6">
                <span className="block text-lime-800">Regala</span>
                <span className="block text-transparent bg-gradient-to-r from-rose-400 to-amber-200 bg-clip-text">
                  Emociones
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-xl lg:text-2xl text-lime-700/90 leading-relaxed max-w-2xl font-medium">
                Donde cada pétalo cuenta una historia de amor, amistad y momentos especiales
              </p>
            </div>

            {/* Línea decorativa - alineada a la izquierda */}
            <div className="w-28 h-0.5 bg-gradient-to-r from-lime-400 to-rose-400 rounded-full ml-1 sm:ml-2"></div>

            {/* Información de contacto - más delgadas y más a la izquierda */}
           

            {/* Beneficios rápidos - más compactos y alineados */}
            <div className="flex flex-wrap gap-4 justify-start ml-1 sm:ml-2 pt-6">
              <div className="flex items-center gap-2 text-emerald-700/80 bg-white/50 backdrop-blur-sm rounded-full px-3 py-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium">✅ Entregas el mismo día</span>
              </div>
              <div className="flex items-center gap-2 text-rose-700/80 bg-white/50 backdrop-blur-sm rounded-full px-3 py-1.5">
                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium">🌸 Flores frescas garantizadas</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      

      {/* Elementos decorativos flotantes */}
      <div className="absolute top-20 right-20 w-6 h-6 bg-emerald-300/50 rounded-full animate-pulse lg:block"></div>
      <div className="absolute bottom-40 right-40 w-7 h-7 bg-rose-300/90 rounded-full animate-pulse delay-75 lg:block"></div>
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-amber-300/70 rounded-full animate-pulse delay-150 lg:block"></div>

   </section>
  );
};

export default Banner;