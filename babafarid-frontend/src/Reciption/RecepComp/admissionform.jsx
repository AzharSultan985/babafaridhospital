import React, { useState, useEffect } from "react";
import { useReception } from "../RecepContext/RecepContext";

const AdmissionForm = () => {
  const [patientId, setPatientId] = useState("");
  const [showForm, setShowForm] = useState(false);

  const {
    FetchPatientById,
    PatientData,
    setAddmissiondata,
    Addmissiondata,
    createAdmission,
  } = useReception();
  const [isModal, setModal] = useState(false);

  // 🔹 Fetch patient by ID or phone
  const handleFetch = async (e) => {
    e.preventDefault();
    if (patientId.trim() === "") {
      alert("Please enter Patient ID or Phone Number");
      return;
    }
      // setModal(true);
    await FetchPatientById(patientId);
    setShowForm(true);
  };

  // 🔹 Update admission form values
  const handleAdmission = (e) => {
    const { name, value } = e.target;

    // Update state normally
    setAddmissiondata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Auto calculate pending payment
  useEffect(() => {
    const total = parseFloat(Addmissiondata.total_payment || 0);
    const received = parseFloat(Addmissiondata.received_payment || 0);
    const pending = total - received;

    if (!isNaN(pending)) {
      setAddmissiondata((prev) => ({
        ...prev,
        pending_payment: pending >= 0 ? pending : 0,
      }));
    }
  }, [Addmissiondata.total_payment, Addmissiondata.received_payment]);

  // 🔹 Submit admission data
  const handleSubmit = async (e) => {
    e.preventDefault();
setModal(true)
  
  };
const confirmSubmit = async () => {
  // Call the createAdmission function from context
  await createAdmission(Addmissiondata);

  // Close the modal
  setModal(false);

  // Optionally, clear the form
  setAddmissiondata({
    operating_doctor: "",
    department: "",
    roomNo: "",
    Admission_Type: "",
    Operating_handledBy: "",
    total_payment: "",
    received_payment: "",
    pending_payment: "",
    paymentstatus: "",
  });
};

  return (
<>

    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
          🏥 Patient Admission Form
        </h2>

        {/* 🔹 Search Patient */}
        <form onSubmit={handleFetch} className="mb-6">
          <label className="block text-gray-700 mb-1">
            Patient ID / Phone Number
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter Patient ID or Phone"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
            >
              Fetch
            </button>
          </div>
        </form>

        {/* 🔹 Admission Form */}
        {showForm && PatientData.length > 0 && (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-4 border-t pt-6"
          >
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                value={PatientData[0]?.name || ""}
                disabled
                type="text"
                className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Doctor</label>
              <input
                name="operating_doctor"
                value={Addmissiondata.operating_doctor || ""}
                onChange={handleAdmission}
                type="text"
                placeholder="e.g. Dr. Ahmad"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Department</label>
              <input
                name="department"
                value={Addmissiondata.department || ""}
                onChange={handleAdmission}
                type="text"
                placeholder="e.g. Cardiology"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Room No</label>
              <input
                name="roomNo"
                value={Addmissiondata.roomNo || ""}
                onChange={handleAdmission}
                type="text"
                placeholder="e.g. 12A"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Admission Type</label>
              <select
                name="Admission_Type"
                value={Addmissiondata.Admission_Type || ""}
                onChange={handleAdmission}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Type</option>
                <option value="Emergency">Emergency</option>
                <option value="Routine">Routine</option>
                <option value="Referral">Referral</option>
                <option value="Observation">Observation</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Handled By</label>
              <input
                name="Operating_handledBy"
                value={Addmissiondata.Operating_handledBy || ""}
                onChange={handleAdmission}
                type="text"
                placeholder="Receptionist name"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* 💰 Billing Section */}
            <div className="col-span-2 border-t pt-5 mt-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                💰 Billing Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">
                    Total Fees (Rs)
                  </label>
                  <input
                    name="total_payment"
                    value={Addmissiondata.total_payment || ""}
                    onChange={handleAdmission}
                    type="number"
                    placeholder="Enter total fees"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Received Payment (Rs)
                  </label>
                  <input
                    name="received_payment"
                    value={Addmissiondata.received_payment || ""}
                    onChange={handleAdmission}
                    type="number"
                    placeholder="Enter received amount"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Pending Payment (Rs)
                  </label>
                  <input
                    name="pending_payment"
                    value={Addmissiondata.pending_payment || 0}
                    disabled
                    type="number"
                    className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Payment Status
                  </label>
                  <select
                    name="paymentstatus"
                    value={Addmissiondata.paymentstatus || ""}
                    onChange={handleAdmission}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select</option>
                    <option value="Paid">Paid</option>
                    <option value="Partial">Partial</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="col-span-2 text-right mt-6">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition-all duration-200"
              >
                Admit Patient
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  {/* ✅ Confirmation Modal */}
      {isModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Save</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to save the patient details?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setModal(false)} // ✅ wrapped in arrow function
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
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
};

export default AdmissionForm;
