
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

const ServiceDetails = () => {
  const { id } = useParams();
  const { isGeorgian } = useLanguage();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        
        console.log('Fetching service with ID:', id);
        
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          console.error('Error fetching service:', error);
          setError(error.message);
          return;
        }
        
        console.log('Service data fetched:', data);
        setService(data);
      } catch (err: any) {
        console.error('Unexpected error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl text-white">
            {isGeorgian ? 'იტვირთება...' : 'Loading...'}
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl text-white mb-4">
            {isGeorgian ? 'სერვისი ვერ მოიძებნა' : 'Service Not Found'}
          </h1>
          {error && <p className="text-red-300">{error}</p>}
        </div>
      </div>
    );
  }

  // Create features array from the full description by splitting paragraphs
  const fullDescription = isGeorgian ? service.full_description_ka : service.full_description_en;
  const descriptionParagraphs = fullDescription.split('\n\n').filter(Boolean);
  
  // Use the first paragraph as the main description and the rest as features
  const mainDescription = descriptionParagraphs[0] || '';
  const features = descriptionParagraphs.slice(1).map((paragraph: string, index: number) => {
    // Split each paragraph by the first colon to get title and description
    const parts = paragraph.split(':');
    const title = parts[0] || `Feature ${index + 1}`;
    const description = parts.slice(1).join(':').trim() || '';
    
    return { title, description };
  });

  return (
    <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {isGeorgian ? service.title_ka : service.title_en}
          </h1>

          {service.image_url && (
            <div className="mb-8">
              <img 
                src={service.image_url} 
                alt={isGeorgian ? service.title_ka : service.title_en}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          )}

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10 mb-8">
            <p className="text-gray-300 whitespace-pre-line">
              {mainDescription}
            </p>
          </div>

          {features.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature: any, index: number) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
