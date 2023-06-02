import React from "react";

import Navigation from "./components/Navigation";
import Home from "./Pages/Home";
import CheckoutSuccess from "./Pages/CheckoutSuccess";
import Products from "./APICalls";
import ProductCard from "./components/ProductCard";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductPage from "./Pages/ProductPage";

import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import ContactUs from "./Pages/Contact";

const cartFromLocalStorage = JSON.parse(
  localStorage.getItem("cartItems") || "[]"
);
function App() {
  const [cartItems, setCartItems] = useState(cartFromLocalStorage);

  useEffect(() => {
    console.log(cartItems);
    const json = JSON.stringify(cartItems);
    localStorage.setItem("cartItems", json);
  }, [cartItems]);

  //adding a product to the cart
  function onAdd(product) {
    //check if the added item already exists in the cart.
    const exist = cartItems.find((item) => item.id === product.id);
    console.log("EXISTSSS: " + exist);

    if (exist) {
      //if the added products exists in the cart increase the quantity by one.
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item
        )
      );
    } else {
      //if the added product is not in cart, add it to cart and set qty to 1
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  }

  function onRemove(product) {
    const exist = cartItems.find((item) => item.id === product.id);

    if (exist.qty === 1) {
      //if the cart qty of the removed product is equal to 1. Return all cartItem besides the deleted product.

      setCartItems(cartItems.filter((item) => item.id != product.id));
    } else {
      //if the cart qty of the removed product is greater than 1. Decrease the cart qty of the product by 1.
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...exist, qty: exist.qty - 1 } : item
        )
      );
    }
  }

  function onDelete(product) {
    const exist = cartItems.find((item) => item.id === product.id);

    if (exist) {
      //find the cart item and delete it from the cart regardless of qty. Return all other products
      setCartItems(cartItems.filter((item) => item.id != product.id));
    }
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation
          countCartItems={cartItems.length}
          onAdd={onAdd}
          onRemove={onRemove}
          cartItems={cartItems}
          onDelete={onDelete}
        />
        <Routes>
          <Route path="/" element={<Home onAdd={onAdd} />} />
          <Route path="/products/:id" element={<ProductPage onAdd={onAdd} />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/success" element={<CheckoutSuccess />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
