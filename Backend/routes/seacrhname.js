import IndoorMedModel from "../models/indoorMedDb.js";

const SearchName = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    // 🔹 Get start and end of current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    // 🔹 Search only in current month medicines
    const data = await IndoorMedModel.find({
      Medname: { $regex: name, $options: "i" },
      date: { $gte: startOfMonth, $lt: endOfMonth }  // filter by current month
    }).limit(10);

    return res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export default SearchName;
