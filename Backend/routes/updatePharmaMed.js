import express from "express";
import PharmacyModel from "../models/PharmaMed.js";

const router = express.Router();


    router.post("/updatepharmamed/:id", async(req, res) => {
        const {    updateMedname,
updateMedcompany,
   updatequntity,
 updateavailable,
 updateunitprice,
  updateboxprice,
   updateexpdate } = req.body;
    const { id } = req.params;

if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }
     // Dynamically create update object
  const updateData = {};
  if (updateMedname) updateData.PharmaMedname = updateMedname;
  if (updateMedcompany) updateData.PharmaMedcompany = updateMedcompany;
  if (updatequntity) updateData.TotalTablets = updatequntity;
  if (updateavailable) updateData.available = updateavailable;
  if (updateunitprice) updateData.PricePerMed = updateunitprice;
  if (updateboxprice) updateData.PharmaMedprice = updateboxprice;
  if (updateexpdate) updateData.PharmaMedexpireDate = updateexpdate;

   const updatedatares = await PharmacyModel.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true } // return updated document
    );

if(updatedatares){
 res.status(200).send({
  success: true,
  message: "Medicine update successfully",
});

  //console.log.log("update successfully");

}
})



export default router;
