import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      
      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* LOGO & ABOUT */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Fashion<span className="text-pink-600">Store</span>
          </h2>
          <p className="text-sm leading-6">
            Discover the latest trends in fashion and shop your favorite styles.
            Quality products at the best prices.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <FacebookIcon className="cursor-pointer hover:text-pink-500 transition duration-300" />
            <InstagramIcon className="cursor-pointer hover:text-pink-500 transition duration-300" />
            <TwitterIcon className="cursor-pointer hover:text-pink-500 transition duration-300" />
            <YouTubeIcon className="cursor-pointer hover:text-pink-500 transition duration-300" />
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-pink-500">Home</Link></li>
            <li><Link to="/about" className="hover:text-pink-500">About</Link></li>
            <li><Link to="/products" className="hover:text-pink-500">Products</Link></li>
            <li><Link to="/contact" className="hover:text-pink-500">Contact</Link></li>
          </ul>
        </div>

        {/* CUSTOMER SERVICE */}
        <div>
          <h3 className="text-white font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/cart" className="hover:text-pink-500">Cart</Link></li>
            <li><Link to="/checkout" className="hover:text-pink-500">Checkout</Link></li>
            <li><Link to="/wishlist" className="hover:text-pink-500">Wishlist</Link></li>
            <li><Link to="/faq" className="hover:text-pink-500">FAQs</Link></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-white font-semibold mb-4">Subscribe</h3>
          <p className="text-sm mb-4">
            Get updates about new products and special offers.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 rounded-l-md text-black outline-none"
            />
            <button className="bg-pink-600 px-4 py-2 rounded-r-md text-white hover:bg-pink-700 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM FOOTER ================= */}
      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} FashionStore. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;