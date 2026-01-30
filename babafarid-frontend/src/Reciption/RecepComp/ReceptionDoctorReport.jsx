// src/Reciption/RecepComp/ReceptionDoctorReport.jsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../context/AppContext";
import ReceptionDoctorReportPrint from "./ReceptionDoctorReportPrint";

const ReceptionDoctorReport = () => {
  const { AllDoctors = [], FetchAllDoctors } = useContext(AppContext);

  // ✅ STATES
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [checkedPatients, setCheckedPatients] = useState([]);
  const [operatedPatients, setOperatedPatients] = useState([]);
  const [showPrint, setShowPrint] = useState(false);

  // ✅ single date (yyyy-mm-dd)
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // ✅ Fetch doctors
  useEffect(() => {
    FetchAllDoctors?.();
  }, [FetchAllDoctors]);

  // ✅ Filter logic (single day)
  useEffect(() => {
    if (!selectedDoctor || !selectedDate) {
      setCheckedPatients([]);
      setOperatedPatients([]);
      return;
    }

    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0);

    const isSameDay = (d) => {
      if (!d) return false;
      const date = new Date(d);
      date.setHours(0, 0, 0, 0);
      return date.getTime() === selected.getTime();
    };

    // ✅ Checked patients
    const checked = (selectedDoctor.CheckedPatients || [])
      .flatMap((p) =>
        (p.Appointment || []).map((a) => ({
          mrNo: p.patientID,
          date: a.Appdate,
          fees: Number(a.fees || 0),
        }))
      )
      .filter((p) => isSameDay(p.date));

    // ✅ Operated patients
    const operated = (selectedDoctor.OperatedPatients || [])
      .flatMap((p) =>
        p.admission?.admittedAt
          ? [
              {
                mrNo: p.patientID,
                date: p.admission.admittedAt,
                fees: Number(p.payment?.total_payment || 0),
              },
            ]
          : []
      )
      .filter((p) => isSameDay(p.date));

    setCheckedPatients(checked);
    setOperatedPatients(operated);
  }, [selectedDoctor, selectedDate]);

  // ✅ Totals
  const totalChecked = useMemo(
    () => checkedPatients.reduce((s, p) => s + Number(p.fees || 0), 0),
    [checkedPatients]
  );

  const totalOperated = useMemo(
    () => operatedPatients.reduce((s, p) => s + Number(p.fees || 0), 0),
    [operatedPatients]
  );

  const grandTotal = totalChecked + totalOperated;

  const handleDoctorSelect = (id) => {
    const doc = AllDoctors.find((d) => d._id === id) || null;
    setSelectedDoctor(doc);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Doctor Report (Daily)</h1>

        <button
          onClick={() => {
            setShowPrint(true);
            setTimeout(() => window.print(), 200);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
          disabled={!selectedDoctor}
        >
          Print Report
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        {/* Doctor Select */}
        <div>
          <label className="font-semibold">Select Doctor</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={selectedDoctor?._id || ""}
            onChange={(e) => handleDoctorSelect(e.target.value)}
          >
            <option value="">-- Select Doctor --</option>
            {AllDoctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name} ({doc.department})
              </option>
            ))}
          </select>
        </div>

        {/* Single Date */}
        <div>
          <label className="font-semibold">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>

      {/* TABLES */}
      <ReportTable title="Checked Patients" data={checkedPatients} total={totalChecked} />
      <ReportTable title="Operated Patients" data={operatedPatients} total={totalOperated} />

      {/* GRAND TOTAL */}
      <div className="bg-green-100 p-4 rounded-xl text-xl font-bold text-right">
        Grand Total: Rs. {grandTotal}
      </div>

      {/* PRINT COMPONENT */}
      {showPrint && (
        <ReceptionDoctorReportPrint
          doctor={selectedDoctor}
          selectedDate={selectedDate}
          checkedPatients={checkedPatients}
          operatedPatients={operatedPatients}
          totalChecked={totalChecked}
          totalOperated={totalOperated}
          onAfterPrint={() => setShowPrint(false)}
        />
      )}
    </div>
  );
};

export default ReceptionDoctorReport;

/* 🔁 Table Component */
const ReportTable = ({ title, data, total }) => (
  <div className="bg-white rounded-xl shadow">
    <h2 className="text-xl font-semibold p-3">
      {title} — {data.length}
    </h2>

    <div className="max-h-72 overflow-y-auto border-t">
      <table className="w-full text-left">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="p-2">MR No</th>
            <th className="p-2">Date</th>
            <th className="p-2">Fees</th>
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((p, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{p.mrNo}</td>
                <td className="p-2">{new Date(p.date).toLocaleDateString()}</td>
                <td className="p-2">{p.fees}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">
                No records
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="bg-gray-100 p-3 flex justify-between font-bold">
      <span>Total</span>
      <span>Rs. {total}</span>
    </div>
  </div>
);
