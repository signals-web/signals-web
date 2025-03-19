import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectFilter from '@/components/ProjectFilter';
import ProjectList from '@/components/ProjectList';
import PageTransition from '@/components/PageTransition';
import { getProjects } from '@/lib/sanity';

export type FilterOption = 'all' | 'book' | 'signage' | 'featured' | 'recent';

export default async function Home() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return (
      <main className="min-h-screen bg-red-600">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">
            <h2 className="text-2xl font-light mb-4">No Projects Found</h2>
            <p className="text-white/70">Please make sure your Sanity Studio is running and you have published some projects.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-red-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-12">
          <Link href="/" className="mb-8">
            <h1 className="text-4xl font-light tracking-wide">SIGNALS</h1>
          </Link>
          <nav className="flex gap-8 text-white/70">
            <Link href="/" className="hover:text-white transition-colors duration-200">All Projects</Link>
            <Link href="/about" className="hover:text-white transition-colors duration-200">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors duration-200">Contact</Link>
          </nav>
        </div>

        <PageTransition>
          <div className="space-y-12">
            <Suspense fallback={<div className="text-white/70">Loading filters...</div>}>
              <ProjectFilter />
            </Suspense>
            <Suspense fallback={<div className="text-white/70">Loading projects...</div>}>
              <ProjectList initialProjects={projects} />
            </Suspense>
          </div>
        </PageTransition>

        <footer className="mt-12 text-center text-white/70 text-sm">
          © 2025 SIGNALS. All rights reserved.
        </footer>
      </div>
    </main>
  );
} 