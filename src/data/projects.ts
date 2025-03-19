import { Project } from '@/types/project';

// Using a single placeholder image URL for all projects
const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"%3E%3Crect width="800" height="800" fill="%23808080"/%3E%3C/svg%3E';

// Sort projects alphabetically by title
const sortProjects = (projects: Project[]): Project[] => {
  return [...projects].sort((a, b) => a.title.localeCompare(b.title));
};

const projects = sortProjects([
  {
    id: '1',
    title: 'Exhibit Columbus',
    type: 'signage',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-01',
  },
  {
    id: '2',
    title: 'Boston City Hall',
    type: 'signage',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-02',
  },
  {
    id: '3',
    title: 'Our Artificial Nature',
    type: 'signage',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-03',
  },
  {
    id: '4',
    title: 'Harvard University',
    type: 'signage',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-04',
  },
  {
    id: '5',
    title: 'MASS MoCA',
    type: 'signage',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-05',
  },
  {
    id: '6',
    title: 'Gund Hall',
    type: 'signage',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-06',
  },
  {
    id: '7',
    title: 'Imagining the Modern',
    type: 'signage',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-07',
  },
  {
    id: '8',
    title: 'deCordova',
    type: 'signage',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-08',
  },
  {
    id: '9',
    title: 'MIT DUSP',
    type: 'signage',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-09',
  },
  {
    id: '10',
    title: 'The Edith Farnsworth House',
    type: 'book',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-10',
  },
  {
    id: '11',
    title: 'A Form of Practice',
    type: 'book',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-11',
  },
  {
    id: '12',
    title: 'Universal Principles',
    type: 'book',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-12',
  },
  {
    id: '13',
    title: 'Louis Kahn',
    type: 'book',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-13',
  },
  {
    id: '14',
    title: 'Megastructure',
    type: 'book',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-14',
  },
  {
    id: '15',
    title: 'Justice Is Beauty',
    type: 'book',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-15',
  },
  {
    id: '16',
    title: 'Heroic',
    type: 'book',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-16',
  },
  {
    id: '17',
    title: 'Words & Works',
    type: 'book',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-17',
  },
  {
    id: '18',
    title: 'Wayne Thom',
    type: 'book',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-18',
  },
  {
    id: '19',
    title: "Breuer's Bohemia",
    type: 'book',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-19',
  },
  {
    id: '20',
    title: 'Hamptons Modern',
    type: 'book',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-20',
  },
  {
    id: '21',
    title: 'Hudson Modern',
    type: 'book',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-21',
  },
  {
    id: '22',
    title: 'The Structure of Design',
    type: 'book',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-22',
  },
  {
    id: '23',
    title: 'Fusion',
    type: 'book',
    imageUrl: PLACEHOLDER_IMAGE,
    featured: true,
    date: '2024-01-23',
  },
]);

const getFilteredProjects = (filter: string): Project[] => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  return projects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'featured') return project.featured;
    if (filter === 'recent') {
      const projectDate = new Date(project.date);
      return projectDate >= threeMonthsAgo;
    }
    return project.type === filter;
  });
};

module.exports = { projects }; 