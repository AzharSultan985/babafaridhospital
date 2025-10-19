import React, { useEffect, useState } from "react";
import { usePharmacy } from "../ContextPharma/PharmaContext";

const PharmacyReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { FetchInvoicesReport, InvoiceReport } = usePharmacy();
//console.log("InvoiceReport",InvoiceReport);

  // ✅ Automatically fetch data when component loads or filters change
useEffect(() => {
  const today = new Date().toISOString().split("T")[0];

  const fetchData = async () => {
    if (!startDate && !endDate) {
      await FetchInvoicesReport(today, today);
    } else {
      await FetchInvoicesReport(startDate || today, endDate || today);
    }
  };

  fetchData();
}, [startDate, endDate, FetchInvoicesReport]);


// ✅ Calculate totals safely
const grossTotal = InvoiceReport.reduce(
  (acc, item) => acc + (item.BillData?.Total || 0),
  0
);
const netTotal = InvoiceReport.reduce(
  (acc, item) => acc + (item.BillData?.NetTotal || 0),
  0
);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Pharmacy Sales Report
      </h1>

      {/* Date Range Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <div>
          <label className="font-semibold mr-2">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded-lg"
          />
        </div>
        <div>
          <label className="font-semibold mr-2">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded-lg"
          />
        </div>
      </div>

      {/* Table */}
     <div className="overflow-auto max-h-[500px] shadow-lg rounded-lg bg-white">
  <table className="min-w-full border-collapse">
    <thead className="bg-gray-200 sticky top-0">
      <tr>
        <th className="py-2 px-4 text-left font-semibold">#</th>
        <th className="py-2 px-4 text-left font-semibold">Invoice ID</th>
        <th className="py-2 px-4 text-center font-semibold">Date</th>
        <th className="py-2 px-4 text-right font-semibold">Gross Total</th>
        <th className="py-2 px-4 text-right font-semibold">Discount</th>
        <th className="py-2 px-4 text-right font-semibold">Net Total</th>
      </tr>
    </thead>

    <tbody>
      {InvoiceReport && InvoiceReport.length > 0 ? (
        InvoiceReport.map((item, index) => (
          <tr
            key={item._id || index}
            className={`border-t ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-blue-50 transition`}
          >
            <td className="py-2 px-4">{index + 1}</td>
          <td className="py-2 px-4 flex items-center gap-2">
  {item.InvoiceID}
  {item.status === "Updated" && (
    <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
      Updated
    </span>
  )}
</td>

            <td className="py-2 px-4 text-center">
              {new Date(item.createdAt).toLocaleDateString()}
            </td>
            
            <td className="py-2 px-4 text-right">
              {(item.BillData?.Total || 0).toFixed(2)}
            </td>
            <td className="py-2 px-4 text-right">
              {(item.BillData?.DicountRate || 0).toFixed(2)}
            </td>
            <td className="py-2 px-4 text-right">
              {(item.BillData?.NetTotal || 0).toFixed(2)}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" className="text-center py-4 text-gray-500 font-medium">
            No invoices found for the selected date range.
          </td>
        </tr>
      )}
    </tbody>

    <tfoot className="bg-gray-100 sticky mt-4 bottom-0 border-t-2">
      
      <tr className="mt-4">
        <td></td>
       
        <td colSpan={4} className="py-2 px-4 font-bold text-right">
          Gross Total:
        </td>
        <td className="py-2 px-4 text-right font-bold">{grossTotal.toFixed(2)}</td>
        <td></td>
      </tr>

      <tr>
        <td></td>

        <td colSpan={4} className="py-2 px-4 font-bold text-right">
          Net Total:
        </td>
        <td className="py-2 px-4 text-right font-bold">{netTotal.toFixed(2)}</td>
        <td></td>
      </tr>
    </tfoot>
  </table>
</div>

    </div>
  );
};

export default PharmacyReport;
