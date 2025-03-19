export interface Project {
  id: string;
  title: string;
  type: 'book' | 'signage';
  imageUrl: string;
  featured: boolean;
  date: string;
  author?: string;
  category?: string;
  description?: string;
  images?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  }[];
} 