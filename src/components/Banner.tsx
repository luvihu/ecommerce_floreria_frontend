import React from 'react';
import './banner.css'; // Asegúrate de crear este archivo

interface BannerProps {
  imageUrl: string;
  }

const Banner: React.FC<BannerProps> = ({
  imageUrl,
  
}) => {
  return (
    <section className="main-banner mt-20 sm:mt-24 md:mt-28 lg:mt-28">
      
      <img src={imageUrl} alt="Banner" className="banner-image" />
      
    </section>
  );
};

export default Banner;

