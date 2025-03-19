import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectFilter from '@/components/ProjectFilter';
import ProjectList from '@/components/ProjectList';
import PageTransition from '@/components/PageTransition';
import { getProjects } from '@/lib/sanity';

export type FilterOption = 'all' | 'architecture' | 'art' | 'development' | 'featured' | 'recent';

export default async function Home() {
  const projects = await getProjects();
  console.log('Fetched projects:', projects);

  if (!projects || projects.length === 0) {
    return (
      <main className="min-h-screen">
        <div className="px-6 md:px-12 pt-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-start mb-12">
              <Link href="/" className="w-[426px] h-[71px] relative">
                <Image
                  src="/images/signals-logo.png"
                  alt="SIGNALS"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </Link>
              <nav className="flex gap-8">
                <Link href="/projects/experimental" className="hover:text-black/70 transition-colors duration-200">All Projects</Link>
                <Link href="/about" className="hover:text-black/70 transition-colors duration-200">About</Link>
                <Link href="/about" className="hover:text-black/70 transition-colors duration-200">Contact</Link>
              </nav>
            </div>

            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">No Projects Found</h2>
              <p className="text-gray-600">Please make sure your Sanity Studio is running and you have published some projects.</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="px-6 md:px-12 pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <Link href="/" className="w-[426px] h-[71px] relative">
              <Image
                src="/images/signals-logo.png"
                alt="SIGNALS"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </Link>
            <nav className="flex gap-8">
              <Link href="/projects/experimental" className="hover:text-black/70 transition-colors duration-200">All Projects</Link>
              <Link href="/about" className="hover:text-black/70 transition-colors duration-200">About</Link>
              <Link href="/about" className="hover:text-black/70 transition-colors duration-200">Contact</Link>
            </nav>
          </div>

          <PageTransition>
            <div className="space-y-12">
              <ProjectFilter />
              <ProjectList initialProjects={projects} />
            </div>
          </PageTransition>
        </div>
      </div>
    </main>
  );
} 