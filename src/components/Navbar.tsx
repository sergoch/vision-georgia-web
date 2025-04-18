
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from './ui/button';

const Navbar: React.FC = () => {
  const { language, setLanguage, t, isGeorgian } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'ka' ? 'en' : 'ka');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-rvision-blue/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* Placeholder logo - will replace with actual logo */}
            <div className="w-10 h-10 bg-rvision-orange rounded-full flex items-center justify-center">
              <span className="text-white font-bold">RV</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">
                {isGeorgian ? 'რეალ ვიჟენი' : 'Real Vision'}
              </h1>
              <p className="text-white/60 text-xs">
                {isGeorgian ? 'საინჟინრო კომპანია' : 'Engineering Company'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-white hover:text-rvision-orange transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/about" className="text-white hover:text-rvision-orange transition-colors">
              {t('nav.about')}
            </Link>
            <Link to="/services" className="text-white hover:text-rvision-orange transition-colors">
              {t('nav.services')}
            </Link>
            <Link to="/team" className="text-white hover:text-rvision-orange transition-colors">
              {t('nav.team')}
            </Link>
            <Link to="/projects" className="text-white hover:text-rvision-orange transition-colors">
              {t('nav.projects')}
            </Link>
            <Link to="/contact" className="text-white hover:text-rvision-orange transition-colors">
              {t('nav.contact')}
            </Link>
            
            {/* Language Toggle */}
            <Button 
              onClick={toggleLanguage} 
              variant="ghost" 
              size="sm"
              className="ml-4 flex items-center space-x-1 text-white hover:text-rvision-orange hover:bg-rvision-blue/30"
            >
              <Globe size={16} />
              <span>{language.toUpperCase()}</span>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <Button 
              onClick={toggleLanguage} 
              variant="ghost" 
              size="sm"
              className="mr-2 flex items-center space-x-1 text-white hover:text-rvision-orange hover:bg-rvision-blue/30"
            >
              <Globe size={16} />
              <span>{language.toUpperCase()}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-rvision-orange hover:bg-rvision-blue/30"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4 bg-rvision-blue/90 backdrop-blur-md p-4 rounded-md">
              <Link 
                to="/" 
                className="text-white hover:text-rvision-orange px-4 py-2 rounded-md hover:bg-white/5 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/about" 
                className="text-white hover:text-rvision-orange px-4 py-2 rounded-md hover:bg-white/5 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>
              <Link 
                to="/services" 
                className="text-white hover:text-rvision-orange px-4 py-2 rounded-md hover:bg-white/5 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.services')}
              </Link>
              <Link 
                to="/team" 
                className="text-white hover:text-rvision-orange px-4 py-2 rounded-md hover:bg-white/5 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.team')}
              </Link>
              <Link 
                to="/projects" 
                className="text-white hover:text-rvision-orange px-4 py-2 rounded-md hover:bg-white/5 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.projects')}
              </Link>
              <Link 
                to="/contact" 
                className="text-white hover:text-rvision-orange px-4 py-2 rounded-md hover:bg-white/5 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
