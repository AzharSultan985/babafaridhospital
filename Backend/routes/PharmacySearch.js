import PharmacyModel from "../models/PharmaMed.js";

const SearchPharmaMedName = async (req, res) => {
  try {
    const { pharmaMedname } = req.params;

    if (!pharmaMedname) {
      return res.status(400).json({ error: "Medicine name is required" });
    }

    // 🔹 Get current month start & end dates
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    // 🔹 Search only medicines created in the current month
    const data = await PharmacyModel.find({
      PharmaMedname: { $regex: pharmaMedname, $options: "i" },
      date: { $gte: startOfMonth, $lt: endOfMonth } // only current month
    }).limit(10);

    return res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export default SearchPharmaMedName;
