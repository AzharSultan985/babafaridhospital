import { QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router-dom";
import { useReception } from "../RecepContext/RecepContext";

const AdmissionInvoice = () => {
  const { AdmissionInvoiceData} = useReception();
console.log('patiet',AdmissionInvoiceData);

  if (!AdmissionInvoiceData) {
    return <div>No Invoice Data Available</div>;
  }

  // Auto generate Invoice number and date
  
  const currentDate = new Date().toLocaleDateString("en-GB");
  const qrValue = `Patient: ${AdmissionInvoiceData.patientID}`;

  return (
    <>
      <style>{`
        @media print {
          body {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            margin: 0;
            padding: 0;
            background: #fff;
          }
          body * {
            visibility: hidden;
          }
          .printable, .printable * {
            visibility: visible;
          }
          .printable {
            position: relative;
            width: 85mm;
            margin: 1px auto;
            padding: 6mm;
            background: #fff;
            box-shadow: none;
            font-size: 12px;
            line-height: 1.5;
            letter-spacing: 0.3px;
          }
          @page {
            size: 80mm auto;
            margin: 0;
          }
        }

        .printable {
          width: 85mm;
          margin: 20px auto;
          padding: 10px;
          border: 1px solid #ddd;
          background: #fff;
          font-size: 12.5px;
          line-height: 1.6;
          letter-spacing: 0.3px;
        }
      `}</style>

      <div className="bg-white border rounded-md shadow-md px-4 py-2 max-w-md mx-auto mt-2 printable text-black font-bold">
        <h1 className="font-bold text-xl text-center mb-1">
          BABA FARID Hospital 
        </h1>
        <hr className="border-black mb-2" />

        <div className="flex justify-between mb-2">
          <div>
            <p>Patient ID: {AdmissionInvoiceData.patientID || "N/A"}</p>
            <p>Date: {currentDate}</p>
            <p>Handle By: {AdmissionInvoiceData.admission.Operating_handledBy}</p>
          </div>
          <div>
            <QRCodeCanvas value={qrValue} size={60} />
          </div>
        </div>

        <table className="w-full border mb-2">
          <tbody>
            <tr>
              <td className="font-semibold">Patient Name:</td>
              <td>{AdmissionInvoiceData.name}</td>
            </tr>
            <tr>
              <td className="font-semibold">F/H Name:</td>
              <td>{AdmissionInvoiceData.F_H_Name}</td>
            </tr>
           
            <tr>
              <td className="font-semibold">Operating Doctor:</td>
              <td>Dr. {AdmissionInvoiceData.admission.operating_doctorName || "N/A"}</td>
            </tr>
            
            <tr>
              <td className="font-semibold">Payment Status:</td>
              <td> {AdmissionInvoiceData.payment.paymentstatus }</td>
            </tr>
            <tr>
              <td className="font-semibold">Payment:</td>
              <td>Rs. {AdmissionInvoiceData.payment.total_payment || "0.00"}</td>
            </tr>
            <tr>
              <td className="font-semibold">Pending Payment :</td>
              <td>Rs. {AdmissionInvoiceData.payment.pending_payment || "0.00"}</td>
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

export default AdmissionInvoice;
