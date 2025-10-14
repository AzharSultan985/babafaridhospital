import React, { useEffect, useRef, useState } from "react";
import { usePharmacy } from "../Pharmacy/ContextPharma/PharmaContext";

export default function AddANewStockPharmacy() {
  const {FetchlastMonthPharmaMed,
LastMonthpharmacyMed,ListOfNewStock, setListOfNewStock,AddNewstock_Pharmacy} = usePharmacy();
  const inputRefs = useRef([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
// ////console.log(LastMonthpharmacyMed);

 // fetch last month's medicines on mount
  useEffect(() => {
    // const now = new Date();
    // const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    // const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 1);

    FetchlastMonthPharmaMed();
  }, [FetchlastMonthPharmaMed]);


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

    if (newMedicine.PharmaMedname && newMedicine.PharmaMedcompany && newMedicine.PharmaMedstock &&newMedicine.PharmaMedTablets && newMedicine.PharmaMedprice && newMedicine.PharmaMedexpireDate ) {
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

  const handleSaveStack =  () => {
    try {
    //   await AddNewstock_Indoor(ListOfNewStock); // save to backend
    ////console.log("list of new stock ",ListOfNewStock);
    AddNewstock_Pharmacy()
      setIsModalOpen(false);
      setListOfNewStock([]);
      setSelectedRows([]);
        FetchlastMonthPharmaMed();

    } catch (error) {
      alert("Failed to save stock. Please try again.");
      ////console.error("Error saving stock:", error);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold p-4 text-gray-800">Add a New Pharmacy Medicine Stock</h2>

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
            {LastMonthpharmacyMed.length > 0 ? (
              LastMonthpharmacyMed.map((data, index) => (
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



{/* no of boxes */}
  <td className="py-2 px-4 text-center">
                    <input
                      type="text"
                      placeholder="No.of Box"
                      className="w-full text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2"
                      ref={(el) => (inputRefs.current[index] = { ...inputRefs.current[index], PharmaMedstock: el })}
                    />
                  </td>
{/* no of units */}
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
                      defaultValue={data.PharmaMedprice
 || ""}
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
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No medicines found.
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
