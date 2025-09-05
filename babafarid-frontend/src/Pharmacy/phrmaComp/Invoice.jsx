import { usePharmacy } from "../ContextPharma/PharmaContext";

const Invoice = () => {
  const { InvoiceData } = usePharmacy();

  if (!InvoiceData || !InvoiceData.patient) {
    return <div>No Invoice Data Available</div>;
  }

  return (
    <>
      <style>
        {`
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
              width: 210mm; /* A4 width */
              min-height: 297mm; /* A4 height */
              margin: 0 auto;
              padding: 1cm;
              box-shadow: none !important;
              border: none !important;
            }
            @page {
              size: A4;
              margin: 0;
            }
          }
        `}
      </style>

      <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-2xl mx-auto mt-8 printable">
        {/* Hospital Header */}
        <h1 className="font-bold text-2xl my-4 text-center text-blue-600">
          BABA FARID HOSPITAL
        </h1>
        <hr className="mb-2" />

        {/* Invoice Header */}
        <div className="flex justify-between mb-6">
          <h1 className="text-lg font-bold">Invoice</h1>
          <div className="text-gray-700">
            <div>Date: {InvoiceData.date}</div>
            <div>Invoice #: INV12345</div>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Bill To</h2>
          <div className="text-gray-700 mb-2">
            <span className="font-bold">Name:</span> {InvoiceData.patient.name}
          </div>
          <div className="text-gray-700 mb-2">
            <span className="font-bold">Number:</span> {InvoiceData.patient.number}
          </div>
          <div className="text-gray-700 mb-2">
            <span className="font-bold">Address:</span> {InvoiceData.patient.address}
          </div>    
        </div>

        {/* Medicines Table */}
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

        {/* Footer */}
        <div className="text-gray-700 mb-2 text-center">
       Thank you for your trust. Get well soon!
        </div>
        <div className="text-gray-500 text-xs text-center mt-6 border-t pt-2">
          Powered By <span className="font-bold">CodeTrust By Azhar</span>
        </div>
      </div>

      <div className="w-full flex justify-center">
        {/* Print button (hidden in print) */}
        <button
          onClick={() => window.print()}
          className="px-4 my-4 py-2 w-[30%] bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition print:hidden mt-4"
        >
          Print Invoice
        </button>
      </div>
    </>
  );
};

export default Invoice;
