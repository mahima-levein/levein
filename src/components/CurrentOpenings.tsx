import React, { useState } from 'react';

const jobsData = [
  {
    id: 1,
    title: "Senior Product Designer",
    isNew: true,
    locationLabel: "Remote",
    locationDetail: "Remote / Hybrid",
    experience: "2-4 years",
    type: "Full Time",
    closingDate: "May 16, 2026",
  },
  {
    id: 2,
    title: "Senior Front-End Developer (Web)",
    isNew: true,
    locationLabel: "Remote",
    locationDetail: "Remote",
    experience: "3-5 years",
    type: "Full Time",
    closingDate: "May 20, 2026",
  },
  {
    id: 3,
    title: "Senior Front-End Developer (Web)",
    isNew: true,
    locationLabel: "Remote",
    locationDetail: "Remote",
    experience: "3-5 years",
    type: "Full Time",
    closingDate: "May 20, 2026",
  },
  {
    id: 4,
    title: "Senior Product Designer",
    isNew: false,
    locationLabel: "Remote",
    locationDetail: "Remote",
    experience: "2-4 years",
    type: "Full Time",
    closingDate: "May 25, 2026",
  },
  {
    id: 5,
    title: "Creative Strategist",
    isNew: false,
    locationLabel: "Remote",
    locationDetail: "Remote / Hybrid",
    experience: "1-3 years",
    type: "Full Time",
    closingDate: "May 30, 2026",
  },
  {
    id: 6,
    title: "Senior Front-End Developer (iOS)",
    isNew: false,
    locationLabel: "Remote",
    locationDetail: "Remote",
    experience: "4+ years",
    type: "Full Time",
    closingDate: "June 2, 2026",
  }
];

export default function CurrentOpenings() {
  // Set the first item (id: 1) to be open by default, just like the Figma
  const [openJobId, setOpenJobId] = useState(1);

  const toggleJob = (id) => {
    setOpenJobId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-3 tracking-tight">
            Current Openings
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            We are always hiring talented professionals. Browse what is open below and if you do not see your exact role listed, email us your cv!
          </p>
        </div>
        
        <button className="bg-[#41645B] hover:bg-[#34524A] text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors duration-300 shrink-0 text-sm font-medium">
          Visit Our Job Platform
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-3">
        {jobsData.map((job) => {
          const isOpen = openJobId === job.id;

          return (
            <div 
              key={job.id} 
              className="bg-[#EAF2EB] rounded-[20px] px-6 py-5 transition-colors duration-300"
            >
              {/* Clickable Header */}
              <div 
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => toggleJob(job.id)}
              >
                <div className="flex items-center gap-4">
                  <h3 className="text-gray-900 font-medium text-lg">{job.title}</h3>
                  {job.isNew && (
                    <span className="bg-[#41645B] text-white text-[11px] font-medium px-3 py-1 rounded-full uppercase tracking-wider">
                      New
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-6">
                  {/* Toggles between 'Remote' and 'Apply now' based on state */}
                  {!isOpen ? (
                    <span className="hidden sm:block text-[#5B7B72] text-sm font-medium">
                      {job.locationLabel}
                    </span>
                  ) : (
                    <a 
                      href="#apply" 
                      onClick={(e) => e.stopPropagation()} 
                      className="hidden sm:block text-[#41645B] text-sm font-semibold underline underline-offset-4 decoration-[#41645B] hover:text-gray-900 transition-colors"
                    >
                      Apply now
                    </a>
                  )}

                  {/* +/- Button */}
                  <button 
                    className="bg-[#1A1A1A] text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0 transition-transform duration-300"
                    aria-label={isOpen ? "Collapse details" : "Expand details"}
                  >
                    {isOpen ? (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4"/></svg>
                    ) : (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* 
                The Magic Smooth Accordion Wrapper
                Uses CSS Grid to transition from 0fr to 1fr
              */}
              <div 
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0 mt-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#5B7B72] pb-1">
                    
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      {job.locationDetail}
                    </span>

                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/></svg>
                      Exp: {job.experience}
                    </span>

                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      {job.type}
                    </span>

                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      Closing date: {job.closingDate}
                    </span>

                    {/* Mobile Only 'Apply Now' Link - Shows up under the details on small screens */}
                    <a 
                      href="#apply" 
                      className="sm:hidden w-full mt-2 text-[#41645B] text-sm font-semibold underline underline-offset-4 decoration-[#41645B]"
                    >
                      Apply now
                    </a>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}