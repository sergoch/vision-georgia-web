
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// Hard-coded content to avoid syntax errors
const georgianContent = {
  paragraph1: "შპს „რეალ ვიჟენი" არის პროფესიული საინჟინრო და გეოდეზიური კომპანია, რომელიც დაფუძნებულია ბათუმში.",
  paragraph2: "ჩვენი გუნდი შედგება გამოცდილი ინჟინრებისა და გეოდეზისტებისგან, რომლებსაც აქვთ მრავალწლიანი გამოცდილება სხვადასხვა ტიპის პროექტებში.",
  paragraph3: "ჩვენი მიზანია დავეხმაროთ კლიენტებს მიიღონ ზუსტი მონაცემები და ინფორმაცია, რომელიც მათ ესაჭიროებათ.",
  paragraph4: "შპს „რეალ ვიჟენი" მუშაობს როგორც კერძო, ისე სახელმწიფო სექტორის კლიენტებთან, მათ შორის დეველოპერებთან და არქიტექტორებთან.",
  quality: "ჩვენთვის უმთავრესია უმაღლესი ხარისხის მონაცემების და სერვისების მიწოდება.",
  innovation: "ჩვენ ვიყენებთ უახლეს ტექნოლოგიებს და ინოვაციურ მიდგომებს.",
  professionalism: "ჩვენი გუნდი შედგება მაღალკვალიფიციური პროფესიონალებისგან.",
  timeliness: "ჩვენ ვაფასებთ თქვენს დროს და ვუზრუნველყოფთ პროექტების დასრულებას დროულად.",
  coreValues: "ჩვენი ძირითადი ღირებულებები",
  quality_title: "ხარისხი და სიზუსტე",
  innovation_title: "ინოვაცია",
  professionalism_title: "პროფესიონალიზმი",
  timeliness_title: "დროულობა"
};

const englishContent = {
  paragraph1: "Real Vision LLC is a professional engineering and geodetic company based in Batumi, Georgia.",
  paragraph2: "Our team consists of experienced engineers and geodesists with many years of experience in various types of projects.",
  paragraph3: "Our goal is to help clients obtain accurate data and information they need for effective decision-making.",
  paragraph4: "Real Vision LLC works with both private and public sector clients, including developers, architects, and construction companies.",
  quality: "We prioritize delivering the highest quality data and services.",
  innovation: "We use the latest technologies and innovative approaches.",
  professionalism: "Our team consists of highly qualified professionals.",
  timeliness: "We value your time and ensure projects are completed on schedule.",
  coreValues: "Our Core Values",
  quality_title: "Quality and Precision",
  innovation_title: "Innovation",
  professionalism_title: "Professionalism",
  timeliness_title: "Timeliness"
};

const About: React.FC = () => {
  const { t, isGeorgian } = useLanguage();
  const content = isGeorgian ? georgianContent : englishContent;

  return (
    <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-10">
            {t('about.title')}
          </h1>

          <div className="bg-white/5 backdrop-blur-sm p-6 md:p-10 rounded-lg border border-white/10 mb-10">
            <h2 className="text-2xl font-semibold text-white mb-6">
              {t('about.companyName')}
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              {t('about.id')}
            </p>
            
            <div className="border-t border-white/10 my-8"></div>
            
            <div className="space-y-6 text-gray-300">
              <p>{content.paragraph1}</p>
              <p>{content.paragraph2}</p>
              <p>{content.paragraph3}</p>
              <p>{content.paragraph4}</p>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-white/5 backdrop-blur-sm p-6 md:p-10 rounded-lg border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-8">
              {content.coreValues}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <div className="w-14 h-14 bg-rvision-green/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rvision-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {content.quality_title}
                </h3>
                <p className="text-gray-300">
                  {content.quality}
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <div className="w-14 h-14 bg-rvision-green/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rvision-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {content.innovation_title}
                </h3>
                <p className="text-gray-300">
                  {content.innovation}
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <div className="w-14 h-14 bg-rvision-green/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rvision-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {content.professionalism_title}
                </h3>
                <p className="text-gray-300">
                  {content.professionalism}
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <div className="w-14 h-14 bg-rvision-green/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rvision-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {content.timeliness_title}
                </h3>
                <p className="text-gray-300">
                  {content.timeliness}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
