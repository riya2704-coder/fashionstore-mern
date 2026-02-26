import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    newsletter: false,
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/Registration",
        form
      );

      console.log(response.data);
      toast.success("Account created successfully! Redirecting...", {
        autoClose: 1500,
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      toast.error("Registration Failed!");
      console.log(err);
    }
  };

  return (
   <div className="min-h-screen bg-[#faf6f8] flex flex-col items-center pt-10 px-4">
  <div className="text-sm text-gray-500 mb-1">
    Home / <span className="text-purple-700 font-semibold">Register</span>
  </div>

  <h1 className="text-3xl sm:text-4xl font-semibold text-[#6e003b] mb-10 text-center">
    Register
  </h1>

  <div className="bg-white w-full max-w-xl sm:max-w-2xl rounded-3xl p-6 sm:p-10 shadow-[0_0_60px_rgba(0,0,0,0.08)]
    transform hover:scale-[1.02] transition-all duration-500 animate-fadeUp"
  >
    <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#6e003b]">
      Create Your Account
    </h2>
    <p className="text-center text-gray-500 mt-1 mb-8 sm:mb-10 px-2 sm:px-0">
      Sign up to start shopping and enjoy exclusive offers
    </p>

    <form onSubmit={handleSubmit}>
      {/* FIRST + LAST NAME */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
        <div>
          <label className="font-medium text-sm">First Name</label>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            placeholder="John"
            className="w-full mt-1 p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>

        <div>
          <label className="font-medium text-sm">Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            placeholder="Doe"
            className="w-full mt-1 p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>
      </div>

      {/* EMAIL */}
      <label className="font-medium text-sm">Email Address</label>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="you@example.com"
        className="w-full mt-1 p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-600 mb-5"
        required
      />

      {/* PASSWORD */}
      <label className="font-medium text-sm">Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          onChange={handleChange}
          placeholder="At least 8 characters"
          className="w-full mt-1 p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-600"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-4 text-gray-500"
        >
          👁
        </button>
      </div>

      {/* CONFIRM PASSWORD */}
      <label className="font-medium text-sm mt-4">Confirm Password</label>
      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          onChange={handleChange}
          placeholder="Repeat your password"
          className="w-full mt-1 p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-600"
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-4 text-gray-500"
        >
          👁
        </button>
      </div>

      {/* CHECKBOXES */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-4">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" name="newsletter" onChange={handleChange} />
          Subscribe to newsletter
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-700 mt-2 sm:mt-0">
          <input type="checkbox" name="agree" onChange={handleChange} required />
          I agree to Terms & Privacy Policy
        </label>
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-[#7b0046] text-white py-3 rounded-lg text-lg font-semibold 
        transition transform hover:scale-[1.03] hover:bg-[#95005a] active:scale-95"
      >
        Create Account
      </button>

      <p className="text-center text-sm text-gray-600 mt-5">
        Already have an account?
        <a href="/login" className="text-purple-700 font-semibold hover:underline">
          {" "}Sign in
        </a>
      </p>
    </form>
  </div>
</div>
)}