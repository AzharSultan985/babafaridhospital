import { usePharmacy } from "../Pharmacy/ContextPharma/PharmaContext";
import { Link } from "react-router-dom";
import { useEffect, useCallback, useState, useMemo } from "react";
// ✅ Remove separate modal import - inline modal banaya

export default function HandlePharmacy() {
  const { 
    fetchPharmacyMed, 
    DelPharmaMedByID,
    updatePharmacyMed, // ✅ Add this for submit
    pharmacyMed 
  } = usePharmacy();

  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });
  const [searchTerm, setSearchTerm] = useState();
  
  // ✅ Local form state - IndoorMed جیسا
  const [editFormData, setEditFormData] = useState({
    _id: null,
    PharmaMedname: "",
    PharmaMedcompany: "",
    available: "",
    PricePerMed: "",
    PharmaMedprice: "",
    TotalTablets: "",
    PharmaMedexpireDate: ""
  });
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const stableFetch = useCallback(() => {
    fetchPharmacyMed();
  }, [fetchPharmacyMed]);

  useEffect(() => {
    stableFetch();
  }, [stableFetch]);

  // Client-side filtering
  const filteredMed = useMemo(() => {
    if (!pharmacyMed || pharmacyMed.length === 0) return [];
    
    const searchLower = (searchTerm || '').toLowerCase().trim();
    
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

  const formatDateToEng = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return `${day} ${month} ${year}`;
  };

  const getDaysLeft = (date) => {
    if (!date) return null;
    const today = new Date();
    const exp = new Date(date);
    const diffTime = exp - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // ✅ EXACT IndoorMed جیسا handleEdit - NO FetchwitIdforEdit!
  const handleEdit = useCallback((id) => {
    const medToEdit = pharmacyMed.find(med => med._id === id);
    
    if (medToEdit) {
      setEditFormData({
        _id: medToEdit._id,
        PharmaMedname: medToEdit.PharmaMedname || "",
        PharmaMedcompany: medToEdit.PharmaMedcompany || "",
        available: medToEdit.available || "",
        PricePerMed: medToEdit.PricePerMed || "",
        PharmaMedprice: medToEdit.PharmaMedprice || "",
        TotalTablets: medToEdit.TotalTablets || "",
        PharmaMedexpireDate: medToEdit.PharmaMedexpireDate ? medToEdit.PharmaMedexpireDate.split('T')[0] : ""
      });
      setIsEditModalOpen(true);
    }
  }, [pharmacyMed]);

  const handleDelete = (id) => {
    setConfirmDelete({ open: true, id });
  };

  const confirmDeleteAction = () => {
    DelPharmaMedByID(confirmDelete.id);
    setConfirmDelete({ open: false, id: null });
  };

  const cancelDelete = () => {
    setConfirmDelete({ open: false, id: null });
  };

  // ✅ Form handlers - IndoorMed جیسا
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Form submit
  const handleEditSubmit = () => {
    if (editFormData._id && editFormData.PharmaMedname) {
      updatePharmacyMed(editFormData);
      setIsEditModalOpen(false);
      
      // ✅ Clear form
      setEditFormData({
        _id: null,
        PharmaMedname: "",
        PharmaMedcompany: "",
        available: "",
        PricePerMed: "",
        PharmaMedprice: "",
        TotalTablets: "",
        PharmaMedexpireDate: ""
      });
    }
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
    // ✅ Clear form on close
    setEditFormData({
      _id: null,
      PharmaMedname: "",
      PharmaMedcompany: "",
      available: "",
      PricePerMed: "",
      PharmaMedprice: "",
      TotalTablets: "",
      PharmaMedexpireDate: ""
    });
  };

  return (
    <>
      <div className="p-4 sm:ml-60">
        <section>
          <div className="bg-white p-8 overflow-auto w-full h-screen">
            <h2 className="text-2xl mb-4 flex items-center gap-2">
              🏥💊 Manage & Track Pharmacy Medicines
            </h2>

            {/* Search & Add */}
            <div className="w-full flex justify-end mb-4">
              <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                <Link to="/addpharmaMed">Add Pharmacy Medicine</Link>
              </button>

              <div className="flex px-4 h-10 rounded-md border-2 border-blue-500 overflow-hidden max-w-md mx-2">
                <input
                  type="text"
                  placeholder="Search Medicine..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full outline-none bg-transparent text-gray-600 text-sm"
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-600">
                  <path d="m190.707 180.101-47.078-47.077c11.702-14.072..."/>
                </svg>
              </div>
            </div>

            {/* Results count */}
            <div className="mb-4 text-sm text-gray-600">
              {filteredMed.length} medicines 
            </div>

            {/* Medicine Table */}
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full bg-white border mb-20">
                <thead>
                  <tr className="bg-[#2B4DC994] text-center text-xs md:text-sm font-thin text-white">
                    <th className="p-2">Medicine</th>
                    <th className="p-2">Company</th>
                    <th className="p-2">Available</th>
                    <th className="p-2">Price/Unit</th>
                    <th className="p-2">Box/Unit</th>
                    <th className="p-2">Total/Units</th>
                    <th className="p-2">Expire Date</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMed.length > 0 ? (
                    filteredMed.map((med, index) => {
                      const daysLeft = getDaysLeft(med.PharmaMedexpireDate);
                      const isSoonToExpire = daysLeft !== null && daysLeft <= 30;

                      return (
                        <tr key={med._id || index} className={`border-b text-xs md:text-sm text-center cursor-pointer text-gray-800 
                          ${isSoonToExpire ? "bg-red-100 hover:bg-red-200" : "hover:bg-slate-100"}`}>
                          <td className="p-2 md:p-4">{med.PharmaMedname}</td>
                          <td className="p-2 md:p-4">{med.PharmaMedcompany}</td>
                          <td className="p-2 md:p-4">{med.available}</td>
                          <td className="p-2 md:p-4">{Number(med.PricePerMed).toFixed(2)}</td>
                          <td className="p-2 md:p-4">{Number(med.PharmaMedprice).toFixed(2)}</td>
                          <td className="p-2 md:p-4">{med.TotalTablets}</td>
                          <td className="p-2 md:p-4 relative">
                            {isSoonToExpire && (
                              <span className={`absolute -top-[-2px] -right-[-2rem] text-[10px] px-1 py-0.5 rounded-full shadow 
                                ${daysLeft <= 0 ? "bg-red-600" : "bg-orange-500"} text-white`}>
                                {daysLeft <= 0 ? "Exp" : `${daysLeft}` + 'd'}
                              </span>
                            )}
                            {formatDateToEng(med.PharmaMedexpireDate)}
                          </td>
                          <td className="p-2 md:p-4 flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(med._id)}
                              className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs md:text-sm hover:bg-blue-700"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(med._id)}
                              className="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="p-8 text-center text-gray-500">
                        {searchTerm ? "No medicine found" : "No medicines available"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* ✅ INLINE EDIT MODAL - IndoorMed جیسا */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Edit Medicine</h2>
              <button 
                onClick={handleEditClose}
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Medicine Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medicine Name *</label>
                <input
                  type="text"
                  name="PharmaMedname"
                  value={editFormData.PharmaMedname}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  name="PharmaMedcompany"
                  value={editFormData.PharmaMedcompany}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Available */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available</label>
                <input
                  type="number"
                  name="available"
                  value={editFormData.available}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Price Per Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price/Unit</label>
                <input
                  type="number"
                  name="PricePerMed"
                  value={editFormData.PricePerMed}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Box Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Box Price</label>
                <input
                  type="number"
                  name="PharmaMedprice"
                  value={editFormData.PharmaMedprice}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Total Tablets */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Units</label>
                <input
                  type="number"
                  name="TotalTablets"
                  value={editFormData.TotalTablets}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Expiry Date */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="date"
                  name="PharmaMedexpireDate"
                  value={editFormData.PharmaMedexpireDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-8 justify-end">
              <button
                onClick={handleEditClose}
                className="px-8 py-3 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl hover:from-blue-600 hover:to-blue-800 font-semibold transition-all shadow-lg"
              >
                Update Medicine
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-lg text-center">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this medicine?</p>
            <div className="flex justify-center mt-4 gap-4">
              <button
                onClick={confirmDeleteAction}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
