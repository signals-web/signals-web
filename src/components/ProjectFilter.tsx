'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterOption } from '@/app/page';
import { cn } from '@/lib/utils';
import { BookOpenText, Flag } from 'lucide-react';

const filters: { label: string; value: FilterOption }[] = [
  { label: 'All', value: 'all' },
  { label: 'Books', value: 'book' },
  { label: 'Signage', value: 'signage' },
  { label: 'Featured', value: 'featured' },
  { label: 'Recent', value: 'recent' },
];

export default function ProjectFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = (searchParams.get('filter') as FilterOption) || 'all';

  const handleFilterChange = (filter: FilterOption) => {
    router.push(`/?filter=${filter}`);
  };

  return (
    <div className="flex gap-4 justify-end">
      {filters.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => handleFilterChange(value)}
          className={`px-4 py-2 rounded-full transition-colors duration-200 ${
            currentFilter === value
              ? 'bg-black text-white'
              : 'hover:bg-black/10'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
} 