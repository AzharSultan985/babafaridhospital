import React, { useState } from "react";
import { Eye } from "lucide-react";

const ReceptionMain = () => {
  const initialPatients = [
    {
      patientID: 1001,
      name: "Ali Khan",
      F_H_Name: "Ahmed Khan",
      doctor: "Dr. Ahmad - Cardiologist",
      fees: 5000,
      isAdmit: true,
      isDischarged: false,
      age: 32,
      gender: "Male",
      phone: "03001234567",
      address: "Street 1, City",
    },
    {
      patientID: 1002,
      name: "Fatima Bibi",
      F_H_Name: "Hassan Bibi",
      doctor: "Dr. Fatima - Gynecologist",
      fees: 7000,
      isAdmit: true,
      isDischarged: false,
      age: 28,
      gender: "Female",
      phone: "03007654321",
      address: "Street 2, City",
    },
    {
      patientID: 1003,
      name: "Usman Ali",
      F_H_Name: "Sami Ali",
      doctor: "Dr. Usman - Dentist",
      fees: 3000,
      isAdmit: false,
      isDischarged: false,
      age: 40,
      gender: "Male",
      phone: "03009876543",
      address: "Street 3, City",
    },
  ];

  const [patients, setPatients] = useState(initialPatients);
  const [viewPatient, setViewPatient] = useState(null);
  const [dischargeModal, setDischargeModal] = useState(null);

  const handleDischarge = (patient) => {
    setDischargeModal(patient);
  };

  const confirmDischarge = () => {
    setPatients((prev) =>
      prev.map((p) =>
        p.patientID === dischargeModal.patientID
          ? { ...p, isDischarged: true }
          : p
      )
    );
    setDischargeModal(null);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
        🏥 Patient Management
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">ID</th>
              <th className="border px-3 py-2 text-left">Name</th>
              <th className="border px-3 py-2 text-left">Father/Husband</th>
              <th className="border px-3 py-2 text-left">Doctor</th>
              <th className="border px-3 py-2 text-left">Fees</th>
              <th className="border px-3 py-2 text-left">Admit</th>
              <th className="border px-3 py-2 text-left">Discharge</th>
              <th className="border px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.patientID} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{p.patientID}</td>
                <td className="border px-3 py-2">{p.name}</td>
                <td className="border px-3 py-2">{p.F_H_Name}</td>
                <td className="border px-3 py-2">{p.doctor}</td>
                <td className="border px-3 py-2">{p.fees}</td>
                <td className="border px-3 py-2">
                  {p.isAdmit ? "Yes" : "No"}
                </td>
                <td className="border px-3 py-2">
                  {p.isDischarged ? "Yes" : "No"}
                </td>
                <td className="border px-3 py-2 flex gap-2">
                  {p.isAdmit && !p.isDischarged && (
                    <button
                      onClick={() => handleDischarge(p)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Discharge
                    </button>
                  )}

                  <button
                    onClick={() => setViewPatient(p)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Discharge Modal */}
      {dischargeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Discharge</h3>
            <p className="mb-6">
              Are you sure you want to discharge <b>{dischargeModal.name}</b>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDischargeModal(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDischarge}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Discharge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Patient Details */}
      {viewPatient && (
        <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50 overflow-y-auto">
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Patient Details</h3>
              <button onClick={() => setViewPatient(null)}>✖</button>
            </div>

            <div className="space-y-3">
              <p><b>ID:</b> {viewPatient.patientID}</p>
              <p><b>Name:</b> {viewPatient.name}</p>
              <p><b>Father/Husband:</b> {viewPatient.F_H_Name}</p>
              <p><b>Age:</b> {viewPatient.age}</p>
              <p><b>Gender:</b> {viewPatient.gender}</p>
              <p><b>Phone:</b> {viewPatient.phone}</p>
              <p><b>Address:</b> {viewPatient.address}</p>
              <p><b>Doctor:</b> {viewPatient.doctor}</p>
              <p><b>Fees:</b> {viewPatient.fees}</p>
              <p><b>Admit:</b> {viewPatient.isAdmit ? "Yes" : "No"}</p>
              <p><b>Discharge:</b> {viewPatient.isDischarged ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceptionMain;
