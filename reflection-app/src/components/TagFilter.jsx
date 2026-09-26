import React from 'react';

export default function TagFilter({ currentFilter, onSelectFilter }) {
  const categories = ['すべて', 'POSSE・開発', '大学・学業', 'プライベート'];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((cat) => {
        const isActive = currentFilter === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              isActive
                ? 'bg-slate-800 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}