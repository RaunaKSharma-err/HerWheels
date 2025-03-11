import prisma from "../DB/db.config.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(fullName, email, password);

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "all feilds are required" });
  }
  try {
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "password length must be greater than 8 character" });
    }

    const user = await prisma.user.findUnique({ where: { email: email } });

    if (user) {
      return res.status(400).json({ message: "Email already exists.." });
    }

    const salt = await bycrypt.genSalt(10);
    const hashedPass = await bycrypt.hash(password, salt);

    // const newUser =
    const newUser = await prisma.user.create({
      data: { fullName: fullName, email: email, password: hashedPass },
    });
    return res.json({ msg: "everything fine" });

    if (newUser) {
      jwt.sign(
        { id: newUser.id, email: newUser.email },
        process.env.seceret_key,
        { expiresIn: "7d" }
      );

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data..." });
    }
  } catch (error) {
    console.log("Error in signup controller: " + error.message);
    res.status(501).json({ message: "internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "all feilds required" });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const isPasswordCorrect = await bycrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in login controller: " + error.message);
    res.status(501).json({ message: "internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ essage: "Logged out successfully" });
  } catch (error) {
    console.log("error in logout controller: " + error.message);
    res.status(501).json({ message: "internal server error" });
  }
};

// export const updateProfile = async (req, res) => {
//   try {
//     const { profilePic } = req.body;
//     const userId = req.user._id;

//     if (!profilePic) {
//       return res.status(400).json({ message: "Profile pic is required" });
//     }

//     const uploadResponse = await cloudinary.uploader.upload(profilePic);

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { profilePic: uploadResponse.secure_url },
//       { new: true }
//     );

//     res.status(200).json(updatedUser);
//   } catch (error) {
//     console.log("error in update profile:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller: " + error.message);
    res.status(501).json({ message: "internal server error" });
  }
};
