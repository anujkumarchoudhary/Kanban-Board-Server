import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  tac: { type: Boolean, required: true },
});

export default mongoose.model("Auth", schema);
