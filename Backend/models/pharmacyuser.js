import mongoose from "mongoose";

const PharmacyUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  role: { type: String, default: "pharmacy" },
  createdAt: { type: Date, default: Date.now }
});

const PharmacyUser = mongoose.model("PharmacyUser", PharmacyUserSchema);
export default PharmacyUser;
