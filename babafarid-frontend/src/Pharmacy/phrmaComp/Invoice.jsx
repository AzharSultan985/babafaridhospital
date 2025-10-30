import { useState, useEffect } from "react";
import { usePharmacy } from "../ContextPharma/PharmaContext";
import { QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router-dom";

const Invoice = () => {
  const { InvoiceData , setExtractMedForReport,HandlepharmaMedQuntity,SaveInvoiceData} = usePharmacy();
  const [dataINVQR, setdataINVQR] = useState("");
////console.log("InvoiceData",InvoiceData);

  // ✅ Extract medicines when InvoiceData updates
  useEffect(() => {
    if (InvoiceData?.medicines?.length) {
      setExtractMedForReport(InvoiceData.medicines);
    }
  }, [InvoiceData,setExtractMedForReport]);
////console.log(ExtractMedForReport);

  // ✅ Prepare QR data once InvoiceData is available
  useEffect(() => {
    if (InvoiceData  && InvoiceData.medicines) {
      const qrPayload = {
        InvoiceNo: 2352,
        Patient: {
        ID: InvoiceData.PatientID || "N/A",
      },
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
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              padding: 0;
            }
            body * {
              visibility: hidden;
            }
            .printable, .printable * {
              visibility: visible;
            }
            .printable {
              position: relative;
              width: 210mm;
              min-height: 297mm;
              margin: 0 auto;
              padding: 1cm;
            }
            @page {
              size: A4;
              margin: 0;
            }
          }
        `}
      </style>

      <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-2xl mx-auto mt-8 printable">
        <h1 className="font-bold text-2xl my-4 text-center text-blue-600">
          BABA FARID Medical Store
        </h1>

        <hr className="mb-2" />

        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Invoice</h1>
          <div className="qr-section ml-14" style={{ marginTop: "10px" }}>
            <QRCodeCanvas
              value={qrValue}
              size={120}
              includeMargin={true}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Bill To</h2>
          <div className="text-gray-700 mb-2">

            <span className="font-bold mr-8">Patient ID:</span>  {InvoiceData.PatientID}
          </div>
          <div className="text-gray-700 mb-2">

            <span className="font-bold mr-8">Name:</span>
          </div>
          <div className="text-gray-700 mb-2">
            <span className="font-bold mr-3">Number:</span> 
          </div>
         
          <div className="text-gray-700 mb-2">
            <span className="font-bold mr-8">Date:</span> {InvoiceData.date}
          </div>
          <div className="text-gray-700 mb-2">
            <span className="font-bold mr-1">Invoice #:</span> {InvoiceData.InvoiceID}
          </div>
        </div>

        <table className="w-full mb-8 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left font-bold text-gray-700 px-2 py-1">Description</th>
              <th className="text-center font-bold text-gray-700 px-2 py-1">Qty</th>
              <th className="text-right font-bold text-gray-700 px-2 py-1">Amount</th>
            </tr>
          </thead>
          <tbody>
            {InvoiceData.medicines.map((med, index) => (
              <tr key={med.id || index} className="border-t">
                <td className="text-left text-gray-700 px-2 py-1">{med.Medname}</td>
                <td className="text-center text-gray-700 px-2 py-1">{med.quantity}</td>
                <td className="text-right text-gray-700 px-2 py-1">
                  {med.PriceOFMedPerBuy.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot className="border-t">
            <tr>
              <td className="text-left font-bold text-gray-700 px-2 py-1">Total</td>
              <td></td>
              <td className="text-right font-bold text-gray-700 px-2 py-1">
                {InvoiceData.BillData.Total.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="text-left font-bold text-gray-700 px-2 py-1">Discount</td>
              <td></td>
              <td className="text-right font-bold text-gray-700 px-2 py-1">
                {InvoiceData.BillData.DicountRate}%
              </td>
            </tr>
            <tr>
              <td className="text-left font-bold text-gray-700 px-2 py-1">Net Total</td>
              <td></td>
              <td className="text-right font-bold text-gray-700 px-2 py-1">
                {InvoiceData.BillData.NetTotal.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="text-gray-700 mb-2 text-center">
 آپ کی خریداری کا شکریہ۔ اصل بل کے بغیر دوائیاں واپس نہیں کی جا سکتیں۔
</div>

        <div className="text-gray-500 text-xs text-center mt-6 border-t pt-2">
          Powered By <span className="font-bold">CodeTrust By Azhar</span>
        </div>
      </div>

      <div className="w-full flex gap-2 justify-center">
        <button
          onClick={() => {window.print(); HandlepharmaMedQuntity();SaveInvoiceData() }}
          className="px-4 my-4 py-2 w-[30%] bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition print:hidden mt-4"
        >
          Print Invoice
        </button>
         <Link className="px-4 my-4 py-2 w-[20%] items-center flex justify-center bg-green-600 text-white rounded-lg hover:bg-green-700 transition print:hidden mt-4"
       
          to={'/pharmacy'}>Back to pharmacy </Link> 
      </div>
    </>
  );
};

export default Invoice;