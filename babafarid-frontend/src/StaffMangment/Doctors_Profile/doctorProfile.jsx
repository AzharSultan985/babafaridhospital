import React, { useContext ,useEffect} from 'react';
import { DoctorsContext } from "../staffContext/doctorsContext.jsx";

const DoctorDashboard = () => {
  // Dummy Patient Data
  

  

  const {DoctorData,refreshDoctorData} = useContext(DoctorsContext);
  useEffect(()=>{
    refreshDoctorData()
  },[])
console.log(DoctorData);
  if (!DoctorData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-slate-600">Loading doctor profile...</p>
        </div>
      </div>
    );
  }
  const checkedTotalFees = DoctorData.CheckedPatients.reduce(
    (sum, patient) => sum + (patient.fees - patient.discount),
    0
  );
  const operatedTotalFees = DoctorData.OperatedPatients.reduce(
    (sum, patient) => sum + (patient.fees - patient.discount),
    0
  );
  const grandTotal = checkedTotalFees + operatedTotalFees;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Doctor Header – more professional / desaturated */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 shadow-xl border border-slate-700/60">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-slate-800/70 rounded-2xl flex items-center justify-center shadow-md border border-slate-600/70">
                <svg className="w-10 h-10 text-slate-100" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
                 Dr. {DoctorData.name}
                </h1>
                <div className="flex items-center gap-2 text-sm text-slate-200 mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">{DoctorData.department}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center lg:text-right">
              <div className="bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-700">
                <div className="text-xl font-semibold text-white">
                  {DoctorData.CheckedPatients.length}
                </div>
                <div className="text-xs text-slate-300 uppercase tracking-wide">
                  Checkups Today
                </div>
              </div>
              <div className="bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-700">
                <div className="text-xl font-semibold text-white">
                  {DoctorData.OperatedPatients.length}
                </div>
                <div className="text-xs text-slate-300 uppercase tracking-wide">
                  Operations
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkup Patients Section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-sky-600 text-white rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900">
              Checkup Patients Today
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  <th className="px-5 py-3 text-left w-24">Patient ID</th>
                  <th className="px-5 py-3 text-left w-48">Patient Name</th>
                  <th className="px-5 py-3 text-right w-32">Fees</th>
                  <th className="px-5 py-3 text-right w-32">Discount</th>
                  <th className="px-5 py-3 text-right w-36">Net Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DoctorData.CheckedPatients.map((patient) => (
                  <tr
                    key={patient._id}
                    className="hover:bg-slate-50 transition-colors duration-150"
                  >
                    <td className="px-5 py-3 font-mono text-xs font-semibold text-sky-700 bg-sky-50/60">
                      {patient.patientID}
                    </td>
                    <td className="px-5 py-3 text-sm font-medium text-slate-900">
                      {patient.name}
                    </td>
                    <td className="px-5 py-3 text-right text-sm font-semibold text-slate-800">
                      ₨{patient.fees}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full text-xs font-medium border border-rose-100">
                        -₨{patient.discount}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-sm text-emerald-700 bg-emerald-50/60">
                      ₨{(patient.fees - patient.discount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Checkup Footer */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Total Checkup Fees
            </p>
            <p className="text-lg font-semibold text-slate-900">
              ₨{checkedTotalFees}
            </p>
          </div>
        </div>

        {/* Operated Patients Section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900">
              Operated Patients
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  <th className="px-5 py-3 text-left w-24">Patient ID</th>
                  <th className="px-5 py-3 text-left w-48">Patient Name</th>
                  <th className="px-5 py-3 text-right w-40">Surgery Fees</th>
                  <th className="px-5 py-3 text-right w-32">Discount</th>
                  <th className="px-5 py-3 text-right w-40">Total Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DoctorData.OperatedPatients.map((patient) => (
                  <tr
                    key={patient.patientID}
                    className="hover:bg-slate-50 transition-colors duration-150"
                  >
                    <td className="px-5 py-3 font-mono text-xs font-semibold text-emerald-700 bg-emerald-50/60">
                      {patient.patientID}
                    </td>
                    <td className="px-5 py-3 text-sm font-medium text-slate-900">
                      {patient.name}
                    </td>
                    <td className="px-5 py-3 text-right text-sm font-semibold text-slate-800">
                    Rs{patient.fees}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full text-xs font-medium border border-rose-100">
                        -Rs {patient.discount}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-sm text-emerald-700 bg-emerald-50/60">
                      ₨{(patient.fees - patient.discount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Surgery Footer */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Total Surgery Payments
            </p>
            <p className="text-lg font-semibold text-slate-900">
              ₨{operatedTotalFees}
            </p>
          </div>
        </div>

        {/* Grand Total */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 text-center shadow-xl border border-slate-800">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 mb-2">
            Grand Total Revenue Today
          </h3>
          <p className="text-3xl lg:text-4xl font-semibold tracking-tight">
            ₨{grandTotal}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
