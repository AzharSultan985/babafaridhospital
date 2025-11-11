import { AppContext } from "../context/AppContext";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

export default function IndoorMed() {
  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedId, setSelectedMedId] = useState(null);

  const {
    FetcAllMed,
    DelMedByID,
    setEditMed_Medname,
    setEditMed_quntity,
    setEditMed_expdate,
    HandleEditModal,
    IsMedAddAlert,
    setIsMedAddAlert,
    setIsMedDelAlert,
    IsMedDelAlert,
    setSearchTerm,
    results,
    setEditMed_company,
    setEditMed_current,
    setEditMed_MedId,
    EditMed_Medname,
    EditMed_company,
    EditMed_quntity,
    EditMed_current,
    EditMed_expdate,
    
  } = useContext(AppContext);

  // Auto-hide toast after 1s
  useEffect(() => {
    if (IsMedAddAlert || IsMedDelAlert) {
      setisEditModalOpen(false);
      const timer = setTimeout(() => {
        setIsMedAddAlert(false);
        setIsMedDelAlert(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [IsMedAddAlert, IsMedDelAlert, setIsMedAddAlert, setIsMedDelAlert]);

  const formatDateToEng = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return `${day} ${month} ${year}`;
  };

  const handleDeleteClick = (id) => {
    setSelectedMedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedMedId) {
      DelMedByID(selectedMedId);
      setShowModal(false);
    }
  };

  const EditModal = (editid) => {
    const medToEdit =
      results && results.length > 0
        ? results.find((med) => med._id === editid)
        : FetcAllMed.find((med) => med._id === editid);

    if (medToEdit) {
      setEditMed_Medname(medToEdit.Medname);
      setEditMed_company(medToEdit.company);
      setEditMed_quntity(medToEdit.quntity);
      setEditMed_current(medToEdit.current);
      setEditMed_expdate(medToEdit.expdate);
    }
    setEditMed_MedId(editid);
    setisEditModalOpen(true);
  };

  const getDaysLeft = (date) => {
    if (!date) return null;
    const today = new Date();
    const exp = new Date(date);
    const diffTime = exp - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-4 sm:ml-60">
      <section>
        <div className="bg-white p-8 w-full h-screen flex flex-col">
          <h2 className="text-2xl mb-4 flex items-center gap-2">
            📦💊 Track, Manage & Refill Your Medicine Stock
          </h2>

          {/* Sticky Search & Filter Bar */}
          <div className="w-full flex justify-end bg-white z-20 sticky top-0 py-3 shadow-sm">
           

            <div className="flex px-4 h-10 rounded-md border-2 border-blue-500 overflow-hidden max-w-md mx-2">
              <input
                type="text"
                placeholder="Search Medicine..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full outline-none bg-transparent text-gray-600 text-sm"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="16px"
                className="fill-gray-600"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072..." />
              </svg>
            </div>

            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
              focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
              text-center me-2 mb-2"
            >
              <Link to="/addindoormed">Add Medicine</Link>
            </button>

           
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-y-auto overflow-x-auto rounded-lg">
            <table className="w-full bg-white border mb-20">
              <thead className="  z-10 bg-[#2B4DC994] text-center text-xs md:text-sm font-thin text-white">
                <tr>
                  <th className="p-0">
                    <span className="block py-2 px-3 border-r border-gray-300">Medicine</span>
                  </th>
                  <th className="p-0">
                    <span className="block py-2 px-3 border-r border-gray-300">Company</span>
                  </th>
                  <th className="p-4">
                    <span className="block py-2 px-3 border-r border-gray-300">Expire date</span>
                  </th>
                  <th className="p-0">
                    <span className="block py-2 px-3 border-r border-gray-300">Available</span>
                  </th>
                  <th className="p-0">
                    <span className="block py-2 px-3 border-r border-gray-300">Total</span>
                  </th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {(results && results.length > 0 ? results : FetcAllMed).map((item, index) => {
                  const daysLeft = getDaysLeft(item.expdate);
                  const isSoonToExpire = daysLeft !== null && daysLeft <= 30;

                  return (
                    <tr
                      key={item._id || index}
                      className={`border-b text-xs md:text-sm text-center cursor-pointer text-gray-800 
                      ${isSoonToExpire ? "bg-red-100 hover:bg-red-200" : "hover:bg-slate-100"}`}
                    >
                      <td className="p-2 md:p-4">{item.Medname}</td>
                      <td className="p-2 md:p-4">{item?.company || "empty"}</td>

                      <td className="p-2 md:p-4 relative">
                        {isSoonToExpire && (
                          <span
                            className={`absolute -top-1 -right-8 text-[10px] px-1 py-0.5 rounded-full shadow 
                            ${daysLeft <= 0 ? "bg-red-600" : "bg-orange-500"} text-white`}
                          >
                            {daysLeft <= 0 ? "Exp" : `${daysLeft}d`}
                          </span>
                        )}
                        {formatDateToEng(item.expdate)}
                      </td>

                      <td className="p-2 md:p-4">{item.current}</td>
                      <td className="p-2 md:p-4">{item.quntity}</td>

                      <td className="p-2 md:p-4 flex justify-center space-x-2">
                        <button
                          onClick={() => EditModal(item._id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs md:text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this medicine?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Medicine</h2>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medicine Name
            </label>
            <input
              type="text"
              value={EditMed_Medname || ""}
              onChange={(e) => setEditMed_Medname(e.target.value)}
              className="w-full border rounded p-2 mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              value={EditMed_company || ""}
              onChange={(e) => setEditMed_company(e.target.value)}
              className="w-full border rounded p-2 mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
            <input
              type="number"
              value={EditMed_quntity || ""}
              onChange={(e) => setEditMed_quntity(e.target.value)}
              className="w-full border rounded p-2 mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Available</label>
            <input
              type="number"
              value={EditMed_current || ""}
              onChange={(e) => setEditMed_current(e.target.value)}
              className="w-full border rounded p-2 mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <input
              type="date"
              value={EditMed_expdate || ""}
              onChange={(e) => setEditMed_expdate(e.target.value)}
              className="w-full border rounded p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setisEditModalOpen(false)}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  HandleEditModal();
                  setisEditModalOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
