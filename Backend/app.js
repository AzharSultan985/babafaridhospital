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
  import AddPharmacyMed from "./routes/pharmacyAddMed.js";
  import FetchPharmacyMEd from "./routes/fetchPharmacyMed.js";
  import SearchPharmaMedName from "./routes/PharmacySearch.js";
  import setMedQuntityAfterInvoice from "./routes/SetPharmaMedInvoice.js";
  import pharmacylogin from "./routes/pharmaAuth.js";
  import dotenv from "dotenv";
  import path from "path";
  import { fileURLToPath } from "url";
  import EditPharmaMedId from "./routes/fetchpharmaMedForEdit.js";
  import UpdatePharmaMed from "./routes/updatePharmaMed.js";
  import DelpharmaMedById from "./routes/DelpharmacyMed.js";

  // addnewstockindoorMEd
  import addnewstockindoorMEd from "./routes/addnewStockIndoorMed.js";
  // addnewstockpharmacyMEd
  import addnewstockpharmacyMEd from "./routes/addstockphramacyMed.js";

// fecth last month med for phamra
  import FetchLastMonthPharmaMed from "./routes/fetchLastMonthPharmaMed.js";
// fecth last month med for indoor
  import FetchLastMonthindoorMed from "./routes/fetchlastmonthindoorMed.js";
import InvoiceRoute from "./routes/SaveInvoice.js";
import FetchInvoiceReports from "./routes/fetchinvoiceReport.js";
import FetchInvoiceByID from "./routes/fetchinvoiceByID.js";
import UpdateInvoiceData from "./routes/updateInvoiceData.js";
import checkInvoiceID from "./routes/checkInvoiceID.js";


  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const frontendBuildPath = path.join(__dirname, "build");

  dotenv.config({ path: path.join(__dirname, ".env") }); // ✅ always load Backend/.env

  const app = express();

  app.use(express.json());
  app.use(cookieParser())
  app.use(express.static(frontendBuildPath));

    // Connect DB
  connectDB();


  // CORS
  app.use(cors({
    origin: "http://localhost:3000", // frontend origin
    credentials: true, // allow cookies / auth headers
  }));


  // // Serve frontend build





  // Delete by ID

  // Routes

  app.use("/api/", handleindoorMed);
  // update MEd data
  app.use("/api/",updateIndoorMed );
  // update Used MEd data
  app.use("/api/",UpdateCurrentMedd );
  // Auth
  app.use("/api/",handleAdmin );
  // StaffAuth
  app.use("/api/",IndoorStaffAuth );
  // StaffAuth
  app.use("/api/", AddPharmacyMed);
  // Pharmacy MEddicine set after invoice 
  app.use("/api/", setMedQuntityAfterInvoice);
  // Pharmacy Login check 
  app.use("/api/", pharmacylogin);


  app.use("/api", DefaultUsercreated);


// handle new stock indoor medicine   
  app.use("/api",addnewstockindoorMEd );
// handle new stock pharmacy medicine   
  app.use("/api",addnewstockpharmacyMEd );
// saveinvoice 
app.use("/api", InvoiceRoute);



  app.get("/api/fetchallmed", Fetchallmed);
  app.delete("/api/delmed/:id", DelMedById); // ✅ Correct method
  app.delete("/api/delpharmamed/:id",DelpharmaMedById ); // ✅ pahramacy med delete
  app.get("/api/edit/:id", EditMedId); // ✅ Correct method
  app.get("/api/fetchpharmamededit/:id",EditPharmaMedId ); // ✅ phrma fetch med with id  method
  app.get("/api/searchbyname/:name", SearchName); // ✅ Correct method
  // search rout of pharmacy
  app.get("/api/searchpharmacymed/:pharmaMedname", SearchPharmaMedName);
  // fetchpharmacymed
  app.use("/api/",FetchPharmacyMEd ); // ✅ fetch med pharma method
  // fetchlastmonthpharmacymed
  app.use("/api/",FetchLastMonthPharmaMed ); // ✅ fetch med pharma method
  // fetchlastmonth indoor med
  app.use("/api/",FetchLastMonthindoorMed ); // ✅ fetch med pharma method
  // update pharma med
  app.use("/api/",UpdatePharmaMed ); // ✅ update med pharma method
  // update invoice data
  app.use("/api/",UpdateInvoiceData ); // ✅ update med pharma method





app.use("/api", checkInvoiceID);









// fetch invoices 
   app.get("/api/fetchinvoicesreport/", FetchInvoiceReports); 
// fetch invoices  by id 
   app.get("/api/fetchinvoicesbyid/", FetchInvoiceByID); 
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
  // pharmacy Logout
  app.post("/api/pharmalogout", (req, res) => {
    res.clearCookie("pharmacyToken"); // or your session cookie name
    res.json({ message: "Logged out" });
  });
  // Serve frontend files directly from React's `public` folder
  // Catch-all for React SPA routing
//  app.get(/^\/(?!api).*/, (req, res) => {
//   res.sendFile(path.join(frontendBuildPath, "index.html"));
// });
  // Server
  const PORT = 3002;
  app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);


  });
