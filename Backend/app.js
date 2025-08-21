import express from "express";
import handleindoorMed from './routes/IndoorMedRoute.js';
import updateIndoorMed from "./routes/updateMed.js"
import connectDB from "./models/db.js";
import cors from 'cors';
import Fetchallmed from "./routes/FetchAllMed.js";
import DelMedById from "./routes/delmed.js";
import EditMedId from "./routes/editmed.js";
import SearchName from "./routes/seacrhname.js";
import handleAdmin from "./routes/AuthAdmin.js";
import IndoorStaffAuth from "./routes/indoorstaffAuth.js";
import UpdateCurrentMedd from "./routes/UsedMEd.js";
import cookieParser from "cookie-parser";
import DefaultUsercreated from "./routes/defaultusercreated.js";


const app = express();

app.use(express.json());
app.use(cookieParser())


// Connect DB
connectDB();

// CORS


const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000" // dev
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // postman/curl
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS policy block"), false);
    }
    return callback(null, true);
  },
  credentials: true
}));


// Delete by ID

// Routes
app.get("/", (req, res) => {
  res.send("server done");
});
app.use("/api/", handleindoorMed);
// update MEd data
app.use("/api/",updateIndoorMed );
// update Used MEd data
app.use("/api/",UpdateCurrentMedd );
// Auth
app.use("/api/",handleAdmin );
// StaffAuth
app.use("/api/",IndoorStaffAuth );


app.use("/api", DefaultUsercreated);



app.get("/api/fetchallmed", Fetchallmed);
app.get("/api/delmed/:id", DelMedById); // ✅ Correct method
app.get("/api/edit/:id", EditMedId); // ✅ Correct method
app.get("/api/searchbyname/:name", SearchName); // ✅ Correct method

// logout
app.post("/api/logout", (req, res) => {
  res.clearCookie("adminToken"); // or your session cookie name
  res.json({ message: "Logged out" });
});
// LogoutIndoor
app.post("/api/LogoutIndoor", (req, res) => {
  res.clearCookie("S_I_token"); // or your session cookie name
  res.json({ message: "Logged out" });
});


// Server
const PORT = 3002;
app.listen(PORT, () => {
  //console.log.log(`Server is running on port ${PORT}`);
});
