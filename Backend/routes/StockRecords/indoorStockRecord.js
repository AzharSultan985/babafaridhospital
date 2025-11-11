import IndoorMedRecordModel from "../../models/IndoorMedRecords.js";

const FetchIndoorStockRecord = async (req, res) => {
  try {
    const { start, end } = req.query;
    let startDate, endDate;

    if (start && end) {
      // Convert "YYYY-MM" → date range
      const [startYear, startMonth] = start.split("-").map(Number);
      const [endYear, endMonth] = end.split("-").map(Number);

      startDate = new Date(startYear, startMonth - 1, 1);
      endDate = new Date(endYear, endMonth, 1); // next month start
    } else if (start && !end) {
      const [year, month] = start.split("-").map(Number);
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 1);
    } else {
      // Default → current month range
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }

    // ✅ Filter by medicine "date" (not createdAt)
    const filter = {
      date: { $gte: startDate, $lt: endDate },
    };

    const records = await IndoorMedRecordModel.find(filter).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    ////console.error("❌ Error fetching indoor stock:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching indoor stock records.",
    });
  }
};

export default FetchIndoorStockRecord;
