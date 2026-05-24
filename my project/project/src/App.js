import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Cart from "./pages/Cart"; 

const initialPlants = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    price: 25,
    img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500",
    isBought: false,
  },
  {
    id: 2,
    name: "Snake Plant",
    price: 18,
    img: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=500",
    isBought: false,
  },
  {
    id: 3,
    name: "Fiddle Leaf Fig",
    price: 35,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4lmvLDoqlHYrgDzgp6FE8jAaZX03p4DiZso0HDCNgQwnLVf0pGlUn9tgfoZm2k-xBW2i7Vv7h-uq8GfWsCjLjCiXvgaiJn7WKyfqMX3QV&s=10",
    isBought: false,
  },
  {
    id: 4,
    name: "Desert Cactus",
    price: 12,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRVpy38rbZTTU_fI-ahLBPvSzQn-GUfzWfDFzTJDHrGFubpra2aBXs2ic&s",
    isBought: false,
  },
];

function App() {
  const [plants, setPlants] = useState(initialPlants);

  const handleBuy = (id) => {
    setPlants(
      plants.map((plant) =>
        plant.id === id ? { ...plant, isBought: true } : plant,
      ),
    );
  };

  const handleRemove = (id) => {
    setPlants(
      plants.map((plant) =>
        plant.id === id ? { ...plant, isBought: false } : plant,
      ),
    );
  };

  return (
    <Router>
      <Navbar plants={plants} />{" "}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/shop"
          element={<Shop plants={plants} onBuy={handleBuy} />}
        />
        <Route path="/login" element={<Login />} />

        <Route
          path="/cart"
          element={<Cart plants={plants} onRemove={handleRemove} />}
        />
      </Routes>
    </Router>
  );
}
export default App;