import React, { useEffect } from "react";

const ReceptionDoctorReportPrint = ({
  doctor,
  selectedDate, // yyyy-mm-dd
  checkedPatients = [],
  operatedPatients = [],
  totalChecked = 0,
  totalOperated = 0,
  onAfterPrint,
}) => {
  const grandTotal = Number(totalChecked || 0) + Number(totalOperated || 0);

  useEffect(() => {
    const handler = () => onAfterPrint?.();
    window.addEventListener("afterprint", handler);
    return () => window.removeEventListener("afterprint", handler);
  }, [onAfterPrint]);

  const printDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("en-GB")
    : new Date().toLocaleDateString("en-GB");

  return (
    <>
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: #fff;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body * { visibility: hidden; }
          .printable, .printable * { visibility: visible; }
          .printable {
            position: absolute;
            top: 0;
            left: 0;
            width: 85mm;            /* ✅ SAME as your invoice */
            margin-left: 5mm;       /* ✅ SAME */
            margin-top: 0;          /* ✅ SAME */
            padding: 3mm 5mm;       /* ✅ SAME */
            background: #fff;
            font-size: 12.5px;      /* ✅ SAME */
            font-weight: bold;      /* ✅ SAME */
            line-height: 1.55;      /* ✅ SAME */
            letter-spacing: 0.35px; /* ✅ SAME */
            color: #000 !important;
            box-shadow: none;
          }
          table th, table td { padding: 3px 5px; }
          h1, h2, h3, p, td, th { color: #000 !important; }
          @page { size: 80mm auto; margin: 0; } /* ✅ SAME */
        }

        /* Screen view */
        .printable {
          width: 85mm;
          margin: 10px auto;
          padding: 8px;
          border: 1px solid #ddd;
          background: #fff;
          font-size: 13px;
          line-height: 1.8;
          letter-spacing: 0.35px;
        }
      `}</style>

      <div className="bg-white border rounded-md shadow-md px-4 py-2 max-w-md mx-auto mt-2 printable text-black font-bold">
        <h1 className="font-bold text-xl text-center mb-1">BABA FARID Hospital</h1>
        <hr className="border-black mb-2" />

        {/* META */}
        <div className="flex justify-between mb-2">
          <div className="mr-10">
            <p>Doctor: <span className="text-[12px]">{doctor?.name || "—"}</span></p>
            <p>Dept: <span className="text-[12px]">{doctor?.department || "—"}</span></p>
            <p>Date: {printDate}</p>
          </div>

          <div>
            <h1 className="text-[12px] p-4">
              Report
            </h1>
          </div>
        </div>

        {/* CHECKED TABLE */}
        <div className="mb-2">
          <p className="font-bold border-b border-black pb-1">
            Checked Patients ({checkedPatients.length})
          </p>

          <table className="w-full border mt-1">
            <thead>
              <tr className="bg-gray-200 border-b border-black">
                <th className="text-left px-1">MR No</th>
                <th className="text-left px-1">Date</th>
                <th className="text-right px-1">Fees</th>
              </tr>
            </thead>
            <tbody>
              {checkedPatients.length ? (
                checkedPatients.map((p, i) => (
                  <tr key={i} className="border-t border-gray-400">
                    <td className="text-left px-1">{p.mrNo}</td>
                    <td className="text-left px-1">
                      {p.date ? new Date(p.date).toLocaleDateString("en-GB") : "—"}
                    </td>
                    <td className="text-right px-1">{Number(p.fees || 0)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-2">
                    No record
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between border-t border-black mt-1 pt-1">
            <span>Total Checked</span>
            <span>Rs. {Number(totalChecked || 0)}</span>
          </div>
        </div>

        {/* OPERATED TABLE */}
        <div className="mb-2">
          <p className="font-bold border-b border-black pb-1">
            Operated Patients ({operatedPatients.length})
          </p>

          <table className="w-full border mt-1">
            <thead>
              <tr className="bg-gray-200 border-b border-black">
                <th className="text-left px-1">MR No</th>
                <th className="text-left px-1">Date</th>
                <th className="text-right px-1">Fees</th>
              </tr>
            </thead>
            <tbody>
              {operatedPatients.length ? (
                operatedPatients.map((p, i) => (
                  <tr key={i} className="border-t border-gray-400">
                    <td className="text-left px-1">{p.mrNo}</td>
                    <td className="text-left px-1">
                      {p.date ? new Date(p.date).toLocaleDateString("en-GB") : "—"}
                    </td>
                    <td className="text-right px-1">{Number(p.fees || 0)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-2">
                    No record
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between border-t border-black mt-1 pt-1">
            <span>Total Operated</span>
            <span>Rs. {Number(totalOperated || 0)}</span>
          </div>
        </div>

        {/* NET TOTAL */}
        <div className="flex justify-between border-t border-black pt-2 mt-2 text-[14px] font-extrabold">
          <span>NET TOTAL</span>
          <span>Rs. {grandTotal}</span>
        </div>

        <div className="text-center text-xs border-t border-black pt-1 mt-2">
          Powered By <span className="font-bold">Azhar Sultan</span>
        </div>
      </div>
    </>
  );
};

export default ReceptionDoctorReportPrint;
    