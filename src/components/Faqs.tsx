import { useState } from 'react';
import { faqDataHome } from '../data/careers';
import type { FAQItem } from '../types/careers';

export default function Faqs() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleAccordion = (id: FAQItem['id']) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        
        {/* Left Column: Heading & Button */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <h2 className="text-[28px] lg:text-[48px] font-primary font-normal text-levein-black mb-2 leading-tight tracking-tight">
            Your questions,<br />answered.
          </h2>
          <p className="text-levein-secondary text-base mb-8 max-w-md">
            We know the questions that come before you apply. Here are the answers.
          </p>
          <a type="button" className="bg-button text-[18px] border border-transparent hover:bg-white hover:border-[#1A1617] text-levein-black font-medium px-8 py-3 rounded-full items-center gap-2 transition-colors duration-300 inline-flex" href="mailto:careers@levein.com">
            Contact us
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10.0003 18.3346C14.6027 18.3346 18.3337 14.6037 18.3337 10.0013C18.3337 5.39893 14.6027 1.66797 10.0003 1.66797C5.39795 1.66797 1.66699 5.39893 1.66699 10.0013C1.66699 14.6037 5.39795 18.3346 10.0003 18.3346Z" stroke="#1A1617" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7.08301 10H12.083" stroke="#1A1617" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10.417 12.5L12.917 10L10.417 7.5" stroke="#1A1617" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Right Column: Accordion List */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {faqDataHome.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div 
                key={faq.id} 
                className="bg-[#EAF2EB] rounded-[20px] px-6 md:px-8 py-5 md:py-6 cursor-pointer transition-colors duration-300"
                onClick={() => toggleAccordion(faq.id)}
              >
                {/* Accordion Header */}
                <div className="flex items-center justify-between gap-4 select-none">
                  <h3 className="text-levein-black font-medium text-base md:text-[20px] pr-4">
                    {faq.question}
                  </h3>
                  
                  {/* +/- Icon */}
                  <div 
                    className="bg-[#1A1A1A] text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0 transition-transform duration-300"
                    aria-expanded={isOpen}
                  >
                    {isOpen ? (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* 
                  Accordion Content wrapper with CSS Grid transition 
                */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[#326262] text-[16px] md:text-base leading-relaxed pr-8 pb-1">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}