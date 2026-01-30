// ✅ LabRecepInvoice.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useReception } from "../RecepContext/RecepContext";

const LAB_INVOICE_COUNTER_KEY = "labInvoiceCounter"; // localStorage key
const LAB_INVOICE_START = 1000;

const LabRecepInvoice = () => {
  const { LabRecepInvoiceData, setLabRecepInvoiceData } = useReception();

  // ✅ current date (screen + print)
  const currentDate = useMemo(() => new Date(), []);
  const formattedDate = useMemo(() => {
    return currentDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, [currentDate]);

  // ✅ Invoice ID from localStorage (1000, 1001, 1002...)
  const [invoiceId, setInvoiceId] = useState(null);
const displayInvoiceId = LabRecepInvoiceData?.invoiceId ?? invoiceId ?? "—";
const formattedDateShort = useMemo(() => {
  const d = new Date(currentDate);
  const mm = d.getMonth() + 1;       // 1
  const yy = String(d.getFullYear()).slice(-2); // 26
  return `${mm}-${yy}`;        // 28-1-26
}, [currentDate]);

const bfhPatientId = useMemo(() => {
  const idPart = String(displayInvoiceId ?? "—");
  return `BFH-${formattedDateShort}-${idPart}`;
}, [formattedDateShort, displayInvoiceId]);

  useEffect(() => {
    // if no data, no need to generate invoice number
    if (!LabRecepInvoiceData) return;

    // get current counter
    let counter = Number(localStorage.getItem(LAB_INVOICE_COUNTER_KEY));
    if (!Number.isFinite(counter) || counter < LAB_INVOICE_START) {
      counter = LAB_INVOICE_START;
    }

    // set current invoice id
    setInvoiceId(counter);

    // ✅ Save invoiceId inside context state (setLabRecepInvoiceData)
    setLabRecepInvoiceData((prev) => {
      if (!prev) return prev;
      // if already has invoiceId, don't overwrite
      if (prev.invoiceId) return prev;
      return { ...prev, invoiceId: counter, invoiceDate: formattedDate };
    });



    // IMPORTANT:
    // Increment counter ONLY ONCE per invoice screen load.
    // So next invoice will be counter+1
    localStorage.setItem(LAB_INVOICE_COUNTER_KEY, String(counter + 1));
  }, [LabRecepInvoiceData, formattedDate, setLabRecepInvoiceData]);

  if (!LabRecepInvoiceData) {
    return <div className="p-6 text-center">No Invoice Data Available</div>;
  }

  // ✅ Use stored invoiceId from data if present (preferred)

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
            width: 85mm;
            margin-left: 5mm;
            margin-top: 0;
            padding: 3mm 5mm;
            background: #fff;
            font-size: 12.5px;
            font-weight: bold;
            line-height: 1.55;
            letter-spacing: 0.35px;
            color: #000 !important;
            box-shadow: none;
          }
          table th, table td { padding: 3px 5px; }
          h1, h2, h3, p, td, th { color: #000 !important; }
          @page { size: 80mm auto; margin: 0; }
        }

        /* Screen view */
        .printable {
          width: 85mm;
          margin: 10px auto;
          padding: 8px;
          border: 1px solid #ddd;
          background: #fff;
          font-size: 13px;
          line-height: 1.6;
          letter-spacing: 0.35px;
        }
      `}</style>

      <div className="bg-white border rounded-md shadow-md px-4 py-2 max-w-md mx-auto mt-2 printable text-black font-bold">
        <h1 className="font-bold text-xl text-center mb-1">BABA FARID CLINICAl LAB</h1>
        <hr className="border-black mb-1" />

        <div className="flex justify-between mb-2">
          <div>
            {/* ✅ invoice id from local */}
            <p>Invoice #: {displayInvoiceId}</p>

<p>Patient ID: {bfhPatientId}</p>
<p>Name: {LabRecepInvoiceData.name}</p>
<p>F/H Name: {LabRecepInvoiceData.F_H_Name}</p>
<p>Age: {LabRecepInvoiceData.age}</p>
            {/* ✅ current date */}
            <p>Date: {LabRecepInvoiceData.invoiceDate || formattedDate}</p>

            <p>Print By: {LabRecepInvoiceData.handledBy}</p>
          </div>
        </div>

        <table className="w-full border mb-2">
          <thead>
            <tr className="bg-gray-200 border-b border-black">
              <th className="text-left px-1">TestName</th>
              <th className="text-right px-1"></th>
              <th className="text-right px-1">Amount</th>
            </tr>
          </thead>

          <tbody>
            {LabRecepInvoiceData.tests.map((test, index) => (
              <tr key={index} className="border-t border-gray-400">
                <td className="text-left px-1">{test.name}</td>
                <td className="text-center px-1"></td>
                <td className="text-center pl-10">{test.rate}</td>
              </tr>
            ))}
          </tbody>

          <tfoot className="border-t border-black">
            <tr>
              <td className="text-left px-1">No of Tests</td>
              <td></td>
              <td className="text-right px-1">{LabRecepInvoiceData.tests.length}</td>
            </tr>
            <tr>
              <td className="text-left px-1">Total</td>
              <td></td>
              <td className="text-right px-1">
                {Number(LabRecepInvoiceData.totalAmount || 0).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="text-left px-1">Discount</td>
              <td></td>
              <td className="text-right px-1">
                {Number(LabRecepInvoiceData.discountAmount || 0).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="text-left px-1">Net Total</td>
              <td></td>
              <td className="text-right px-1">
                {Number(LabRecepInvoiceData.finalAmount || 0).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="text-center mb-1">
          <p>Not valid for court</p>
          {/* ✅ Your required Urdu line */}
          <p>آپ کے ٹیسٹ  کروانے کا شکریہ۔ براہِ کرم یہ رسید لیب میں لے جا کر ٹیسٹ کروائیں۔</p>
        </div>

        <div className="text-center text-xs border-t border-black pt-1">
          Powered By <span className="font-bold">Azhar Sultan</span>
        </div>
      </div>

      <div className="w-full flex gap-2 justify-center print:hidden mt-3">
        <button
          onClick={() => {
            // optional: clear invoice data after print click
            setLabRecepInvoiceData("");
            window.print();
          }}
          className="px-4 py-2 w-[30%] bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Print Invoice
        </button>

        <Link
          to={"/recepition"}
          className="px-4 py-2 w-[20%] bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex justify-center items-center"
        >
          Back
        </Link>
      </div>
    </>
  );
};

export default LabRecepInvoice;