
export type NavigationItem = 'home' | 'skills' | 'works' | 'about' | 'business';

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription?: string;
  challenges?: string;
  results?: string;
  image: string; // Cover image
  gallery?: string[]; // Additional screenshots
  features?: string[]; // Key features list
  tech: string[];
  link?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'Design';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
