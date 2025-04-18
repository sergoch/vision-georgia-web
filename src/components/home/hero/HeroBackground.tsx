
import React from 'react';

interface HeroBackgroundProps {
  imageUrl?: string;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({ imageUrl }) => {
  return (
    <>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
        style={{ 
          backgroundImage: imageUrl 
            ? `url('${imageUrl}')` 
            : "url('https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=1500')", 
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-rvision-blue/80 via-rvision-blue/70 to-rvision-blue"></div>
      </div>
    </>
  );
};
