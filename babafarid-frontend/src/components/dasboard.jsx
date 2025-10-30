import { useContext, useState } from "react";
import { AuthContext } from "../context/LoginContext";
import { AppContext } from "../context/AppContext";
import { usePharmacy } from "../Pharmacy/ContextPharma/PharmaContext";

import IndoorMed from "./Indoor_Med";
import Home from "./home";
import HandlePharmacy from "./Pharmacy";
import Alert from "./alert";
import AddANewStockIndoor from "./addANewStackIndoor";
import AddANewStockPharmacy from "./addNewStockPharmacy";
import PharmacyReport from "../Pharmacy/Report/pharmaReport";
import UpdateIndoorStock from "./updateIndoorMed";
import UpdateStockPharmacy from "./updatepharmacyMed";

const Dashboard = () => {
  const { LogoutAdmin } = useContext(AuthContext);
  const { IsMedAddAlert, IsMedDelAlert } = useContext(AppContext);
  const { alertMsg, alertType } = usePharmacy();

  // --- Page States ---
  const [IsIndoorMed, setIsIndoorMed] = useState(false);
  const [IsPharmacy, setIsPharmacy] = useState(false);
  const [showAddIndoorStock, setShowAddIndoorStock] = useState(false);
  const [showAddStockPharmacy, setShowAddStockPharmacy] = useState(false);
  const [showUpdateIndoorStock, setShowUpdateIndoorStock] = useState(false);
  const [showUpdateStockPharmacy, setShowUpdateStockPharmacy] = useState(false);
  const [showPharmacyReport, setShowPharmacyReport] = useState(false);

  // --- Dropdown visibility ---
  const [showAddStockMenu, setShowAddStockMenu] = useState(false);
  const [showUpdateStockMenu, setShowUpdateStockMenu] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState(false);

  // --- Dashboard Detection ---
  const isDashboard =
    !IsIndoorMed &&
    !IsPharmacy &&
    !showAddIndoorStock &&
    !showAddStockPharmacy &&
    !showUpdateIndoorStock &&
    !showUpdateStockPharmacy &&
    !showPharmacyReport;

  const resetAll = () => {
    setIsIndoorMed(false);
    setIsPharmacy(false);
    setShowAddIndoorStock(false);
    setShowAddStockPharmacy(false);
    setShowUpdateIndoorStock(false);
    setShowUpdateStockPharmacy(false);
    setShowPharmacyReport(false);
  };

  const navButtonClasses = (active) =>
    `flex items-center p-2 w-full rounded-lg transition-colors duration-200 
    ${
      active
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <>
      {/* Alert */}
      {alertMsg && <Alert alertMsg={alertMsg} type={alertType} />}

      {/* Medicine Alert */}
      {(IsMedAddAlert || IsMedDelAlert) && (
        <section className="flex justify-center w-full fixed h-[10vh]">
          <div
            className="flex items-center w-full max-w-xs mt-4 p-4 space-x-4 text-gray-200 bg-gray-900 divide-x divide-gray-700 rounded-lg shadow-sm"
            role="alert"
          >
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
            <img src="/logo.png" className="h-12 w-15 ml-[-10px]" alt="logo" />
            <span className="self-center text-xl font-semibold text-white">
              BabafaridHospital
            </span>
          </a>

          <ul className="space-y-2 font-medium">
            {/* Dashboard */}
            <li>
              <button onClick={resetAll} className={navButtonClasses(isDashboard)}>
                <span className="ms-3">Dashboard</span>
              </button>
            </li>

            {/* Indoor */}
            <li>
              <button
                onClick={() => {
                  resetAll();
                  setIsIndoorMed(true);
                }}
                className={navButtonClasses(IsIndoorMed)}
              >
                <span className="ms-3">Indoor Medicine</span>
              </button>
            </li>

            {/* Pharmacy */}
            <li>
              <button
                onClick={() => {
                  resetAll();
                  setIsPharmacy(true);
                }}
                className={navButtonClasses(IsPharmacy)}
              >
                <span className="ms-3">Pharmacy</span>
              </button>
            </li>

            {/* Add New Stock */}
            <li className="relative">
              <button
                onClick={() => setShowAddStockMenu((prev) => !prev)}
                className="flex justify-between items-center w-full p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white"
              >
                <span className="ms-3">Add New Stock</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showAddStockMenu ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showAddStockMenu && (
                <ul className="w-full bg-[#333] border border-gray-700 rounded-lg shadow-lg overflow-hidden mt-2">
                  <li>
                    <button
                      onClick={() => {
                        resetAll();
                        setShowAddStockPharmacy(true);
                        setShowAddStockMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                    >
                      Pharmacy
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        resetAll();
                        setShowAddIndoorStock(true);
                        setShowAddStockMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                    >
                      Indoor
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* Update Stock */}
            <li className="relative">
              <button
                onClick={() => setShowUpdateStockMenu((prev) => !prev)}
                className="flex justify-between items-center w-full p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white"
              >
                <span className="ms-3">Update Current Stock</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showUpdateStockMenu ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showUpdateStockMenu && (
                <ul className="w-full bg-[#333] border border-gray-700 rounded-lg shadow-lg overflow-hidden mt-2">
                  <li>
                    <button
                      onClick={() => {
                        resetAll();
                        setShowUpdateStockPharmacy(true);
                        setShowUpdateStockMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                    >
                      Pharmacy
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        resetAll();
                        setShowUpdateIndoorStock(true);
                        setShowUpdateStockMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                    >
                      Indoor
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* Reports */}
            <li className="relative">
              <button
                onClick={() => setShowReportMenu((prev) => !prev)}
                className="flex justify-between items-center w-full p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white"
              >
                <span className="ms-3">Reports</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showReportMenu ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showReportMenu && (
                <ul className="w-full bg-[#333] border border-gray-700 rounded-lg shadow-lg overflow-hidden mt-2">
                  <li>
                    <button
                      onClick={() => {
                        resetAll();
                        setShowPharmacyReport(true);
                        setShowReportMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                    >
                      Pharmacy Report
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* Sign Out */}
            <li>
              <button
                onClick={LogoutAdmin}
                className="flex items-center p-2 w-full rounded-lg text-gray-300 hover:bg-red-600 hover:text-white"
              >
                <span className="ms-3">Sign Out</span>
              </button>
            </li>
          </ul>

          {/* Footer */}
          <div className="absolute bottom-4 left-0 w-full px-3 text-center text-gray-400 text-sm">
            <p className="font-medium">
              Built with ❤️ by{" "}
              <span className="font-semibold text-white">CodeTrust by Azhar</span>
            </p>
            <p className="text-xs mt-1">Version 3.2.5</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      {isDashboard && <Home />}
      {IsIndoorMed && <IndoorMed />}
      {IsPharmacy && <HandlePharmacy />}

      <div className="ml-64 p-2">
        {showAddIndoorStock && <AddANewStockIndoor />}
        {showAddStockPharmacy && <AddANewStockPharmacy />}
        {showUpdateIndoorStock && <UpdateIndoorStock />}
        {showUpdateStockPharmacy && <UpdateStockPharmacy />}
        {showPharmacyReport && <PharmacyReport />}
      </div>
    </>
  );
};

export default Dashboard;
