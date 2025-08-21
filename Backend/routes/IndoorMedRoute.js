import express from "express";
import IndoorMedModel from "../models/indoorMedDb.js";

const router = express.Router();

router.post("/addindoormed", async(req, res) => {

 const { Medname,company, quntity,current, expdate } = req.body;
  if (!Medname || !quntity || !expdate) {
    return res.status(400).json({ error: "Missing required fields" });
  }
const data = await IndoorMedModel.create({ Medname,company, quntity,current, expdate})
if(data){
 res.status(200).send({
  success: true,
  message: "Medicine Added successfully",
});

 ////console.log.log("added successfully");
  
}

});

export default router;
