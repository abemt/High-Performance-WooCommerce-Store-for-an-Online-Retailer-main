import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { Product } from '../types';
import StarRating from './StarRating';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addToWishlist(product);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`} className="group block overflow-hidden">
        <div className="relative">
          <div className="overflow-hidden rounded-lg aspect-[4/5]">
            <motion.img
              src={product.defaultImage}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
          <button 
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 p-2 bg-white/70 backdrop-blur-sm rounded-full text-brand-primary hover:bg-white transition-colors z-10"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
          </button>
        </div>
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-1">{product.category}</p>
          <h3 className="text-base font-semibold text-brand-primary group-hover:text-brand-accent transition-colors">{product.name}</h3>
          <div className="flex items-center mt-1">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-500 ml-2">({product.reviewCount})</span>
          </div>
          <p className="text-lg font-bold text-brand-primary mt-2">${product.basePrice.toFixed(2)}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;