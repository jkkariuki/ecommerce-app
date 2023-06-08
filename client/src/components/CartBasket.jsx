import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
// import { checkout } from "../APICalls";
import React from "react";
import { checkout } from "../APICalls";

function CartBasket(props) {
  const { cartItems, onAdd, onRemove, onDelete } = props;
  const [redirect, setRedirect] = useState("");
  const navigate = useNavigate();
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  return (
    <div>
      <div>{cartItems.length === 0 && <div>Cart is Empty</div>}</div>
      {cartItems.map((item) => (
        <div key={item.id} className="row">
          <div className="col-6">{item.title}</div>
          <div className="col-3">
            <button onClick={() => onRemove(item)} className="remove">
              -
            </button>{" "}
            <button onClick={() => onAdd(item)} className="add">
              +
            </button>
            <button onClick={() => onDelete(item)} className="add">
              Delete
            </button>
          </div>
          <div className="col-3 text-right">
            <span>
              {item.qty} x ${item.price.toFixed(2)}
            </span>
          </div>
        </div>
      ))}
      {cartItems.length !== 0 && (
        <>
          <hr></hr>
          <div className="row">
            <div className="col-2">Items Price</div>
            <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
          </div>
          <div className="row">
            <div className="col-2">Tax Price</div>
            <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
          </div>
          <div className="row">
            <div className="col-2">Shipping Price</div>
            <div className="col-1 text-right">${shippingPrice.toFixed(2)}</div>
          </div>

          <div className="row">
            <div className="col-2">
              <strong>Total Price</strong>
            </div>
            <div className="col-1 text-right">
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
          </div>
          <hr />
          <div className="row">
            <button onClick={checkout(cartItems)}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartBasket;
