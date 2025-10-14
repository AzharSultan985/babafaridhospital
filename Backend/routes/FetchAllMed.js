import IndoorMedModel from "../models/indoorMedDb.js";

const Fetchallmed = async (req, res) => {
  try {
    const { start, end } = req.query;
    let filter = {};

    // Determine the date range
    if (start && end) {
      filter.date = { $gte: new Date(start), $lt: new Date(end) };
    } else {
      // Default: current month
      const now = new Date();
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      filter.date = { $gte: currentMonthStart, $lt: nextMonthStart };
    }

    // Fetch medicines for the requested range
    let meds = await IndoorMedModel.find(filter).sort({ date: -1 });

    // If no medicines found, fallback to last month
    if (meds.length === 0) {
      const now = new Date();
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      const lastMonthFilter = { date: { $gte: lastMonthStart, $lt: currentMonthStart } };
      meds = await IndoorMedModel.find(lastMonthFilter).sort({ date: -1 });
    }

    res.status(200).json(meds);
  } catch (err) {
    console.error("Error fetching medicines:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export default Fetchallmed;
