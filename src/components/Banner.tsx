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
          <div className="text-left space-y-9 md:space-y-12 sm:space-y-8 rounded-3xl p-6 sm:p-6 lg:p-9 backdrop-blur-sm bg-white/10">
           
            {/* Título principal - ligeramente más a la izquierda */}
            <div className="space-y-2 ml-1 sm:ml-2 ">
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-tight pb-0 sm:pb-6">
                <span className="block text-transparent bg-gradient-to-r from-rose-900 to-rose-400 bg-clip-text font-playfair pb-4 md:pb-7">Regala</span>
                <span className="block text-transparent bg-gradient-to-r from-rose-400 to-amber-200 bg-clip-text  font-playfair">
                  Emociones
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-lg lg:text-xl text-lime-700/90 leading-relaxed max-w-2xl font-medium">
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
      <div className="absolute top-20 right-20 w-6 h-6 bg-emerald-300/30 rounded-full animate-pulse lg:block"></div>
      <div className="absolute bottom-40 right-40 w-7 h-7 bg-rose-300/90 rounded-full animate-pulse delay-75 lg:block"></div>
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-amber-300/50 rounded-full animate-pulse delay-150 lg:block"></div>

   </section>
  );
};

export default Banner;