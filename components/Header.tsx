import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useUI } from '../context/UIContext';
import { ShoppingBag, Heart, Search } from 'lucide-react';

const Header: React.FC = () => {
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { openCartDrawer } = useUI();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-brand-accent ${isActive ? 'text-brand-accent' : 'text-brand-primary'}`;

  return (
    <header className="sticky top-0 bg-brand-light/80 backdrop-blur-md border-b border-gray-200 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-brand-primary">
              LUXE
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/products" className={navLinkClass}>Shop</NavLink>
          </nav>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-32 lg:w-48 pl-4 pr-10 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
              />
              <button type="submit" className="absolute right-0 top-0 mt-2 mr-3">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>
            <Link to="/wishlist" className="relative p-2 text-brand-primary hover:text-brand-accent transition-colors">
              <Heart className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-brand-accent text-white text-xs flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button onClick={openCartDrawer} className="relative p-2 text-brand-primary hover:text-brand-accent transition-colors">
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-brand-accent text-white text-xs flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;