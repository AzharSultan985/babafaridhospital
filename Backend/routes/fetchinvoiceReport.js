import InvoiceModel from "../models/InvoiceModel.js";

const FetchInvoiceReports = async (req, res) => {
  try {
    const { start, end } = req.query;
    let filter = {};

    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      endDate.setHours(23, 59, 59, 999);
      filter.createdAt = { $gte: startDate, $lte: endDate };
    } else if (start && !end) {
      const startDate = new Date(start);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      filter.createdAt = { $gte: startDate, $lte: today };
    } else {
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      filter.createdAt = { $gte: monthStart, $lt: nextMonthStart };
    }

    const invoices = await InvoiceModel.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices,
    });
  } catch (error) {
    //console.error("❌ Error fetching invoices:", error);
    res.status(500).json({ success: false, message: "Server error while fetching data." });
  }
};

export default FetchInvoiceReports;
