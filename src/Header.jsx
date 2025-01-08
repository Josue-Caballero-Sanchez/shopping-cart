import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';
import './Header.css'; 
import { useCart } from './CartContext';
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, removeFromCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isClickingResult, setIsClickingResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts([]);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(results);
    }
  }, [searchQuery, products]);

  useEffect(() => {
    setSearchQuery('');
  }, [location]);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const handleBlur = () => {
    if (!isClickingResult) {
      setSearchQuery('');
    }
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="brand-link">Fake Store</Link>
        <div className="search-container">
          <input 
            type="text" 
            name="query" 
            placeholder="Search..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            onBlur={handleBlur}
          />
          {searchQuery && (
            <div 
              className="search-results" 
              onMouseDown={() => setIsClickingResult(true)}
              onMouseUp={() => setIsClickingResult(false)}
            >
              {loading ? (
                <p className="search-state-text">Loading...</p>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/item/${product.id}`}
                    className="search-result-item"
                  >
                    <img src={product.image} alt={product.title} />
                    <span>{product.title}</span>
                  </Link>
                ))
              ) : (
                <p className="search-state-text">No results found.</p> 
              )}
            </div>
          )}
        </div>
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
