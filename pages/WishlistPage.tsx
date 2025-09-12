import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const WishlistPage: React.FC = () => {
    const { wishlistItems } = useWishlist();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
            {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {wishlistItems.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                    <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
                    <p className="text-gray-500 mt-2">Explore our products and save your favorites.</p>
                    <Link to="/products" className="mt-6 inline-block bg-brand-primary text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition">
                        Find Products
                    </Link>
                </div>
            )}
        </div>
    );
};

export default WishlistPage;