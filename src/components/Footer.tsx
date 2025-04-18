
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rvision-blue shadow-inner">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              {/* Logo placeholder */}
              <div className="w-10 h-10 bg-rvision-orange rounded-full flex items-center justify-center">
                <span className="text-white font-bold">RV</span>
              </div>
              <h2 className="text-white font-bold text-xl">Real Vision</h2>
            </div>
            <p className="text-gray-300 mb-4">
              {t('about.companyName')}
            </p>
            <p className="text-gray-300 mb-4">
              {t('about.id')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-rvision-orange transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-rvision-orange transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-rvision-orange transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-rvision-orange transition-colors">
                  {t('nav.team')}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-rvision-orange transition-colors">
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-rvision-orange transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.contactUs')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="text-rvision-orange mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-300">{t('contact.address')}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-rvision-orange flex-shrink-0" size={18} />
                <a href="mailto:info@rvision.ge" className="text-gray-300 hover:text-rvision-orange transition-colors">
                  info@rvision.ge
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-rvision-orange flex-shrink-0" size={18} />
                <a href="tel:+995322000000" className="text-gray-300 hover:text-rvision-orange transition-colors">
                  +995 322 00 00 00
                </a>
              </li>
            </ul>
          </div>

          {/* Bank Info & Social */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Bank Details</h3>
            <p className="text-gray-300 mb-2">{t('contact.bankInfo')}</p>
            <p className="text-gray-300 mb-6">{t('contact.accountNumber')}</p>
            
            <h3 className="text-white font-semibold text-lg mb-4">Social Media</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-rvision-orange transition-colors p-2 rounded-full"
              >
                <Facebook size={20} className="text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-rvision-orange transition-colors p-2 rounded-full"
              >
                <Twitter size={20} className="text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-rvision-orange transition-colors p-2 rounded-full"
              >
                <Instagram size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-gray-400">
            © {currentYear} Real Vision LLC. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
