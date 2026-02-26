import User from "../Model/AuthModel.js";
import bcrypt from "bcryptjs";

// REGISTER
export const UserRegistration = async (req, res) => {
  const { firstName, lastName, email, password, newsletter, agree } = req.body;

  try {
    if (!firstName || !lastName || !email || !password || agree !== true) {
      return res.status(400).json({
        success: false,
        message: "All fields are required and Terms must be accepted",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      newsletter: newsletter || false,
      agree: true,
    });

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = newUser._doc;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// LOGIN
export const UserLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user._doc;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
