import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import SkeletonCard from '../components/SkeletonCard';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    searchTerm: searchParams.get('search') || '',
    category: searchParams.get('category') || 'all',
    priceRange: [0, Number(searchParams.get('price')) || 200] as [number, number],
    sortBy: searchParams.get('sort') || 'featured',
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.searchTerm) params.set('search', filters.searchTerm);
    if (filters.category !== 'all') params.set('category', filters.category);
    if (filters.priceRange[1] < maxPrice) params.set('price', filters.priceRange[1].toString());
    if (filters.sortBy !== 'featured') params.set('sort', filters.sortBy);
    setSearchParams(params);
  }, [filters]);

  const { products, loading, allProducts } = useProducts(filters);

  const handleFilterChange = <K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const categories = useMemo(() => {
    const cats = allProducts.map(p => p.category);
    return [...new Set(cats)];
  }, [allProducts]);
  
  const maxPrice = useMemo(() => {
      if (allProducts.length === 0) return 200;
      return Math.ceil(Math.max(...allProducts.map(p => p.basePrice)) / 10) * 10;
  }, [allProducts]);
  
  useEffect(() => {
      handleFilterChange('priceRange', [0, maxPrice]);
  }, [maxPrice]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
      <FilterSidebar 
        categories={categories}
        filters={filters}
        onFilterChange={handleFilterChange}
        maxPrice={maxPrice}
      />
      <div className="flex-1">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {filters.searchTerm ? `Searching for "${filters.searchTerm}"` : "Shop Products"}
          </h1>
          <span className="text-sm text-gray-500">{!loading ? `${products.length} results` : 'Loading...'}</span>
        </div>
        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold">No products found</h2>
            <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;