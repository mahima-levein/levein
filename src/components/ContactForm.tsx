
import React, { useState } from 'react';
import { useIsMobile } from "../hooks/use-mobile";
interface Contact {
  fullName: string;
  email: string;
  engagementType: string;
  message: string;
}
export default function ContactForm() {
  const [formData, setformData] = useState<Contact>({
    fullName: '',
    email: '',
    engagementType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useIsMobile();
  const titleDesktop = (
    <>
      Have a question<br />
      about working<br />
      with us?
    </>
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // client-side validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.engagementType.trim() || !formData.message.trim()) {
      alert('Please fill in all fields.');
      return;
    }
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    setIsSubmitting(false);

    if (result.success) {
      alert("Thank you. Your message has been sent successfully.");
      setFormClear();
    } else {
      alert(result.message || "Something went wrong. Please try again.");
    }
  };

  function setFormClear() {
    setformData({ fullName: '', email: '', engagementType: '', message: '' });
  }
  const titleMobile = "Have a question about working with us?";
  return (
    <>
      {/* Left Column: Text Content */}
        <div className="flex flex-col max-w-lg">
          <h2 className="text-4xl lg:text-[64px] md:text-5xl font-primary text-levein-white mb-6">
            {isMobile ? titleMobile : titleDesktop}
          </h2>
          
          <p className="text-levein-white text-base md:text-lg mb-12 leading-relaxed pr-8">
            Whether you're applying, exploring roles, or just curious, we're here to help.
          </p>

          <hr className="border-t border-[#31423B] mb-6 w-full max-w-md" />

          <p className="text-[16px] text-levein-white">
            Are you looking for a job?{' '}
            <a href="jobs" className="text-levein-white underline underline-offset-4 decoration-gray-400 hover:decoration-white transition-colors">
              Join our team.
            </a>
          </p>
        </div>
        {/* Right Column */}
        <div className="w-full">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input 
                type="text"
                value={formData.fullName}
                onChange={(e) => setformData({...formData, fullName: e.target.value})}
                placeholder="Full name" 
                className="w-full bg-[#364943] text-levein-white placeholder-[#FBFBFB] text-[16px] px-4 py-4 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-[#93D7B0] transition-shadow border border-transparent"
              />
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setformData({...formData, email: e.target.value})}
                placeholder="Email address" 
                className="w-full bg-[#364943] text-levein-white placeholder-[#FBFBFB] text-[16px] px-4 py-4 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-[#93D7B0] transition-shadow border border-transparent"
              />
            </div>

            <div className="relative w-full">
              <select 
                value={formData.engagementType}
                onChange={(e) => setformData({...formData, engagementType: e.target.value})}
                className="w-full bg-[#364943] text-levein-white placeholder-[#FBFBFB] text-[16px] px-4 py-4 rounded-[10px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#93D7B0] transition-shadow border border-transparent cursor-pointer"
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
              value={formData.message}
              onChange={(e) => setformData({...formData, message: e.target.value})}
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
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                  <path d="M12 16L16 12L12 8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12H16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

            </div>
          </form>
        </div>

    </>
  );
}