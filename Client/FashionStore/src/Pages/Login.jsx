import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // axios instance
  const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/api/auth/Login", form);

      toast.success("Login Successful!", {
        theme: "colored",
      });

      // Set timeout (example: redirect after 2 seconds)
      setTimeout(() => {
        console.log("Redirecting...");
        // window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed!", {
        theme: "colored",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#faf6f8] flex flex-col items-center pt-12">
      <ToastContainer />

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-2">
        Home / <span className="text-purple-700 font-semibold">Login</span>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-semibold text-[#6e003b] mb-10">Login</h1>

      {/* Card */}
      <div
        className="bg-white w-[430px] rounded-3xl p-10 shadow-[0_0_60px_rgba(0,0,0,0.08)]
        transform hover:scale-[1.02] transition-all duration-500 animate-fadeUp"
      >
        <h2 className="text-2xl font-semibold text-center text-[#6e003b]">
          Login
        </h2>
        <p className="text-center text-gray-500 mt-1 mb-8">
          Welcome back! Please enter your details
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <label className="font-semibold text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-lg border-gray-300
            focus:ring-2 focus:ring-purple-600 transition mb-5"
            placeholder="Enter your email"
            required
          />

          {/* Password */}
          <div className="flex justify-between items-center">
            <label className="font-semibold text-sm">Password</label>
            <button
              type="button"
              className="text-sm text-purple-700 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg border-gray-300
              focus:ring-2 focus:ring-purple-600 transition"
              placeholder="Enter your password"
              required
            />

            {/* Toggle password */}
            <button
              type="button"
              className="absolute right-3 top-4 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>

          {/* Remember */}
          <div className="flex items-center gap-2 mt-3 mb-6">
            <input type="checkbox" />
            <span className="text-sm text-gray-600">Remember for 30 days</span>
          </div>

          {/* Sign in */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7b0046] text-white py-3 rounded-lg text-lg font-semibold 
            transition transform hover:scale-[1.03] hover:bg-[#95005a] active:scale-95"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {/* Google Sign in */}
          <button
            type="button"
            className="w-full mt-4 border py-3 rounded-lg text-gray-700 font-semibold
            flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <GoogleIcon />
            Sign in with Google
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-5">
            Don't have an account?
            <a
              href="/register"
              className="text-purple-700 font-semibold hover:underline"
            >
              {" "}
              Sign up for free
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
