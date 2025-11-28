import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

import { Search } from "lucide-react";

const AdminPatientDetails = () => {
  const [patientID, setPatientID] = useState("");

const {
   handlePatientINFOFetch,
 patientINFO
  } = useContext(AppContext);
//console.log(patientINFO);

const handleFetch =async ()=>{

await handlePatientINFOFetch(patientID)

}
  return (
    <div className="p-4 w-full">
      {/* Search Section */}
      <div className="bg-white shadow-md rounded-md p-4 border">
        <h2 className="text-xl font-bold mb-3 text-gray-700">
          Search Patient Record
        </h2>

        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Enter Patient ID"
            value={patientID}
            onChange={(e) => setPatientID(e.target.value)}
            className="border p-2 rounded-md w-60"
          />

          <button
            onClick={handleFetch}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            <Search size={18} /> Search
          </button>
        </div>

    
      </div>

      {/* Patient Information Section */}
      {patientINFO && (
        <div className="mt-6 space-y-6">

          {/* Patient Basic Details */}
         <div className="bg-white shadow-md rounded-md border p-4">
  <h3 className="text-lg font-bold border-b pb-2 text-gray-700">
    Patient Information
  </h3>

  <div className="mt-4 overflow-x-auto">
    <table className="min-w-full border border-gray-200 rounded-md text-sm">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="p-2 border text-left">Field</th>
          <th className="p-2 border text-left">Details</th>
        </tr>
      </thead>

      <tbody className="text-gray-600">
        <tr className="hover:bg-gray-50">
          <td className="p-2 border font-semibold">Name</td>
          <td className="p-2 border">{patientINFO.name || "N/A"}</td>
        </tr>

        <tr className="hover:bg-gray-50">
          <td className="p-2 border font-semibold">F/H Name</td>
          <td className="p-2 border">{patientINFO.F_H_Name || "N/A"}</td>
        </tr>

        <tr className="hover:bg-gray-50">
          <td className="p-2 border font-semibold">Age</td>
          <td className="p-2 border">{patientINFO.age || "N/A"}</td>
        </tr>

        <tr className="hover:bg-gray-50">
          <td className="p-2 border font-semibold">Gender</td>
          <td className="p-2 border">{patientINFO.gender || "N/A"}</td>
        </tr>

        <tr className="hover:bg-gray-50">
          <td className="p-2 border font-semibold">Phone</td>
          <td className="p-2 border">{patientINFO.phone || "N/A"}</td>
        </tr>

        <tr className="hover:bg-gray-50">
          <td className="p-2 border font-semibold">Address</td>
          <td className="p-2 border">{patientINFO.address || "N/A"}</td>
        </tr>

        <tr className="hover:bg-gray-50">
          <td className="p-2 border font-semibold">Registered At</td>
          <td className="p-2 border">
            {patientINFO.createdAt
              ? new Date(patientINFO.createdAt).toLocaleString()
              : "N/A"}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


          {/* Doctor Checked / Appointment Section */}
        <div className="bg-white shadow-md rounded-md border p-4">
  <h3 className="text-lg font-bold border-b pb-2 text-gray-700">
    Doctor Checked History
  </h3>

  {patientINFO.Appointment.length === 0 ? (
    <p className="mt-3 text-gray-500">No appointments available.</p>
  ) : (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-2 border text-left">Visit No</th>
            <th className="p-2 border text-left">Fees (Rs)</th>
            <th className="p-2 border text-left">Handled By</th>
            <th className="p-2 border text-left">Date</th>
          </tr>
        </thead>

        <tbody className="text-gray-600">
          {patientINFO.Appointment.map((a, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="p-2 border">{a.NoofTime}</td>
              <td className="p-2 border">{a.fees}</td>
              <td className="p-2 border">{a.handledBy}</td>
              <td className="p-2 border">
                {new Date(a.Appdate).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>


          {/* Admission / Operation Info */}
         <div className="bg-white shadow-md rounded-md border p-4">
  <h3 className="text-lg font-bold border-b pb-2 text-gray-700">
    Admission & Operation Details
  </h3>

  {patientINFO.admission?.isadmitted ? (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-md text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-2 border text-left">Field</th>
            <th className="p-2 border text-left">Details</th>
          </tr>
        </thead>

        <tbody className="text-gray-600">
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-semibold">Department</td>
            <td className="p-2 border">{patientINFO.admission.department}</td>
          </tr>

          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-semibold">Room</td>
            <td className="p-2 border">{patientINFO.admission.roomNo}</td>
          </tr>

          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-semibold">OPD Doctor</td>
            <td className="p-2 border">{patientINFO.admission.operating_doctorName}</td>
          </tr>

          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-semibold">Admission Type</td>
            <td className="p-2 border">{patientINFO.admission.Admission_Type}</td>
          </tr>

          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-semibold">Handled By</td>
            <td className="p-2 border">{patientINFO.admission.Operating_handledBy}</td>
          </tr>

          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-semibold">Description</td>
            <td className="p-2 border">{patientINFO.admission.desc?patientINFO.admission.desc:"None"}</td>
          </tr>

          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-semibold">Admitted At</td>
            <td className="p-2 border">
              {new Date(patientINFO.admission.admittedAt).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    <p className="mt-3 text-gray-500">Patient was not admitted.</p>
  )}
</div>


          {/* Discharge Info */}
          <div className="bg-white shadow-md rounded-md border p-4">
  <h3 className="text-lg font-bold border-b pb-2 text-gray-700">
    Discharge Details
  </h3>

  {patientINFO.discharge?.isdischarge ? (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-md text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-2 border text-left">Field</th>
            <th className="p-2 border text-left">Details</th>
          </tr>
        </thead>

        <tbody className="text-gray-600">
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-semibold">Discharged By</td>
            <td className="p-2 border">
              {patientINFO.discharge.dischargedBy || "N/A"}
            </td>
          </tr>

          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-semibold">Date</td>
            <td className="p-2 border">
              {patientINFO.discharge.dischargedAt
                ? new Date(patientINFO.discharge.dischargedAt).toLocaleString()
                : "N/A"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    <p className="mt-3 text-gray-500">Patient not discharged.</p>
  )}
</div>


          {/* Pharmacy Medicines / Invoices */}
         {/* Pharmacy Medicines / Invoices */}
<div className="bg-white shadow-md rounded-md border p-4">
  <h3 className="text-lg font-bold border-b pb-2 text-gray-700">
    Pharmacy & Medicines
  </h3>

  {(!patientINFO.pharmacyInvoices || patientINFO.pharmacyInvoices.length === 0) ? (
    <p className="mt-3 text-gray-500">No pharmacy records available.</p>
  ) : (
    <div className="mt-4 space-y-6">
      {patientINFO.pharmacyInvoices.map((inv, idx) => (
        <div key={idx} className="border rounded-md p-4 bg-gray-50">
          
          {/* Invoice Header */}
          <div className="mb-3 grid grid-cols-2 text-sm gap-4">
            <p><span className="font-semibold">Invoice ID:</span> {inv.InvoiceID}</p>
            <p><span className="font-semibold">Date:</span> {inv.date}</p>
            <p><span className="font-semibold">Total Bill:</span> {inv.BillData?.Total}</p>
            <p><span className="font-semibold">Discount:</span> {inv.BillData?.DicountRate}%</p>
            <p><span className="font-semibold">Net Total:</span> {inv.BillData?.NetTotal}</p>
          </div>

          {/* Medicines Table */}
          <table className="w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Medicine Name</th>
                <th className="border p-2">Price (Each)</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>

            <tbody>
              {inv.medicines.map((m, i) => (
                <tr key={i} className="text-center">
                  <td className="border p-2">{m.Medname}</td>
                  <td className="border p-2">{m.PricePerTablet}</td>
                  <td className="border p-2">{m.quantity}</td>
                  <td className="border p-2">{m.PriceOFMedPerBuy}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      ))}
    </div>
  )}
</div>

        </div>
      )}
    </div>
  );
};

export default AdminPatientDetails;
