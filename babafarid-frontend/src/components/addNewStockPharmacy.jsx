import React, { useRef, useState, useMemo } from "react";
import { usePharmacy } from "../Pharmacy/ContextPharma/PharmaContext";

export default function AddANewStockPharmacy() {
  const { 
    ListOfNewStock, 
    setListOfNewStock, 
    AddNewstock_Pharmacy, 
    pharmacyMed, 
   
  } = usePharmacy();
  
  const inputRefs = useRef([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState();

  // ✅ Client-side search filtering (same logic as previous)
  const filteredPharmacyMed = useMemo(() => {
    if (!pharmacyMed || !Array.isArray(pharmacyMed)) return [];
    
    const searchValue = (searchTerm || '').toLowerCase().trim();
    
    // Empty search = Show ALL medicines
    if (searchValue === '') {
      return pharmacyMed.filter(med => med && med._id);
    }
    
    // Filter by medicine name or company
    return pharmacyMed.filter(med => 
      med && 
      med._id && 
      (med.PharmaMedname?.toLowerCase().includes(searchValue) ||
       med.PharmaMedcompany?.toLowerCase().includes(searchValue))
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
      PharmaMedprice: rowInputs.PharmaMedprice.value || "",
      PharmaMedexpireDate: rowInputs.expdate.value || "",
      remainingquntity: rowInputs.remainingquntity.value || "",
    };

    if (newMedicine.PharmaMedname && newMedicine.PharmaMedcompany && 
        newMedicine.PharmaMedstock && newMedicine.PharmaMedTablets && 
        newMedicine.PharmaMedprice && newMedicine.PharmaMedexpireDate) {
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

  const handleSaveStack = () => {
    try {
      AddNewstock_Pharmacy();
      setIsModalOpen(false);
      setListOfNewStock([]);
      setSelectedRows([]);
    } catch (error) {
      alert("Failed to save stock. Please try again.");
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold p-4 text-gray-800">Add a New Pharmacy Medicine Stock</h2>

      {/* ✅ NEW SEARCH BAR - Same as previous component */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            {filteredPharmacyMed.length} medicines found
          </div>
          <div className="flex px-4 h-10 rounded-md border-2 border-blue-500 overflow-hidden max-w-md">
            <input
              type="text"
              placeholder="Search Medicine..."
              value={searchTerm || ''}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none bg-transparent text-gray-600 text-sm"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 192.904 192.904" 
              width="16px" 
              className="fill-gray-600"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="rounded-lg shadow-md border border-gray-300 overflow-y-auto h-[70vh]">
        <table className="w-full text-gray-700">
          <thead className="bg-[#2B4DC9] text-white text-xs uppercase">
            <tr>
              <th className="py-3 px-4 border-r border-gray-300 text-center">Medicine</th>
              <th className="py-3 px-4 border-r border-gray-300 text-center">Company</th>
              <th className="py-3 px-4 border-r border-gray-300 text-center">No.of Box</th>
              <th className="py-3 px-4 border-r border-gray-300 text-center">No.of Units</th>
              <th className="py-3 px-4 border-r border-gray-300 text-center">Price/Box</th> 
              <th className="py-3 px-4 border-r border-gray-300 text-center">Expire Date</th>
              <th className="py-3 px-4 border-r border-gray-300 text-center">Available / units</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPharmacyMed.length > 0 ? (
              filteredPharmacyMed.map((data, index) => (
                <tr
                  key={data._id || index}
                  className={`border-b transition ${
                    selectedRows.includes(index) ? "bg-green-100" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="py-2 px-4 text-center">
                    <input
                      type="text"
                      disabled
                      defaultValue={data.PharmaMedname || ""}
                      className="w-full text-center bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-md p-2"
                      ref={(el) => (inputRefs.current[index] = { ...inputRefs.current[index], medname: el })}
                    />
                  </td>

                  <td className="py-2 px-4 text-center">
                    <input
                      type="text"
                      defaultValue={data.PharmaMedcompany || ""}
                      className="w-full text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2"
                      ref={(el) => (inputRefs.current[index] = { ...inputRefs.current[index], company: el })}
                    />
                  </td>

                  <td className="py-2 px-4 text-center">
                    <input
                      type="text"
                      placeholder="No.of Box"
                      className="w-full text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2"
                      ref={(el) => (inputRefs.current[index] = { ...inputRefs.current[index], PharmaMedstock: el })}
                    />
                  </td>

                  <td className="py-2 px-4 text-center">
                    <input
                      type="text"
                      placeholder="No.of Units"
                      className="w-full text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2"
                      ref={(el) => (inputRefs.current[index] = { ...inputRefs.current[index], PharmaMedTablets: el })}
                    />
                  </td>

                  <td className="py-2 px-4 text-center">
                    <input
                      type="text"
                      defaultValue={data.PharmaMedprice || ""}
                      className="w-full text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2"
                      ref={(el) => (inputRefs.current[index] = { ...inputRefs.current[index], PharmaMedprice: el })}
                    />
                  </td>

                  <td className="py-2 px-4 text-center">
                    <input
                      type="date"
                      defaultValue={data.expdate || ""}
                      className="w-full text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2"
                      ref={(el) => (inputRefs.current[index] = { ...inputRefs.current[index], expdate: el })}
                    />
                  </td>

                  <td className="py-2 px-4 text-center">
                    <input
                      type="number"
                      disabled
                      defaultValue={data.available || ""}
                      className="w-full text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2"
                      ref={(el) => (inputRefs.current[index] = { ...inputRefs.current[index], remainingquntity: el })}
                    />
                  </td>

                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => AddANewStock(index)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 rounded-md text-xs"
                    >
                      + ADD
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  {searchTerm ? "No medicine found" : "No medicines available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleOpenModal}
          className="bg-green-600 hover:bg-green-700 text-white font-medium m-6 px-6 py-2 rounded-md"
        >
          Save Now
        </button>
      </div>

      {/* Modal remains same */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Save</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to save the selected medicines?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStack}
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
