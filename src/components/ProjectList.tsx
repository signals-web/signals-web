'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getFilteredProjects } from '@/lib/sanity';

interface Project {
  _id: string;
  title: string;
  slug: string;
  type: 'book' | 'signage';
  featured: boolean;
  publishedAt: string;
}

interface ProjectListProps {
  initialProjects: Project[];
}

const TypeIcon = ({ type }: { type: 'book' | 'signage' }) => (
  <span className="inline-block mr-2">
    {type === 'book' ? '📖' : '🏷️'}
  </span>
);

export default function ProjectList({ initialProjects }: ProjectListProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'all';

  useEffect(() => {
    const updateProjects = async () => {
      if (filter === searchParams.get('filter')) {
        setIsLoading(true);
        try {
          const filteredProjects = await getFilteredProjects(filter);
          setProjects(filteredProjects);
        } catch (error) {
          console.error('Error fetching projects:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    updateProjects();
  }, [filter, searchParams]);

  return (
    <motion.div 
      className="text-white/70 space-y-4 text-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {projects.map((project, index) => (
        <motion.div
          key={project._id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isLoading ? 0 : 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="flex items-center"
        >
          <TypeIcon type={project.type} />
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-white transition-colors duration-200"
          >
            {project.title}
          </Link>
          {index < projects.length - 1 && <span className="mx-2">,</span>}
        </motion.div>
      ))}
    </motion.div>
  );
} 