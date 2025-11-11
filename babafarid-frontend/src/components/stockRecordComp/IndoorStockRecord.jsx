import React, { useContext, useEffect, useState } from "react";
import { StaffIndoorMedCotext } from "../../StaffMangment/staffContext/StaffIndoorcontext";

const IndoorStockRecord = () => {
  const [startmonth, setStartmonth] = useState("");
  const [endmonth, setEndmonth] = useState("");
  const { FetchIndoorStockRecord, IndoorStock_Record } = useContext(StaffIndoorMedCotext);

  useEffect(() => {
    FetchIndoorStockRecord(startmonth, endmonth);
  }, [startmonth, endmonth, FetchIndoorStockRecord]);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Indoor Stock Record
      </h1>

      {/* Filter Section */}
      <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-700">Start Month:</label>
          <input
            type="month"
            value={startmonth}
            onChange={(e) => setStartmonth(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-700">End Month:</label>
          <input
            type="month"
            value={endmonth}
            onChange={(e) => setEndmonth(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-blue-100 sticky top-0 text-gray-800">
            <tr>
              <th className="py-3 px-6 text-left font-semibold">Medicine Name</th>
              <th className="py-3 px-6 text-left font-semibold">Company</th>
              <th className="py-3 px-6 text-center font-semibold">Total/Quantity</th>
              <th className="py-3 px-6 text-center font-semibold">Remaining</th>
            </tr>
          </thead>

          <tbody>
            {IndoorStock_Record && IndoorStock_Record.length > 0 ? (
              IndoorStock_Record.map((item, index) => (
                <tr
                  key={item._id || index}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition-colors`}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {item.Medname}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {item.company}
                  </td>
                  <td className="py-3 px-6 text-center">{item.quntity}</td>
                  <td className="py-3 px-6 text-center">{item.current}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 font-medium"
                >
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

export default IndoorStockRecord;
