
import React from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const ServiceDetails = () => {
  const { id } = useParams();
  const { isGeorgian } = useLanguage();

  const services = {
    'engineering-consulting': {
      title: isGeorgian ? 'საინჟინრო კონსულტაცია' : 'Engineering Consulting',
      fullDescription: isGeorgian
        ? `ჩვენი საინჟინრო საკონსულტაციო სერვისები მოიცავს:
           • სამშენებლო პროექტების ტექნიკურ კონსულტაციებს
           • ინფრასტრუქტურული პროექტების დაგეგმვასა და ზედამხედველობას
           • გარემოსდაცვით შეფასებებს
           • ხარჯთაღრიცხვას და პროექტის მენეჯმენტს`
        : `Our engineering consulting services include:
           • Technical consultations for construction projects
           • Infrastructure project planning and supervision
           • Environmental assessments
           • Cost estimation and project management`,
      features: [
        {
          title: isGeorgian ? 'ტექნიკური ექსპერტიზა' : 'Technical Expertise',
          description: isGeorgian
            ? 'მაღალკვალიფიციური ინჟინრების გუნდი თანამედროვე ტექნოლოგიებით'
            : 'Highly qualified team of engineers with modern technology',
        },
        {
          title: isGeorgian ? 'პროექტის მენეჯმენტი' : 'Project Management',
          description: isGeorgian
            ? 'სრული პროექტის მენეჯმენტი დაგეგმვიდან დასრულებამდე'
            : 'Complete project management from planning to completion',
        },
      ],
    },
    // Add other services here with their detailed information
  };

  const service = services[id as keyof typeof services];

  if (!service) {
    return (
      <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl text-white mb-4">
            {isGeorgian ? 'სერვისი ვერ მოიძებნა' : 'Service Not Found'}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {service.title}
          </h1>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10 mb-8">
            <p className="text-gray-300 whitespace-pre-line">
              {service.fullDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.features.map((feature, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
