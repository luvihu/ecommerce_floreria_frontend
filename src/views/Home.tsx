import React from 'react';
import CategorySection from '../components/CategorySection';
import Banner from '../components/Banner';

const Home: React.FC = () => {
  
  return (
    <div className='pt-12 sm:pt-16 md:pt-[64px] lg:pt-24'  >
       <Banner />             
        <CategorySection />
     </div>
  );
};

export default Home;
