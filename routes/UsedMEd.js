import express from "express";
import IndoorMedModel from "../models/indoorMedDb.js";
const router = express.Router();


    router.post("/usedmed/:id", async(req, res) => {
        const { updateUsedMed ,currentquntityMed} = req.body;
    const { id } = req.params;


if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }
     // Dynamically create update object
  
 

  if (currentquntityMed>= updateUsedMed) {
    
      const  finalCurrentMed = currentquntityMed - updateUsedMed
//console.log.log("final ",finalCurrentMed);

   const updatedatares = await IndoorMedModel.findOneAndUpdate(
      { _id: id },
      { current: finalCurrentMed },
      { new: true } // return updated document
    );

if(updatedatares){
 res.status(200).send({
  success: true,
  message: "Medicine update successfully",
});

//   //console.log.log("update successfully");

}

  }else{
     res.status(200).send({
  success: true,
  message: "Required Medicine Should be lesser then Availible",
});
}





})



export default router;
