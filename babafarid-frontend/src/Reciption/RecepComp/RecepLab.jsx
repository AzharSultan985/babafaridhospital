import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useReception } from "../RecepContext/RecepContext";
import { useReactToPrint } from "react-to-print";
import { AppContext } from "../../context/AppContext";

/**
 * ✅ Updates:
 * - Summary tests shown in TABLE (Remove action).
 * - Summary table body scroll after 4 rows (header fixed).
 * - No quantity (each test only once).
 * - Manual Discount (PKR) and finalAmount sent to API.
 * - ✅ Today lab-tested patients table (only today's labInvoices).
 * - ✅ Today table: per patient "today tests total amount" (sum of today's invoices)
 * - ✅ Footer: grand total of all today's patients (accurate)
 */

// Icons (no extra dependency)
const PlusIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6 7h12M9 7V5h6v2m-7 3v9m8-9v9M8 20h8a2 2 0 002-2V7H6v11a2 2 0 002 2z"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Helpers
const toNum = (v) => {
  const n = Number(String(v ?? "").replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : 0;
};

const formatPKR = (n) => `₨${toNum(n).toLocaleString()}`;

// invoiceDate in your data looks like "27/01/2026"
const getTodayGB = () => new Date().toLocaleDateString("en-GB");

const safeNum = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

// ✅ sum of today's lab invoice amounts for ONE patient
const getTodayPatientLabTotal = (patient, todayStr) => {
  const lab = Array.isArray(patient?.labInvoices) ? patient.labInvoices : [];
  return lab
    .filter((inv) => String(inv?.invoiceDate || "").trim() === todayStr)
    .reduce((sum, inv) => {
      // prefer finalAmount, else totalAmount, else 0
      return sum + safeNum(inv?.finalAmount ?? inv?.totalAmount ?? 0);
    }, 0);
};

const SUMMARY_SCROLL_HEIGHT_PX = 240;

const LabInvoice = () => {
  const {
    createLabInvoice,
    setAlert,
    loading,
    labTests,
    fetchLabTests,
    RecepInvoiceData,
    FetchAllPatient,
    AllPatient,AllReceptionUser
  } = useReception();

  const componentRef = useRef();
  // const { AllDoctors, FetchAllDoctors, } = useContext(AppContext);

  // ✅ Fetch all patients (initial + interval)
  useEffect(() => {
    FetchAllPatient?.();
    const interval = setInterval(() => {
      FetchAllPatient?.();
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  // FORM STATE
  const [mrNo, setMrNo] = useState("");
  const [search, setSearch] = useState("");
  const [selectedTests, setSelectedTests] = useState([]);
  const [handledBy, setHandledBy] = useState("");
  const [discountPKR, setDiscountPKR] = useState("");

  // INVOICE VIEW STATE
  const [showInvoice, setShowInvoice] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);

  // Print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Lab Invoice",
  });

  // Fetch tests once
  useEffect(() => {
    fetchLabTests?.();
  }, []);

  // Handle invoice success -> show invoice view
  useEffect(() => {
    if (RecepInvoiceData?.success && RecepInvoiceData?.patient) {
      setPatientInfo(RecepInvoiceData.patient);
      setShowInvoice(true);
    }
  }, [RecepInvoiceData]);

  // Filter tests from already loaded data
  const filteredTests = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return labTests || [];
    return (labTests || []).filter((t) =>
      String(t?.name || "").toLowerCase().includes(q)
    );
  }, [labTests, search]);

  // Add test (NO duplicates)
  const addTest = (test) => {
    setSelectedTests((prev) => {
      const exists = prev.some((t) => t._id === test._id);
      if (exists) return prev;
      return [...prev, { ...test }];
    });
  };

  const removeTest = (testId) => {
    setSelectedTests((prev) => prev.filter((t) => t._id !== testId));
  };

  const clearAll = () => {
    setSelectedTests([]);
    setSearch("");
    setDiscountPKR("");
  };

  const totalAmount = useMemo(() => {
    return selectedTests.reduce((sum, t) => sum + toNum(t.rate), 0);
  }, [selectedTests]);

  const discountAmount = useMemo(() => {
    const d = toNum(discountPKR);
    if (d <= 0) return 0;
    return Math.min(d, totalAmount);
  }, [discountPKR, totalAmount]);

  const finalAmount = useMemo(() => {
    return Math.max(totalAmount - discountAmount, 0);
  }, [totalAmount, discountAmount]);

  // ✅ cache today string once (consistent throughout render)
  const todayStr = useMemo(() => getTodayGB(), []);

  // ✅ TODAY lab-tested patients only
  const todayLabPatients = useMemo(() => {
    return (AllPatient || []).filter((p) => {
      const lab = Array.isArray(p?.labInvoices) ? p.labInvoices : [];
      if (!lab.length) return false;
      return lab.some((inv) => String(inv?.invoiceDate || "").trim() === todayStr);
    });
  }, [AllPatient, todayStr]);

  // ✅ GRAND TOTAL (all today patients)
  const todayGrandTotal = useMemo(() => {
    return todayLabPatients.reduce((sum, p) => {
      return sum + getTodayPatientLabTotal(p, todayStr);
    }, 0);
  }, [todayLabPatients, todayStr]);

  // Create invoice (send accurate payload)
  const handleCreateInvoice = async () => {
    const patientId = parseInt(mrNo, 10);

    if (!mrNo.trim() || !Number.isFinite(patientId)) {
      return setAlert?.({
        isAlert: true,
        alertmsg: "Enter valid MR No",
        type: "error",
      });
    }

    if (!selectedTests.length) {
      return setAlert?.({
        isAlert: true,
        alertmsg: "Select tests",
        type: "error",
      });
    }

    if (!handledBy.trim()) {
      return setAlert?.({
        isAlert: true,
        alertmsg: "Select Lab Staff (Handled By)",
        type: "error",
      });
    }

    if (toNum(discountPKR) > 0 && toNum(discountPKR) > totalAmount) {
      setAlert?.({
        isAlert: true,
        alertmsg: "Discount was higher than total, adjusted automatically.",
        type: "warning",
      });
    }

    const invoiceData = {
      patientId,
      tests: selectedTests.map((t) => ({
        testId: t._id,
        name: t.name,
        rate: toNum(t.rate),
        total: toNum(t.rate),
      })),
      totalAmount,
      discountAmount,
      finalAmount,
      handledBy,
      invoiceDate: todayStr, // ✅ same format as stored invoices
    };

    await createLabInvoice(invoiceData);
  };
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
  // =========================
  // INVOICE PRINT VIEW
  // =========================
  
  // =========================
  // FORM VIEW
  // =========================
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Lab Test Invoice</h1>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 w-full md:w-auto">
          <div className="w-full md:w-72">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">
              MR No
            </label>
            <input
              type="text"
              value={mrNo}
              onChange={(e) => setMrNo(e.target.value)}
              placeholder="e.g. 1001"
              className="mt-2 w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="w-full md:w-72">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">
              Handled By (Lab Staff)
            </label>
            <select
              value={handledBy}
              onChange={(e) => setHandledBy(e.target.value)}
              className="mt-2 w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
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
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT: Tests Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="p-5 border-b bg-gradient-to-r from-blue-50 to-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="w-full sm:max-w-md">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                    Search Test
                  </label>
                  <div className="mt-2 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <SearchIcon />
                    </span>
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Type test name..."
                      className="w-full pl-11 pr-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-auto max-h-[520px]">
              <table className="w-full " >
                <thead className="sticky top-0 z-10 bg-white">
                  <tr className="text-left border-b">
                    <th className="px-5 py-3 text-xs font-black text-gray-600 uppercase tracking-wider">
                      Test
                    </th>
                    <th className="px-5 py-3 text-xs font-black text-gray-600 uppercase tracking-wider text-right">
                      Rate
                    </th>
                    <th className="px-5 py-3 text-xs font-black text-gray-600 uppercase tracking-wider text-right">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTests?.length ? (
                    filteredTests.map((test) => {
                      const isSelected = selectedTests.some((t) => t._id === test._id);
                      return (
                        <tr key={test._id} className="border-b scroll-m-0 hover:bg-blue-50/40 transition">
                          <td className="px-5 py-4">
                            <div className="font-semibold text-gray-900">{test.name}</div>
                          </td>

                          <td className="px-5 py-4 text-right font-extrabold text-green-700">
                            {formatPKR(test.rate)}
                          </td>

                          <td className="px-5 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => addTest(test)}
                              disabled={isSelected}
                              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed transition"
                              title={isSelected ? "Already added" : "Add test"}
                            >
                              <PlusIcon className="w-5 h-5" />
                              <span className="hidden sm:inline">
                                {isSelected ? "Added" : "Add"}
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-5 py-10 text-center text-gray-500">
                        No tests found for “{search}”
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ✅ TODAY PATIENTS TABLE */}
          <div className="mt-8 bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="p-5 border-b bg-gray-50 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">
                Today Lab Test Patients</h3>
                
              </div>

              <span className="text-sm font-black text-blue-700">
                Total Patients: {todayLabPatients.length}
              </span>
            </div>

            <div className="overflow-auto max-h-[420px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-white z-10 border-b">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-black text-gray-600 uppercase tracking-wider">
                      MR No
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-black text-gray-600 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-black text-gray-600 uppercase tracking-wider">
                      F/H Name
                    </th>
                    <th className="px-5 py-3 text-right text-xs font-black text-gray-600 uppercase tracking-wider">
                      Today Tests Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {todayLabPatients.length ? (
                    todayLabPatients.map((p) => {
                      const rowTotal = getTodayPatientLabTotal(p, todayStr);
                      return (
                        <tr key={p._id} className="border-b scroll-m-0 hover:bg-blue-50/40">
                          <td className="px-5 py-4 font-black text-gray-900">{p.patientID}</td>
                          <td className="px-5 py-4">
                            <div className="font-bold text-gray-900">{p.name}</div>
                            
                          </td>
                          <td className="px-5 py-4 text-sm text-gray-800">{p.F_H_Name || "—"}</td>
                          <td className="px-5 py-4 text-right">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-black">
                              {formatPKR(rowTotal)}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-5 py-10 text-center text-gray-500">
                        آج کے لیے کوئی Lab Test patient نہیں ملا۔
                      </td>
                    </tr>
                  )}
                </tbody>

                {/* ✅ FOOTER GRAND TOTAL */}
                <tfoot>
                  <tr className="sticky bottom-0 bg-gray-100 border-t-2">
                    <td colSpan={3} className="px-5 py-4 text-right font-extrabold text-gray-900">
                       Total 
                    </td>
                    <td className="px-5 py-4 text-right font-black text-blue-700">
                      {formatPKR(todayGrandTotal)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT: Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border sticky top-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">
                Summary <span className="text-gray-500">({selectedTests.length})</span>
              </h3>
              <button
                type="button"
                onClick={clearAll}
                className="text-sm font-bold text-gray-500 hover:text-gray-900"
              >
                Clear
              </button>
            </div>

            {/* Summary Table */}
            <div className="border rounded-2xl overflow-hidden bg-white">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-xs font-black text-gray-600 uppercase tracking-wider">
                      Test
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-black text-gray-600 uppercase tracking-wider">
                      Rate
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-black text-gray-600 uppercase tracking-wider">
                      Remove
                    </th>
                  </tr>
                </thead>
              </table>

              <div className="overflow-y-auto" style={{ maxHeight: SUMMARY_SCROLL_HEIGHT_PX }}>
                <table className="w-full">
                  <tbody>
                    {!selectedTests.length ? (
                      <tr>
                        <td colSpan={3} className="px-4 py-6 text-sm text-gray-500 text-center">
                          No tests selected yet.
                        </td>
                      </tr>
                    ) : (
                      selectedTests.map((test) => (
                        <tr key={test._id} className="border-b last:border-b-0 hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="text-sm font-semibold text-gray-900">{test.name}</div>
                          </td>
                          <td className="px-4 py-3 text-right text-sm font-extrabold text-gray-900">
                            {formatPKR(test.rate)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              type="button"
                              onClick={() => removeTest(test._id)}
                              className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                              title="Remove"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Discount */}
            <div className="border-t pt-5 mt-6 space-y-4">
              <div>
                <label className="text-xs font-black text-gray-700 uppercase tracking-wide">
                  Discount (PKR) - Manual
                </label>
                <input
                  type="number"
                  min="0"
                  value={discountPKR}
                  onChange={(e) => setDiscountPKR(e.target.value)}
                  placeholder="0"
                  className="mt-2 w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="bg-gray-50 border rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-semibold">Subtotal</span>
                  <span className="font-black text-gray-900">{formatPKR(totalAmount)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-semibold">Discount</span>
                  <span className="font-black text-red-600">-{formatPKR(discountAmount)}</span>
                </div>
                <div className="flex items-center justify-between text-base pt-2 border-t">
                  <span className="text-gray-900 font-extrabold">Final Total</span>
                  <span className="font-black text-blue-700 text-lg">{formatPKR(finalAmount)}</span>
                </div>
              </div>

              <button
                onClick={handleCreateInvoice}
                disabled={!mrNo.trim() || !selectedTests.length || !handledBy.trim() || loading}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-2xl font-extrabold text-base hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg transition"
              >
                {loading ? "Saving..." : "✅ CREATE & PRINT INVOICE"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabInvoice;