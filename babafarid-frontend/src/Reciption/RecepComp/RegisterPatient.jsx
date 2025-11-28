import React, { useEffect, useState } from "react";
import { useReception } from "../RecepContext/RecepContext";

const Reception = () => {
  const { patient, setPatient,  registerPatient ,FetchAllReceptionUser,AllReceptionUser ,AllDoctors,FetchAllDoctors} = useReception();
  const [isModal, setModal] = useState(false);
 const [currentTime, setCurrentTime] = useState(""); // store current time in HH:mm

  useEffect(() => {
    FetchAllReceptionUser();
    FetchAllDoctors()
    const timer = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    }, 60000); // update every minute

    return () => clearInterval(timer);
  }, []);
const handleChange = (e) => {
  const { name, value } = e.target;

  setPatient((prev) => {
    let updated = { ...prev, [name]: value };

    // When doctor is selected, set original fee and fees
    if (name === "doctor") {
      const selectedDoc = AllDoctors.find((doc) => doc.name === value);
      if (selectedDoc) {
        updated.originalFee = selectedDoc.fees || 0; // store original doctor's fee
        updated.fees = selectedDoc.fees || 0;       // set initial fees
      }
    }

    // When discount changes, calculate from original fee
    if (name === "discount") {
      const discount = Number(value) || 0;
      const originalFee = Number(prev.originalFee) || 0;
      const discountedFee = originalFee - (originalFee * discount) / 100;
      updated.fees = Math.round(discountedFee); // round to nearest integer
    }

    return updated;
  });
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    setModal(true); // ✅ Open modal when form is submitted
  };

const confirmSubmit = async () => {
  try {
    await registerPatient(patient); // ✅ already sets the alert inside

    // ✅ Close modal
    setModal(false);

    // ✅ Clear patient object correctly
    setPatient({
      name: "",
      F_H_Name: "",
      age: "",
      gender: "",
      phone: "",
      address: "",
      doctor: "",
      fees: "",
      discount:"",
      handledBy: "",
      originalFee: 0
    });

    // ✅ Optional: if you want auto-hide alert, leave it to registerPatient
    // Do not set alert again here, it’s already set
  } catch (err) {
    //console.error(err);
  }
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
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center py-10 px-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
              🧾 Reception Desk - Patient Registration
            </h2>

            {/* ✅ FIXED onSubmit */}
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              {/* Patient Name */}
              <div>
                <label className="block text-gray-700 mb-1">Patient Name</label>
                <input
                  type="text"
                  name="name"
                  value={patient.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">F/H Name</label>
                <input
                  type="text"
                  name="F_H_Name"
                  value={patient.F_H_Name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={patient.age}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={patient.gender}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={patient.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Address */}
              <div className="col-span-2">
                <label className="block text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={patient.address}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Doctor */}
              <div>
                <label className="block text-gray-700 mb-1">Doctor</label>
             <select
  name="doctor"
  value={patient.doctor}
  onChange={handleChange}
  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
  required
>
  <option value="">Select Doctor</option>

  {AllDoctors.map((doc, i) => (
    <option key={i} value={doc.name}>
     Dr.{doc.name} 
    </option>
  ))}
</select>

              </div>

              {/* Fees */}
              <div>
                <label className="block text-gray-700 mb-1">Fees (Rs)</label>
                <input
                disabled
                  type="number"
                  name="fees"
                  value={patient.fees}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
             <div>
  <label className="block text-gray-700 mb-1">Discount %</label>
  <input
    type="number"
    name="discount"
    value={patient.discount}
    onChange={handleChange}
    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
  />
</div>


              {/* Handled By */}
              {/* Handled By */}
              <div>
                <label className="block text-gray-700 mb-1">Handled By</label>
               <select name="handledBy" value={patient.handledBy} onChange={handleChange} className="w-full ...">
  <option value="">Select Receptionist</option>
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
              {/* Submit */}
              <div className="col-span-2 text-right">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
                >
                  Register Patient
                </button>
              </div>
            </form>
          </div>
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

export default Reception;
