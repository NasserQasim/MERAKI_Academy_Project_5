import "./App.css";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./component/Header/Header";
import Register from "./component/Register/register";
import Products from "./component/getAllProducts/getAllProducts";
import NewProduct from "./component/createNewProduct/createNewProduct";
import Login from "./component/Login/login";

function App() {
  return (
    <div className="App">
      <Header />
      <input
        placeholder="search"
        className="search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></input>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/NewProduct" element={<NewProduct />} />
        <Route path="/login" element={<Login />} />

      </Routes>
      ;
    </div>
  );
}

export default App;
