import React from 'react';

export default function ApplicationForm() {
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 bg-[#E3F0E0] rounded-3xl font-sans">
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">
        
        {/* --- Top Grid (Inputs) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="text-[16px] font-medium text-gray-800">First name</label>
            <input 
              type="text" 
              id="firstName"
              placeholder="Enter your first name" 
              className="w-full px-4 py-3 rounded-lg border border-transparent focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] bg-levein-white outline-none text-gray-700 text-sm placeholder-gray-400"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="text-[16px] font-medium text-gray-800">Last name</label>
            <input 
              type="text" 
              id="lastName"
              placeholder="Enter your last name" 
              className="w-full px-4 py-3 rounded-lg border border-transparent focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] bg-levein-white outline-none text-gray-700 text-sm placeholder-gray-400"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-800">Email Address</label>
            <input 
              type="email" 
              id="email"
              placeholder="Enter your email address" 
              className="w-full px-4 py-3 rounded-lg border border-transparent focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] bg-levein-white outline-none text-gray-700 text-sm placeholder-gray-400"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-[16px] font-medium text-gray-800">Phone number</label>
            <input 
              type="tel" 
              id="phone"
              placeholder="Enter your phone number" 
              className="w-full px-4 py-3 rounded-lg border border-transparent focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] bg-levein-white outline-none text-gray-700 text-sm placeholder-gray-400"
            />
          </div>

          {/* Country Dropdown */}
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="country" className="text-[16px] font-medium text-gray-800">Country</label>
            <div className="relative">
              <select 
                id="country"
                className="w-full px-4 py-3 rounded-lg border border-transparent focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-500 text-sm appearance-none bg-white cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled hidden>Select a country</option>
                <option value="lk">Sri Lanka</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </div>

          {/* Specialty Dropdown */}
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="specialty" className="text-[16px] font-medium text-gray-800">What is your specialty area?</label>
            <div className="relative">
              <select 
                id="specialty"
                className="w-full px-4 py-3 rounded-lg border border-transparent focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-500 text-sm appearance-none bg-white cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled hidden>Select your specialty area</option>
                <option value="frontend">Frontend Development</option>
                <option value="backend">Backend Development</option>
                <option value="design">UI/UX Design</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </div>

        </div>
        {/* <div className="flex flex-col gap-2 mt-2">
          <label className="text-[16px] font-medium text-gray-800">Upload your CV</label>
          <div className="w-full border border-dashed border-[#85A99C] rounded-xl bg-white/50 py-10 flex flex-col items-center justify-center cursor-pointer hover:bg-white/80 transition-colors">
            <div className="bg-[#EAF2EB] p-2 rounded-full mb-3 text-[#3B574F]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <p className="text-gray-900 font-medium text-sm sm:text-base">Drop file here or click to upload</p>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">Supported file formats: PDF and docx up to 5MB</p>
          </div>
        </div> */}

        {/* --- Consent Checkbox --- */}
        <div className="flex items-start gap-3 mt-2">
          <input 
            type="checkbox" 
            id="consent" 
            className="mt-1 w-4 h-4 rounded border-gray-300 text-[#3B574F] focus:ring-[#93D7B0] cursor-pointer"
          />
          <label htmlFor="consent" className="text-[16px] text-gray-600 cursor-pointer select-none">
            Yes, I give Levein permission to use my personal data for recruitment purposes only.
          </label>
        </div>

        {/* --- Footer Area --- */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 pt-4 gap-4">
          
          <div className="flex items-center gap-2 text-gray-700">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span className="text-sm font-medium">Help us match your profile by telling us a bit more about yourself.</span>
          </div>

          <button 
            type="submit" 
            className="w-full sm:w-auto bg-[#93D7B0] hover:bg-[#82C89F] text-[#111715] font-medium px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-colors duration-300 text-sm"
          >
            Submit
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          
        </div>

      </form>
    </div>
  );
}