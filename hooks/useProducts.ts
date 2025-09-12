
import { useState, useEffect, useMemo } from 'react';
import { mockProducts } from '../data/mockData';
import type { Product } from '../types';

interface Filters {
  searchTerm: string;
  category: string;
  priceRange: [number, number];
  sortBy: string;
}

export const useProducts = (filters: Filters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = () => {
      try {
        setLoading(true);
        // Simulate network delay
        setTimeout(() => {
          setProducts(mockProducts);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search term filtering
    if (filters.searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Category filtering
    if (filters.category && filters.category !== 'all') {
      result = result.filter(p => p.category === filters.category);
    }

    // Price range filtering
    result = result.filter(p => p.basePrice >= filters.priceRange[0] && p.basePrice <= filters.priceRange[1]);

    // Sorting
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // 'featured' or default
        // Assuming mock data is already somewhat ordered by relevance
        break;
    }

    return result;
  }, [products, filters]);

  return { products: filteredProducts, loading, error, allProducts: products };
};
