import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';
import './Header.css'; 
import { useCart } from './CartContext';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, removeFromCart } = useCart();
  
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <header>
        <nav className="navbar">
            <a href="#">Fake Store</a>
            <input type="text" name="query" placeholder="Search..." />
            <Icon 
            className="cart-icon" 
            path={mdiCartOutline} 
            title="Cart" 
            size={2} 
            onClick={toggleCart} 
            style={{ cursor: 'pointer' }} 
            />
        </nav>

        <div className={`cart-popup ${isCartOpen ? 'open' : ''}`}>
            <div className="cart-header">
                <h3>Shopping Cart</h3>
                <h3>{cart.length} items</h3>
                <button onClick={toggleCart} className="close-btn">X</button>
            </div>
                <div className="cart-items">
                    {cart.length > 0 ? (
                        cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h4>{item.title}</h4>
                                <p>${item.price}</p>
                                <button onClick={() => removeFromCart(item.id)}>remove</button>
                            </div>
                        </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
                {cart.length > 0 && (
                    <div className="cart-total">
                        <h4>Total: ${totalPrice}</h4>
                    </div>
                )}
        </div>
    </header>
  );
};

export default Header;