import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const { t, isGeorgian } = useLanguage();

  const services = [
    {
      id: 'engineering-consulting',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rvision-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: isGeorgian ? 'საინჟინრო კონსულტაცია' : 'Engineering Consulting',
      description: isGeorgian
        ? 'პროფესიონალური საინჟინრო კონსულტაციები სამშენებლო, ინფრასტრუქტურის და განვითარების პროექტებისთვის.'
        : 'Professional engineering consulting services for construction, infrastructure, and development projects.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rvision-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      title: isGeorgian ? 'გეოდეზიური და ტოპოგრაფიული სერვისები' : 'Geodetic & Topographic Services',
      description: isGeorgian
        ? 'ზუსტი ტოპოგრაფიული კვლევა, მიწის კარტოგრაფირება და გეოდეზიური გაზომვები დაგეგმვისა და განვითარებისთვის.'
        : 'Precise topographic surveying, land mapping, and geodetic measurements for planning and development.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rvision-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      title: isGeorgian ? 'LIDAR საჰაერო 3D კვლევები' : 'LIDAR Aerial 3D Surveys',
      description: isGeorgian
        ? 'თანამედროვე LIDAR ტექნოლოგია მაღალი სიზუსტის საჰაერო კვლევებისთვის და 3D ტერიტორიის მოდელირებისთვის სხვადასხვა გამოყენებისთვის.'
        : 'Advanced LIDAR technology for high-precision aerial surveys and 3D terrain modeling for various applications.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rvision-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: isGeorgian ? 'GIS სერვერის ინსტალაცია, ვებ GIS რუკები' : 'GIS Server Setup, Web GIS Maps',
      description: isGeorgian
        ? 'GIS სერვერის კონფიგურაცია, ვებ-ზე დაფუძნებული რუკების შექმნა და ინტერაქტიული გეოსივრცითი აპლიკაციების განვითარება.'
        : 'GIS server configuration, web-based map creation, and interactive geospatial application development.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rvision-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      title: isGeorgian ? 'გეოდატაბაზის ინტეგრაცია და სივრცითი მონაცემების ჰოსტინგი' : 'Geodatabase Integration & Spatial Data Hosting',
      description: isGeorgian
        ? 'სივრცითი მონაცემთა ბაზების შექმნა, ინტეგრაცია და ოპტიმიზაცია, სივრცითი მონაცემების ჰოსტინგი და გეოსივრცითი ვებ-სერვისების მიწოდება.'
        : 'Spatial database creation, integration, and optimization, spatial data hosting, and geospatial web service provisioning.'
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            {t('services.title')}
          </h1>
          <p className="text-gray-300 text-lg mb-16 max-w-3xl mx-auto text-center">
            {isGeorgian 
              ? "ჩვენ გთავაზობთ სრულ გეოსივრცით სერვისებს, მათ შორის საინჟინრო კონსულტაციებს, გეოდეზიურ და ტოპოგრაფიულ კვლევებს, LIDAR ტექნოლოგიებს და GIS სერვისებს."
              : "We offer comprehensive geospatial services including engineering consulting, geodetic surveys, LIDAR technologies, and GIS services."
            }
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className="w-20 h-20 bg-rvision-green/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-rvision-green/30 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6">
                  {service.description}
                </p>
                <Link 
                  to={`/services/${service.id}`} 
                  className="text-rvision-orange hover:underline flex items-center"
                >
                  {isGeorgian ? "გაიგე მეტი" : "Learn more"} <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            ))}
          </div>

          {/* Process Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-white mb-16 text-center">
              {isGeorgian ? "ჩვენი სამუშაო პროცესი" : "Our Work Process"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-rvision-orange rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">
                  {isGeorgian ? "კონსულტაცია" : "Consultation"}
                </h3>
                <p className="text-gray-300">
                  {isGeorgian 
                    ? "თქვენი პროექტის მოთხოვნების და მიზნების გაგება."
                    : "Understanding your project requirements and goals."
                  }
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-rvision-orange rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">
                  {isGeorgian ? "დაგეგმვა" : "Planning"}
                </h3>
                <p className="text-gray-300">
                  {isGeorgian 
                    ? "პროექტის მასშტაბის და მეთოდოლოგიის განსაზღვრა."
                    : "Defining project scope and methodology."
                  }
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-rvision-orange rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">
                  {isGeorgian ? "შესრულება" : "Execution"}
                </h3>
                <p className="text-gray-300">
                  {isGeorgian 
                    ? "ჩვენი მაღალკვალიფიციური გუნდით პროექტის განხორციელება."
                    : "Implementing the project with our highly skilled team."
                  }
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-rvision-orange rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">
                  {isGeorgian ? "მიწოდება" : "Delivery"}
                </h3>
                <p className="text-gray-300">
                  {isGeorgian 
                    ? "საბოლ��ო შედეგების წარდგენა და მხარდაჭერა."
                    : "Presenting final results and providing support."
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center bg-gradient-to-r from-rvision-green/20 to-rvision-blue/70 p-10 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">
              {isGeorgian ? "დაიწყეთ თქვენი პროექტი დღესვე" : "Start Your Project Today"}
            </h2>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
              {isGeorgian 
                ? "დაგვიკავშირდით კონსულტაციისთვის და გაიგეთ, როგორ შეგვიძლია დაგეხმაროთ თქვენი პროექტის წარმატებით განხორციელებაში."
                : "Contact us for a consultation and find out how we can help you successfully implement your project."
              }
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-rvision-orange hover:bg-rvision-orange/90 text-white font-semibold py-3 px-8 rounded-md transition-colors"
            >
              {isGeorgian ? "დაგვიკავშირდით" : "Contact Us"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
