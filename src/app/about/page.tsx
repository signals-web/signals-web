'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[#ea384c] text-white">
      <div className="px-6 md:px-12 pt-8">
        <div className="max-w-7xl mx-auto">
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
              <Link href="/about" className="hover:text-white/70 transition-colors duration-200">About</Link>
              <Link href="/about" className="hover:text-white/70 transition-colors duration-200">Contact</Link>
            </nav>
          </div>
          
          <div className="mb-16">
            <h1 className="text-[36px] font-light mb-6 underline">
              Signals is a communication design studio.
            </h1>
            <p className="text-[36px] font-light max-w-3xl leading-tight">
              We appreciate the power of graphic design and experiential and interpretive signage in 
              celebrating the built landscape. Signals amplifies this focus with an emphasis on 
              wayfinding, book development and design, and interpretive and experiential graphics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 