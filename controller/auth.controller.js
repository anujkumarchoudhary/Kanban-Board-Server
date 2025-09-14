import mongoose from "mongoose";
import Auth from "../model/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { name, phone, email, password, role, tac } = req.body;

  try {
    const user = await Auth.findOne({ email });

    if (user) {
      return res.status(401).json({ status: 401, message: "User exit" });
    }
    const hatchedPass = await bcrypt.hash(password, 10);
    const newUser = new Auth({
      password: hatchedPass,
      name,
      phone,
      email,
      role,
      tac,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ status: 201, message: "User Register successfully!" });
  } catch (error) {
    console.log("error", error);
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res
        .status(404)
        .json({ status: 401, message: "Credential not valid" });
    }

    const token = await jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_CODE,
      { expiresIn: "7d" }
    );

    return res
      .status(200)
      .json({ status: 200, message: "Login successfully!", token });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ status: 500, message: "internal server error" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await Auth.find();

    return res.status(200).json({ message: "all users", data: users });
  } catch (error) {
    console.log("error", error);
  }
};

export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Obj Id" });
    }

    const user = await Auth.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(201)
      .json({ message: "User Register successfully!", user });
  } catch (error) {
    console.log("error", error);
  }
};

export const updateUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Auth.find();

    return res
      .status(201)
      .json({ message: "User Register successfully!", user });
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Auth.find();

    return res
      .status(201)
      .json({ message: "User Register successfully!", user });
  } catch (error) {
    console.log("error", error);
  }
};
