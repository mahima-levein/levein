import { useEffect, useRef, useState } from 'react';

type ApplicationModalProps = {
  jobTitle?: string;
  triggerLabel?: string;
  jobId?: string;
  triggerClassName?: string;
};

interface ApplicationFormData {
  name: string;
  email: string;
  ageRange: string;
  gender: string;
  location: string;
  candidate_resume: string;
  currentSalary: string;
  expectedSalary: string;
  jobId: number | null;
  experienceLevel: string;
  educationLevels: string;
  noticePeriod: string;
  availability: string;
  referred: string;
  employmentStatus?: string;
}

export default function ApplicationModal({
  jobTitle,
  jobId,
  triggerLabel = 'Apply now',
  triggerClassName,
}: ApplicationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [renderedStep, setRenderedStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const transitionTimeoutRef = useRef<number | null>(null);

  const [formData, setFormData] = useState<ApplicationFormData>({
    name: "",
    email: "",
    ageRange: "",
    gender: "",
    location: "",
    candidate_resume: "",
    currentSalary: "",
    expectedSalary: "",
    jobId: null,
    experienceLevel: "",
    noticePeriod: "",
    educationLevels: "",
    availability: "",
    referred: "",
    employmentStatus: "Yes",
  });

  const closeModal = () => {
    if (transitionTimeoutRef.current !== null) {
      window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }

    setIsOpen(false);
    setStep(1);
    setRenderedStep(1);
    setIsAnimating(false);
    setDirection('forward');
  };

  const goToStep = (nextStep: number, nextDirection: 'forward' | 'backward') => {
    if (nextStep < 1 || nextStep > 3 || nextStep === step || isAnimating) {
      return;
    }

    setDirection(nextDirection);
    setIsAnimating(true);

    transitionTimeoutRef.current = window.setTimeout(() => {
      setStep(nextStep);
      setRenderedStep(nextStep);
      setIsAnimating(false);
      transitionTimeoutRef.current = null;
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const handleSubmit = () => {
    if (step < 3) {
      goToStep(step + 1, 'forward');
      return;
    }

    if (step === 3) {
      console.log('Submitting application for job ID:', jobId);
      closeModal();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      goToStep(step - 1, 'backward');
    }
  };


  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={triggerClassName}>
        {triggerLabel}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-sm font-sans overflow-y-auto"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl relative flex flex-col max-h-full"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative px-6 sm:px-8 py-5 flex items-center justify-between shrink-0">
              <h2 className="text-xl sm:text-[24px] font-medium text-levein-black">
                Apply to {jobTitle ? `"${jobTitle}"` : 'N/A'}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 cursor-pointer hover:text-gray-700 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-[#93D7B0]"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9.99984 18.3346C14.5832 18.3346 18.3332 14.5846 18.3332 10.0013C18.3332 5.41797 14.5832 1.66797 9.99984 1.66797C5.4165 1.66797 1.6665 5.41797 1.6665 10.0013C1.6665 14.5846 5.4165 18.3346 9.99984 18.3346Z" stroke="#061414" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.6416 12.3573L12.3583 7.64062" stroke="#061414" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12.3583 12.3573L7.6416 7.64062" stroke="#061414" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {/* Progress Bar (The green line under the header) */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-100">
                <div
                  className={`h-full bg-[#1D6363] transition-all duration-300 ease-out ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}
                ></div>
              </div>
            </div>
          <div className="p-6 sm:px-8 sm:py-6 overflow-y-auto min-h-120">
          <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-6">
              <div
                key={renderedStep}
                className={`transform transition-all duration-200 ease-out ${
                  isAnimating
                    ? direction === 'forward'
                      ? '-translate-x-2 opacity-0'
                      : 'translate-x-2 opacity-0'
                    : 'translate-x-0 opacity-100'
                }`}
              >
            { renderedStep === 1 && (
              <div className="step-container">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="test-[16px] font-normal text-levein-black">Your Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} id="firstName" placeholder="Enter your first name" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-700 test-[16px] placeholder-gray-400 transition-shadow" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="test-[16px] font-normal text-levein-black">Email Address</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} id="email" placeholder="Enter your email address" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-700 test-[16px] placeholder-gray-400 transition-shadow" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="ageRange" className="test-[16px] font-normal text-levein-black">Candidate Age</label>
                    <div className="relative">
                      <select id="ageRange" value={formData.ageRange} onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-500 test-[16px] appearance-none bg-white cursor-pointer transition-shadow" defaultValue="">
                        <option value="" disabled hidden>Select your age</option>
                        <option>18-22 Years</option>
                        <option>23-28 Years</option>
                        <option>29-33 Years</option>
                        <option>34-40 Years</option>
                        <option>41-45 Years</option>
                        <option>46-50 Years</option>
                        <option>Above 50 Years</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="gender" className="test-[16px] font-normal text-levein-black">Candidate Gender</label>
                    <div className="relative">
                      <select id="gender" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-500 test-[16px] appearance-none bg-white cursor-pointer transition-shadow" defaultValue="">
                        <option value="" disabled hidden>Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-6">
                  <label className="test-[16px] font-normal text-levein-black">Upload your CV</label>
                  <div className="w-full border border-dashed border-[#85A99C] bg-[#EAF2EB] rounded-xl py-8 flex flex-col items-center justify-center cursor-pointer hover:bg-[#dbe7dd] transition-colors">
                    <div className="bg-[#cbdad1] p-1.5 rounded-full mb-3 text-[#3B574F]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7.7666 5.41849L9.89994 3.28516L12.0333 5.41849" stroke="#1D6363" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.8999 11.8148V3.33984" stroke="#1D6363" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.3335 10C3.3335 13.6833 5.8335 16.6667 10.0002 16.6667C14.1668 16.6667 16.6668 13.6833 16.6668 10" stroke="#1D6363" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-gray-900 font-medium test-[16px] sm:text-base">Drop file here or click to upload</p>
                    <p className="text-gray-500 text-xs sm:test-[16px] mt-1">Supported file formats: PDF and docx up to 5MB</p>
                  </div>
                </div>
              </div>
            )}
            { renderedStep === 2 && (
                <div className="step-container">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="currentSalary" className="test-[16px] font-medium text-levein-black">Candidate Current Salary</label>
                      <input type="text" value={formData.currentSalary} onChange={(e) => setFormData({ ...formData, currentSalary: e.target.value })} id="currentSalary" placeholder="Enter your current salary" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-700 test-[16px] placeholder-gray-400 transition-shadow" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="expectedSalary" className="test-[16px] font-medium text-levein-black">Candidate Expected Salary</label>
                      <div className="relative">
                      <select id="expectedSalary" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-500 test-[16px] appearance-none bg-white cursor-pointer transition-shadow" defaultValue="">
                        <option value="" disabled hidden>Select expected salary</option>
                        <option value="0 - 100,000 LKR">0 - 100,000 LKR</option>
                        <option value="100,000 LKR to 300,000 LKR">
                          100,000 LKR to 300,000 LKR
                        </option>
                        <option value="300,000 LKR to 500,000 LKR">
                          300,000 LKR to 500,000 LKR
                        </option>
                        <option value="Above 500,000 LKR">Above 500,000 LKR</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="experience" className="test-[16px] font-normal text-levein-black">Candidate Experience</label>
                      <div className="relative">
                      <select id="experience" value={formData.experienceLevel} onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-500 test-[16px] appearance-none bg-white cursor-pointer transition-shadow" defaultValue="">
                        <option value="" disabled hidden>Select experience level</option>
                        <option value="0-1 Year">0-1 Year</option>
                        <option value="1-3 Years">1-3 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="6-9 Years">6-9 Years</option>
                        <option value="Over 10 Years">Over 10 Years</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </div>
                    </div>

                    <div className="flex-col gap-2 sm:col-span-1">
                      <label htmlFor="country" className="test-[16px] font-normal text-levein-black">Location</label>
                      <div className="relative mt-2">
                        <select id="country" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-500 test-[16px] appearance-none bg-white cursor-pointer transition-shadow" defaultValue="">
                          <option value="">Select a location...</option>
                            <option value="Colombo">Colombo</option>
                            <option value="Gampaha">Gampaha</option>
                            <option value="Kalutara">Kalutara</option>
                            <option value="Kandy">Kandy</option>
                            <option value="Matale">Matale</option>
                            <option value="Nuwara Eliya">Nuwara Eliya</option>
                            <option value="Galle">Galle</option>
                            <option value="Matara">Matara</option>
                            <option value="Hambantota">Hambantota</option>
                            <option value="Jaffna">Jaffna</option>
                            <option value="Kilinochchi">Kilinochchi</option>
                            <option value="Mannar">Mannar</option>
                            <option value="Vavuniya">Vavuniya</option>
                            <option value="Mullaitivu">Mullaitivu</option>
                            <option value="Batticaloa">Batticaloa</option>
                            <option value="Ampara">Ampara</option>
                            <option value="Trincomalee">Trincomalee</option>
                            <option value="Kurunegala">Kurunegala</option>
                            <option value="Puttalam">Puttalam</option>
                            <option value="Anuradhapura">Anuradhapura</option>
                            <option value="Polonnaruwa">Polonnaruwa</option>
                            <option value="Badulla">Badulla</option>
                            <option value="Moneragala">Moneragala</option>
                            <option value="Ratnapura">Ratnapura</option>
                            <option value="Kegalle">Kegalle</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex-col gap-2 sm:col-span-1">
                      <label htmlFor="country" className="test-[16px] font-normal text-levein-black">Candidate Education Level</label>
                      <div className="relative mt-2">
                        <select id="country" value={formData.educationLevels} onChange={(e) => setFormData({ ...formData, educationLevels: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-500 test-[16px] appearance-none bg-white cursor-pointer transition-shadow" defaultValue="">
                          <option value="" disabled hidden>Select your education level</option>
                          <option value="Advanced Level">Advanced Level</option>
                          <option value="Pursuing a Degree">Pursuing a Degree</option>
                          <option value="Bachelor’s Degree">Bachelor's Degree</option>
                          <option value="Diploma / HND / CIMA / ACCA">Diploma / HND / CIMA / ACCA</option>
                          <option value="MSc (Postgraduate)">MSc (Postgraduate)</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="noticePeriod" className="test-[16px] font-normal text-levein-black">Notice Period</label>
                       <div className="relative mt-2">
                        <select id="noticePeriod" value={formData.noticePeriod} onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-500 test-[16px] appearance-none bg-white cursor-pointer transition-shadow" defaultValue="">
                          <option value="" disabled hidden>Select your notice period</option>
                          <option value="Less than 1 week">Less than 1 Week</option>
                          <option value="Less than 1 month">Less than 1 Month</option>
                          <option value="1-2 Months">1 - 2 Months</option>
                          <option value="2-3 Months">2 - 3 Months</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                      </div>
                    </div>
                     <div className="flex flex-col gap-2">
                      <label htmlFor="firstName" className="test-[16px] font-normal text-levein-black">Are you employed at present?</label>
                      <input type="text" id="firstName" placeholder="Enter your first name" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-700 test-[16px] placeholder-gray-400 transition-shadow" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="lastName" className="test-[16px] font-normal text-levein-black">Referred By? (optional)</label>
                      <input type="text" id="lastName" placeholder="Enter your last name" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-700 test-[16px] placeholder-gray-400 transition-shadow" />
                    </div>
                </div>
                  <div className="flex flex-col gap-3 mt-4">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" id="dataConsent" className="mt-1 w-4 h-4 rounded border-gray-300 text-[#3B574F] focus:ring-[#93D7B0] cursor-pointer" />
                      <label htmlFor="dataConsent" className="test-[16px] text-gray-600 cursor-pointer select-none leading-relaxed">
                        Yes, I give Levein permission to use my personal data for recruitment purposes only.
                      </label>
                    </div>
                  </div>
                </div>
            )}
              { renderedStep === 3 && (
              <div className="step-container">

                <div className="flex flex-col items-center mt-2">
                    <iframe className='w-full h-54' src="https://lottie.host/embed/b24f3868-231c-4fa4-aaf2-b5cb7e6b530c/lOQf1wHk1T.lottie"></iframe>
                </div>
                  <div className="flex flex-col justify-center items-center gap-3 -mt-2">
                    <h3 className="text-2xl font-semibold font-primary text-levein-black">Your application has been submitted!</h3>
                    <p className="text-gray-600 test-[16px]">Thank you for applying. You can check application status using your Submission ID.</p>
                  </div>
                   <div className="flex flex-col items-center rounded-lg p-4">
                      <dt className="text-[16px] uppercase tracking-wide mb-2 font-bold">Your Submission ID</dt>
                      <dd className="mt-1 flex items-center gap-2">
                        <code id="200" className="rounded-md px-2 py-1 text-[16px] text-[#3B574F] bg-[#EAF2EB] font-mono">
                          "sdf23r23-sdf23-23r23-sdf2323-sdf2323"
                        </code>
                        <button
                          className="cs-btn inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs transition hover:scale-105 focus-visible:outline-none"
                          data-copy-target={"cid-" + "200"}
                          type="button"
                          aria-label="Copy Submission ID"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M8 7a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V7Z"/>
                            <path d="M3 10a3 3 0 0 1 3-3h1v2H6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-1h2v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-7Z"/>
                          </svg>
                          <span data-copy-label className='text-[16px] cursor-pointer'>Copy</span>
                        </button>
                      </dd>
                    </div>
                </div>
              )}
              </div>
              </form>
            </div>
            <div className="border-t border-gray-100 px-6 sm:px-8 pb-4 shrink-0 flex justify-between bg-gray-50/50 rounded-b-[20px]">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1 || isAnimating}
                className="border border-[#3B574F] text-[#3B574F] font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors duration-300 test-[16px] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15.833 10H4.16634" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.99967 15.8346L4.16634 10.0013L9.99967 4.16797" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isAnimating}
                className="bg-[#3B574F] hover:bg-[#2e453e] text-white font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors duration-300 test-[16px] shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {step === 3 ? 'Submit application' : 'Next'}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4.16699 10H15.8337" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 4.16797L15.8333 10.0013L10 15.8346" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}