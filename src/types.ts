export interface Program {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string[];
  icon: string;
}

export interface SuccessStory {
  id: string;
  name: string;
  location: string;
  impact: string;
  quote: string;
  fullStory: string;
  imageUrl: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  category: 'News' | 'Announcement' | 'Community';
  imageUrl: string;
}

export interface CalEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'Workshop' | 'Outreach' | 'Drive';
}

export interface DonationTier {
  amount: number;
  label: string;
  impact: string;
}
