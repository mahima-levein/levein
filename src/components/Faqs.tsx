import React, { useState } from 'react';

// You can expand this array with the real answers later
const faqData = [
  {
    id: 1,
    question: "1. Who is my actual employer, Levein or the UK company I work with?",
    answer: "Levein employs you directly. We manage your contract, salary, EPF and ETF contributions, and equipment. You work closely with our partner companies, but Levein is your employer on record, always."
  },
  {
    id: 2,
    question: "2. What are the working hours?",
    answer: "Our standard working hours are aligned with UK business hours, typically 1:30 PM to 10:00 PM Sri Lankan Time, ensuring smooth collaboration with our international partners."
  },
  {
    id: 3,
    question: "3. What does Levein provide to employees?",
    answer: "We provide competitive salaries pegged to the GBP, comprehensive health insurance, top-tier work equipment (MacBooks/high-end PCs), and allowances for internet and continuous learning."
  },
  {
    id: 4,
    question: "4. What does the application process look like?",
    answer: "Our process involves an initial screening, a technical or role-specific assessment, a cultural fit interview with our team, and a final alignment call with the partner company."
  }
];

export default function FAQSection() {
  // Set the first item (id: 1) to be open by default
  const [openId, setOpenId] = useState(1);

  const toggleAccordion = (id) => {
    // If clicking the already open one, close it. Otherwise, open the new one.
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        
        {/* Left Column: Heading & Button */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-serif font-medium text-gray-900 mb-6 leading-tight tracking-tight">
            Your questions,<br />answered.
          </h2>
          <p className="text-gray-600 text-base mb-8 max-w-md">
            We know the questions that come before you apply. Here are the answers.
          </p>
          <button className="bg-[#93D7B0] hover:bg-[#82C89F] text-gray-900 font-medium px-8 py-3 rounded-full flex items-center gap-2 transition-colors duration-300">
            Contact us
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        {/* Right Column: Accordion List */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div 
                key={faq.id} 
                className="bg-[#EAF2EB] rounded-[20px] px-6 md:px-8 py-5 md:py-6 cursor-pointer transition-colors duration-300"
                onClick={() => toggleAccordion(faq.id)}
              >
                {/* Accordion Header */}
                <div className="flex items-center justify-between gap-4 select-none">
                  <h3 className="text-gray-900 font-medium text-base md:text-lg pr-4">
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
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[#5B7B72] text-sm md:text-base leading-relaxed pr-8 pb-1">
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