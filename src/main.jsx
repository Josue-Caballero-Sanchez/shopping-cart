import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from './CartContext';
import './index.css'
import App from "./HomePage"
import MensClothing from './MensClothingPage';
import WomensClothing from './WomensClothingPage';
import Jewelery from './JeweleryPage';
import Electronics from './ElectronicsPage';
import AllProducts from './AllProductsPage';
import ItemDetails from './ItemDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "mensClothing",
    element: <MensClothing />,
  },
  {
    path: "womensClothing",
    element: <WomensClothing />,
  },
  {
    path: "jewelery",
    element: <Jewelery />,
  },
  {
    path: "electronics",
    element: <Electronics />,
  },
  {
    path: "allProducts",
    element: <AllProducts />,
  },
  {
    path: "item/:id", 
    element: <ItemDetails />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
);
