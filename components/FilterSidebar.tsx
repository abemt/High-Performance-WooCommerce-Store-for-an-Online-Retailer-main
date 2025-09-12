
import React from 'react';

interface FilterSidebarProps {
  categories: string[];
  filters: {
    category: string;
    priceRange: [number, number];
    sortBy: string;
  };
  onFilterChange: <K extends keyof FilterSidebarProps['filters']>(key: K, value: FilterSidebarProps['filters'][K]) => void;
  maxPrice: number;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ categories, filters, onFilterChange, maxPrice }) => {
  return (
    <aside className="w-full lg:w-64 xl:w-72 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Category</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onFilterChange('category', 'all')}
              className={`text-left w-full transition-colors ${filters.category === 'all' ? 'text-brand-accent font-semibold' : 'text-gray-600 hover:text-brand-primary'}`}
            >
              All
            </button>
          </li>
          {categories.map(cat => (
            <li key={cat}>
              <button
                onClick={() => onFilterChange('category', cat)}
                className={`text-left w-full transition-colors ${filters.category === cat ? 'text-brand-accent font-semibold' : 'text-gray-600 hover:text-brand-primary'}`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={filters.priceRange[1]}
            onChange={(e) => onFilterChange('priceRange', [0, Number(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-accent"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Sort By</h3>
        <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
        >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;
