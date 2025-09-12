import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Minus, Plus } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import type { Product, ProductVariant } from '../types';
import StarRating from '../components/StarRating';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

type Tab = 'description' | 'specifications' | 'reviews';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [mainImage, setMainImage] = useState<string>('');

  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === id);
    if (foundProduct) {
        setProduct(foundProduct);
        const firstVariant = foundProduct.variants[0];
        setSelectedColor(firstVariant.attributes.color);
        setSelectedSize(firstVariant.attributes.size);
        setMainImage(firstVariant.image);
    }
  }, [id]);

  const selectedVariant = useMemo(() => {
    if (!product) return null;
    return product.variants.find(
        v => v.attributes.color === selectedColor && v.attributes.size === selectedSize
    ) || null;
  }, [product, selectedColor, selectedSize]);
  
  useEffect(() => {
      if (selectedVariant) {
          setMainImage(selectedVariant.image);
      }
  }, [selectedVariant]);

  const colorOptions = useMemo(() => {
    if (!product) return [];
    const colors = [...new Set(product.variants.map(v => v.attributes.color))];
    return colors.map(color => {
      const variantForColor = product.variants.find(v => v.attributes.color === color);
      return { name: color, image: variantForColor?.image || product.defaultImage };
    });
  }, [product]);

  const sizeOptions = useMemo(() => {
    if (!product || !selectedColor) return [];
    return product.variants
      .filter(v => v.attributes.color === selectedColor)
      .map(v => v.attributes.size)
      .filter((v, i, a) => a.indexOf(v) === i); // Unique sizes
  }, [product, selectedColor]);

  const handleAddToCart = () => {
    if (product && selectedVariant && quantity > 0) {
      addToCart(product, selectedVariant, quantity);
    }
  };

  if (!product) {
    return <div className="text-center py-10">Product not found.</div>;
  }
  
  const isWishlisted = isInWishlist(product.id);
  const stock = selectedVariant ? selectedVariant.stock : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
      {/* Image Gallery */}
      <div className="flex flex-col-reverse sm:flex-row gap-4">
        <div className="flex sm:flex-col gap-2 justify-center">
            {colorOptions.map(color => (
                <button key={color.name} onClick={() => { setSelectedColor(color.name); setMainImage(color.image); }} className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${selectedColor === color.name ? 'border-brand-accent' : 'border-transparent'}`}>
                    <img src={color.image} alt={color.name} className="w-full h-full object-cover" />
                </button>
            ))}
        </div>
        <div className="flex-1 aspect-square bg-gray-100 rounded-lg overflow-hidden">
           <AnimatePresence mode="wait">
              <motion.img 
                key={mainImage}
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
          </AnimatePresence>
        </div>
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
        <div className="mt-2 flex items-center">
          <StarRating rating={product.rating} />
          <span className="ml-2 text-sm text-gray-500">({product.reviewCount} reviews)</span>
        </div>
        <p className="mt-4 text-3xl font-bold text-brand-primary">${selectedVariant?.price.toFixed(2) || product.basePrice.toFixed(2)}</p>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900">Color: <span className="font-semibold">{selectedColor}</span></h3>
          <div className="flex items-center space-x-3 mt-2">
            {colorOptions.map(color => (
              <button key={color.name} onClick={() => setSelectedColor(color.name)} className={`relative rounded-full h-8 w-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent ${selectedColor === color.name ? 'ring-2 ring-offset-1 ring-brand-primary' : ''}`}>
                 <span className="sr-only">{color.name}</span>
                 <img src={color.image} alt={color.name} className="w-full h-full object-cover rounded-full" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900">Size</h3>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {sizeOptions.map(size => (
              <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${selectedSize === size ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'}`}>
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3"><Minus size={16}/></button>
                <input type="number" value={quantity} readOnly className="w-12 text-center border-none focus:ring-0" />
                <button onClick={() => setQuantity(q => Math.min(stock, q + 1))} className="p-3"><Plus size={16}/></button>
            </div>
            <button onClick={handleAddToCart} disabled={!selectedVariant || stock <= 0} className="flex-1 bg-brand-accent text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-80 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
                {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button onClick={() => addToWishlist(product)} className="p-3 border rounded-md hover:bg-gray-100 transition">
                <Heart className={`w-6 h-6 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
            </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">SKU: {selectedVariant?.sku || 'N/A'} | Stock: {stock}</div>

        {/* Tabs */}
        <div className="mt-10">
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('description')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'description' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Description</button>
                    <button onClick={() => setActiveTab('specifications')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'specifications' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Specifications</button>
                    <button onClick={() => setActiveTab('reviews')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Reviews</button>
                </nav>
            </div>
            <div className="py-6 text-sm text-gray-600">
                {activeTab === 'description' && <p>{product.description}</p>}
                {activeTab === 'specifications' && (
                    <ul className="space-y-2">
                        {product.specifications.map(spec => <li key={spec.name}><strong>{spec.name}:</strong> {spec.value}</li>)}
                    </ul>
                )}
                 {activeTab === 'reviews' && (
                    <div className="space-y-6">
                        {product.reviews.length > 0 ? product.reviews.map(review => (
                            <div key={review.id}>
                                <div className="flex items-center"><StarRating rating={review.rating} /><strong className="ml-2">{review.title}</strong></div>
                                <p className="mt-1">"{review.comment}"</p>
                                <p className="text-xs text-gray-500 mt-1">- {review.author} on {review.date}</p>
                            </div>
                        )) : <p>No reviews yet.</p>}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;