import React, { useState ,useEffect} from "react";
import { LogOut, UserPlus, FileText, CheckCircle ,Contact2 ,TestTube} from "lucide-react";

import RecepAlert from "./RecepAlert";
import { useReception } from "../RecepContext/RecepContext";

import RegisterPatient from "./RegisterPatient"; // Your registration component
import AdmissionForm from "./admissionform";
import ReceptionMain from "./Recepition";
import DischargePatient from "./dischargePatient";
import LabInvoice from "./RecepLab";



const ReceptionDashboard = () => {
  const { LogoutRecepUSer} = useReception();

  
  // --- Page States ---
  const [showRegister, setShowRegister] = useState(true);
  const [showAdmission, setShowAdmission] = useState(false);
  const [showDischarge, setShowDischarge] = useState(false);
  const [showReception, setShowReception] = useState(false);
  const { Alert ,setAlert} = useReception();
// Clear alert after 2 seconds whenever it appears
  useEffect(() => {
    if (Alert.isAlert) {
      const timer = setTimeout(() => {
        setAlert({ isAlert: false, alertmsg: "", type: "" });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [Alert, setAlert]);
  // Reset all to false
  const resetAll = () => {
    setShowRegister(false);
    setShowAdmission(false);
    setShowDischarge(false);
    setShowReception(false);
      setShowLabInvoice(false);

  };
const [showLabInvoice, setShowLabInvoice] = useState(false);

  const navButtonClasses = (active) =>
    `flex items-center p-2 w-full rounded-lg transition-colors duration-200 ${
      active ? "bg-blue-600 text-white shadow-md" : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <>
    {Alert.isAlert && <RecepAlert alertMsg={Alert.alertmsg} type={Alert.type}/>}

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-[#282829] flex flex-col justify-between">
        <div className="px-3 py-4 overflow-y-auto h-full">
          <a href="/" className="flex items-center mb-5">
            <img src="/logo.png" className="h-12 w-15" alt="logo" />
            <span className="self-center text-xl font-semibold text-white">BabafaridHospital</span>
          </a>

          <ul className="space-y-2 font-medium">
            <li>
              <button
                onClick={() => {
                  resetAll();
                  setShowReception(true);
                }}
                className={navButtonClasses(showReception)}
              >
              <Contact2 size={18} />
                <span className="ms-3">Recepition</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  resetAll();
                  setShowRegister(true);
                }}
                className={navButtonClasses(showRegister)}
              >
                <UserPlus size={18} />
                <span className="ms-3">Register Patient</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  resetAll();
                  setShowAdmission(true);
                }}
                className={navButtonClasses(showAdmission)}
              >
                <FileText size={18} />
                <span className="ms-3">Admission / Operation</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  resetAll();
                  setShowDischarge(true);
                }}
                className={navButtonClasses(showDischarge)}
              >
                <CheckCircle size={18} />
                <span className="ms-3">Discharge Patient</span>
              </button>
            </li>
<li>
  <button
    onClick={() => {
      resetAll();
      setShowLabInvoice(true);
    }}
    className={navButtonClasses(showLabInvoice)}
  >
    <TestTube size={18} />
    <span className="ms-3">Lab Invoice</span>
  </button>
</li>
            <li>
              <button
              onClick={LogoutRecepUSer}
              className="flex items-center p-2 w-full rounded-lg text-gray-300 hover:bg-red-600 hover:text-white">
              
              
                {/* <LogOut size={18} /> */}
                <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>

          <div className="absolute bottom-4 left-0 w-full px-3 text-center text-gray-400 text-sm">
            <p className="font-medium">
              Built with ❤️ by <span className="font-semibold text-white">Azhar Sultan</span>
            </p>
            <p className="text-xs mt-1">Version 4.2.5</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-6">
        {showRegister && <RegisterPatient />}
        {showAdmission && <AdmissionForm />}
        {showDischarge && <DischargePatient />}
        {showReception && <ReceptionMain />}
       {showLabInvoice && <LabInvoice />} {/* Add this */}

      </main>
    </>
  );
};

export default ReceptionDashboard;
