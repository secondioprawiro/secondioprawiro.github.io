export enum Category {
  ALL = 'Semua',
  WEB = 'Web Dev',
  MOBILE = 'Mobile App',
  DESIGN = 'UI/UX Design',
  WRITING = 'Writing',
  OTHER = 'Lainnya'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string; // Stored as string to allow flexibility, mapped to enum for UI
  tags: string[];
  imageUrl: string;
  link?: string;
}

export interface AIProjectSuggestion {
  title: string;
  description: string;
  category: string;
  tags: string[];
}
