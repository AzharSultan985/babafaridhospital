import { useState, useEffect } from "react";
import { usePharmacy } from "../ContextPharma/PharmaContext";
import { QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router-dom";

const Invoice = () => {
  const { InvoiceData, setExtractMedForReport, HandlepharmaMedQuntity, SaveInvoiceData ,setPatientID} = usePharmacy();
  const [dataINVQR, setdataINVQR] = useState("");

  
  useEffect(() => {
    if (InvoiceData?.medicines?.length) {
      setExtractMedForReport(InvoiceData.medicines);
    }
  }, [InvoiceData, setExtractMedForReport]);

  useEffect(() => {
    if (InvoiceData && InvoiceData.medicines) {
      const qrPayload = {
        InvoiceNo: InvoiceData.InvoiceID || "N/A",
        Patient: { ID: InvoiceData.PatientID || "N/A" },
        Date: InvoiceData.date,
        Medicines: InvoiceData.medicines.map((m) => ({
          Name: m.Medname,
          Qty: m.quantity,
          Price: m.PriceOFMedPerBuy,
        })),
        Bill: {
          Total: InvoiceData.BillData.Total,
          Discount: InvoiceData.BillData.DicountRate,
          NetTotal: InvoiceData.BillData.NetTotal,
        },
      };
      setdataINVQR(qrPayload);
    }
  }, [InvoiceData]);

  const qrValue = JSON.stringify(dataINVQR);

  if (!InvoiceData) {
    return <div>No Invoice Data Available</div>;
  }





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
          BABA FARID Medical Store
        </h1>
        <hr className="border-black mb-1" />

        <div className="flex justify-between mb-2">
          <div>
            <p>Invoice #: {InvoiceData.InvoiceID}</p>
            <p>Patient ID: {InvoiceData.PatientID}</p>
            <p>Date: {InvoiceData.date}</p>
            <p>Print By: M. Javed</p>
          </div>
          <div className="ml-4">
            <QRCodeCanvas
              value={qrValue}
              size={60}
              includeMargin={false}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>
        </div>

        <table className="w-full border mb-2">
          <thead>
            <tr className="bg-gray-200 border-b border-black">
              <th className="text-left px-1">Description</th>
              <th className="text-center px-1">Qty</th>
              <th className="text-right px-1">Amount</th>
            </tr>
          </thead>
          <tbody>
            {InvoiceData.medicines.map((med, index) => (
              <tr key={index} className="border-t border-gray-400">
                <td className="text-left px-1">{med.Medname}</td>
                <td className="text-center px-1">{med.quantity}</td>
                <td className="text-right px-1">{med.PriceOFMedPerBuy.toFixed(2)}</td>
                
              </tr>
            ))}
          </tbody>
      
  <tfoot className="border-t border-black">
    <tr>
      <td className="text-left px-1">No of Items</td>
      <td></td>
      <td className="text-right px-1">{InvoiceData.medicines.length}</td>
    </tr>
    <tr>
      <td className="text-left px-1">Total</td>
      <td></td>
      <td className="text-right px-1">{InvoiceData.BillData.Total.toFixed(2)}</td>
    </tr>
    <tr>
      <td className="text-left px-1">Discount</td>
      <td></td>
      <td className="text-right px-1">{InvoiceData.BillData.DicountRate}%</td>
    </tr>
    <tr>
      <td className="text-left px-1">Net Total</td>
      <td></td>
      <td className="text-right px-1">{InvoiceData.BillData.NetTotal.toFixed(2)}</td>
    </tr>
  </tfoot>
        </table>

        <div className="text-center mb-1">
          <p>Not valid for court</p>
          <p>آپ کی خریداری کا شکریہ۔ اصل بل کے بغیر دوائیاں واپس نہیں کی جا سکتیں۔</p>
        </div>

        <div className="text-center text-xs border-t border-black pt-1">
          Powered By <span className="font-bold">Azhar Sultan </span>
        </div>
      </div>

      <div className="w-full flex gap-2 justify-center print:hidden mt-3">
       <button
          onClick={() => {
        
            HandlepharmaMedQuntity();
            SaveInvoiceData();

 setPatientID('')

          }}
          className="px-4 py-2 w-[30%] bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Print Invoice
        </button> 
        <Link
          to={"/pharmacy"}
          className="px-4 py-2 w-[20%] bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex justify-center items-center"
        >
          Back
        </Link>
      </div>
    </>
  );
};

export default Invoice;
