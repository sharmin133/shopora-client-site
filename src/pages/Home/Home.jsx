import React from 'react';
import HeroSection from './HeroSection';
import HomePageShowProduct from './HomePageShowProduct';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <HeroSection></HeroSection>
            <HomePageShowProduct></HomePageShowProduct>
        </div>
    );
};

export default Home;