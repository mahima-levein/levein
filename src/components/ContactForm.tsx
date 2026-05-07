import React from 'react';

export default function ContactForm() {
  return (
        <div className="w-full">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Full name" 
                className="w-full bg-[#364943] text-levein-white placeholder-[#FBFBFB] text-[16px] px-4 py-4 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-[#93D7B0] transition-shadow border border-transparent"
              />
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-[#364943] text-levein-white placeholder-[#FBFBFB] text-[16px] px-4 py-4 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-[#93D7B0] transition-shadow border border-transparent"
              />
            </div>

            <div className="relative w-full">
              <select 
                className="w-full bg-[#364943] text-levein-white placeholder-[#FBFBFB] text-[16px] px-4 py-4 rounded-[10px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#93D7B0] transition-shadow border border-transparent cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled hidden>What type of engagement do you look for?</option>
                <option value="full-time">Full-Time Role</option>
                <option value="freelance">Freelance / Contract</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
          
              <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M14.9336 6.81641H9.74195H5.06695C4.26695 6.81641 3.86695 7.78307 4.43361 8.34974L8.75028 12.6664C9.44195 13.3581 10.5669 13.3581 11.2586 12.6664L12.9003 11.0247L15.5753 8.34974C16.1336 7.78307 15.7336 6.81641 14.9336 6.81641Z" fill="#A7A7A7"/>
                </svg>
              </div>
            </div>

            <textarea 
              placeholder="Message" 
              rows={6}
              className="w-full bg-[#364943] text-levein-white placeholder-[#FBFBFB] text-[16px] px-4 py-4 rounded-[10px] resize-none focus:outline-none focus:ring-1 focus:ring-[#93D7B0] transition-shadow border border-transparent"
            ></textarea>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 gap-6 sm:gap-0">
              
              <p className="text-[16px] text-levein-white">
                Just want to drop a message?{' '}
                <a href="mailto:hello@leveingroup.com" className="text-white underline underline-offset-4 decoration-gray-400 hover:decoration-white transition-colors">
                  Email us
                </a>
              </p>

              <button 
                type="submit" 
                className="bg-[#93D7B0] cursor-pointer hover:bg-[#FBFBFB] text-levein-primary text-[18px] font-bold px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-colors duration-300 w-full sm:w-auto"
              >
                Submit
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                  <path d="M12 16L16 12L12 8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12H16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

            </div>
          </form>
        </div>
  );
}