
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-primary text-brand-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-brand-light">LUXE</h3>
            <p className="mt-4 text-sm text-gray-400">High-performance gear for the modern explorer.</p>
          </div>
          <div>
            <h4 className="font-semibold text-brand-light">Shop</h4>
            <ul className="mt-4 space-y-2">
              <li><Link to="/products?category=Apparel" className="text-sm text-gray-400 hover:text-brand-light">Apparel</Link></li>
              <li><Link to="/products?category=Outerwear" className="text-sm text-gray-400 hover:text-brand-light">Outerwear</Link></li>
              <li><Link to="/products?category=Footwear" className="text-sm text-gray-400 hover:text-brand-light">Footwear</Link></li>
              <li><Link to="/products?category=Accessories" className="text-sm text-gray-400 hover:text-brand-light">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-brand-light">Support</h4>
            <ul className="mt-4 space-y-2">
              <li><Link to="/contact" className="text-sm text-gray-400 hover:text-brand-light">Contact Us</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-400 hover:text-brand-light">FAQ</Link></li>
              <li><Link to="/shipping" className="text-sm text-gray-400 hover:text-brand-light">Shipping & Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-brand-light">Stay Connected</h4>
            <p className="mt-4 text-sm text-gray-400">Get the latest updates and offers.</p>
            <div className="mt-4 flex">
              <input type="email" placeholder="Enter your email" className="w-full px-3 py-2 text-sm text-brand-primary bg-brand-light border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-accent" />
              <button className="px-4 py-2 bg-brand-accent text-brand-light font-semibold rounded-r-md hover:bg-opacity-80 transition">Sign Up</button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">&copy; {year} Luxe Performance. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Social icons here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
