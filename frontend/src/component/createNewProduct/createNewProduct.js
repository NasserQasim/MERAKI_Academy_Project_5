import axios from "axios";
import React, { useState, useEffect } from "react";
import "./createNewProduct.css";

import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const createNewProduct = () => {
    axios
      .post(
        "http://localhost:5000/product/",
        { title, description, price, image, category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  ////////////////////////////////////////////cloudinary////////////////////////////////

  return (
    <div>
      <input
        placeholder="title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>
      <input
        placeholder="description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <input
        placeholder="Price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      ></input>
      <input
        placeholder="ImageURL"
        onChange={(e) => {
          setImage(e.target.value);
        }}
      ></input>
      <input
        placeholder="Category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      ></input>
      <button onClick={createNewProduct} className="create">
        Create Product
      </button>
      <p>{message}</p>
    </div>
  );
};

export default NewProduct;
