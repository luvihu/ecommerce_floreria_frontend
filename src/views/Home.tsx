import React from 'react';
import CategorySection from '../components/CategorySection';
import Banner from '../components/Banner';
import imagenBanner from '../assets/portada1.png';
import WhatsAppButton from '../components/WhatsAppButton';

const Home: React.FC = () => {
  
  return (
    <div className="home-container">
      <main>
        <Banner 
          imageUrl={imagenBanner}/>             
        <section className="categories-section">
          <CategorySection />
        </section>        
      </main>
      <WhatsAppButton />
    </div>
  );
};

export default Home;
