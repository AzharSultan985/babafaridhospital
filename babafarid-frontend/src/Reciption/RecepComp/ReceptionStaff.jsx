import React, { useEffect, useState } from "react";
import { useReception } from "../RecepContext/RecepContext";

const theme = {
  primary: "#1E40AF",
  secondary: "#FFFFFF",
  hover: "#3B82F6",
  border: "#E5E7EB",
};

const ReceptionStaff = () => {
  const { HandleReceptionStaff, FetchAllReceptionUser, AllReceptionUser, RemoveReceptionStaff, } = useReception();

  const [newStaff, setNewStaff] = useState({ name: "", address: "", shiftStart: "", shiftEnd: "" });
  const [showAddModal, setShowAddModal] = useState(false);

  // New states for remove confirmation
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [staffToRemoveId, setStaffToRemoveId] = useState(null);

  useEffect(() => {
    FetchAllReceptionUser();
  }, []);

 // Helper: convert 24-hour string to 12-hour for display
const format12Hour = (time24) => {
  const [hour, minute] = time24.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
};
  const handleAddStaff =async () => {
    if (!newStaff.name || !newStaff.address || !newStaff.shiftStart || !newStaff.shiftEnd) return;

    const staffData = {
      name: newStaff.name,
      address: newStaff.address,
      shiftStart: newStaff.shiftStart,
      shiftEnd: newStaff.shiftEnd,
    };

   await  HandleReceptionStaff(staffData);
   
    setNewStaff({ name: "", address: "", shiftStart: "", shiftEnd: "" });
    setShowAddModal(false);
  };

  const handleRemoveClick = (id) => {
    setStaffToRemoveId(id);
    setShowRemoveModal(true);
  };

  const confirmRemove = () => {
    if (staffToRemoveId) {
      RemoveReceptionStaff(staffToRemoveId);
    }
    setStaffToRemoveId(null);
    setShowRemoveModal(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Reception Staff</h2>
        <button
          onClick={() => setShowAddModal(true)}
          style={{ backgroundColor: theme.primary }}
          className="text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add Staff
        </button>
      </div>

      <div className="bg-white shadow rounded border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase">Shift</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {AllReceptionUser.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No user added
                </td>
              </tr>
            ) : (
              AllReceptionUser.map((staff, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">{staff.name}</td>
                  <td className="px-6 py-4">{staff.address}</td>
               <td className="px-6 py-4">
  {format12Hour(staff.shiftStart)} - {format12Hour(staff.shiftEnd)}
</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-red-600 font-bold hover:text-red-800"
                      onClick={() => handleRemoveClick(staff.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h3 className="text-xl font-semibold mb-4">Add Reception Staff</h3>
            <input
              type="text"
              placeholder="Name"
              value={newStaff.name}
              onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Address"
              value={newStaff.address}
              onChange={(e) => setNewStaff({ ...newStaff, address: e.target.value })}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
            />
            <div className="flex gap-2 mb-4">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm mb-1">Shift Start</label>
                <input
                  type="time"
                  value={newStaff.shiftStart}
                  onChange={(e) => setNewStaff({ ...newStaff, shiftStart: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 text-sm mb-1">Shift End</label>
                <input
                  type="time"
                  value={newStaff.shiftEnd}
                  onChange={(e) => setNewStaff({ ...newStaff, shiftEnd: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStaff}
                style={{ backgroundColor: theme.primary }}
                className="px-4 py-2 text-white rounded hover:bg-blue-600 transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Confirmation Modal */}
      {showRemoveModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">Confirm Removal</h3>
            <p className="mb-4">Are you sure you want to remove this staff member?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowRemoveModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemove}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceptionStaff;
