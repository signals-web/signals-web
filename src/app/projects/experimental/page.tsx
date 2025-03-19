'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '@/data/projects';
import { BookOpenText, Flag } from 'lucide-react';

export default function ExperimentalProjects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInteractive, setIsInteractive] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enable interaction after 3 seconds
    const timer = setTimeout(() => {
      setIsInteractive(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isInteractive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!projectsRef.current) return;
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isInteractive]);

  const getProjectStyle = (index: number) => {
    const columns = 6;
    const row = Math.floor(index / columns);
    const col = index % columns;
    
    // Base grid position
    const baseX = (col / columns) * 100;
    const baseY = row * 250;

    if (!isInteractive) {
      return {
        transform: 'translate(0, 0)',
        left: `${baseX}%`,
        top: `${baseY}px`,
        transition: 'all 2s cubic-bezier(0.22, 1, 0.36, 1)',
      };
    }

    // Calculate actual position in pixels for interactive mode
    const elementX = (baseX / 100) * (projectsRef.current?.clientWidth || 0);
    const elementY = baseY;

    // Calculate distance from cursor to this element's center
    const dx = mousePosition.x - (elementX + ((projectsRef.current?.clientWidth || 0) / 12));
    const dy = mousePosition.y - (elementY + 150);

    // Calculate movement based on distance
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 500;
    const moveScale = Math.min(1, 1 - (distance / maxDistance));
    
    // Movement direction based on relative position to cursor
    const moveX = dx * moveScale * -0.2;
    const moveY = dy * moveScale * -0.2;
    
    return {
      transform: `translate(${moveX}px, ${moveY}px)`,
      left: `${baseX}%`,
      top: `${baseY}px`,
      transition: 'all 2s cubic-bezier(0.22, 1, 0.36, 1)',
    };
  };

  const getProjectIcon = (type: string) => {
    if (type === 'book') {
      return <BookOpenText className="w-6 h-6" />;
    } else if (type === 'signage') {
      return <Flag className="w-6 h-6" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#da1f2c] text-white overflow-hidden">
      <div className="px-6 md:px-12 pt-8">
        <div className="max-w-[2000px] mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-16">
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
              <Link href="/projects/experimental" className="hover:text-white/70 transition-colors duration-200">All Projects</Link>
              <Link href="/projects/draggable" className="hover:text-white/70 transition-colors duration-200">Draggable</Link>
              <Link href="/about" className="hover:text-white/70 transition-colors duration-200">About</Link>
              <Link href="/about" className="hover:text-white/70 transition-colors duration-200">Contact</Link>
            </nav>
          </div>

          {/* Projects Grid */}
          <div 
            ref={projectsRef}
            className={`relative min-h-[200vh] py-24 transition-all duration-2000 ease-out
              ${isInteractive ? 'cursor-none' : ''}`}
          >
            {projectsData.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                className={`absolute w-1/6 p-4 hover:z-10 group transition-all duration-2000 ease-out
                  ${isInteractive ? 'opacity-30 hover:opacity-100' : 'opacity-100'}`}
                style={getProjectStyle(index)}
              >
                <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  {getProjectIcon(project.type)}
                  <span className="text-[18px] font-light">{project.title}</span>
                </div>
                <div className="aspect-[3/2] relative bg-black/10 overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className={`object-cover transition-all duration-2000 ease-out
                      ${isInteractive ? 'scale-110 group-hover:scale-100' : 'scale-100'}`}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 