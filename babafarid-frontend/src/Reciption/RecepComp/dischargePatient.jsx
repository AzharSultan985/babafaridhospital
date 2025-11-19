import React, { useState ,useEffect} from "react";
import { Search, X, CheckCircle } from "lucide-react";
import { useReception } from "../RecepContext/RecepContext";

const DischargePatient = () => {
  const [patientID, setPatientID] = useState("");
  const [patient, setPatient] = useState(null);
  const [staff, setStaff] = useState("");

  const [alert, setAlert] = useState(null);
 const [currentTime, setCurrentTime] = useState(""); // store current time in HH:mm

  const { AllPatient,FetchAllPatient, handleDischargePatient, FetchAllReceptionUser,AllReceptionUser} = useReception();
useEffect(() => {
  FetchAllPatient(); // initial fetch
}, []);

  useEffect(() => {
    FetchAllReceptionUser();
    const timer = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    }, 60000); // update every minute

    return () => clearInterval(timer);
  }, []);
console.log('AllPatient',AllPatient);

  // 🔹 Fetch Patient from AllPatient by ID
 const handleFetch = () => {
  // convert both to numbers for reliable comparison
  const enteredID = Number(patientID);
  const found = AllPatient.find((p) => Number(p.patientID) === enteredID);

  if (found) {
    setPatient(found);
    setAlert(null);
  } else {
    setPatient(null);
    setAlert({ type: "error", msg: "No patient found with this ID." });
  }
};


  // 🔹 Save Discharge Info in Object State
  const handleDischarge = () => {
    if (!staff) {
      setAlert({ type: "error", msg: "Please select the staff name." });
      return;
    }

    const dischargeData = {
      id: patient.patientID,
      dischargedBy: staff,
      date: new Date().toLocaleString(),
    };
    console.log('dischargeData',dischargeData);
    
handleDischargePatient(dischargeData)
   
    setAlert({ type: "success", msg: "Patient marked as discharged." });
    setPatient(null);
    setStaff("");
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-center border-b pb-2">
          🏥 Discharge Patient
        </h2>

        {alert && (
          <div
            className={`text-sm p-2 mb-3 rounded-md ${
              alert.type === "error"
                ? "bg-red-100 text-red-600 border border-red-300"
                : "bg-green-100 text-green-600 border border-green-300"
            }`}
          >
            {alert.msg}
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Enter Patient ID"
            value={patientID}
            onChange={(e) => setPatientID(e.target.value)}
            className="flex-grow border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handleFetch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-1"
          >
            <Search size={16} /> Fetch
          </button>
        </div>
      </div>

      {/* --- Discharge Modal --- */}
      {patient && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-xl shadow-2xl border border-gray-200 p-6 relative">
            <button
              onClick={() => setPatient(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-semibold text-center border-b pb-2 mb-4 text-blue-700">
              Discharge Confirmation
            </h3>

            <div className="space-y-3 text-sm">
              <p>
                <span className="font-semibold text-gray-700">Patient ID:</span>{" "}
                {patient.patientID}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Name:</span>{" "}
                {patient.name}
              </p>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Discharged By (Reception Staff)
                </label>
                <select
                  value={staff}
                  onChange={(e) => setStaff(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select Staff</option>
               

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
                onClick={handleDischarge}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <CheckCircle size={18} /> Discharge Patient
              </button>
            </div>
          </div>
        </div>
      )}

    
    
    </div>
  );
};

export default DischargePatient;
