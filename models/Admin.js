
import mongoose from "mongoose";


const AuthAdminSchema = new mongoose.Schema({
  username: String,
  password: String,

});

// ✅ Capitalize model name (convention: singular)
const AdminModel = mongoose.model("Admin", AuthAdminSchema);

export default AdminModel;
