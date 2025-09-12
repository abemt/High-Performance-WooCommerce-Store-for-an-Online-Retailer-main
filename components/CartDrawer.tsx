import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { X, Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const CartDrawer: React.FC = () => {
    const { isCartDrawerOpen, closeCartDrawer } = useUI();
    const { cartItems, subtotal, updateQuantity, removeFromCart, itemCount } = useCart();

    return (
        <AnimatePresence>
            {isCartDrawerOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeCartDrawer}
                    aria-modal="true"
                    role="dialog"
                >
                    <motion.div
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col"
                        initial={{ x: '100%' }}
                        animate={{ x: '0%' }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <header className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-xl font-bold">Your Cart ({itemCount})</h2>
                            <button onClick={closeCartDrawer} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close cart">
                                <X size={24} />
                            </button>
                        </header>

                        {cartItems.length > 0 ? (
                            <>
                                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                                    {cartItems.map(item => (
                                        <div key={item.variantId} className="flex items-start gap-4">
                                            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                                            <div className="flex-grow">
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <p className="text-sm text-gray-500">{item.attributes.color}, {item.attributes.size}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="p-1 border rounded-full hover:bg-gray-100"><Minus size={16}/></button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="p-1 border rounded-full hover:bg-gray-100"><Plus size={16}/></button>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                                <button onClick={() => removeFromCart(item.variantId)} className="text-xs text-red-500 hover:underline mt-1">Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <footer className="p-4 border-t space-y-4 bg-gray-50">
                                    <div className="flex justify-between font-semibold">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div className="flex gap-4">
                                        <Link to="/cart" onClick={closeCartDrawer} className="flex-1 text-center py-3 px-4 border border-brand-primary rounded-md font-bold hover:bg-gray-100 transition">View Cart</Link>
                                        <Link to="/checkout" onClick={closeCartDrawer} className="flex-1 text-center py-3 px-4 bg-brand-accent text-white rounded-md font-bold hover:bg-opacity-80 transition">Checkout</Link>
                                    </div>
                                </footer>
                            </>
                        ) : (
                             <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                                <h3 className="text-xl font-semibold">Your cart is empty</h3>
                                <p className="text-gray-500 mt-2">Add items to see them here.</p>
                                <Link to="/products" onClick={closeCartDrawer} className="mt-6 bg-brand-primary text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition">
                                    Continue Shopping
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;