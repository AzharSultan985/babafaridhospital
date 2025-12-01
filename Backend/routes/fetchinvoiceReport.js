import InvoiceModel from "../models/InvoiceModel.js";

const FetchInvoiceReports = async (req, res) => {
  try {
    const { start, end } = req.query;
    let filter = {};

    if (start && end) {
      // Normal date range - start of start date to end of end date
      const startDate = new Date(start);
      startDate.setHours(0, 0, 0, 0); // Start of the day
      
      const endDate = new Date(end);
      endDate.setHours(23, 59, 59, 999); // End of the day

      filter.createdAt = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    else if (start && !end) {
      // Single day - from start of day to end of day
      const startDate = new Date(start);
      startDate.setHours(0, 0, 0, 0); // Start of the day
      
      const endDate = new Date(start);
      endDate.setHours(23, 59, 59, 999); // End of the day

      filter.createdAt = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    else {
      // Default: current month (normal calendar month)
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
      const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);

      filter.createdAt = { 
        $gte: monthStart, 
        $lt: nextMonthStart 
      };
    }

    const invoices = await InvoiceModel.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices,
    });

  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while fetching data." 
    });
  }
};

export default FetchInvoiceReports;