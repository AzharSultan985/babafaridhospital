import InvoiceModel from "../models/InvoiceModel.js";

const FetchInvoiceReports = async (req, res) => {
  try {
    const { start, end } = req.query;
    let filter = {};

    // Helper: Convert normal date into 7pm-day-start
    const getSevenPMStart = (dateString) => {
      const d = new Date(dateString);
      d.setHours(19, 0, 0, 0); // 7 PM same day
      return d;
    };

    // Helper: Convert normal date into next-day 6:59 PM end
    const getSevenPMEnd = (dateString) => {
      const d = new Date(dateString);
      d.setDate(d.getDate() + 1); // next day
      d.setHours(18, 59, 59, 999); // 6:59 PM
      return d;
    };

    if (start && end) {
      filter.createdAt = {
        $gte: getSevenPMStart(start),
        $lte: getSevenPMEnd(end),
      };
    }

    else if (start && !end) {
      filter.createdAt = {
        $gte: getSevenPMStart(start),
        $lte: getSevenPMEnd(start),
      };
    }

    else {
      // Default: current month (but using 7 PM boundaries)
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1, 19, 0, 0, 0);
      const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1, 19, 0, 0, 0);

      filter.createdAt = { $gte: monthStart, $lt: nextMonthStart };
    }

    const invoices = await InvoiceModel.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error while fetching data." });
  }
};

export default FetchInvoiceReports;
