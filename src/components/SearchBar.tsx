import React, { useEffect, useState } from 'react';

type SearchForm = {
  keyword: string;
  industry: string;
};

interface SearchBarProps {
  onPassData?: (data: SearchForm) => void;
}

export default function SearchBar({ onPassData }: SearchBarProps) {

  const [searchForm, setSearchForm] = useState<SearchForm>({
    keyword: '',
    industry: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchForm({
      keyword: params.get('keyword') ?? '',
      industry: params.get('industry') ?? ''
    });
  }, []);

  const onSubmit = () => {
    const nextParams = new URLSearchParams(window.location.search);

    if (searchForm.keyword.trim()) {
      nextParams.set('keyword', searchForm.keyword.trim());
    } else {
      nextParams.delete('keyword');
    }

    if (searchForm.industry) {
      nextParams.set('industry', searchForm.industry);
    } else {
      nextParams.delete('industry');
    }

    const queryString = nextParams.toString();
    const nextUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.pushState({}, '', nextUrl);
    window.dispatchEvent(new Event('search-params-updated'));

    if (onPassData) {
      onPassData(searchForm);
    }
  };

  return (

    <div className="w-full max-w-5xl mx-auto p-4 mt-8 z-10 relative">
      
      <form 
        className="bg-white rounded-lg p-2 md:p-2.5 flex flex-col md:flex-row items-center w-full shadow-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        
        {/* 1. Keyword Search Input */}
        <div className="flex-1 flex items-center w-full px-4 py-3 md:py-2">
          {/* Search Icon */}
          <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="I'm looking for: Job title, keywords or company" 
            className="w-full bg-transparent outline-none pl-3 text-sm md:text-base text-gray-700 placeholder-gray-500 truncate"
            value={searchForm.keyword}
            onChange={(e) => setSearchForm({ ...searchForm, keyword: e.target.value })}
          />
        </div>

        {/* Vertical Divider (Desktop) / Horizontal Divider (Mobile) */}
        <div className="hidden md:block w-px h-8 bg-gray-300 mx-2 shrink-0"></div>
        <div className="md:hidden w-full h-px bg-gray-100 my-1"></div>

        {/* 2. Industry Dropdown */}
        <div className="w-full md:w-auto flex items-center px-4 py-3 md:py-2 relative cursor-pointer group shrink-0">
          <select className="w-full md:w-auto bg-transparent outline-none text-sm md:text-base text-gray-600 appearance-none pr-8 cursor-pointer focus:ring-0" value={searchForm.industry} onChange={(e) => setSearchForm({ ...searchForm, industry: e.target.value })}>
            <option value="">All Industries</option>
            <option value="tech">Technology</option>
            <option value="finance">Finance</option>
            <option value="health">Healthcare</option>
            <option value="marketing">Marketing</option>
          </select>
          {/* Custom Chevron Icon (Overrides the default ugly browser dropdown arrow) */}
          <div className="absolute right-4 pointer-events-none text-gray-400 group-hover:text-gray-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* 3. Search Button */}
        <button 
          type="submit" 
          onClick={onSubmit}
          className="w-full md:w-auto mt-3 md:mt-0 bg-[#7FCFA8] hover:bg-[#326262] hover:text-[#FFFFFF] cursor-pointer text-[#111715] font-medium px-10 py-3.5 md:py-3 rounded-full transition-colors duration-300 text-sm md:text-base shrink-0"
        >
          Search
        </button>
        
      </form>

    </div>
  );
}