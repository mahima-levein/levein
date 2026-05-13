import { useState } from 'react';
import type { JobData } from 'src/types/jobs';

type CurrentOpeningsProps = {
  title: string;
  description: string;
  btnText: string;
  jobs: JobData[];
};

export default function CurrentOpenings({ title, description, btnText, jobs }: CurrentOpeningsProps) {
  const [openJobId, setOpenJobId] = useState<number | null>(1);

  const count = jobs.length;

  const toggleJob = (id: JobData['id']) => {
    setOpenJobId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="max-w-2xl">
          <h2 className="text-[48px] md:text-5xl font-primary font-normal text-levein-black mb-3 tracking-tight">
            {title}
          </h2>
          <p className="text-levein-secondary text-[16px] md:text-base leading-relaxed">
            {description}
          </p>
        </div>
        
        <a href='/jobs' className="bg-[#41645B] border border-transparent hover:bg-white hover:border-[#1A1617] hover:text-black text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors duration-300 shrink-0 text-[16px] font-medium">
          {btnText}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-4">
        {jobs.slice(0, 6).map((job) => {
          const isOpen = openJobId === job.id;

          return (
            <div 
              key={job.id} 
              className="bg-[#E3F0E0] rounded-lg px-6 py-4 transition-colors duration-300"
            >
              {/* Clickable Header */}
              <div 
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => toggleJob(job.id)}
              >
                <div className="flex items-center gap-4">
                  <h3 className="text-[#1A1617] font-medium text-[20px]">{job.title}</h3>
                  {/* {job.isNew && (
                    <span className="bg-[#326262] text-white text-[14px] font-medium px-3 py-1 rounded-full capitalize tracking-wider">
                      New
                    </span>
                  )} */}
                </div>

                <div className="flex items-center gap-6">
                  {/* Toggles between 'Remote' and 'Apply now' based on state */}
                  {!isOpen ? (
                    <span className="hidden sm:block text-[#326262] text-[16px] font-medium">
                      {job.job_category[0]}
                    </span>
                  ) : (
                    <a 
                      href={`/jobs/${job.slug}`} 
                      onClick={(e) => e.stopPropagation()} 
                      className="hidden sm:block text-[#326262] text-[16px] font-semibold underline underline-offset-4 decoration-[#41645B] hover:text-gray-900 transition-colors"
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
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[16px] text-[#326262] pb-1">
                    
                    <span className="flex items-center gap-2 leading-none">
                      <svg className="relative -top-px" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8.67 14H4C2.9 14 2 14.9 2 16V22H8.67V14Z" stroke="#326262" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.3302 10H10.6602C9.56016 10 8.66016 10.9 8.66016 12V22H15.3302V12C15.3302 10.9 14.4402 10 13.3302 10Z" stroke="#326262" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M20.0001 17H15.3301V22H22.0001V19C22.0001 17.9 21.1001 17 20.0001 17Z" stroke="#326262" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.5202 2.0708L13.0502 3.1308C13.1202 3.2808 13.3102 3.42079 13.4702 3.44079L14.4302 3.6008C15.0402 3.7008 15.1902 4.15078 14.7502 4.58078L14.0002 5.33078C13.8702 5.46078 13.8002 5.70079 13.8402 5.87079L14.0502 6.7908C14.2202 7.5208 13.8302 7.80081 13.1902 7.42081L12.2902 6.89081C12.1302 6.79081 11.8602 6.79081 11.7002 6.89081L10.8002 7.42081C10.1602 7.80081 9.77023 7.5208 9.94023 6.7908L10.1502 5.87079C10.1902 5.70079 10.1202 5.45078 9.99023 5.33078L9.25023 4.59079C8.81023 4.15079 8.95023 3.71078 9.57023 3.61078L10.5302 3.4508C10.6902 3.4208 10.8802 3.28081 10.9502 3.14081L11.4802 2.08078C11.7702 1.50078 12.2302 1.5008 12.5202 2.0708Z" stroke="#326262" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      {job.job_level.join(' / ')}
                    </span>

                    <span className="flex items-center gap-2 leading-none">
                      <svg className="relative -top-px" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M13.6827 6.62266C15.716 8.65599 15.716 11.956 13.6827 13.9893C11.6494 16.0226 8.34935 16.0226 6.31602 13.9893C4.28268 11.956 4.28268 8.65599 6.31602 6.62266C8.34935 4.58932 11.6494 4.58932 13.6827 6.62266Z" stroke="#326262" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.87451 18.0318C5.20784 17.3651 3.7495 16.1568 2.78284 14.4818C1.83284 12.8401 1.51617 11.0151 1.74117 9.27344" stroke="#326262" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4.875 3.73151C6.29167 2.62317 8.06666 1.96484 10 1.96484C11.8917 1.96484 13.6333 2.6065 15.0333 3.67317" stroke="#326262" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.125 18.0318C14.7917 17.3651 16.25 16.1568 17.2167 14.4818C18.1667 12.8401 18.4833 11.0151 18.2583 9.27344" stroke="#326262" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Exp: {job.job_experience}
                    </span>

                    <span className="flex items-center gap-2 leading-none">
                      <svg className="relative -top-px" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M6.66636 18.3333H13.333C16.683 18.3333 17.283 16.9917 17.458 15.3583L18.083 8.69167C18.308 6.65833 17.7247 5 14.1664 5H5.83303C2.27469 5 1.69136 6.65833 1.91636 8.69167L2.54136 15.3583C2.71636 16.9917 3.31636 18.3333 6.66636 18.3333Z" stroke="#326262" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.66699 5.0013V4.33464C6.66699 2.85964 6.66699 1.66797 9.33366 1.66797H10.667C13.3337 1.66797 13.3337 2.85964 13.3337 4.33464V5.0013" stroke="#326262" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.6663 10.8333V11.6667C11.6663 11.675 11.6663 11.675 11.6663 11.6833C11.6663 12.5917 11.658 13.3333 9.99967 13.3333C8.34967 13.3333 8.33301 12.6 8.33301 11.6917V10.8333C8.33301 10 8.33301 10 9.16634 10H10.833C11.6663 10 11.6663 10 11.6663 10.8333Z" stroke="#326262" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.042 9.16797C16.117 10.568 13.917 11.4013 11.667 11.6846" stroke="#326262" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2.18359 9.39062C4.05859 10.674 6.17526 11.449 8.33359 11.6906" stroke="#326262" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      {job.job_listing_type.join(' / ')}
                    </span>

                    <span className="flex items-center gap-2 leading-none">
                      <svg className="relative -top-px" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M18.3337 10.0013C18.3337 14.6013 14.6003 18.3346 10.0003 18.3346C5.40033 18.3346 1.66699 14.6013 1.66699 10.0013C1.66699 5.4013 5.40033 1.66797 10.0003 1.66797C14.6003 1.66797 18.3337 5.4013 18.3337 10.0013Z" stroke="#326262" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.0914 12.6495L10.5081 11.1078C10.0581 10.8411 9.69141 10.1995 9.69141 9.67448V6.25781" stroke="#326262" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Closing date: {job.job_expires}
                    </span>

                    {/* Mobile Only 'Apply Now' Link - Shows up under the details on small screens */}
                    <a 
                      href={`/jobs/${job.slug}`} 
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
      {/* Footer CTA */}
      {count > 6 && (
        <div className='flex justify-center '>
          <a
            href="/jobs"
            className="mt-10 bg-button text-[18px] border border-transparent hover:bg-white hover:border-[#1A1617] text-levein-black font-medium px-8 py-3 rounded-full items-center gap-2 transition-colors duration-300 inline-flex"
          >
          view more roles
          <span className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0003 18.3346C14.6027 18.3346 18.3337 14.6037 18.3337 10.0013C18.3337 5.39893 14.6027 1.66797 10.0003 1.66797C5.39795 1.66797 1.66699 5.39893 1.66699 10.0013C1.66699 14.6037 5.39795 18.3346 10.0003 18.3346Z"
                stroke="#1A1617"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"></path>
              <path
                d="M7.08301 10H12.083"
                stroke="#1A1617"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"></path>
              <path
                d="M10.417 12.5L12.917 10L10.417 7.5"
                stroke="#1A1617"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"></path>
            </svg>
          </span>
        </a>
      </div>
      )}
    </section>
  );
}