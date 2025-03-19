'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { FilterOption } from '@/app/page';

export default function ProjectFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentFilter = searchParams.get('filter') || 'all';

  function handleFilter(filter: FilterOption) {
    const params = new URLSearchParams(searchParams);
    if (filter === 'all') {
      params.delete('filter');
    } else {
      params.set('filter', filter);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-4 justify-center text-white/70">
      <button
        onClick={() => handleFilter('all')}
        className={`hover:text-white transition-colors duration-200 ${currentFilter === 'all' ? 'text-white' : ''}`}
      >
        ⬜ All
      </button>
      <button
        onClick={() => handleFilter('book')}
        className={`hover:text-white transition-colors duration-200 ${currentFilter === 'book' ? 'text-white' : ''}`}
      >
        📖 Books
      </button>
      <button
        onClick={() => handleFilter('signage')}
        className={`hover:text-white transition-colors duration-200 ${currentFilter === 'signage' ? 'text-white' : ''}`}
      >
        🏷️ Signage
      </button>
    </div>
  );
} 