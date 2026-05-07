import React, { useState } from 'react';

const remoteFeatures = [
  {
    id: 1,
    title: "Earn above the Sri Lankan market",
    description: "Work with international companies and get paid accordingly."
  },
  {
    id: 2,
    title: "EPF/ETF included",
    description: "We operate as a registered Sri Lankan employer."
  },
  {
    id: 3,
    title: "Flexible Remote Work",
    description: "Your work hours are flexible. Work remote."
  },
  {
    id: 4,
    title: "Career Growth & Support",
    description: "A dedicated team that handles your hardware, HR, and growth."
  },
  {
    id: 5,
    title: "Health Insurance & Benefits",
    description: "Comprehensive health insurance coverage, plus additional benefits."
  }
];

const officeFeatures = [
  {
    id: 1,
    title: "Premium Office Environment",
    description: "Work from our state-of-the-art Colombo headquarters with top-tier facilities."
  },
  {
    id: 2,
    title: "EPF/ETF included",
    description: "We operate as a registered Sri Lankan employer."
  },
  {
    id: 3,
    title: "In-Person Collaboration",
    description: "Build stronger relationships and innovate faster side-by-side with your team."
  },
  {
    id: 4,
    title: "On-Site Mentorship",
    description: "Direct access to senior leadership and immediate, hands-on feedback loops."
  },
  {
    id: 5,
    title: "Catered Meals & Perks",
    description: "Enjoy free daily lunches, unlimited premium coffee, and team recreational areas."
  }
];


const FeatureIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M6.3748 17.4255C6.3498 17.4255 6.31647 17.4422 6.29147 17.4422C4.6748 16.6422 3.35814 15.3172 2.5498 13.7005C2.5498 13.6755 2.56647 13.6422 2.56647 13.6172C3.58314 13.9172 4.63314 14.1422 5.6748 14.3172C5.85814 15.3672 6.0748 16.4089 6.3748 17.4255Z" fill="#FBFBFB"/>
  <path d="M17.4502 13.7089C16.6252 15.3672 15.2502 16.7089 13.5752 17.5172C13.8919 16.4589 14.1585 15.3922 14.3335 14.3172C15.3835 14.1422 16.4169 13.9172 17.4335 13.6172C17.4252 13.6505 17.4502 13.6839 17.4502 13.7089Z" fill="#FBFBFB"/>
  <path d="M17.5169 6.42604C16.4669 6.10938 15.4085 5.85104 14.3335 5.66771C14.1585 4.59271 13.9002 3.52604 13.5752 2.48438C15.3002 3.30937 16.6919 4.70104 17.5169 6.42604Z" fill="#FBFBFB"/>
  <path d="M6.37507 2.57578C6.07507 3.59245 5.8584 4.62578 5.6834 5.67578C4.6084 5.84245 3.54173 6.10911 2.4834 6.42578C3.29173 4.75078 4.6334 3.37578 6.29173 2.55078C6.31673 2.55078 6.35006 2.57578 6.37507 2.57578Z" fill="#FBFBFB"/>
  <path d="M12.9085 5.49297C10.9751 5.2763 9.02513 5.2763 7.0918 5.49297C7.30013 4.3513 7.5668 3.20964 7.9418 2.10964C7.95846 2.04297 7.95013 1.99297 7.95846 1.9263C8.6168 1.76797 9.2918 1.66797 10.0001 1.66797C10.7001 1.66797 11.3835 1.76797 12.0335 1.9263C12.0418 1.99297 12.0418 2.04297 12.0585 2.10964C12.4335 3.21797 12.7001 4.3513 12.9085 5.49297Z" fill="#FBFBFB"/>
  <path d="M5.49199 12.9065C4.34199 12.6982 3.20866 12.4315 2.10866 12.0565C2.04199 12.0398 1.99199 12.0482 1.92533 12.0398C1.76699 11.3815 1.66699 10.7065 1.66699 9.99818C1.66699 9.29818 1.76699 8.61484 1.92533 7.96484C1.99199 7.95651 2.04199 7.95651 2.10866 7.93984C3.21699 7.57318 4.34199 7.29818 5.49199 7.08984C5.28366 9.02318 5.28366 10.9732 5.49199 12.9065Z" fill="#FBFBFB"/>
  <path d="M18.3338 9.99818C18.3338 10.7065 18.2338 11.3815 18.0755 12.0398C18.0088 12.0482 17.9588 12.0398 17.8921 12.0565C16.7838 12.4232 15.6505 12.6982 14.5088 12.9065C14.7255 10.9732 14.7255 9.02318 14.5088 7.08984C15.6505 7.29818 16.7921 7.56484 17.8921 7.93984C17.9588 7.95651 18.0088 7.96484 18.0755 7.96484C18.2338 8.62318 18.3338 9.29818 18.3338 9.99818Z" fill="#FBFBFB"/>
  <path d="M12.9085 14.5078C12.7001 15.6578 12.4335 16.7911 12.0585 17.8911C12.0418 17.9578 12.0418 18.0078 12.0335 18.0745C11.3835 18.2328 10.7001 18.3328 10.0001 18.3328C9.2918 18.3328 8.6168 18.2328 7.95846 18.0745C7.95013 18.0078 7.95846 17.9578 7.9418 17.8911C7.57513 16.7828 7.30013 15.6578 7.0918 14.5078C8.05846 14.6161 9.02513 14.6911 10.0001 14.6911C10.9751 14.6911 11.9501 14.6161 12.9085 14.5078Z" fill="#FBFBFB"/>
  <path d="M13.1364 13.1374C11.0522 13.4004 8.94846 13.4004 6.86422 13.1374C6.60125 11.0532 6.60125 8.94944 6.86422 6.86519C8.94846 6.60223 11.0522 6.60223 13.1364 6.86519C13.3994 8.94944 13.3994 11.0532 13.1364 13.1374Z" fill="#FBFBFB"/>
</svg>
);

const OfficeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M18 11H2V17H18V11Z" fill="#FBFBFB"/>
    <path d="M18 5H2V9H18V5Z" fill="#FBFBFB"/>
    <path d="M16 3H4V7H16V3Z" fill="#FBFBFB"/>
  </svg>
);

export default function FlexibleApproachSection() {
 
  const [isRemote, setIsRemote] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedFeatures, setDisplayedFeatures] = useState(remoteFeatures);

  const handleToggle = () => {
    setIsAnimating(true);

    setTimeout(() => {
      const nextModeIsRemote = !isRemote;
      setIsRemote(nextModeIsRemote);
      setDisplayedFeatures(nextModeIsRemote ? remoteFeatures : officeFeatures);
      

      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className="bg-[#061414] py-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
        
        <div className="lg:col-span-5 flex flex-col">
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-primary text-white leading-[1.1] tracking-tight mb-8">
            A Flexible Approach<br />to Work
          </h2>
          
          <div className="flex items-center gap-4 mb-12 select-none">
            <span className={`text-[16px] font-medium transition-colors duration-300 ${!isRemote ? 'text-white' : 'text-gray-400'}`}>
              Office
            </span>
            
            <button 
              onClick={handleToggle}
              className="w-14 h-7 rounded-full bg-[#4FAA84] relative flex items-center px-1 cursor-pointer transition-colors duration-300 focus:outline-none"
              aria-label="Toggle work mode"
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isRemote ? 'translate-x-7' : 'translate-x-0'}`}
              />
            </button>
            
            <span className={`text-[16px] font-medium transition-colors duration-300 ${isRemote ? 'text-white' : 'text-gray-400'}`}>
              Remote
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=500&h=300&fit=crop" 
                alt="Team working remotely" 
                className="w-1/2 h-40 md:h-48 object-cover rounded-[16px]"
              />
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop" 
                alt="Team event" 
                className="w-1/2 h-40 md:h-48 object-cover rounded-[16px]"
              />
            </div>
            
            <div 
              className="bg-[#E3F0E0] rounded-lg px-4 py-2 transition-all duration-300 ease-in-out space-y-2"
            >
              <h4 className="text-[14px] text-levein-black font-semibold mb-2">
               Work from where you perform best
              </h4>
              <p className="text-[#3B574F] text-[14px]">
                Whether from your home office, coworking space, or our Porto HQ, you have the freedom to choose.
              </p>
            </div>
          </div>
        </div>


        <div className="lg:col-span-7 lg:pl-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            
            {displayedFeatures.map((feature) => (
              <div 
                key={feature.id} 
                className={`transition-all duration-300 ease-in-out transform ${
                  isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
                }`}
              >

                {isRemote ? <FeatureIcon /> : <OfficeIcon />}
                <h3 className="text-[20px] max-w-75 font-medium text-[#FBFBFB] mb-2 tracking-wide mt-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-[16px] leading-relaxed pr-4">
                  {feature.description}
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}