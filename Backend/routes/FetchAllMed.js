import IndoorMedModel from "../models/indoorMedDb.js";

const Fetchallmed = async (req, res) => {
  try {
    const { start, end } = req.query;
    let filter = {};

    if (start && end) {
      // Agar start & end query mile
      filter.date = { $gte: new Date(start), $lt: new Date(end) };
    } else {
      // Default: current month
      const now = new Date();
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      filter.date = { $gte: currentMonthStart, $lt: nextMonthStart };
    }

    const meds = await IndoorMedModel.find(filter).sort({ date: -1 });
    res.status(200).json(meds);
  } catch (err) {
    //console.log.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export default Fetchallmed;
