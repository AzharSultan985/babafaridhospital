import express from "express"
import handleindoorMed from './routes/IndoorMedRoute.js';

import cors from "cors";

//  Middleware
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());


app.get("/", (req, res) => {
    res.send("server done"); // fixed
});
app.use("/api/addindoormed", handleindoorMed);


const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
