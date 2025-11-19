import { QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router-dom";
import { useReception } from "../RecepContext/RecepContext";

const RecepInvoice = () => {
  const { RecepInvoiceData} = useReception();
console.log('patiet',RecepInvoiceData);

  if (!RecepInvoiceData) {
    return <div>No Invoice Data Available</div>;
  }

  // Auto generate Invoice number and date
  
  const currentDate = new Date().toLocaleDateString("en-GB");
  const qrValue = `Patient: ${RecepInvoiceData.patientID}`;

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
    body * {
      visibility: hidden;
    }
    .printable, .printable * {
      visibility: visible;
    }
    .printable {
      position: absolute;
      top: 0;                 /* ✅ starts from very top */
      left: 0;
      width: 85mm;            /* thermal readable width */
      margin-left: 5mm;       /* ✅ left margin safe zone */
      margin-top: 0;          /* ✅ remove all top margin */
      padding: 3mm 5mm;       /* light balanced padding */
      background: #fff;
      font-size: 12.5px;
      font-weight: bold;
      line-height: 1.55;
      letter-spacing: 0.35px;
      color: #000 !important;
      box-shadow: none;
    }
    table th, table td {
      padding: 3px 5px;
    }
    h1, h2, h3, p, td, th {
      color: #000 !important;
    }
    @page {
      size: 80mm auto;
      margin: 0;  /* ✅ removes default printer margin */
    }
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
        <h1 className="font-bold text-xl text-center mb-1">
          BABA FARID Hospital 
        </h1>
        <hr className="border-black mb-2" />

        <div className="flex justify-between mb-2">
          <div>
            <p>Patient ID: {RecepInvoiceData.patientID || "N/A"}</p>
            <p>Date: {currentDate}</p>
            <p>Print By: {RecepInvoiceData.handledBy}</p>
          </div>
          <div>
            <QRCodeCanvas value={qrValue} size={60} />
          </div>
        </div>

        <table className="w-full border mb-2">
          <tbody>
            <tr>
              <td className="font-semibold">Patient Name:</td>
              <td>{RecepInvoiceData.name}</td>
            </tr>
            <tr>
              <td className="font-semibold">Patient Name:</td>
              <td>{RecepInvoiceData.F_H_Name}</td>
            </tr>
            <tr>
              <td className="font-semibold">Age / Gender:</td>
              <td>
                {RecepInvoiceData.age} / {RecepInvoiceData.gender}
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Doctor:</td>
              <td>{RecepInvoiceData.doctor || "N/A"}</td>
            </tr>
            
            <tr>
              <td className="font-semibold">Fees:</td>
              <td>Rs. {RecepInvoiceData.fees || "0.00"}</td>
            </tr>
          </tbody>
        </table>

        <div className="text-center mt-3 border-t border-black pt-2 text-xs">
          <p>بابا فرید ہسپتال آنے کا شکریہ</p>
          <p>کسی بھی سوال کے لیے، استقبالیہ ڈیسک سے رابطہ کریں۔</p>
        </div>

        <div className="text-center text-xs border-t border-black pt-1 mt-1">
          Powered By <span className="font-bold">CodeTrust By Azhar</span>
        </div>
      </div>

      <div className="w-full flex gap-2 justify-center print:hidden mt-3">
        <button
          onClick={() => window.print()}
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

export default RecepInvoice;
