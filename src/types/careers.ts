export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface JobOpening {
  id: number;
  title: string;
  isNew: boolean;
  locationLabel: string;
  locationDetail: string;
  experience: string;
  type: string;
  closingDate: string;
}