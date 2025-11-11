import IndoorMedModel from "../models/indoorMedDb.js";

const SearchName = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    // 🔹 Search only in current month medicines
    const data = await IndoorMedModel.find({
      Medname: { $regex: name, $options: "i" },}).limit(10);

    return res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export default SearchName;
