import React, { useEffect, useState } from "react";
import { Eye, X, Search } from "lucide-react";
import { useReception } from "../RecepContext/RecepContext";

const ReceptionMain = () => {

  const {FetchAllPatient,AllPatient } = useReception();

 useEffect(() => {
  FetchAllPatient(); // initial fetch

  const interval = setInterval(() => {
    FetchAllPatient();
  }, 60000); // 10 seconds

  return () => clearInterval(interval); // cleanup
}, []);


  const [viewPatient, setViewPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = AllPatient.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.F_H_Name.toLowerCase().includes(searchTerm.toLowerCase()) 
   
  );

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
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Father/Husband</th>
              <th className="border px-4 py-2 text-left">Doctor</th>
              <th className="border px-4 py-2 text-left">Fees (Rs)</th>
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
                  <td className="border px-4 py-2">{p.fees}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => setViewPatient(p)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 flex items-center justify-center mx-auto"
                    >
                      <Eye size={16} />
                    </button>
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
                      Father/Husband
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
                    <td className="font-semibold p-2 bg-gray-50">Doctor</td>
                    <td className="p-2">{viewPatient.doctor}</td>
                  </tr>

                  <tr className="bg-gray-100">
                    <td
                      colSpan="2"
                      className="font-semibold text-center p-2 text-blue-700"
                    >
                      Admission Info
                    </td>
                  </tr>

                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">Fees</td>
                    <td className="p-2">{viewPatient.fees} Rs</td>
                  </tr>
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">Received</td>
                    <td className="p-2">{viewPatient.fees} Rs</td>
                  </tr>
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">Pending</td>
                    <td className="p-2">0 Rs</td>
                  </tr>
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">Admit</td>
                    <td className="p-2">
                      {viewPatient.isAdmit ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold p-2 bg-gray-50">Discharged</td>
                    <td className="p-2">
                      {viewPatient.isDischarged ? "Yes" : "No"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-auto pt-4 border-t text-center text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceptionMain;
