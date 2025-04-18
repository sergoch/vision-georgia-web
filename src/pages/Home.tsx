
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=1500')", 
            backgroundSize: "cover",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-rvision-blue/80 via-rvision-blue/70 to-rvision-blue"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 h-full flex items-center relative z-10 pt-20">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t('home.welcome')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10">
              {t('home.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                className="bg-rvision-orange hover:bg-rvision-orange/90 text-white px-8 py-6"
              >
                <Link to="/services">
                  {t('nav.services')}
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6"
              >
                <Link to="/about">
                  {t('home.learnMore')} <ArrowRight className="ml-2" size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gradient-to-b from-rvision-blue to-rvision-blue/90">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            {t('services.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 bg-rvision-green/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-rvision-green/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rvision-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t('services.engineering')}
              </h3>
              <p className="text-gray-300 mb-6">
                Professional engineering consulting services for construction, infrastructure, and development projects.
              </p>
              <Link to="/services" className="text-rvision-orange hover:underline flex items-center">
                Learn more <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 bg-rvision-green/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-rvision-green/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rvision-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t('services.geodetic')}
              </h3>
              <p className="text-gray-300 mb-6">
                Precise topographic surveying, land mapping, and geodetic measurements for planning and development.
              </p>
              <Link to="/services" className="text-rvision-orange hover:underline flex items-center">
                Learn more <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 bg-rvision-green/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-rvision-green/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rvision-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t('services.lidar')}
              </h3>
              <p className="text-gray-300 mb-6">
                Advanced LIDAR technology for high-precision aerial surveys and 3D terrain modeling for various applications.
              </p>
              <Link to="/services" className="text-rvision-orange hover:underline flex items-center">
                Learn more <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Button 
              asChild
              className="bg-rvision-orange hover:bg-rvision-orange/90 text-white px-8"
            >
              <Link to="/services">
                {t('nav.services')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Project Highlight */}
      <section className="py-20 bg-rvision-blue/80">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1500" 
                alt="GIS Project" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-6">
                {t('projects.title')}
              </h2>
              <p className="text-gray-300 mb-6">
                We provide comprehensive geospatial solutions including aerial surveys, GIS mapping, and spatial data analysis. Our team of experts helps clients visualize and understand geographic information for better decision-making.
              </p>
              <Button 
                asChild
                className="bg-rvision-orange hover:bg-rvision-orange/90 text-white"
              >
                <Link to="/projects">
                  {t('projects.title')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-b from-rvision-blue/80 to-rvision-blue">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
            Ready to start your project? Contact us today to discuss how our engineering and geodetic services can help you achieve your goals.
          </p>
          <Button 
            asChild
            className="bg-rvision-orange hover:bg-rvision-orange/90 text-white px-8 py-6"
          >
            <Link to="/contact">
              {t('nav.contact')}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
