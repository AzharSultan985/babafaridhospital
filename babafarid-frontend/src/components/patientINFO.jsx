import React, { useState } from "react";

import { Search } from "lucide-react";

const AdminPatientDetails = () => {
  const [patientID, setPatientID] = useState("");
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!patientID.trim()) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `http://localhost:3002/api/fetch-single-patient/${patientID}`
      );

      if (res.data.success) {
        setPatient(res.data.patient);
      } else {
        setError("Patient not found.");
      }
    } catch (err) {
      setError("Unable to fetch patient.");
    } finally {
      setLoading(false);
    }
  };

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

        {loading && <p className="text-blue-600 mt-3">Loading...</p>}
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>

      {/* Patient Information Section */}
      {patient && (
        <div className="mt-6 space-y-6">

          {/* Patient Basic Details */}
          <div className="bg-white shadow-md rounded-md border p-4">
            <h3 className="text-lg font-bold border-b pb-2 text-gray-700">
              Patient Information
            </h3>

            <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
              <p><span className="font-semibold">Name:</span> {patient.name}</p>
              <p><span className="font-semibold">F/H Name:</span> {patient.F_H_Name}</p>
              <p><span className="font-semibold">Age:</span> {patient.age}</p>
              <p><span className="font-semibold">Gender:</span> {patient.gender}</p>
              <p><span className="font-semibold">Phone:</span> {patient.phone}</p>
              <p><span className="font-semibold">Address:</span> {patient.address}</p>
              <p><span className="font-semibold">Registered By:</span> {patient.registerby}</p>
              <p><span className="font-semibold">Created At:</span> {new Date(patient.createdAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Doctor Checked / Appointment Section */}
          <div className="bg-white shadow-md rounded-md border p-4">
            <h3 className="text-lg font-bold border-b pb-2 text-gray-700">
              Doctor Checked History
            </h3>

            {patient.Appointment.length === 0 ? (
              <p className="mt-3 text-gray-500">No appointments available.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {patient.Appointment.map((a, index) => (
                  <div
                    key={index}
                    className="border rounded-md p-3 bg-gray-50"
                  >
                    <p><span className="font-semibold">Visit No:</span> {a.NoofTime}</p>
                    <p><span className="font-semibold">Fees:</span> Rs. {a.fees}</p>
                    <p><span className="font-semibold">Handled By:</span> {a.handledBy}</p>
                    <p><span className="font-semibold">Date:</span> {new Date(a.Appdate).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Admission / Operation Info */}
          <div className="bg-white shadow-md rounded-md border p-4">
            <h3 className="text-lg font-bold border-b pb-2 text-gray-700">
              Admission & Operation Details
            </h3>

            {patient.admission?.isadmitted ? (
              <div className="mt-3 text-sm grid grid-cols-2 gap-4">
                <p><span className="font-semibold">Department:</span> {patient.admission.department}</p>
                <p><span className="font-semibold">Room:</span> {patient.admission.roomNumber}</p>
                <p><span className="font-semibold">Doctor:</span> {patient.admission.operating_doctorName}</p>
                <p><span className="font-semibold">Type:</span> {patient.admission.Admission_Type}</p>
                <p><span className="font-semibold">Handled By:</span> {patient.admission.Operating_handledBy}</p>
                <p><span className="font-semibold">Description:</span> {patient.admission.desc}</p>
                <p><span className="font-semibold">Admitted At:</span> {new Date(patient.admission.admittedAt).toLocaleString()}</p>
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

            {patient.discharge?.isdischarge ? (
              <div className="mt-3 text-sm grid grid-cols-2 gap-4">
                <p><span className="font-semibold">Discharged By:</span> {patient.discharge.dischargedBy}</p>
                <p><span className="font-semibold">Date:</span> {new Date(patient.discharge.dischargedAt).toLocaleString()}</p>
              </div>
            ) : (
              <p className="mt-3 text-gray-500">Patient not discharged.</p>
            )}
          </div>

          {/* Pharmacy Medicines / Invoices */}
          <div className="bg-white shadow-md rounded-md border p-4">
            <h3 className="text-lg font-bold border-b pb-2 text-gray-700">
              Pharmacy & Medicines
            </h3>

            {patient.pharmacyInvoices?.length === 0 ? (
              <p className="mt-3 text-gray-500">No pharmacy records available.</p>
            ) : (
              <ul className="mt-3">
                {patient.pharmacyInvoices.map((med, idx) => (
                  <li key={idx} className="p-2 border rounded-md mb-2 bg-gray-50">
                    Invoice ID: {med}
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default AdminPatientDetails;
