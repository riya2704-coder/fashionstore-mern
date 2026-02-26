import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Registration";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Category from "./Pages/Category";
import Blog from "./Pages/Blog";
import Contact from "./Pages/Contact";
import Footer from "./Components/Footer";


export default function App() {
  return (
    <BrowserRouter>
       <ToastContainer position="top-right" theme="colored" />
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/category" element={<Category />} />
         <Route path="/blog" element={<Blog/>} />
          <Route path="/contact" element={<Contact/>} />
        
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/logout" element={<h1 className="p-6 text-3xl">Logout Successful</h1>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
