'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '@/data/projects';
import { BookOpenText, Flag } from 'lucide-react';

interface Position {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function DraggableProjects() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const projectsRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const friction = 0.98; // Increased friction for smoother movement
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize positions only once after component mount
    const initialPositions = projectsData.map((_, index) => {
      const columns = Math.ceil(Math.sqrt(projectsData.length));
      const row = Math.floor(index / columns);
      const col = index % columns;
      const spacing = 350;
      
      return {
        x: (col * spacing) + 100,
        y: (row * spacing) + 100,
        vx: 0,
        vy: 0
      };
    });
    setPositions(initialPositions);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const animate = () => {
      setPositions(prevPositions => 
        prevPositions.map((pos, i) => {
          if (isDragging === i) return pos;
          
          // Apply friction and update position
          const newVx = pos.vx * friction;
          const newVy = pos.vy * friction;
          
          // Only update if there's significant movement
          if (Math.abs(newVx) < 0.01 && Math.abs(newVy) < 0.01) {
            return { ...pos, vx: 0, vy: 0 };
          }

          const newX = pos.x + newVx;
          const newY = pos.y + newVy;

          // Bounce off walls with more dampening
          const width = 300;
          const height = 200;
          let finalX = newX;
          let finalY = newY;
          let finalVx = newVx;
          let finalVy = newVy;

          if (newX < 0) {
            finalX = 0;
            finalVx = Math.abs(newVx) * 0.3;
          } else if (newX > window.innerWidth - width) {
            finalX = window.innerWidth - width;
            finalVx = -Math.abs(newVx) * 0.3;
          }

          if (newY < 0) {
            finalY = 0;
            finalVy = Math.abs(newVy) * 0.3;
          } else if (newY > window.innerHeight - height) {
            finalY = window.innerHeight - height;
            finalVy = -Math.abs(newVy) * 0.3;
          }

          return {
            x: finalX,
            y: finalY,
            vx: finalVx,
            vy: finalVy
          };
        })
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, isInitialized, friction]);

  const handleMouseDown = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (e.button !== 0) return; // Only handle left click
    setIsDragging(index);
    setDragStart({
      x: e.clientX - positions[index].x,
      y: e.clientY - positions[index].y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging === null) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    setPositions(prev => prev.map((pos, i) => {
      if (i !== isDragging) return pos;
      return {
        ...pos,
        x: newX,
        y: newY,
        vx: e.movementX,
        vy: e.movementY
      };
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(null);
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
    <div 
      className="min-h-screen bg-white text-black overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
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
            <nav className="flex gap-8 text-black">
              <Link href="/projects/experimental" className="hover:opacity-50 transition-opacity duration-200">All Projects</Link>
              <Link href="/projects/draggable" className="hover:opacity-50 transition-opacity duration-200">Draggable</Link>
              <Link href="/about" className="hover:opacity-50 transition-opacity duration-200">About</Link>
              <Link href="/about" className="hover:opacity-50 transition-opacity duration-200">Contact</Link>
            </nav>
          </div>

          {/* Draggable Projects */}
          <div className="relative min-h-[calc(100vh-200px)]" ref={projectsRef}>
            {projectsData.map((project, index) => (
              <div
                key={project.id}
                className={`absolute w-[300px] cursor-move select-none group
                  ${isDragging === index ? 'z-50' : 'z-0'}`}
                style={{
                  transform: `translate(${positions[index]?.x ?? 0}px, ${positions[index]?.y ?? 0}px)`,
                  transition: isDragging === index ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
                onMouseDown={(e) => handleMouseDown(index, e)}
              >
                <div className="aspect-[3/2] relative bg-gray-100 overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <div className="mt-2 flex items-center gap-2 group-hover:opacity-50 transition-opacity duration-200">
                  {getProjectIcon(project.type)}
                  <span className="text-[14px] font-light">{project.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 