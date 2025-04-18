
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Footer: React.FC = () => {
  const { t, isGeorgian } = useLanguage();
  const currentYear = new Date().getFullYear();

  const { data: footerData, isLoading } = useQuery({
    queryKey: ['footer'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('footer')
        .select('*')
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data || {
        company_name_en: 'Real Vision LLC',
        company_name_ka: 'შპს „რეალ ვიჟენი"',
        company_id: '445684536',
        address_en: 'Tamar Mepe Avenue #15, Batumi 6000',
        address_ka: 'თამარ მეფის გამზირი #15, ბათუმი 6000',
        email: 'info@rvision.ge',
        phone: '+995 322 00 00 00',
        bank_code_en: 'BAGAGE22',
        bank_code_ka: 'BAGAGE22',
        account_number_en: 'GE08BG0000000541535273',
        account_number_ka: 'GE08BG0000000541535273',
        facebook_url: 'https://facebook.com',
        twitter_url: 'https://twitter.com',
        instagram_url: 'https://instagram.com',
      };
    },
  });

  if (isLoading) {
    return (
      <footer className="bg-rvision-blue shadow-inner">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-white">
            <p>{isGeorgian ? 'იტვირთება...' : 'Loading...'}</p>
          </div>
        </div>
      </footer>
    );
  }

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
              {isGeorgian ? footerData.company_name_ka : footerData.company_name_en}
            </p>
            <p className="text-gray-300 mb-4">
              {isGeorgian ? 'საიდენტიფიკაციო კოდი: ' : 'ID: '}{footerData.company_id}
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
                <span className="text-gray-300">{isGeorgian ? footerData.address_ka : footerData.address_en}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-rvision-orange flex-shrink-0" size={18} />
                <a href={`mailto:${footerData.email}`} className="text-gray-300 hover:text-rvision-orange transition-colors">
                  {footerData.email}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-rvision-orange flex-shrink-0" size={18} />
                <a href={`tel:${footerData.phone}`} className="text-gray-300 hover:text-rvision-orange transition-colors">
                  {footerData.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Bank Info & Social */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Bank Details</h3>
            <p className="text-gray-300 mb-2">
              {isGeorgian ? 'ბანკის კოდი: ' : 'Bank Code: '}
              {isGeorgian ? footerData.bank_code_ka : footerData.bank_code_en}
            </p>
            <p className="text-gray-300 mb-6">
              {isGeorgian ? 'ანგარიში #: ' : 'Account #: '}
              {isGeorgian ? footerData.account_number_ka : footerData.account_number_en}
            </p>
            
            <h3 className="text-white font-semibold text-lg mb-4">Social Media</h3>
            <div className="flex space-x-4">
              <a
                href={footerData.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-rvision-orange transition-colors p-2 rounded-full"
              >
                <Facebook size={20} className="text-white" />
              </a>
              <a
                href={footerData.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-rvision-orange transition-colors p-2 rounded-full"
              >
                <Twitter size={20} className="text-white" />
              </a>
              <a
                href={footerData.instagram_url}
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
