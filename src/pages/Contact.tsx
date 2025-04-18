import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../integrations/supabase/client';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const { isGeorgian } = useLanguage();

  const { data: contactData, isLoading } = useQuery({
    queryKey: ['contact-page-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .single();
      
      if (error) throw error;

      // Ensure the content is parsed if it's a string
      return {
        content_en: typeof data.content_en === 'string' 
          ? JSON.parse(data.content_en) 
          : data.content_en,
        content_ka: typeof data.content_ka === 'string'
          ? JSON.parse(data.content_ka)
          : data.content_ka
      };
    },
  });

  if (isLoading) return null;

  // Use either English or Georgian content based on language
  const content = isGeorgian ? contactData.content_ka : contactData.content_en;

  return (
    <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            {content.page_title}
          </h1>
          <p className="text-gray-300 text-lg mb-16 max-w-3xl mx-auto text-center">
            {content.page_description}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  {content.contact_info_title}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="text-rvision-orange mr-4 mt-1" size={20} />
                    <div>
                      <h3 className="text-white font-medium mb-1">
                        {content.address_label}
                      </h3>
                      <p className="text-gray-300">
                        {content.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="text-rvision-orange mr-4 mt-1" size={20} />
                    <div>
                      <h3 className="text-white font-medium mb-1">
                        {content.email_label}
                      </h3>
                      <a href={`mailto:${content.email}`} className="text-gray-300 hover:text-rvision-orange transition-colors">
                        {content.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="text-rvision-orange mr-4 mt-1" size={20} />
                    <div>
                      <h3 className="text-white font-medium mb-1">
                        {content.phone_label}
                      </h3>
                      <a href={`tel:${content.phone}`} className="text-gray-300 hover:text-rvision-orange transition-colors">
                        {content.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="text-white font-medium mb-3">
                    {content.company_details_title}
                  </h3>
                  <p className="text-gray-300 mb-2">
                    {content.company_id_label}: {content.company_id}
                  </p>
                  <p className="text-gray-300 mb-2">
                    {content.bank_code_label}: {content.bank_code}
                  </p>
                  <p className="text-gray-300">
                    {content.account_number_label}: {content.account_number}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  {isGeorgian ? 'მოგვწერეთ' : 'Send us a Message'}
                </h2>

                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-200 mb-2">
                        {isGeorgian ? 'სახელი' : 'Name'}
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:border-rvision-orange/70 text-white"
                        placeholder={isGeorgian ? 'თქვენი სახელი' : 'Your name'}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-200 mb-2">
                        {isGeorgian ? 'ელ-ფოსტა' : 'Email'}
                      </label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:border-rvision-orange/70 text-white"
                        placeholder={isGeorgian ? 'თქვენი ელ-ფოსტა' : 'Your email'}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-200 mb-2">
                      {isGeorgian ? 'თემა' : 'Subject'}
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:border-rvision-orange/70 text-white"
                      placeholder={isGeorgian ? 'შეტყობინების თემა' : 'Message subject'}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-200 mb-2">
                      {isGeorgian ? 'შეტყობინება' : 'Message'}
                    </label>
                    <textarea 
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:border-rvision-orange/70 text-white"
                      placeholder={isGeorgian ? 'თქვენი შეტყობი��ება' : 'Your message'}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="bg-rvision-orange hover:bg-rvision-orange/90 text-white font-semibold py-3 px-8 rounded-md transition-colors"
                  >
                    {isGeorgian ? 'გაგზავნა' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-white mb-6">
              {content.location_title}
            </h2>
            
            <div className="w-full h-96 rounded-lg overflow-hidden border border-white/10">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2988.3453750636366!2d41.638653515249366!3d41.65062487924096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4067863bf7d2d467%3A0x6e5537936d6be9ef!2zMTUg4YOX4YOQ4YOb4YOQ4YOgIOGDm-GDlOGDpOGDmOGDoeGDkCwgQmF0dW1p!5e0!3m2!1sen!2sge!4v1616500000000!5m2!1sen!2sge" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Real Vision LLC Location"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
