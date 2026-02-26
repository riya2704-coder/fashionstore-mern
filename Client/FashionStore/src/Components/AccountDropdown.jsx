import { useState } from "react";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Login from "../Pages/Login";
import { useNavigate } from "react-router-dom";

export default function AccountDropdown()  {
  const [open, setOpen] = useState();
  const navigate = useNavigate();


  return (
    <div className="relative">
      {/* ACCOUNT BUTTON */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer px-4 py-2  hover:text-pink-700 transition "
      >
        <PersonOutlineOutlinedIcon className="text-gray-700  hover:text-pink-700" />
        <span className="font-medium">Account</span>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 top-14 w-80 bg-white shadow-xl rounded-xl overflow-hidden z-20 animate-fadeIn">
          
          {/* HEADING */}
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Welcome to FashionStore
            </h3>
            <p className="text-sm text-gray-500">
              Access account & manage orders
            </p>
          </div>

          {/* MENU ITEMS */}
          <div className="p-4 space-y-4 text-gray-700">
            <div className="flex items-center gap-3 cursor-pointer hover:text-pink-700">
              <AccountCircleOutlinedIcon />
              <span>My Profile</span>
            </div>

            <div className="flex items-center gap-3 cursor-pointer hover:text-pink-700">
              <ShoppingBagOutlinedIcon />
              <span>My Orders</span>
            </div>

            <div className="flex items-center gap-3 cursor-pointer hover:text-pink-700">
              <FavoriteBorderOutlinedIcon />
              <span>My Wishlist</span>
            </div>

            <div className="flex items-center gap-3 cursor-pointer hover:text-pink-700">
              <KeyboardReturnOutlinedIcon />
              <span>Returns & Refunds</span>
            </div>

            <div className="flex items-center gap-3 cursor-pointer hover:text-pink-700">
              <SettingsOutlinedIcon />
              <span>Settings</span>
            </div>
          </div>

          {/* SIGN IN BUTTONS */}
          <div className="px-4 py-6 border-t flex flex-col gap-3">
            <button 
             onClick={() => navigate("/login")}
            className="border border-pink-700 text-pink-700 hover:bg-pink-800 hover:text-white py-3 rounded-full font-semibold">
              Sign In
            </button>
            <button 
             onClick={() => navigate("/register")}
            className="border border-pink-700 text-pink-700  hover:bg-pink-800 hover:text-white font-semibold py-3 rounded-full">
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
