import PharmacyModel from "../models/PharmaMed.js";


const EditPharmaMedId = async(req, res)=>{
  try {
    const { id } = req.params;
    //console.log.log("Received Edit Med ID:", id);

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const data = await PharmacyModel.findOne({ _id: id });

    if (!data) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ data });
  } catch (err) {
    //console.log.error(err);
    res.status(500).json({ error: err.message });
  }

}
export default EditPharmaMedId