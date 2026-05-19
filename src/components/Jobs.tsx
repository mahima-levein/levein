import React, { useState, useEffect, useMemo } from 'react';
import jobsData from '../data/jobs.json';
import type { JobData } from '../types/jobs';
import No_result from '@assets/no-result.svg'

// --- Types ---
interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  permalink?: string;
}

interface SearchTerms {
  keyword: string;
  industry: string;
}


const allJobs: Job[] = (jobsData as JobData[]).map((job, index) => {
  const department = job.job_industries?.[0] || job.job_category?.[0] || job.job_level?.[0] || 'General';
  const location = job.location || 'Remote';
  const type = job.job_listing_type?.[0] || 'Full Time';

  return {
    id: String(job.id),
    title: job.title,
    department,
    location,
    type,
    permalink: job.slug ? `/jobs/${job.slug}` : undefined,
  };
});

// --- Icons ---
const MonitorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M5.36699 1.66797H14.6253C17.592 1.66797 18.3337 2.40964 18.3337 5.36797V10.643C18.3337 13.6096 17.592 14.343 14.6337 14.343H5.36699C2.40866 14.3513 1.66699 13.6096 1.66699 10.6513V5.36797C1.66699 2.40964 2.40866 1.66797 5.36699 1.66797Z" stroke="#326262" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M10 14.3516V18.3349" stroke="#326262" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M1.66699 10.832H18.3337" stroke="#326262" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M6.25 18.332H13.75" stroke="#326262" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M6.66636 18.3333H13.333C16.683 18.3333 17.283 16.9917 17.458 15.3583L18.083 8.69167C18.308 6.65833 17.7247 5 14.1664 5H5.83303C2.27469 5 1.69136 6.65833 1.91636 8.69167L2.54136 15.3583C2.71636 16.9917 3.31636 18.3333 6.66636 18.3333Z" stroke="#326262" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M6.66699 5.0013V4.33464C6.66699 2.85964 6.66699 1.66797 9.33366 1.66797H10.667C13.3337 1.66797 13.3337 2.85964 13.3337 4.33464V5.0013" stroke="#326262" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M11.6663 10.8333V11.6667C11.6663 11.675 11.6663 11.675 11.6663 11.6833C11.6663 12.5917 11.658 13.3333 9.99967 13.3333C8.34967 13.3333 8.33301 12.6 8.33301 11.6917V10.8333C8.33301 10 8.33301 10 9.16634 10H10.833C11.6663 10 11.6663 10 11.6663 10.8333Z" stroke="#326262" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M18.042 9.16797C16.117 10.568 13.917 11.4013 11.667 11.6846" stroke="#326262" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M2.18359 9.39062C4.05859 10.674 6.17526 11.449 8.33359 11.6906" stroke="#326262" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
);

const ArrowCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M10.0003 18.3346C14.6027 18.3346 18.3337 14.6037 18.3337 10.0013C18.3337 5.39893 14.6027 1.66797 10.0003 1.66797C5.39795 1.66797 1.66699 5.39893 1.66699 10.0013C1.66699 14.6037 5.39795 18.3346 10.0003 18.3346Z" stroke="#1A1617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M7.08301 10H12.083" stroke="#1A1617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M10.417 12.5L12.917 10L10.417 7.5" stroke="#1A1617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
);

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 6.44141V9.77141" stroke="#1A1617" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
  <path d="M12.0199 2C8.3399 2 5.3599 4.98 5.3599 8.66V10.76C5.3599 11.44 5.0799 12.46 4.7299 13.04L3.4599 15.16C2.6799 16.47 3.2199 17.93 4.6599 18.41C9.4399 20 14.6099 20 19.3899 18.41C20.7399 17.96 21.3199 16.38 20.5899 15.16L19.3199 13.04C18.9699 12.46 18.6899 11.43 18.6899 10.76V8.66C18.6799 5 15.6799 2 12.0199 2Z" stroke="#1A1617" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
  <path d="M15.3299 18.8203C15.3299 20.6503 13.8299 22.1503 11.9999 22.1503C11.0899 22.1503 10.2499 21.7703 9.64992 21.1703C9.04992 20.5703 8.66992 19.7303 8.66992 18.8203" stroke="#1A1617" strokeWidth="1.5" strokeMiterlimit="10"/>
</svg>
);

// --- Main Component ---
export default function JobBoard() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [searchTerms, setSearchTerms] = useState<SearchTerms>({ keyword: '', industry: '' });

  const itemsPerPage = 9;
  const filteredJobs = useMemo(() => allJobs.filter((job) => {
    const keyword = searchTerms.keyword.trim().toLowerCase();
    const industry = searchTerms.industry.trim().toLowerCase();

    const industryAliases: Record<string, string[]> = {
      tech: ['tech', 'technology', 'information technology', 'software'],
      finance: ['finance', 'financial', 'accounting', 'advisory'],
      health: ['health', 'healthcare', 'medical'],
      marketing: ['marketing']
    };

    const matchesKeyword = keyword.length === 0 ||
      job.title.toLowerCase().includes(keyword) ||
      job.department.toLowerCase().includes(keyword) ||
      job.location.toLowerCase().includes(keyword) ||
      job.type.toLowerCase().includes(keyword);

    const normalizedDepartment = job.department.toLowerCase();
    const industryTokens = industryAliases[industry] ?? [industry];
    const matchesIndustry = industry.length === 0 ||
      industryTokens.some((token) => normalizedDepartment.includes(token));

    return matchesKeyword && matchesIndustry;
  }), [searchTerms]);
  const totalOpenings = filteredJobs.length;
  const totalPages = Math.ceil(totalOpenings / itemsPerPage);

  useEffect(() => {
    const syncSearchTerms = () => {
      const params = new URLSearchParams(window.location.search);
      setSearchTerms({
        keyword: params.get('keyword') ?? '',
        industry: params.get('industry') ?? ''
      });
    };

    syncSearchTerms();
    window.addEventListener('search-params-updated', syncSearchTerms);
    window.addEventListener('popstate', syncSearchTerms);

    return () => {
      window.removeEventListener('search-params-updated', syncSearchTerms);
      window.removeEventListener('popstate', syncSearchTerms);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerms]);

  // Handle smooth transition when page changes
  useEffect(() => {
    setIsAnimating(true);
    
    // Simulate network request delay / smooth out transition
    const timer = setTimeout(() => {
      const clampedPage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages);
      const startIndex = (clampedPage - 1) * itemsPerPage;
      setDisplayedJobs(filteredJobs.slice(startIndex, startIndex + itemsPerPage));
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentPage, totalPages, filteredJobs]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white font-sans">
      
      {/* --- Jobs Grid --- */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ease-in-out ${
          isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        {displayedJobs.map((job) => (
          <div 
            key={job.id} 
            className="p-4 rounded-3xl border border-gray-300 transition-colors duration-300 flex flex-col justify-between bg-[#FBFBFB] group hover:bg-[#E3F0E0] cursor-pointer"
          >
            <div>
              <h3 className="text-[#061414] font-medium text-[16px] mb-2">{job.title}</h3>
              <p className="text-[12px] text-primary uppercase tracking-wider mb-6 font-medium">
                {job.department}
              </p>

              <div className="flex flex-col gap-3 text-[16px] text-primary mb-8">
                <span className="flex items-center gap-2">
                  <MonitorIcon />
                  {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <BriefcaseIcon />
                  {job.type}
                </span>
              </div>
            </div>

            <a href={job.permalink}
              className="w-full py-3 rounded-full flex items-center justify-center font-bold text-[18px] transition-colors bg-[#E3F0E0] group-hover:bg-[#7FCFA8] text-levein-black gap-2 duration-300"
            >
              Apply now
              <ArrowCircleIcon />
            </a>
          </div>
        ))}
      </div>

      {/* --- Pagination Controls --- */}
      {totalOpenings > 0 && (
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
        
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || totalPages === 0}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.542 3.40156L7.10866 8.8349C6.46699 9.47656 6.46699 10.5266 7.10866 11.1682L12.542 16.6016" stroke="#061414" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-8 h-8 flex items-center justify-center rounded-md text-[14px] transition-colors ${
                  isActive 
                    ? 'font-bold text-levein-black bg-gray-50' 
                    : 'text-[#777] hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next Button */}
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.45801 3.40156L12.8913 8.8349C13.533 9.47656 13.533 10.5266 12.8913 11.1682L7.45801 16.6016" stroke="#061414" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <span className="text-gray-500">
          Showing {displayedJobs.length} of {totalOpenings} openings
        </span>
      </div>
      )}

      {/* --- No Jobs Found --- */}
      {totalOpenings === 0 && !isAnimating && (
      <div className="w-2xl mx-auto flex flex-col items-center text-center mt-12 py-6 border border-dashed border-[#E3F0E0] rounded-3xl">
        <img src={No_result.src} alt="No results found" className="w-20 h-auto object-cover" />
        <p className="text-[#696969] my-3 text-[18px] sm:text-base">
          No jobs match your current criteria.
        </p>
      </div>
      )}

      {/* --- Footer CTA --- */}
      <div className="mt-6 border-t border-gray-200 flex flex-col items-center text-center">
        <p className="text-[#696969] my-6 text-[18px] sm:text-base">
          Can't find the right role? Get notified about new openings.
        </p>
        <a 
          href="/vacancy-alerts"
          className="bg-[#EAF2EB] hover:bg-[#dbe7dd] text-[#111715] font-medium px-6 py-3 rounded-full flex items-center gap-2 transition-colors duration-300 text-[14px] lg:text-[18px]"
        >
          <BellIcon />
          Notify me
        </a>
      </div>

    </section>
  );
}