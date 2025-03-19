'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProjectNavigationProps {
  currentSlug: string;
  prevProject?: { title: string; slug: string };
  nextProject?: { title: string; slug: string };
}

export default function ProjectNavigation({ currentSlug, prevProject, nextProject }: ProjectNavigationProps) {
  const router = useRouter();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && prevProject) {
      router.push(`/projects/${prevProject.slug}`);
    } else if (e.key === 'ArrowRight' && nextProject) {
      router.push(`/projects/${nextProject.slug}`);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevProject, nextProject]);

  return (
    <div className="flex justify-between items-center w-full py-8 px-4 md:px-8">
      {prevProject ? (
        <Link
          href={`/projects/${prevProject.slug}`}
          className="group flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-sm">{prevProject.title}</span>
        </Link>
      ) : (
        <div /> // Empty div for spacing
      )}

      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
      >
        All Projects
      </Link>

      {nextProject ? (
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors duration-200"
        >
          <span className="text-sm">{nextProject.title}</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      ) : (
        <div /> // Empty div for spacing
      )}
    </div>
  );
} 