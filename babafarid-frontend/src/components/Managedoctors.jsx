import React, { useContext, useEffect, useState } from "react";
import { Plus, X, Edit, Trash2, Eye, PawPrint } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import CalendarTable from "../components/CalendarTable";

export default function DoctorManagement() {
  const { HandleDoctor, AllDoctors, FetchAllDoctors } = useContext(AppContext);

  // const [filterDate, setFilterDate] = useState("");
  const [filteredChecked, setFilteredChecked] = useState([]);
  const [filteredOperated, setFilteredOperated] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [doctorData, setDoctorData] = useState({
    name: "",
    department: "",
    fees: "",
    starttime: "",
    endtime: "",
  });

  useEffect(() => {
    FetchAllDoctors();
  }, []);

  const formatTime = (time) => {
    if (!time) return "";
    let [hour, minute] = time.split(":");
    hour = parseInt(hour);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };
const [openRange, setOpenRange] = useState(false);

const [filterDate, setFilterDate] = useState({
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
});

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleAddDoctor = () => {
    HandleDoctor(doctorData);
    setDoctorData({ name: "", department: "", fees: "", starttime: "", endtime: "" });
    setShowModal(false);
  };

  const handleOpenProfile = (doctor) => {
    setSelectedDoctor(doctor);
    setShowSidebar(true);
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setDoctorData(doctor);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const updated = AllDoctors.map((d) => (d === selectedDoctor ? doctorData : d));
    HandleDoctor(updated);
    setShowEditModal(false);
  };

  const handleRemove = (doctor) => {
    setSelectedDoctor(doctor);
    setShowRemoveModal(true);
  };

  const confirmRemove = () => {
    const updated = AllDoctors.filter((d) => d !== selectedDoctor);
    HandleDoctor(updated);
    setShowRemoveModal(false);
  };

  // Filter patients by selected date
 // Filter patients by selected date
// ---------------- Correct Filtering Logic ----------------
useEffect(() => {
  if (!selectedDoctor) return;

  const start = new Date(filterDate.startDate);
  const end = new Date(filterDate.endDate);

  const inRange = (date) => {
  const d = new Date(date);
  const s = new Date(start); s.setHours(0, 0, 0, 0);
  const e = new Date(end); e.setHours(23, 59, 59, 999);
  return d >= s && d <= e;
};


  // --- Checked ---
  const checkedPatients = (selectedDoctor.CheckedPatients || []).flatMap((p) =>
    (p.Appointment || []).map((a) => ({
      patientID: p.patientID,
      date: a.Appdate,
      fees: a.fees,
    }))
  );

  setFilteredChecked(checkedPatients.filter((p) => inRange(p.date)));

  // --- Operated ---
  const operatedPatients = (selectedDoctor.OperatedPatients || []).flatMap((p) =>
    p.admission?.admittedAt
      ? [
          {
            patientID: p.patientID,
            date: p.admission.admittedAt,
            fees: p.payment?.total_payment,
          },
        ]
      : []
  );

  setFilteredOperated(operatedPatients.filter((p) => inRange(p.date)));
}, [filterDate, selectedDoctor]);
const totalCheckedFees = filteredChecked.reduce((sum, p) => sum + Number(p.fees || 0), 0);
const totalOperatedFees = filteredOperated.reduce((sum, p) => sum + Number(p.fees || 0), 0);
const grandTotal = totalCheckedFees + totalOperatedFees;

  return (
    <div className="p-6 space-y-6 relative">
      <h1 className="text-3xl font-semibold text-gray-800 tracking-wide">Doctor Management</h1>

      {/* Header */}
      <div className="bg-white shadow-md rounded-2xl p-4 flex justify-between items-center">
        <span className="text-lg font-medium text-gray-700">Manage Doctors</span>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Doctor
        </button>
      </div>

      {/* Doctors Table */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-2">Name</th>
              <th className="py-2">Department</th>
              <th className="py-2">Fees</th>
            
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {AllDoctors.map((doc, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
             
                <td className="py-2">{doc.name}</td>
                <td className="py-2">{doc.department}</td>
                <td className="py-2">{doc.fees}</td>
               
                <td className="py-2 flex gap-3">
                  <Eye className="cursor-pointer text-blue-600" onClick={() => handleOpenProfile(doc)} />
                  <Edit className="cursor-pointer text-green-600" onClick={() => handleEdit(doc)} />
                  <Trash2 className="cursor-pointer text-red-600" onClick={() => handleRemove(doc)} />
                </td>




              </tr>
            ))}
          </tbody>
        </table>
      </div>





<div>


</div>









      {/* Sidebar */}
      {showSidebar && selectedDoctor && (
        <div className="fixed right-0 top-0 h-full w-[550px] bg-white shadow-2xl border-l p-6 z-50 overflow-y-auto">
          <button className="absolute right-4 top-4" onClick={() => setShowSidebar(false)}>
            <X className="text-gray-700 w-6 h-6" />
          </button>

          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Doctor Profile</h2>

          <div className="space-y-2 bg-gray-50 p-4 rounded-xl border">
            <p><strong>Name:</strong> {selectedDoctor.name}</p>
            <p><strong>Department:</strong> {selectedDoctor.department}</p>
            <p><strong>Fees:</strong> {selectedDoctor.fees}</p>
           
          </div>

          {/* Date Filter */}
   <div className="relative">
  <label className="block mb-1 font-semibold text-gray-700">Select Date Range</label>

  <input
    type="text"
    readOnly
    value={`${format(filterDate.startDate, "yyyy-MM-dd")} → ${format(
      filterDate.endDate,
      "yyyy-MM-dd"
    )}`}
    onClick={() => setOpenRange(!openRange)}
    className="w-full p-2 border rounded-lg cursor-pointer"
  />

  {openRange && (
    <div className="absolute z-50 mt-2">
      <CalendarTable
        onRangeSelect={(range) => {
          setFilterDate({
            startDate: range.startDate,
            endDate: range.endDate,
            key: "selection",
          });
          setOpenRange(false);
        }}
      />
    </div>
  )}
</div>


          {/* Checked Patients */}
     
  
 <div className="mt-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-3">
    Checked Patients — {filteredChecked.length}
  </h3>

  <div className="border rounded-xl overflow-hidden bg-white shadow-sm">

    {/* HEADER fixed */}
    <table className="w-full text-sm text-left">
      <thead className="bg-gray-100 sticky top-0 z-10">
        <tr className="border-b">
          <th className="py-2 px-2">Patient ID</th>
          <th className="py-2 px-2">Date</th>
          <th className="py-2 px-2">Fees</th>
        </tr>
      </thead>
    </table>

    {/* BODY scrollable only */}
    <div className="max-h-60 overflow-y-auto">
      <table className="w-full text-sm text-left">
        <tbody>
          {filteredChecked.length > 0 ? (
            filteredChecked.map((p, i) => (
              <tr key={i} className="border-b ">
                <td className="py-2 px-2">{p.patientID}</td>
                <td className="py-2 px-2"></td>
                <td className="py-2 px-2"></td>
                <td className="py-2 px-2">  </td>
                <td className="py-2  pl-30">{new Date(p.date).toLocaleDateString()}</td>
                <td className="py-2 px-2">{p.fees}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-4 text-center text-gray-500 italic">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* FOOTER fixed, not scrolling */}
    <div className="bg-gray-100 border-t flex justify-between items-center px-8 py-3">
      <span className="font-semibold text-gray-800">Total Fees</span>
      <span className="font-bold text-green-600 text-lg">{totalCheckedFees}</span>
   
    </div>
  </div>
</div>



          {/* Operated Patients */}
        <div className="mt-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-3">
    Operated Patients — {filteredOperated.length}
  </h3>

  <div className="border rounded-xl overflow-hidden bg-white shadow-sm">

    {/* HEADER fixed */}
    <table className="w-full text-sm text-left">
      <thead className="bg-gray-100 sticky top-0 z-10">
        <tr className="border-b">
          <th className="py-2 px-2">Patient ID</th>
          <th className="py-2 px-2">Date</th>
          <th className="py-2 px-2">Fees</th>
        </tr>
      </thead>
    </table>

    {/* BODY scrollable only */}
    <div className="max-h-60 overflow-y-auto">
      <table className="w-full text-sm text-left">
        <tbody>
          {filteredOperated.length > 0 ? (
            filteredOperated.map((p, i) => (
              <tr key={i} className="border-b">
                <td className="py-2 px-2">{p.patientID}</td>
                <td className="py-2 px-2"></td>
                <td className="py-2 px-2"></td>
                <td className="py-2 px-2">{new Date(p.date).toLocaleDateString()}</td>
                <td className="py-2 px-2">{p.fees}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-4 text-center text-gray-500 italic">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* FOOTER fixed */}
    <div className="bg-gray-100 border-t flex justify-between items-center px-4 py-3">
      <span className="font-semibold text-gray-800">Total Fees</span>
      <span className="font-bold text-green-600 text-lg">{totalOperatedFees}</span>
    </div>
  </div>
</div>

        </div>
      )}

      {/* Edit Doctor Modal */}
{showEditModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl shadow-xl w-[400px] p-6 relative">
      <button className="absolute top-4 right-4" onClick={() => setShowEditModal(false)}>
        <X className="w-5 h-5 text-gray-600" />
      </button>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Doctor</h2>
      <div className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={doctorData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={doctorData.department}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="number"
          name="fees"
          placeholder="Fees"
          value={doctorData.fees}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
        <div className="flex gap-2">
          <input
            type="time"
            name="starttime"
            value={doctorData.starttime}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded-lg"
          />
          <input
            type="time"
            name="endtime"
            value={doctorData.endtime}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded-lg"
          />
        </div>
        <button
          onClick={handleSaveEdit}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}
{/* Delete Doctor Modal */}
{showRemoveModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl shadow-xl w-[350px] p-6 relative">
      <button className="absolute top-4 right-4" onClick={() => setShowRemoveModal(false)}>
        <X className="w-5 h-5 text-gray-600" />
      </button>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirm Delete</h2>
      <p className="mb-6">Are you sure you want to remove <strong>{selectedDoctor?.name}</strong>?</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowRemoveModal(false)}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          onClick={confirmRemove}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
