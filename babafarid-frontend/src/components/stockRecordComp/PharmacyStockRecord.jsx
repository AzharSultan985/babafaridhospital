import React, { useContext, useEffect, useState } from "react";
import { StaffIndoorMedCotext } from "../../StaffMangment/staffContext/StaffIndoorcontext";


const IndoorStock_Reocord = () => {
  const [startmonth, setStartmonth] = useState("");
  const [endmonth, setEndmonth] = useState("");
  const {FetchIndoorStockRecord,IndoorStock_Record} =useContext(StaffIndoorMedCotext)
  

  // ✅ Automatically fetch data when component loads or filters change
useEffect(() => {
  const fetchData = async () => {
   FetchIndoorStockRecord(startmonth,endmonth)

  };

  fetchData();
}, [startmonth, endmonth, FetchIndoorStockRecord]);




  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Indoor Stock Record
      </h1>

      {/* Date Range Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <div>
          <label className="font-semibold mr-2">Start Month:</label>
          <input
            type="month"
            value={startmonth}
            onChange={(e) => setStartmonth(e.target.value)}
            className="border px-2 py-1 rounded-lg"
          />
        </div>
        <div>
          <label className="font-semibold mr-2">End Month:</label>
          <input
            type="month"
            value={endmonth}
            onChange={(e) => setEndmonth(e.target.value)}
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
      {IndoorStock_Record && IndoorStock_Record.length > 0 ? (
        IndoorStock_Record.map((item, index) => (
          <tr
            key={item._id || index}
            className={`border-t ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-blue-50 transition`}
          >
            <td className="py-2 px-4">{index + 1}</td>
       
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
            No Indoor Stock found for the selected month range.
          </td>
        </tr>
      )}
    </tbody>

   
  </table>
</div>

    </div>
  );
};

export default IndoorStock_Reocord;
