
import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const HomePage: React.FC = () => {
    const { products, loading } = useProducts({
        searchTerm: '',
        category: 'all',
        priceRange: [0, 1000],
        sortBy: 'featured'
    });
    
    const featuredProducts = products.slice(0, 4);

    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-brand-primary text-brand-light rounded-lg overflow-hidden mb-12">
                <img 
                    src="https://picsum.photos/id/431/1600/600" 
                    alt="Hero" 
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="relative container mx-auto px-6 py-24 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Engineered for Excellence</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">Discover high-performance gear designed to push your limits. Unmatched quality, innovative design.</p>
                    <Link 
                        to="/products" 
                        className="mt-8 inline-block bg-brand-accent text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-80 transition-transform transform hover:scale-105"
                    >
                        Shop Now
                    </Link>
                </div>
            </section>

            {/* Featured Products Section */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default HomePage;
