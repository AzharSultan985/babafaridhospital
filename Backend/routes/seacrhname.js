// controllers/SearchName.js
import IndoorMedModel from "../models/indoorMedDb.js";

const SearchName = async (req, res) => {
  try {
    const { name } = req.params;
    // //console.log.log("Received Med name:", name);

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

 const data = await IndoorMedModel.find({
      Medname: { $regex: name, $options: "i" }
    }).limit(10); // limit results for performance

    return res.json({ success: true, data });
  } catch (err) {
    //console.log.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export default SearchName;
