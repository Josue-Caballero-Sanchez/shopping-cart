import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';
import { useState, useEffect } from "react";
import { useCart } from './CartContext';
import "./MensClothing.css";
import Header from './Header';
import { Link } from "react-router-dom";

const getProductData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/category/men's%20clothing", { mode: "cors" })
            .then((response) => {
                if(response.status >= 400) {
                    throw new Error("server error");
                }
                return response.json();
            })
            .then((response) => setData(response))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    return { data, error, loading};
}

const MensClothing = () => {    
    const { data, error, loading } = getProductData();
    const { cart, addToCart, isItemInCart } = useCart();

    function handleAddToCartClick(item) {
        addToCart(item);
    }

    return (
      <>
        <Header />
        <div className="main-container-men">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
                <>
                {data.map((item) => (
                      
                    <Link className="item-container" to={`/item/${item.id}`} key={item.id}>  
                        <img src={item.image} alt={`${item.title} image`} />
                        <h3>{item.title}</h3>
                        <p>Rating: {item.rating.rate}</p>
                        <p>${item.price}</p>
                        <button
                            onClick={(e) => {
                                e.preventDefault(); 
                                e.stopPropagation();
                                handleAddToCartClick(item);
                            }}
                            disabled={isItemInCart(item)}
                            >
                            {isItemInCart(item) ? "✔ Added" : "Add to cart +"}
                        </button>
                    </Link>
                   
                ))}
                </>
            )}
        </div>
      </>
    );
  };
  
  export default MensClothing;