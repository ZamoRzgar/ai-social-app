import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import LearnMore from './components/LearnMore';
import FeaturesSection from './components/FeaturesSection';
import ContactSection from './components/ContactSection';
import Hero from './components/Hero';


export default function Page() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <HomeSection />
        <LearnMore />
        <FeaturesSection />

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
