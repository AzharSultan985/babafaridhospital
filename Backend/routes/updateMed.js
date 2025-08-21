import express from "express";
import IndoorMedModel from "../models/indoorMedDb.js";
const router = express.Router();


    router.post("/updatemed/:id", async(req, res) => {
        const { updateMedname,updateMedcompany,updatequntity,updatecurrent, updateexpdate } = req.body;
    const { id } = req.params;

if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }
     // Dynamically create update object
  const updateData = {};
  if (updateMedname) updateData.Medname = updateMedname;
  if (updateMedcompany) updateData.company = updateMedcompany;
  if (updatequntity) updateData.quntity = updatequntity;
  if (updatecurrent) updateData.current = updatecurrent;
  if (updateexpdate) updateData.expdate = updateexpdate;

   const updatedatares = await IndoorMedModel.findOneAndUpdate(
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
