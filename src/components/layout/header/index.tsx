import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar";

const Header = () => {
  return (
    <header className="px-8 py-4 flex items-center justify-center">
      <Navbar />
    </header>
  );
};

export default Header;
