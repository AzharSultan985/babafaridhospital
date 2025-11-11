import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function UpdateStockIndoor() {
  const {  setListOFNewstack,Updatestock_Indoor,  
  FetcAllMed } = useContext(AppContext);
//console.log("FetcAllMed",FetcAllMed);

  // Refs to capture input values for each row
  const inputRefs = useRef([]);
  // State to track selected rows
  const [selectedRows, setSelectedRows] = useState([]);
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle adding a medicine to the ListOFNewstack
  const AddANewStack = (index) => {
    const rowInputs = inputRefs.current[index];
    if (!rowInputs) return;

    const newMedicine = {
      Medname: rowInputs.medname.value || "",
      company: rowInputs.company.value || "",
      quntity: rowInputs.quntity.value || "",
      remaining: rowInputs.remaining.value || "",
    };

    // Only add if at least one field is filled to avoid empty entries
    if (newMedicine.Medname || newMedicine.company || newMedicine.quntity) {
      setListOFNewstack((prev) => [...prev, newMedicine]);
      // Add the index to selectedRows to change the row color
      setSelectedRows((prev) => [...new Set([...prev, index])]);
    }
  };

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle saving the stack (to be implemented with API)
  const handleSaveStack = () => {
    // Placeholder for API call
    Updatestock_Indoor()
    // Close the modal after saving
    setIsModalOpen(false);
    // Optionally reset the list and selected rows
    // setListOFNewstack([]);
    // setSelectedRows([]);
  };

  return (
    <>
      <h2 className="text-3xl font-bold p-4 text-gray-800">Refill Indoor Medicine Stock</h2>

      {/* Table */}
      <div className="rounded-lg shadow-md border border-gray-300 overflow-y-auto h-[70vh]">
  <table className="w-full text-gray-700">

          <thead className="bg-[#2B4DC9] text-white text-xs uppercase">
            <tr>
              <th className="py-3 px-4 border-r border-gray-300 text-center">Medicine</th>
              <th className="py-3 px-4 border-r border-gray-300 text-center">Company</th>
             
              <th className="py-3 px-4 border-r border-gray-300 text-center">Quantity </th>
              <th className="py-3 px-4 border-r border-gray-300 text-center">Remaining</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(FetcAllMed) && FetcAllMed.length > 0 ? (
              FetcAllMed.map((data, index) => (
                <tr
                  key={data._id || index}
                  className={`border-b transition ${
                    selectedRows.includes(index) ? "bg-green-100" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="py-2 px-4 text-center">
                    <input
                      type="text" disabled
                      defaultValue={data.Medname || ""}
                      className="w-full text-center bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-md 
                                 focus:ring-blue-500 focus:border-blue-500 p-2"
                      ref={(el) => (inputRefs.current[index] = { ...inputRefs.current[index], medname: el })}
                    />
                  </td>

                  <td className="py-2 px-4 text-center">
                    <input disabled
                      type="text"
                      defaultValue={data.company || ""}
                      className="w-full text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md 
                                 focus:ring-blue-500 focus:border-blue-500 p-2"
                      ref={(el) => (inputRefs.current[index] = { ...inputRefs.current[index], company: el })}
                    />
                  </td>

              
                  <td className="py-2 px-4 text-center">
                    <input
                      type="number" 
                     placeholder="Enter Medicine"
                      className="w-full text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md 
                                 focus:ring-blue-500 focus:border-blue-500 p-2"
                      ref={(el) => (inputRefs.current[index] = { ...inputRefs.current[index], quntity: el })}
                    />
                  </td>
                  <td className="py-2 px-4 text-center">
                    <input
                      type="number" disabled
                      defaultValue={data.current || ""}
                      className="w-full text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md 
                                 focus:ring-blue-500 focus:border-blue-500 p-2"
                      ref={(el) => (inputRefs.current[index] = { ...inputRefs.current[index], remaining: el })}
                    />
                  </td>

                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => AddANewStack(index)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 rounded-md text-xs"
                    >
                      + ADD
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No medicines found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Save New Stack Button (Moved to Right Corner) */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleOpenModal}
          className="bg-green-600  hover:bg-green-700 text-white font-medium m-6 px-6 py-2 rounded-md"
        >
          Update Now 
        </button>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Save
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to save the selected medicines?
            </p>
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