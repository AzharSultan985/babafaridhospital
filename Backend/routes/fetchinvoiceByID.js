import InvoiceModel from "../models/InvoiceModel.js";

const FetchInvoiceByID = async (req, res) => {
  try {
    const { InvoiceID } = req.query;

    if (!InvoiceID) {
      return res.status(400).json({ success: false, message: "InvoiceID is required." });
    }
//console.log("InvoiceID",InvoiceID);

    // Fetch invoice by InvoiceID
    const invoice = await InvoiceModel.find({ InvoiceID: Number(InvoiceID) }); // Make sure type matches DB

    if (!invoice || invoice.length === 0) {
      return res.status(404).json({ success: false, message: "Invoice not found." });
    }
//console.log("invoice");

    res.status(200).json({
      success: true,
      count: invoice.length,
      data: invoice,
    });
  } catch (error) {
    //console.error("❌ Error fetching invoices:", error);
    res.status(500).json({ success: false, message: "Server error while fetching data." });
  }
};

export default FetchInvoiceByID;
