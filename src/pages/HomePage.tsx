import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import FeaturesSection from '../components/home/FeaturesSection';
import StepsSection from '../components/home/StepsSection';
import Footer from '../components/layout/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <StepsSection />
      <Footer />
    </div>
  );
};

export default HomePage;