
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Navigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process payment via Stripe
    console.log('Processing order...');
    setTimeout(() => {
        setIsOrderPlaced(true);
        clearCart();
    }, 1500);
  };
  
  if (cartItems.length === 0 && !isOrderPlaced) {
      return <Navigate to="/cart" replace />;
  }

  if (isOrderPlaced) {
      return (
        <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-green-600">Thank You!</h1>
            <p className="mt-4 text-lg">Your order has been placed successfully.</p>
            <p className="text-gray-600">A confirmation email will be sent to you shortly.</p>
        </div>
      )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h1 className="text-2xl font-bold mb-6">Shipping & Payment</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Shipping Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" required className="p-3 border rounded-md" />
              <input type="text" placeholder="Last Name" required className="p-3 border rounded-md" />
              <input type="email" placeholder="Email Address" required className="p-3 border rounded-md sm:col-span-2" />
              <input type="text" placeholder="Address" required className="p-3 border rounded-md sm:col-span-2" />
              <input type="text" placeholder="City" required className="p-3 border rounded-md" />
              <input type="text" placeholder="State / Province" required className="p-3 border rounded-md" />
              <input type="text" placeholder="Zip / Postal Code" required className="p-3 border rounded-md" />
              <input type="text" placeholder="Country" required className="p-3 border rounded-md" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">Payment Details (Mock)</h2>
             <div className="space-y-4">
                <input type="text" placeholder="Card Number" defaultValue="4242 4242 4242 4242" required className="p-3 border rounded-md w-full" />
                <div className="grid grid-cols-3 gap-4">
                    <input type="text" placeholder="MM / YY" defaultValue="12 / 28" required className="p-3 border rounded-md" />
                    <input type="text" placeholder="CVC" defaultValue="123" required className="p-3 border rounded-md" />
                </div>
            </div>
          </div>
          <button type="submit" className="w-full bg-brand-accent text-white font-bold py-4 px-4 rounded-md hover:bg-opacity-80 transition">
            Place Order
          </button>
        </form>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold border-b pb-4 mb-4">Order Summary</h2>
        <div className="space-y-4">
            {cartItems.map(item => (
                <div key={item.variantId} className="flex justify-between items-start">
                    <div className="flex">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                        <div className="ml-4">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.attributes.color}, {item.attributes.size} x {item.quantity}</p>
                        </div>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            ))}
        </div>
        <div className="border-t mt-6 pt-4 space-y-2">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>FREE</span></div>
            <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
