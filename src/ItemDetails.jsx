import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { Link } from "react-router-dom";
import "./ItemDetails.css";
import { useCart } from './CartContext';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, addToCart, isItemInCart } = useCart();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => setItem(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

    function handleAddToCartClick(item) {
        addToCart(item);
    }

  if (loading) return <p className="indicator-text">Loading...</p>;
  if (error) return <p className="indicator-text">Error: {error.message}</p>;

  return (
    <>
      <Header />
      <div className="item-details-container">
        <img src={item.image} alt={item.title} />
        <div>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <p><strong>Price:</strong> ${item.price}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Rating:</strong> {item.rating.rate} ({item.rating.count} reviews)</p>

            <button 
            onClick={() => {
                handleAddToCartClick(item);
            }}
            disabled={isItemInCart(item)}
            >
                
                {isItemInCart(item) ? "✔ Added" : "Add to cart +"}
            </button>
        </div>
        
      </div>
    </>
  );
};

export default ItemDetails;