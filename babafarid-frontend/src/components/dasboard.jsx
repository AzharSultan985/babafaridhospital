import { useContext, useState } from "react"
import { AuthContext } from '../context/LoginContext';
import { AppContext } from "../context/AppContext"
import IndoorMed from "./Indoor_Med";
import Home from "./home";
import HandlePharmacy from "./Pharmacy";
import Alert from "./alert";
import { usePharmacy } from "../Pharmacy/ContextPharma/PharmaContext";
import AddANewStockIndoor from "./addANewStackIndoor";
import AddANewStockPharmacy from "./addNewStockPharmacy";
import PharmacyReport from "../Pharmacy/Report/pharmaReport";

const Dashboard = () => {
  const { LogoutAdmin } = useContext(AuthContext)
  const { IsMedAddAlert, IsMedDelAlert } = useContext(AppContext)
 const {alertMsg,alertType} = usePharmacy();
  const [IsIndoorMed, setIsIndoorMed] = useState(false)
  const [Ispharmacy, setIspharmacy] = useState(false)
const [showStockMenu, setShowStockMenu] = useState(false);
const [showReportMenu, setShowReportMenu] = useState(false);
const [showAddIndoorStock, setShowAddIndoorStock] = useState(false);
const [showAddIstockPharmacy, setShowAddstockPharmacy] = useState(false);

const [showPharmacyReport, setShowPharmacyReport] = useState(false);



const isDashboard = !IsIndoorMed && !Ispharmacy && !showAddIndoorStock && !showAddIstockPharmacy && !showPharmacyReport;


  const navButtonClasses = (active) =>
    `flex items-center p-2 w-full rounded-lg transition-colors duration-200 
    ${active ? "bg-blue-600 text-white shadow-md" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`;

  return (
    <>




      {alertMsg && <Alert alertMsg={alertMsg} type={alertType} />}


      {(IsMedAddAlert || IsMedDelAlert) && (
        <section className="flex justify-center w-full fixed h-[10vh]">
          <div
            id="toast-simple"
            className="flex items-center w-full max-w-xs mt-4 p-4 space-x-4 text-gray-200 bg-gray-900 divide-x divide-gray-700 rounded-lg shadow-sm"
            role="alert"
          >
            {IsMedDelAlert ? (
              <svg
                className="w-6 h-6 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="M19 0H1a1 1 0..." />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-green-400 rotate-45"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
                />
              </svg>
            )}
            <div className="ps-4 text-sm font-normal">
              Medicine {IsMedDelAlert ? "Deleted" : "Updated"} Successfully.
            </div>
          </div>
        </section>
      )}

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen sm:translate-x-0 bg-[#282829]"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <a href="/" className="flex items-center ps-2.5 mb-5">
            <img
              src="/logo.png"
              className="h-12 w-15 ml-[-10px]"
              alt="babafarid"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              BabafaridHospital
            </span>
          </a>

          <ul className="space-y-2 font-medium">
            <li>
              <button
                onClick={() => { setIsIndoorMed(false); setIspharmacy(false); setShowAddIndoorStock(false); setShowPharmacyReport(false)}}
                className={navButtonClasses(isDashboard)}
              >
                <span className="ms-3">Dashboard</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => { setIsIndoorMed(true); setIspharmacy(false);setShowAddIndoorStock(false) ;

                  setShowAddstockPharmacy(false); setShowPharmacyReport(false)
                }}
                className={navButtonClasses(IsIndoorMed)}
              >
                <span className="ms-3">Indoor Medicine</span>
              </button>
            </li>
                

            <li>
              <button
                onClick={() => { setIspharmacy(true); setIsIndoorMed(false);setShowAddIndoorStock(false) ;
                  setShowAddstockPharmacy(false); setShowPharmacyReport(false)
                }}
                className={navButtonClasses(Ispharmacy)


                }
              >
                <span className="ms-3">Pharmacy</span>
              </button>
            </li>
        

{/* Add New Stock Dropdown */}
<li className="relative">
  <button
    onClick={() => setShowStockMenu((prev) => !prev)}
    className="flex justify-between items-center w-full p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
  >
    <span className="ms-3">Add New Stock</span>
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${
        showStockMenu ? "rotate-180" : "rotate-0"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  <div
    className={`transition-all duration-300 overflow-hidden ${
      showStockMenu ? "max-h-32 mt-2" : "max-h-0"
    }`}
  >
    <ul className="w-full bg-[#333] border border-gray-700 rounded-lg shadow-lg overflow-hidden">
      <li>
        <button      onClick={() => {
          setIspharmacy(false);
        setShowAddstockPharmacy(true)
      setShowAddIndoorStock(false);
      setIsIndoorMed(false);
      setShowStockMenu(false); setShowPharmacyReport(false) // optional: close dropdown
    
    }}
          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
        >
          Pharmacy
        </button>
      </li>
      <li>
        <button

         onClick={() => {
      setShowAddIndoorStock(true);
      setIsIndoorMed(false);
      setIspharmacy(false);
      setShowStockMenu(false);setShowAddstockPharmacy(false); setShowPharmacyReport(false)// optional: close dropdown
    }}
          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
        >
          Indoor
        </button>
      </li>
    </ul>
  </div>
</li>

{/* Reports Dropdown */}
<li className="relative">
  <button
    onClick={() => setShowReportMenu((prev) => !prev)}
    className="flex justify-between items-center w-full p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
  >
    <span className="ms-3">Reports</span>
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${
        showReportMenu ? "rotate-180" : "rotate-0"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  <div
    className={`transition-all duration-300 overflow-hidden ${
      showReportMenu ? "max-h-32 mt-2" : "max-h-0"
    }`}
  >
    <ul className="w-full bg-[#333] border border-gray-700 rounded-lg shadow-lg overflow-hidden">
     <li>
  <button
    onClick={() => {
      setShowPharmacyReport(true);
      setIsIndoorMed(false);
      setIspharmacy(false);
      setShowAddIndoorStock(false);
      setShowAddstockPharmacy(false);
      setShowReportMenu(false); // close dropdown
    }}
    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
  >
    Pharmacy Report
  </button>
</li>

   
    </ul>
  </div>
</li>

            <li>
              <button
                onClick={LogoutAdmin}
                className="flex items-center p-2 w-full rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors duration-200"
              >
                <span className="ms-3">Sign Out</span>
              </button>
            </li>
          </ul>

          {/* Footer */}
          <div className="absolute bottom-4 left-0 w-full px-3 text-center text-gray-400 text-sm">
            <p className="font-medium">Built with ❤️ by <span className="font-semibold text-white">CodeTrust by Azhar</span></p>
            <p className="text-xs mt-1">Version 2.0.1</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      {isDashboard && <Home />}
      {IsIndoorMed && <IndoorMed />}
      {Ispharmacy && <HandlePharmacy />}
<div className="ml-64  p-2 ">
  {showAddIndoorStock && <AddANewStockIndoor />}
</div>
<div className="ml-64 p-2 ">
  {showAddIstockPharmacy && <AddANewStockPharmacy />}
</div>
<div className="ml-64 p-2 ">
  {showPharmacyReport && <PharmacyReport />}
</div>


    </>
  )
}

export default Dashboard
