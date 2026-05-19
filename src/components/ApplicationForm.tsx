import React from 'react';
interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  level: string;
  specialty: string;
  cvUrl: string;
  linkedInUrl?: string;
  status?: string;
  consent: boolean;
}
export default function ApplicationForm() {
  const [formData, setFormData] = React.useState<ApplicationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    level: '',
    specialty: '',
    cvUrl: '',
    linkedInUrl: '',
    status: '',
    consent: false
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validate = (data: ApplicationData) => {
    const errs: Record<string, string> = {};
    const emailRe = /^\S+@\S+\.\S+$/;
    const phoneRe = /^[0-9+()\-\s]{7,20}$/;

    if (!data.firstName.trim()) errs.firstName = 'First name is required';
    if (!data.lastName.trim()) errs.lastName = 'Last name is required';
    if (!data.email.trim()) errs.email = 'Email is required';
    else if (!emailRe.test(data.email)) errs.email = 'Enter a valid email address';
    if (!data.phone.trim()) errs.phone = 'Phone number is required';
    else if (!phoneRe.test(data.phone)) errs.phone = 'Enter a valid phone number';
    if (!data.level) errs.level = 'Please select your level';
    if (!data.specialty) errs.specialty = 'Please select your specialty';
    if (!data.cvUrl.trim()) errs.cvUrl = 'Please provide a CV or portfolio URL';
    else {
      try { new URL(data.cvUrl); } catch { errs.cvUrl = 'Enter a valid URL (include https://)'; }
    }
    if (!data.consent) errs.consent = 'You must agree to the privacy terms';

    return errs;
  };
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const validation = validate(formData);
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    setIsSubmitting(true);
    try {
      // Draft: perform API integration here.
      // Example: await fetch('/api/applications', { method: 'POST', body: JSON.stringify(formData) })
      console.log('Draft submit (no network call yet):', formData);
    } catch (err) {
      console.error('Submit error:', err);
      setErrors({ submit: 'Unable to submit. Try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 bg-[#7fcfa854] rounded-3xl font-sans">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* --- Top Grid (Inputs) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="text-[16px] font-medium text-levein-black">First name</label>
            <input 
              type="text" 
              id="firstName"
              placeholder="Enter your first name" 
              className="w-full px-4 py-3 rounded-lg border border-transparent focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] bg-levein-white outline-none text-gray-700 text-sm placeholder-gray-400"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="text-[16px] font-medium text-levein-black">Last name</label>
            <input 
              type="text" 
              id="lastName"
              placeholder="Enter your last name" 
              className="w-full px-4 py-3 rounded-lg border border-transparent focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] bg-levein-white outline-none text-gray-700 text-sm placeholder-gray-400"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[16px] font-medium text-levein-black">Email Address</label>
            <input 
              type="email" 
              id="email"
              placeholder="Enter your email address" 
              className="w-full px-4 py-3 rounded-lg border border-transparent focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] bg-levein-white outline-none text-gray-700 text-sm placeholder-gray-400"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-[16px] font-medium text-levein-black">Phone number</label>
            <input 
              type="tel" 
              id="phone"
              placeholder="Enter your phone number" 
              className="w-full px-4 py-3 rounded-lg border border-transparent focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] bg-levein-white outline-none text-gray-700 text-sm placeholder-gray-400"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Country Dropdown */}
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="country" className="text-[16px] font-medium text-levein-black">Your current level</label>
            <div className="relative">
              <select 
                id="country"
                className="w-full px-4 py-3 rounded-lg border border-transparent focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-700 text-sm appearance-none bg-white cursor-pointer"
                value={formData.level}
                onChange={(e) => setFormData({...formData, level: e.target.value})}
              >
                <option value="" disabled hidden>Select a level</option>
                <option >Junior</option>
                <option >Associate</option>
                <option >Senior</option>
                <option >Tech Lead</option>
              </select>
              {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </div>

          {/* Specialty Dropdown */}
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="specialty" className="text-[16px] font-medium text-levein-black">What is your specialty area?</label>
            <div className="relative">
              <select 
                id="specialty"
                className="w-full px-4 py-3 rounded-lg border border-transparent focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-700 text-sm appearance-none bg-white cursor-pointer"
                value={formData.specialty}
                onChange={(e) => setFormData({...formData, specialty: e.target.value})}
              >
                <option value="" disabled hidden>Select your specialty area</option>
                <option>Software Engineering</option>
                <option>Quality Engineering</option>
                <option>UI/UX Design</option>
                <option>Product Management</option>
                <option>Project Management</option>
                <option>Business Analysis</option>
                <option>Data Engineering</option>
                <option>Cybersecurity</option>
                <option>UI/UX</option>
                <option>Cloud Services</option>
                <option>Accounting & Finance</option>
                <option>Human Resources</option>
                <option>Talent Acquisition</option>
                <option>Legal</option>
                <option>Travel & Mobility</option>
              </select>
              {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>}
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </div>

        </div>
          <div className="flex flex-col gap-2">
            <label className="text-[16px] font-medium text-levein-black">Enter CV URL (Drive Link or Portfolio Website)</label>
            <input 
              type="url" 
              id="cv-url"
              placeholder="Enter your CV/Portfolio URL" 
              className="w-full px-4 py-3 rounded-lg border border-transparent focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] bg-levein-white outline-none text-gray-700 text-sm placeholder-gray-400"
              value={formData.cvUrl}
              onChange={(e) => setFormData({...formData, cvUrl: e.target.value})}
            />
            {errors.cvUrl && <p className="text-red-500 text-sm mt-1">{errors.cvUrl}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-medium text-levein-black">Link to your LinkedIn?</label>
              <input 
                type="url" 
                id="linkedin-url"
                placeholder="Enter your LinkedIn URL" 
                className="w-full px-4 py-3 rounded-lg border border-transparent focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] bg-levein-white outline-none text-gray-700 text-sm placeholder-gray-400"
                value={formData.linkedInUrl}
                onChange={(e) => setFormData({...formData, linkedInUrl: e.target.value})}
              />
              {errors.linkedInUrl && <p className="text-red-500 text-sm mt-1">{errors.linkedInUrl}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-medium text-levein-black">What is your current place of employment/studies?</label>
              <input 
                type="text" 
                id="status"
                placeholder="Enter your current status" 
                className="w-full px-4 py-3 rounded-lg border border-transparent focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] bg-levein-white outline-none text-gray-700 text-sm placeholder-gray-400"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              />
              {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
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
            checked={formData.consent}
            onChange={(e) => setFormData({...formData, consent: e.target.checked})}
            className="mt-1 w-4 h-4 rounded border-gray-300 text-[#3B574F] focus:ring-[#93D7B0] cursor-pointer"
          />
          <label htmlFor="consent" className="text-[14px] text-gray-600 cursor-pointer select-none">
            Yes, I give Levein permission to use my personal data for recruitment purposes only.
          </label>
          {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent}</p>}
        </div>

        <hr className='w-full bg-[#D2E0E0] h-px' />

        {/* --- Footer Area --- */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10.517 17.3404C10.2337 17.4404 9.76699 17.4404 9.48366 17.3404C7.06699 16.5154 1.66699 13.0737 1.66699 7.24036C1.66699 4.66536 3.74199 2.58203 6.30033 2.58203C7.81699 2.58203 9.15866 3.31536 10.0003 4.4487C10.842 3.31536 12.192 2.58203 13.7003 2.58203C16.2587 2.58203 18.3337 4.66536 18.3337 7.24036C18.3337 13.0737 12.9337 16.5154 10.517 17.3404Z" stroke="#1A1617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[16px] font-medium">Help us match your profile by telling us a bit more about yourself.</span>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full sm:w-auto ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#82C89F]'} bg-[#93D7B0] text-[#111715] font-semibold px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-colors duration-300 text-[16px]`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
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