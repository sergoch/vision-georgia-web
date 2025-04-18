
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const { isGeorgian } = useLanguage();

  return (
    <div className="pt-24 pb-16 bg-rvision-blue min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            {isGeorgian ? 'დაგვიკავშირდით' : 'Contact Us'}
          </h1>
          <p className="text-gray-300 text-lg mb-16 max-w-3xl mx-auto text-center">
            {isGeorgian 
              ? 'გაქვთ კითხვები ან გჭირდებათ დამატებითი ინფორმაცია? დაგვიკავშირდით დღეს.'
              : 'Have questions or need additional information? Get in touch with us today.'}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  {isGeorgian ? 'საკონტაქტო ინფორმაცია' : 'Contact Information'}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="text-rvision-orange mr-4 mt-1" size={20} />
                    <div>
                      <h3 className="text-white font-medium mb-1">
                        {isGeorgian ? 'მისამართი' : 'Address'}
                      </h3>
                      <p className="text-gray-300">
                        {isGeorgian ? 'თამარ მეფის გამზირი #15, ბათუმი 6000' : '15 Tamar Mepe Ave, Batumi 6000'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="text-rvision-orange mr-4 mt-1" size={20} />
                    <div>
                      <h3 className="text-white font-medium mb-1">
                        {isGeorgian ? 'ელ-ფოსტა' : 'Email'}
                      </h3>
                      <a href="mailto:info@rvision.ge" className="text-gray-300 hover:text-rvision-orange transition-colors">
                        info@rvision.ge
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="text-rvision-orange mr-4 mt-1" size={20} />
                    <div>
                      <h3 className="text-white font-medium mb-1">
                        {isGeorgian ? 'ტელეფონი' : 'Phone'}
                      </h3>
                      <a href="tel:+995322000000" className="text-gray-300 hover:text-rvision-orange transition-colors">
                        +995 322 00 00 00
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="text-white font-medium mb-3">
                    {isGeorgian ? 'კომპანიის რეკვიზიტები' : 'Company Details'}
                  </h3>
                  <p className="text-gray-300 mb-2">
                    {isGeorgian ? 'საიდენტიფიკაციო კოდი: 445684536' : 'Company ID: 445684536'}
                  </p>
                  <p className="text-gray-300 mb-2">
                    {isGeorgian ? 'ბანკის კოდი: BAGAGE22' : 'Bank Code: BAGAGE22'}
                  </p>
                  <p className="text-gray-300">
                    {isGeorgian ? 'ანგარიში #: GE08BG0000000541535273' : 'Account #: GE08BG0000000541535273'}
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
                      placeholder={isGeorgian ? 'თქვენი შეტყობინება' : 'Your message'}
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
              {isGeorgian ? 'ჩვენი მდებარეობა' : 'Our Location'}
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
