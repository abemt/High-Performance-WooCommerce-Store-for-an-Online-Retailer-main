
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types';

const CartItemRow: React.FC<{ item: CartItem; onUpdate: (id: string, qty: number) => void; onRemove: (id: string) => void; }> = ({ item, onUpdate, onRemove }) => (
    <div className="flex items-center py-4 border-b">
        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
        <div className="ml-4 flex-grow">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.attributes.color}, {item.attributes.size}</p>
            <button onClick={() => onRemove(item.variantId)} className="text-xs text-red-500 hover:underline mt-1">Remove</button>
        </div>
        <div className="w-24">
            <input 
                type="number"
                value={item.quantity}
                onChange={(e) => onUpdate(item.variantId, parseInt(e.target.value))}
                className="w-16 p-1 border rounded-md text-center"
                min="1"
            />
        </div>
        <div className="w-24 text-right font-semibold">
            ${(item.price * item.quantity).toFixed(2)}
        </div>
    </div>
);


const CartPage: React.FC = () => {
    const { cartItems, updateQuantity, removeFromCart, subtotal, itemCount } = useCart();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            {cartItems.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="hidden sm:flex items-center pb-4 border-b text-sm font-semibold text-gray-500">
                                <div className="flex-grow ml-28">Product</div>
                                <div className="w-24">Quantity</div>
                                <div className="w-24 text-right">Total</div>
                            </div>
                            {cartItems.map(item => (
                                <CartItemRow 
                                    key={item.variantId} 
                                    item={item} 
                                    onUpdate={updateQuantity} 
                                    onRemove={removeFromCart} 
                                />
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold border-b pb-4">Order Summary</h2>
                            <div className="flex justify-between items-center py-4">
                                <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                                <span className="font-semibold">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center py-4 border-t">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-lg font-bold">${subtotal.toFixed(2)}</span>
                            </div>
                            <Link to="/checkout">
                                <button className="w-full bg-brand-accent text-white font-bold py-3 px-4 rounded-md hover:bg-opacity-80 transition mt-4">
                                    Proceed to Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                    <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                    <p className="text-gray-500 mt-2">Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/products" className="mt-6 inline-block bg-brand-primary text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition">
                        Start Shopping
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartPage;
