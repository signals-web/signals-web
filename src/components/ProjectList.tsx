'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getFilteredProjects } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';

interface Project {
  _id: string;
  title: string;
  slug: string;
  type: 'book' | 'signage';
  featured: boolean;
  publishedAt: string;
  backgroundColor: string;
  mainImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
}

interface ProjectListProps {
  initialProjects: Project[];
}

export default function ProjectList({ initialProjects }: ProjectListProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'all';

  useEffect(() => {
    const updateProjects = async () => {
      setIsLoading(true);
      const filteredProjects = await getFilteredProjects(filter);
      setProjects(filteredProjects);
      setIsLoading(false);
    };

    updateProjects();
  }, [filter]);

  return (
    <motion.div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${
      isLoading ? 'opacity-0' : 'opacity-100'
    }`}>
      {projects.map((project, index) => (
        <motion.div
          key={project._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="group block relative aspect-[3/4] overflow-hidden"
          >
            {project.mainImage && (
              <img
                src={urlFor(project.mainImage).width(800).url()}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h2 className="text-white text-2xl font-light">{project.title}</h2>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
} 