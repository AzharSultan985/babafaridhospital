// controllers/SearchName.js
import PharmacyModel from "../models/PharmaMed.js";

const SearchPharmaMedName = async (req, res) => {
  try {

    const { pharmaMedname } = req.params;
    // console.log("🔎 Received Med name:", pharmaMedname);

    if (!pharmaMedname) {
      return res.status(400).json({ error: "Name is required" });
    }

 const data = await PharmacyModel.find({
      PharmaMedname: { $regex: pharmaMedname, $options: "i" }
    }).limit(10); // limit results for performance

    return res.json({ success: true, data });
  } catch (err) {
    //console.log.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export default SearchPharmaMedName;
