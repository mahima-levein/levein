import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from 'react';

type ApplicationModalProps = {
  jobTitle?: string;
  triggerLabel?: string;
  jobId?: string;
  triggerClassName?: string;
};

interface ApplicationFormData {
  candidate_name: string;
  candidate_email: string;
  resume_age: string;
  resume_gender: string;
  candidate_location: string;
  cv_file: string;
  data_consent?: boolean;
  resume_current_salary: string;
  resume_expected_salary: number;
  resume_experience: string;
  resume_education_level: string;
  candidate_job_find: string;
  candidate_notice_period: string;
  referred_by: string;
  candidate_job_title?: string;
  candidate_employment_status?: string;
  candidate_reason: string;
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
    candidate_name: "",
    candidate_email: "",
    resume_age: "",
    resume_gender: "",
    candidate_location: "",
    cv_file: "",
    resume_current_salary: "",
    resume_expected_salary: 0,
    resume_experience: "",
    resume_education_level: "",
    candidate_job_find: "TopJobs.lk",
    candidate_notice_period: "",
    referred_by: "",
    candidate_job_title: jobId,
    candidate_employment_status: "",
    candidate_reason: "Industry Change"
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<boolean>(false);
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

  useEffect(() => {
    // Prevent race between loading saved data and persisting formData.
  }, []);

  const loadedRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      try {
        const saved = sessionStorage.getItem('candidateData');
        if (saved) {
          const parsed = JSON.parse(saved);
          setFormData((prev) => ({ ...prev, ...parsed }));
        }
      } catch (e) {
        console.warn('Could not read sessionStorage:', e);
      } finally {
        loadedRef.current = true;
      }
    } else {
      loadedRef.current = false;
    }
  }, [isOpen]);

  // Persist formData only after initial load to avoid overwriting loaded values
  useEffect(() => {
    if (!isOpen || !loadedRef.current) return;
    try {
      sessionStorage.setItem('candidateData', JSON.stringify(formData));
    } catch (e) {
      console.warn('Could not save to sessionStorage:', e);
    }
  }, [formData, isOpen]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (file?: File | null) => {
    const f = file ?? null;
    if (!f) return;
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!allowed.includes(f.type)) {
      setErrors((s) => ({ ...s, cv_file: 'Unsupported file type. Use PDF or DOCX.' }));
      return;
    }
    if (f.size > maxSize) {
      setErrors((s) => ({ ...s, cv_file: 'File too large. Maximum size is 5MB.' }));
      return;
    }
    setErrors((s) => ({ ...s, cv_file: '' }));
    setCvFile(f);
    setFormData((prev) => ({ ...prev, cv_file: f.name }));
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    handleFileSelect(e.target.files[0]);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const validateStep = (currentStep: number) => {
    const nextErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.candidate_name.trim()) nextErrors.candidate_name = 'Name is required.';
      if (!formData.candidate_email.trim()) nextErrors.candidate_email = 'Email is required.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.candidate_email)) nextErrors.candidate_email = 'Enter a valid email.';
      if (!formData.resume_age) nextErrors.resume_age = 'Age range is required.';
      if (!formData.resume_gender) nextErrors.resume_gender = 'Gender is required.';
      if (!cvFile) nextErrors.cv_file = 'Please upload your CV.';
    }
    if (currentStep === 2) {
      if (!formData.resume_current_salary) nextErrors.resume_current_salary = 'Current salary is required.';
      if (!formData.resume_expected_salary || Number(formData.resume_expected_salary) <= 0) nextErrors.resume_expected_salary = 'Expected salary is required.';
      if (!formData.resume_experience) nextErrors.resume_experience = 'Experience level is required.';
      if (!formData.candidate_location) nextErrors.candidate_location = 'Location is required.';
      if (!formData.resume_education_level) nextErrors.resume_education_level = 'Education level is required.';
      if (!formData.candidate_notice_period) nextErrors.candidate_notice_period = 'Notice period is required.';
      if (!formData.candidate_employment_status) nextErrors.candidate_employment_status = 'Employment status is required.';
      // example: require consent
      if (!formData.data_consent) nextErrors.data_consent = 'Please accept data consent.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const airtableDataStructure = (resumeData:any) => {
    return {
      records: [
            {
        fields: {
          "candidate_name": formData.candidate_name,
          "candidate_email": formData.candidate_email,
          "resume_age": formData.resume_age,
          "resume_gender": formData.resume_gender,
          "cv_file": formData.cv_file,
          "resume_current_salary[]": formData.resume_current_salary,
          "resume_expected_salary": formData.resume_expected_salary,
          "resume_experience[]": formData.resume_experience,
          "candidate_location": formData.candidate_location,
          "resume_education_level[]": formData.resume_education_level,
          "candidate_notice_period": formData.candidate_notice_period,
          "candidate_employment_status": formData.candidate_employment_status,
          "candidate_job_find": formData.candidate_job_find,
          "referred_by": formData.referred_by,
          "candidate_job_title": formData.candidate_job_title,
          "candidate_reason": formData.candidate_reason,
      }
    }
    ],
    };
  };

  const saveToAirtable = async (data: any, baseName: string) => {
    const response = await fetch("/api/airtable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baseName, data }),
      });

      const result = await response.json();
      return result.id || null;
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    // If on step 2, submit the application
    if (step === 2) {
      console.log('Final form data to submit:', airtableDataStructure(formData));
      goToStep(3, 'forward');
      return;
      try {
        const airtableCandidateId = await saveToAirtable(airtableDataStructure(formData), 'Applications');
        if (!airtableCandidateId) {
          alert('There was an error submitting your application. Please try again later.');
        } else {
          setSuccess(true);
          setFormData({ ...formData, candidate_job_title: '' });
          goToStep(3, 'forward');
        }
      } catch (e) {
        console.error('Submit error:', e);
        alert('There was an error submitting your application. Please try again later.');
      }
      return;
    }

    // Otherwise advance to next step (from step 1)
    if (step < 2) {
      goToStep(step + 1, 'forward');
      return;
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
                    <input type="text" value={formData.candidate_name} onChange={(e) => setFormData({ ...formData, candidate_name: e.target.value })} id="firstName" placeholder="Enter your first name" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-700 test-[16px] placeholder-gray-400 transition-shadow" />
                    {errors.candidate_name && <p className="text-red-600 text-sm mt-1">{errors.candidate_name}</p>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="test-[16px] font-normal text-levein-black">Email Address</label>
                    <input type="email" value={formData.candidate_email} onChange={(e) => setFormData({ ...formData, candidate_email: e.target.value })} id="email" placeholder="Enter your email address" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-700 test-[16px] placeholder-gray-400 transition-shadow" />
                    {errors.candidate_email && <p className="text-red-600 text-sm mt-1">{errors.candidate_email}</p>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="ageRange" className="test-[16px] font-normal text-levein-black">Candidate Age</label>
                    <div className="relative">
                      <select id="ageRange" value={formData.resume_age} onChange={(e) => setFormData({ ...formData, resume_age: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-500 test-[16px] appearance-none bg-white cursor-pointer transition-shadow">
                        <option value="" disabled hidden>Select your age</option>
                        <option>18-22 Years</option>
                        <option>23-28 Years</option>
                        <option>29-33 Years</option>
                        <option>34-40 Years</option>
                        <option>41-45 Years</option>
                        <option>46-50 Years</option>
                        <option>Above 50 Years</option>
                      </select>
                      {errors.resume_age && <p className="text-red-600 text-sm mt-1">{errors.resume_age}</p>}
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="gender" className="test-[16px] font-normal text-levein-black">Candidate Gender</label>
                    <div className="relative">
                      <select id="gender" value={formData.resume_gender} onChange={(e) => setFormData({ ...formData, resume_gender: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-500 test-[16px] appearance-none bg-white cursor-pointer transition-shadow">
                        <option value="" disabled hidden>Select your gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {errors.resume_gender && <p className="text-red-600 text-sm mt-1">{errors.resume_gender}</p>}
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-6">
                  <label className="test-[16px] font-normal text-levein-black">Upload your CV</label>
                  <div
                    className="w-full border border-dashed border-[#85A99C] bg-[#EAF2EB] rounded-xl py-8 flex flex-col items-center justify-center cursor-pointer hover:bg-[#dbe7dd] transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                  >
                    <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFileInputChange} className="hidden" />
                    {cvFile ? (
                      <p className="text-gray-700 font-medium">{cvFile.name}</p>
                    ) : (
                      <>
                    <div className="bg-[#cbdad1] p-1.5 rounded-full mb-3 text-[#3B574F]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7.7666 5.41849L9.89994 3.28516L12.0333 5.41849" stroke="#1D6363" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.8999 11.8148V3.33984" stroke="#1D6363" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.3335 10C3.3335 13.6833 5.8335 16.6667 10.0002 16.6667C14.1668 16.6667 16.6668 13.6833 16.6668 10" stroke="#1D6363" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    </>
                    )}
                    <p className="text-gray-500 text-xs sm:test-[16px] mt-1">Supported file formats: PDF and docx up to 5MB</p>
                    {errors.cv_file && <p className="text-red-600 text-sm mt-2">{errors.cv_file}</p>}
                  </div>
                </div>
              </div>
            )}
            { renderedStep === 2 && (
                <div className="step-container">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="currentSalary" className="test-[16px] font-normal text-levein-black">Candidate Current Salary</label>
                      <div className="relative">
                        <select id="currentSalary" value={formData.resume_current_salary} onChange={(e) => setFormData({ ...formData, resume_current_salary: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-500 test-[16px] appearance-none bg-white cursor-pointer transition-shadow">
                          <option value="" disabled hidden>Select current salary</option>
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
                      {errors.resume_current_salary && <p className="text-red-600 text-sm mt-1">{errors.resume_current_salary}</p>}
                    </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="expectedSalary" className="test-[16px] font-normal text-levein-black">Candidate Expected Salary</label>
                      <input type="number" value={formData.resume_expected_salary} onChange={(e) => setFormData({ ...formData, resume_expected_salary: Number(e.target.value) })} id="expectedSalary" placeholder="Enter your expected salary" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-700 test-[16px] placeholder-gray-400 transition-shadow" />
                      {errors.resume_expected_salary && <p className="text-red-600 text-sm mt-1">{errors.resume_expected_salary}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="experience" className="test-[16px] font-normal text-levein-black">Candidate Experience</label>
                      <div className="relative">
                      <select id="experience" value={formData.resume_experience} onChange={(e) => setFormData({ ...formData, resume_experience: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-500 test-[16px] appearance-none bg-white cursor-pointer transition-shadow">
                        <option value="" disabled hidden>Select experience level</option>
                        <option value="0-1 Year">0-1 Year</option>
                        <option value="1-3 Years">1-3 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="6-9 Years">6-9 Years</option>
                        <option value="Over 10 Years">Over 10 Years</option>
                      </select>
                      {errors.resume_experience && <p className="text-red-600 text-sm mt-1">{errors.resume_experience}</p>}
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </div>
                    </div>

                    <div className="flex-col gap-2 sm:col-span-1">
                      <label htmlFor="country" className="test-[16px] font-normal text-levein-black">Location</label>
                      <div className="relative mt-2">
                        <select id="country" value={formData.candidate_location} onChange={(e) => setFormData({ ...formData, candidate_location: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-500 test-[16px] appearance-none bg-white cursor-pointer transition-shadow">
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
                          {errors.candidate_location && <p className="text-red-600 text-sm mt-1">{errors.candidate_location}</p>}
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex-col gap-2 sm:col-span-1">
                      <label htmlFor="country" className="test-[16px] font-normal text-levein-black">Candidate Current Education Level</label>
                      <div className="relative mt-2">
                        <select id="country" value={formData.resume_education_level} onChange={(e) => setFormData({ ...formData, resume_education_level: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-500 test-[16px] appearance-none bg-white cursor-pointer transition-shadow">
                          <option value="" disabled hidden>Select your education level</option>
                          <option value="Advanced Level">Advanced Level</option>
                          <option value="Pursuing a Degree">Pursuing a Degree</option>
                          <option value="Bachelor’s Degree">Bachelor's Degree</option>
                          <option value="Diploma / HND / CIMA / ACCA">Diploma / HND / CIMA / ACCA</option>
                          <option value="MSc (Postgraduate)">MSc (Postgraduate)</option>
                        </select>
                          {errors.resume_education_level && <p className="text-red-600 text-sm mt-1">{errors.resume_education_level}</p>}
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="noticePeriod" className="test-[16px] font-normal text-levein-black">Notice Period</label>
                       <div className="relative">
                        <select id="noticePeriod" value={formData.candidate_notice_period} onChange={(e) => setFormData({ ...formData, candidate_notice_period: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-500 test-[16px] appearance-none bg-white cursor-pointer transition-shadow">
                          <option value="" disabled hidden>Select your notice period</option>
                          <option value="Less than 1 week">Less than 1 Week</option>
                          <option value="Less than 1 month">Less than 1 Month</option>
                          <option value="1-2 Months">1 - 2 Months</option>
                          <option value="2-3 Months">2 - 3 Months</option>
                        </select>
                          {errors.candidate_notice_period && <p className="text-red-600 text-sm mt-1">{errors.candidate_notice_period}</p>}
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                      </div>
                    </div>
                     <div className="flex flex-col gap-2">
                      <label htmlFor="candidate_employment_status" className="test-[16px] font-normal text-levein-black">Are you employed at present?</label>
                      <div className="relative">
                        <select id="candidate_employment_status" value={formData.candidate_employment_status} onChange={(e) => setFormData({ ...formData, candidate_employment_status: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-500 test-[16px] appearance-none bg-white cursor-pointer transition-shadow">
                          <option value="" disabled hidden>Select your employment status</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                          {errors.candidate_employment_status && <p className="text-red-600 text-sm mt-1">{errors.candidate_employment_status}</p>}
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                      </div>
                      </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="referred_by" className="test-[16px] font-normal text-levein-black">Referred By? (optional)</label>
                      <input type="text" value={formData.referred_by} onChange={(e) => setFormData({ ...formData, referred_by: e.target.value })} id="referred_by" placeholder="Enter the name of the person who referred you" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#93D7B0] focus:ring-1 focus:ring-[#93D7B0] outline-none text-gray-700 test-[16px] placeholder-gray-400 transition-shadow" />
                    </div>
                </div>
                  <div className="flex flex-col gap-3 mt-4">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" id="dataConsent" checked={!!formData.data_consent} onChange={(e) => setFormData((p) => ({ ...p, data_consent: e.target.checked }))} className="mt-1 w-4 h-4 rounded border-gray-300 text-[#3B574F] focus:ring-[#93D7B0] cursor-pointer" />
                      <label htmlFor="dataConsent" className="test-[16px] text-gray-600 cursor-pointer select-none leading-relaxed">
                        Yes, I give Levein permission to use my personal data for recruitment purposes only.
                      </label>
                    </div>
                    {errors.data_consent && <p className="text-red-600 text-sm mt-1">{errors.data_consent}</p>}
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
                disabled={step === 1 || isAnimating || step === 3}
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
                onClick={step === 3 ? closeModal : handleSubmit}
                disabled={isAnimating}
                className="bg-[#3B574F] hover:bg-[#2e453e] text-white font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors duration-300 test-[16px] shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {step === 2 ? 'Submit application' : step === 3 ? 'Close' : 'Next'}
                <svg className={`${step === 3 ? 'hidden' : ''}`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
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