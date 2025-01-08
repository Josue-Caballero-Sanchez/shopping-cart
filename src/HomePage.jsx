import { useState } from 'react'
import React, { Component } from 'react';
import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';
import { Link } from "react-router-dom";
import Header from './Header';
import './HomePage.css'

function App() {
  return (
    <>
      <Header />

      <div className="main-container">
        <div>
          <div className="info-container">
            <h1>Fake Store</h1>
            <br />
            <p>This is not a commercial project. You can't buy any products here and all of the prices are 
              generated to imitate a real shop.
            </p>
            <br />
            <p>
              Enjoy! &#128516;
            </p>
          </div>

          <div className="bottom-container">
            <a href="https://github.com/Josue-Caballero-Sanchez" target="_blank" className="button">
              GitHub
            </a>

            <a href="https://fakestoreapi.com/" target="_blank" className="button">
              FakeStore API
            </a>
          </div>
        </div>
        

        <div className="sections-container">
            <h2>Categories</h2>
            <Link className="button" to="mensClothing">Men's Clothing</Link>
            <Link className="button" to="womensClothing">Women's Clothing</Link>
            <Link className="button" to="jewelery">Jewelery</Link>
            <Link className="button" to="electronics">Electronics</Link>
            <Link className="button" to="allProducts">AllProducts</Link>
        </div>
      </div>
    </>
  )
}

export default App
