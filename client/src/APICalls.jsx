import { useEffect } from "react";
import axios from "axios";

export const getAllProducts = async () => {
  let response;

  try {
    response = await axios.get("https://dummyjson.com/products");
    console.log(response);
    return response;
  } catch (e) {
    // catch error
    throw new Error(e.message);
  }
};

export const getProductsByCategory = async (category) => {
  let response;

  try {
    response = await axios.get(
      "https://dummyjson.com/products/category/" + category
    );
    console.log(response);
    return response;
  } catch (e) {
    // catch error
    throw new Error(e.message);
  }
};

export const getProductById = async (id) => {
  let response;
  console.log(id);
  try {
    response = await axios.get("https://dummyjson.com/products/" + id);
    console.log(id);
    return response;
  } catch (e) {
    // catch error
    throw new Error(e.message);
  }
};

export const checkout = async (cartItems) => {
  console.log(cartItems);

  await fetch("/checkout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items: cartItems }),
  })
    .then((response) => {
      // console.log(response);
      return JSON.parse(response.json());
    })
    .then((response) => {
      window.location.assign(response.url);
    });
};
