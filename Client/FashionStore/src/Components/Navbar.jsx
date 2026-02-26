import React, { useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountDropdown from "./AccountDropdown";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Category", path: "/category" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* ================= TOP HEADER ================= */}
      <div className="sticky top-0 z-50 bg-white w-full flex items-center justify-between px-4 md:px-8 py-4 border-b">

        {/* LOGO */}
        <Link to="/" className="text-2xl md:text-3xl font-semibold">
          <span className="text-gray-800">Fashion</span>
          <span className="text-pink-900 font-bold">Store</span>
        </Link>

        {/* SEARCH BAR (Desktop Only) */}
        <div className="hidden md:flex w-[40%] border rounded-md overflow-hidden">
          <input
            className="flex-1 p-2 md:p-3 outline-none"
            placeholder="Search for products..."
          />
          <button className="bg-pink-900 text-white w-[50px] flex items-center justify-center">
            <SearchOutlinedIcon />
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 md:gap-8 text-gray-700">

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-6">
            <AccountDropdown />

            <Link to="/wishlist" className="flex items-center gap-1 cursor-pointer">
              <FavoriteBorderOutlinedIcon />
              <span>Wishlist</span>
              <span className="bg-pink-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </Link>

            <Link to="/cart" className="flex items-center gap-1 cursor-pointer">
              <LocalGroceryStoreOutlinedIcon />
              <span>Cart</span>
              <span className="bg-pink-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </div>
        </div>
      </div>

      {/* ================= DESKTOP MENU ================= */}
      <div className="hidden md:flex gap-10 items-center justify-center py-4 text-gray-800 font-semibold">
        {menuItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className="group relative cursor-pointer px-3 py-1
            transition-all duration-300 ease-in-out
            hover:text-pink-800 hover:scale-110"
          >
            <span>{item.name}</span>

            <span
              className="absolute left-0 -bottom-1 h-0.5 w-0 bg-pink-600
              transition-all duration-300 ease-in-out
              group-hover:w-full"
            ></span>
          </Link>
        ))}
      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 py-4 border-b bg-white shadow-md">

          {/* Mobile Search */}
          <div className="flex border rounded-md overflow-hidden">
            <input
              className="flex-1 p-2 outline-none"
              placeholder="Search..."
            />
            <button className="bg-pink-900 text-white w-[50px] flex items-center justify-center">
              <SearchOutlinedIcon />
            </button>
          </div>

          {/* Mobile Links */}
          {menuItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              onClick={() => setMenuOpen(false)}
              className="font-medium hover:text-pink-800"
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile Icons */}
          <div className="flex gap-6 pt-2">
            <Link to="/wishlist" className="flex items-center gap-1">
              <FavoriteBorderOutlinedIcon />
              <span>Wishlist</span>
            </Link>

            <Link to="/cart" className="flex items-center gap-1">
              <LocalGroceryStoreOutlinedIcon />
              <span>Cart</span>
            </Link>
          </div>
        </div>
      )}

      {/* ================= OFFER LINE ================= */}
      <div className="bg-pink-900 text-pink-100 h-8 flex items-center justify-center text-xs md:text-sm font-medium text-center px-2">
        20% off on your first order : Use code ABC123
      </div>
    </>
  );
};

export default Navbar;