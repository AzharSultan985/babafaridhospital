import React, { useEffect, useState } from "react";
import { Eye, X, Search, Pencil, RefreshCw, Edit } from "lucide-react";

import { useReception } from "../RecepContext/RecepContext";

const ReceptionMain = () => {

  const {FetchAllPatient,AllPatient ,UpdatePayment,HandleReAppointment,AllReceptionUser} = useReception();

 useEffect(() => {
  FetchAllPatient(); // initial fetch

  const interval = setInterval(() => {
    FetchAllPatient();
  }, 60000); // 10 seconds

  return () => clearInterval(interval); // cleanup
}, []);


  const [viewPatient, setViewPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModal, setEditModal] = useState(null); // modal open for edit
  const [updatePayment, setUpdatePayment] = useState({
    patientID: "",
    status: "",
    received_payment: "",
  });
  const filteredPatients = AllPatient.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.patientID.toString().toLowerCase().includes(searchTerm.toLowerCase())||
      p.F_H_Name.toLowerCase().includes(searchTerm.toLowerCase()) 
   
  );

  const handleEditClick = (patient) => {
    setEditModal(patient);
    setUpdatePayment({
      patientID: patient.patientID,
      status: patient.payment.paymentstatus || "",
      received_payment: patient.payment.received_payment || "",
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setUpdatePayment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveUpdate = async () => {
    console.log("Updated Payment Object:", updatePayment);
         UpdatePayment(updatePayment)
    setEditModal(null);
  };

const [reAppModal, setReAppModal] = useState(null);
const [reAppData, setReAppData] = useState({
  patientID: '',
  fees: '',
  ReappHandleby: '',

});

const handleReAppChange = (e) => {
  const { name, value } = e.target;
  setReAppData((prev) => ({ ...prev, [name]: value }));
};


const handleReAppointment = (patient) => {
  setReAppData({
    patientID: patient.patientID,
    fees: "",   
    ReappHandleby:""
  });

  setReAppModal(patient);
};


const handleSaveReApp = async () => {
  // console.log("RE-APPOINTMENT DATA:", reAppData);


 await HandleReAppointment(reAppData)
  setReAppModal(null);
};


  // Check if current time is within shift range
const isWithinShift = (shiftStart, shiftEnd) => {
  const now = new Date();
  const currTotal = now.getHours() * 60 + now.getMinutes();

  const [startHour, startMin] = shiftStart.split(":").map(Number);
  const [endHour, endMin] = shiftEnd.split(":").map(Number);

  let startTotal = startHour * 60 + startMin;
  let endTotal = endHour * 60 + endMin;

  // Handle shift that goes past midnight
  if (endTotal <= startTotal) {
    // Shift ends next day
    if (currTotal < startTotal) {
      // Early morning before midnight, add 24 hours to currTotal
      return currTotal + 24 * 60 <= endTotal + 24 * 60;
    } else {
      // Evening hours, just compare normally
      return currTotal >= startTotal || currTotal <= endTotal;
    }
  }

  return currTotal >= startTotal && currTotal <= endTotal;
};

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold border-b pb-2">
          🏥 Patient Management
        </h2>

        <div className="relative">
          <input
            type="text"
            placeholder="Search patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search
            size={18}
            className="absolute left-3 top-2.5 text-gray-400"
          />
        </div>
      </div>

      {/* Main Table */}
     {/* Main Table */}
<div className="bg-white rounded-lg shadow-lg border border-gray-200">

  {/* Only Table Scrolls Here */}
  <div className="max-h-[500px] overflow-y-auto overflow-x-auto"></div>
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Father/Husband</th>
              <th className="border px-4 py-2 text-left">Check Up</th>
   
              <th className="border px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((p) => (
                <tr key={p.patientID} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{p.patientID}</td>
                  <td className="border px-4 py-2 font-medium">{p.name}</td>
                  <td className="border px-4 py-2">{p.F_H_Name}</td>
                  <td className="border px-4 py-2">{p.doctor}</td>

           <td className="border px-4 py-2 text-center  flex justify-start gap-2">
  
  {/* VIEW BUTTON */}
  <button
    onClick={() => setViewPatient(p)}
    className="bg-blue-600 text-white px-3 py-1 ml-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
  >
    <Eye size={16} />
  </button>



  {/* RE-APPOINTMENT (REFRESH ICON) */}
  <button
    onClick={() => handleReAppointment(p)}
    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 flex items-center justify-center"
  >
    <RefreshCw size={16} />
  </button>
  {/* EDIT PAYMENT (EDIT ICON) */}
{p.admission.isadmitted &&
 (p.payment.paymentstatus === "Partial" || p.payment.paymentstatus === "Pending") && (
  <button
    onClick={() => handleEditClick(p)}
    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 flex items-center justify-center"
  >
    <Edit size={16} />
  </button>
)}

</td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Sidebar: Patient Details */}
      {viewPatient && (
        <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl z-50 overflow-y-auto transition-transform duration-300 border-l border-gray-200">
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h3 className="text-xl font-semibold text-blue-700">
                Patient Details
              </h3>
              <button
                onClick={() => setViewPatient(null)}
                className="text-gray-500 hover:text-red-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg text-sm">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="font-semibold p-2 w-1/3 bg-gray-50">ID</td>
                    <td className="p-2">{viewPatient.patientID}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">Name</td>
                    <td className="p-2">{viewPatient.name}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">
                      F/H
                    </td>
                    <td className="p-2">{viewPatient.F_H_Name}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">Age</td>
                    <td className="p-2">{viewPatient.age}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">Gender</td>
                    <td className="p-2">{viewPatient.gender}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">Phone</td>
                    <td className="p-2">{viewPatient.phone}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">Address</td>
                    <td className="p-2">{viewPatient.address}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">Check Up</td>
                    <td className="p-2">{viewPatient.doctor}</td>
           
                  </tr>
<tr>
         <td className="font-semibold p-2 bg-gray-50">Register By</td>
                    <td className="p-2">{viewPatient.handledBy}</td>
</tr>
<tr className="bg-gray-100">
  <td colSpan="2" className="font-semibold text-center p-2 text-blue-700">
    Appointment Info
  </td>
</tr>

{viewPatient.Appointment && viewPatient.Appointment.length > 0 ? (
  viewPatient.Appointment.map((app, index) => (
    <React.Fragment key={index}>
      <tr>
        <td className="font-semibold p-2 bg-gray-50">Visit #{index + 1}</td>
        <td className="p-2"> {app.NoofTime || 1}</td>
      </tr>
      <tr>
        <td className="font-semibold p-2 bg-gray-50">Fees</td>
        <td className="p-2">Rs {app.fees || 0}</td>
      </tr>
      <tr>
        <td className="font-semibold p-2 bg-gray-50">Discount</td>
        <td className="p-2">{app.reAppHandleby }</td>
      </tr>
     
    </React.Fragment>
  ))
) : (
  <tr>
    <td colSpan="2" className="p-2 text-center text-gray-500">
      No appointment info
    </td>
  </tr>
)}













                  <tr className="bg-gray-100">
                    <td
                      colSpan="2"
                      className="font-semibold text-center p-2 text-blue-700"
                    >
                      Admission Info
                    </td>
                  </tr>

                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">Admit</td>
                    <td className="p-2">{viewPatient.admission.isadmitted?'Yes':'No'}</td>
                  </tr>
                 
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">Department</td>
                    <td className="p-2">{viewPatient.admission.department}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">OPD Doctor</td>
                    <td className="p-2">{viewPatient.admission.operating_doctorName}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">Room No</td>
                    <td className="p-2">{viewPatient.admission.roomNo}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">
                       Type</td>
                    <td className="p-2">{viewPatient.admission.Admission_Type}</td>
                  </tr>
                
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">
                       Handle By</td>
                    <td className="p-2">{viewPatient.admission.Operating_handledBy}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">
                       Admitted At</td>
                    <td className="p-2"> {viewPatient.admission.admittedAt?new Date(viewPatient.admission.admittedAt).toLocaleString() :"Not Admit"}</td>
                  </tr>
                   <tr className="bg-gray-100">
                    <td
                      colSpan="2"
                      className="font-semibold text-center p-2 text-blue-700"
                    >
                      Payment Info
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">Total</td>
                    <td className="p-2"> Rs {viewPatient.payment.total_payment?viewPatient.payment.total_payment:"0.0"} </td>
                  </tr>
                   <tr>
                    <td className="font-semibold p-2 bg-gray-50">Status</td>
                    <td className="p-2"> {viewPatient.payment.paymentstatus}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">Received</td>
                    <td className="p-2">Rs {viewPatient.payment.received_payment?viewPatient.payment.received_payment:"0.0"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">Pending</td>
                    <td className="p-2">Rs {viewPatient.payment.pending_payment?viewPatient.payment.pending_payment:"0.0"}</td>
                  </tr>
                 
                   <tr className="bg-gray-100">
                    <td
                      colSpan="2"
                      className="font-semibold text-center p-2 text-blue-700"
                    >
                      Discharge Info
                    </td>
                  </tr>
                <tr>
                    <td className="font-semibold p-2 bg-gray-50">Dicharge</td>
               <td className="p-2">{viewPatient.discharge.isdischarge?'Yes':'No'}</td>

                  </tr>
                <tr>
                    <td className="font-semibold p-2 bg-gray-50">Dicharge By</td>
               <td className="p-2">{viewPatient.discharge.dischargedBy}</td>

                  </tr>
                </tbody>
              </table>
            </div>

           
          </div>
        </div>
      )}

      
      {/* 🔹 Edit Payment Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setEditModal(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-semibold mb-4 text-blue-700">
              Edit Payment Info
            </h3>

            <div className="space-y-3">
              <p>
                <span className="font-semibold">Patient ID:</span>{" "}
                {editModal.patientID}
              </p>
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {editModal.name}
              </p>
              <p>
                <span className="font-semibold">Total Payment:</span>{" "}
                {editModal.payment.total_payment}
              </p>

              <label className="block font-medium">Payment Status</label>
              <select
                name="status"
                value={updatePayment.status}
                onChange={handlePaymentChange}
                className="w-full border rounded-md p-2"
              >
                <option value="">Select</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Partial">Partial</option>
              </select>

              <label className="block font-medium">Receiving Amount (Rs)</label>
              <input
                type="number"
                name="received_payment"
        
                value={updatePayment.received_payment}
                onChange={handlePaymentChange}
                className="w-full border rounded-md p-2"
              />

              <button
                onClick={handleSaveUpdate}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
{reAppModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
      
      <button
        onClick={() => setReAppModal(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
      >
        <X size={20} />
      </button>

      <h3 className="text-lg font-semibold mb-4 text-green-700">
        Re-Appointment
      </h3>

      <p><span className="font-semibold">Patient ID:</span> {reAppData.patientID}</p>

      <div className="mt-4">
        <label className="block font-medium">Fees</label>
     <input
  type="number"
  name="fees"
  value={reAppData.fees}
  onChange={handleReAppChange}
  className="w-full border p-2 rounded-lg"
/>

      </div>
              <div>
                <label className="block text-gray-700 mb-1">Handled By</label>
               <select name="ReappHandleby" value={reAppData.ReappHandleby} onChange={handleReAppChange} className="w-full ...">
  <option value="">Select Reception User</option>
  {AllReceptionUser.map((user) => {
    const active = isWithinShift(user.shiftStart, user.shiftEnd);
    return (
      <option key={user.id} value={user.name} disabled={!active}>
        {user.name} {active ? "(Active)" : "(Absent)"}
      </option>
    );
  })}
</select>

              </div>
      <button
        onClick={handleSaveReApp}
        className="w-full mt-5 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        Save Re-Appointment
      </button>
    </div>
  </div>
)}


    </div>
  );
};

export default ReceptionMain;
