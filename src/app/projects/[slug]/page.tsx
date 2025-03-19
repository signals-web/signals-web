import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject } from '@/lib/sanity';
import ImageScroller from '@/components/ImageScroller';
import ProjectNavigation from '@/components/ProjectNavigation';
import { Building2, Brush, Code2, FileText } from 'lucide-react';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

function getProjectIcon(type: string) {
  switch (type.toLowerCase()) {
    case 'architecture':
      return <Building2 className="w-5 h-5" />;
    case 'art':
      return <Brush className="w-5 h-5" />;
    case 'development':
      return <Code2 className="w-5 h-5" />;
    default:
      return <FileText className="w-5 h-5" />;
  }
}

interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt: string;
  caption?: string;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  const images = project.images?.map((image: SanityImage) => ({
    url: `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${image.asset._ref
      .replace('image-', '')
      .replace('-jpg', '.jpg')
      .replace('-png', '.png')
      .replace('-webp', '.webp')}`,
    alt: image.alt || project.title,
    width: 1920,
    height: 1080,
    description: image.caption
  })) || [];

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
            >
              ← Back to Projects
            </Link>
            <div className="flex items-center gap-2">
              {getProjectIcon(project.type)}
              <span className="text-sm text-gray-500">{project.type}</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          {project.description && (
            <p className="text-lg text-gray-600 max-w-3xl">{project.description}</p>
          )}
        </header>

        {images.length > 0 && (
          <div className="mb-8">
            <ImageScroller images={images} />
          </div>
        )}

        <ProjectNavigation
          currentSlug={params.slug}
          prevProject={project.prev}
          nextProject={project.next}
        />
      </div>
    </main>
  );
} 