import IndoorMedModel from "../models/indoorMedDb.js";

const Fetchallmed = async (req, res) => {
  try {
    const meds = await IndoorMedModel.find();
    res.status(200).json(meds);
  } catch (err) {
    console.error("Error fetching medicines:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export default Fetchallmed;
