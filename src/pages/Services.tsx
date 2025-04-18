
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

const Services = () => {
  const { isGeorgian } = useLanguage();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching services:', error);
          setError(error.message);
          return;
        }
        
        console.log('Services fetched:', data);
        setServices(data || []);
      } catch (err: any) {
        console.error('Unexpected error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          {isGeorgian ? 'ჩვენი სერვისები' : 'Our Services'}
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-white text-xl">
              {isGeorgian ? 'იტვირთება...' : 'Loading...'}
            </p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-red-400 text-xl">
              {isGeorgian ? 'შეცდომა მოხდა' : 'An error occurred'}: {error}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link 
                key={service.id} 
                to={`/services/${service.id}`} 
                className="bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors border border-white/10 rounded-lg overflow-hidden group"
              >
                {service.image_url && (
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={service.image_url} 
                      alt={isGeorgian ? service.title_ka : service.title_en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {isGeorgian ? service.title_ka : service.title_en}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {isGeorgian ? service.description_ka : service.description_en}
                  </p>
                  <div className="flex items-center text-blue-400">
                    <span>{isGeorgian ? 'დეტალურად ნახვა' : 'Learn More'}</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
