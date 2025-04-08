import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Artist from "./pages/Artist";
import Songs from "./pages/Songs";
import Albums from "./pages/Albums";
import './Styles.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist" element={<Artist />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/albums" element={<Albums />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
