import React, { useRef, useState, useMemo } from "react";
import { usePharmacy } from "../Pharmacy/ContextPharma/PharmaContext";

export default function UpdateStockPharmacy() {
  const { pharmacyMed, ListOfNewStock, setListOfNewStock, UpdateNewstock_Pharmacy } = usePharmacy();
  
  const inputRefs = useRef([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Search state

  // ✅ Client-side filtering - pharmacy جیسا
  const filteredMed = useMemo(() => {
    if (!pharmacyMed || pharmacyMed.length === 0) return [];
    
    const searchLower = searchTerm.toLowerCase().trim();
    
    if (!searchLower) {
      return pharmacyMed.filter(med => med && med._id);
    }
    
    return pharmacyMed.filter(med => 
      med && 
      med._id && 
      (med.PharmaMedname?.toLowerCase().includes(searchLower) ||
       med.PharmaMedcompany?.toLowerCase().includes(searchLower))
    );
  }, [pharmacyMed, searchTerm]);

  // Add medicine to list
  const AddANewStock = (index) => {
    const rowInputs = inputRefs.current[index];
    if (!rowInputs) return;

    const newMedicine = {
      PharmaMedname: rowInputs.medname.value || "",
      PharmaMedcompany: rowInputs.company.value || "",
      PharmaMedstock: rowInputs.PharmaMedstock.value || "",
      PharmaMedTablets: rowInputs.PharmaMedTablets.value || "",
    };

    if (newMedicine.PharmaMedname && newMedicine.PharmaMedcompany && 
        newMedicine.PharmaMedstock && newMedicine.PharmaMedTablets) {
      setListOfNewStock((prev) => [...prev, newMedicine]);
      setSelectedRows((prev) => [...new Set([...prev, index])]);
    } else {
      alert("Please fill all fields before adding.");
    }
  };

  const handleOpenModal = () => {
    if (ListOfNewStock.length === 0) {
      alert("No medicines added to save.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveStack = async () => {
    try {
      await UpdateNewstock_Pharmacy();
      setIsModalOpen(false);
      setListOfNewStock([]);
      setSelectedRows([]);
    } catch (error) {
      alert("Failed to save stock. Please try again.");
    }
  };

  return (
    <>
      {/* ✅ Search Bar + Results Count - pharmacy style */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          🔄 Refill Pharmacy Medicine Stock
        </h2>

        {/* Search Bar */}
        <div className="w-full flex justify-between items-center mb-6">
          <div className="flex px-4 h-12 rounded-md border-2 border-blue-500 overflow-hidden max-w-2xl">
            <input
              type="text"
              placeholder="🔍 Search Medicine Name or Company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none bg-transparent text-gray-700 text-lg pl-3"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 192.904 192.904" 
              width="20px" 
              className="fill-blue-500 mr-3"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072..."/>
            </svg>
          </div>

          {/* Results Count */}
          <div className="text-xl font-semibold text-gray-700 bg-blue-50 px-6 py-3 rounded-full">
            {filteredMed.length} Medicines
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg shadow-md border border-gray-300 overflow-hidden">
          <div className="overflow-y-auto max-h-[60vh]">
            <table className="w-full text-gray-700">
              <thead className="bg-gradient-to-r from-[#2B4DC9] to-[#1E3A8A] text-white text-xs uppercase sticky top-0 z-10">
                <tr>
                  <th className="py-4 px-4 border-r border-blue-200 text-center font-semibold">Medicine</th>
                  <th className="py-4 px-4 border-r border-blue-200 text-center font-semibold">Company</th>
                  <th className="py-4 px-4 border-r border-blue-200 text-center font-semibold">No. of Boxes</th>
                  <th className="py-4 px-4 border-r border-blue-200 text-center font-semibold">No. of Tablets</th>
                  <th className="py-4 px-4 border-r border-blue-200 text-center font-semibold">Available</th>
                  <th className="py-4 px-4 text-center font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredMed.length > 0 ? (
                  filteredMed.map((data, index) => (
                    <tr
                      key={data._id || index}
                      className={`border-b transition-all duration-200 hover:bg-blue-50 ${
                        selectedRows.includes(index) 
                          ? "bg-green-50 border-green-200" 
                          : "hover:border-blue-200"
                      }`}
                    >
                      {/* Medicine Name */}
                      <td className="py-3 px-4 text-center">
                        <input
                          type="text"
                          disabled
                          defaultValue={data.PharmaMedname || ""}
                          className="w-full text-center bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-md p-2 focus:outline-none"
                          ref={(el) => (inputRefs.current[index] = { ...inputRefs.current[index], medname: el })}
                        />
                      </td>

                      {/* Company */}
                      <td className="py-3 px-4 text-center">
                        <input 
                          disabled
                          type="text"
                          defaultValue={data.PharmaMedcompany || ""}
                          className="w-full text-center bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-md p-2 focus:outline-none"
                          ref={(el) => (inputRefs.current[index] = { ...inputRefs.current[index], company: el })}
                        />
                      </td>

                      {/* No of Boxes */}
                      <td className="py-3 px-4 text-center">
                        <input
                          type="number"
                          placeholder="No. of Boxes"
                          className="w-full text-center bg-white border-2 border-blue-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 text-sm rounded-md p-2 transition-all"
                          ref={(el) => (inputRefs.current[index] = { ...inputRefs.current[index], PharmaMedstock: el })}
                        />
                      </td>

                      {/* No of Tablets */}
                      <td className="py-3 px-4 text-center">
                        <input
                          type="number"
                          placeholder="No. of Tablets"
                          className="w-full text-center bg-white border-2 border-blue-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 text-sm rounded-md p-2 transition-all"
                          ref={(el) => (inputRefs.current[index] = { ...inputRefs.current[index], PharmaMedTablets: el })}
                        />
                      </td>

                      {/* Available */}
                      <td className="py-3 px-4 text-center">
                        <input 
                          disabled
                          type="text"
                          defaultValue={data.available || "0"}
                          className="w-full text-center bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-md p-2 focus:outline-none"
                        />
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => AddANewStock(index)}
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2.5 rounded-lg text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                          + ADD STOCK
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-gray-500">
                      {searchTerm ? "❌ No medicine found matching your search" : "📦 No medicines available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-8 p-6">
          <button
            onClick={handleOpenModal}
            disabled={ListOfNewStock.length === 0}
            className={`px-12 py-4 rounded-xl font-bold text-lg shadow-2xl transform transition-all duration-300 ${
              ListOfNewStock.length === 0
                ? "bg-gray-400 text-gray-600 cursor-not-allowed shadow-none"
                : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-green-500/50 hover:-translate-y-1 active:scale-95"
            }`}
          >
            💾 Save {ListOfNewStock.length > 0 && `(${ListOfNewStock.length})`} Stock
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl transform scale-100">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Confirm Save Stock</h3>
              <p className="text-gray-600">
                Save <strong>{ListOfNewStock.length}</strong> medicine stock entries?
              </p>
            </div>
            
            <div className="flex justify-end gap-4 pt-6">
              <button
                onClick={handleCloseModal}
                className="px-8 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStack}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Save Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
