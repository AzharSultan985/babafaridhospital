import React, { useState, useEffect } from "react";
import Alert from "../../components/alert";
import { usePharmacy } from "../ContextPharma/PharmaContext";

export default function ReturnMedicine() {
  const [invoiceID, setInvoiceID] = useState("");
  const { 
    InvoiceDataByID, 
    FetchInvoicesByID, 
    setupdatedInvoiceData, 
    handleUdateInvoice, 
    alert, 
    setAlert 
  } = usePharmacy();

  const [summary, setSummary] = useState([]);

  // Populate summary when invoice data changes
  useEffect(() => {
    if (InvoiceDataByID && InvoiceDataByID.length > 0) {
      const medicines = InvoiceDataByID[0].medicines.map((med) => ({
        ...med,
        PriceOFMedPerBuy: med.PricePerTablet * med.quantity,
      }));
      setSummary(medicines);
    } else {
      setSummary([]);
    }
  }, [InvoiceDataByID]);

  // Decrease quantity of a medicine
  const handleDecrease = (id) => {
    setSummary((prev) =>
      prev
        .map((med) => {
          if (med.id === id && med.quantity > 0) {
            const newQty = med.quantity - 1;
            return {
              ...med,
              quantity: newQty,
              PriceOFMedPerBuy: newQty * med.PricePerTablet,
            };
          }
          return med;
        })
        .filter((med) => med.quantity > 0)
    );
  };

  // Calculate totals
  const total = summary.reduce((acc, item) => acc + item.PriceOFMedPerBuy, 0);
  const discountRate = InvoiceDataByID?.[0]?.BillData?.DicountRate || 0;
  const discountAmount = (total * discountRate) / 100;
  const netTotal = total - discountAmount;

  // Fetch invoice by ID
  const handleFetchInvoice = () => {
    if (!invoiceID) {
      setAlert({ msg: "Please enter an Invoice ID", type: "warning" });
      return;
    }
    FetchInvoicesByID(Number(invoiceID));
  };

  // Save Return
  const handleSave = async () => {
    if (!invoiceID) {
      setAlert({ msg: "Please enter an Invoice ID", type: "warning" });
      return;
    }
    if (summary.length === 0) {
      setAlert({ msg: "No medicines to return", type: "warning" });
      return;
    }

    // Prepare object matching backend schema
    const updatedReturn = {
      returnedMedicines: summary,
      BillData: {
        Total: total,
        DicountRate: discountRate,
        NetTotal: netTotal,
      },
    };

    // Set in context
    setupdatedInvoiceData(updatedReturn);

    // Call backend
    await handleUdateInvoice(Number(invoiceID));
  };

  return (
    <div className="p-6">
      {alert.msg && <Alert alertMsg={alert.msg} type={alert.type} />}
      <h1 className="text-xl font-bold mb-4">Return Medicines</h1>

      {/* Invoice ID input */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter Invoice ID"
          value={invoiceID}
          onChange={(e) => setInvoiceID(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button
          onClick={handleFetchInvoice}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>

      {/* Summary table */}
      {summary.length > 0 && (
        <div className="bg-white p-4 rounded shadow w-full max-w-3xl">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Medicine</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Price</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((med) => (
                <tr key={med.id} className="text-center border">
                  <td className="p-2 border flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleDecrease(med.id)}
                      className="px-1 py-0.5 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      -
                    </button>
                    {med.Medname}
                  </td>
                  <td className="p-2 border">{med.quantity}</td>
                  <td className="p-2 border">{med.PriceOFMedPerBuy.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer totals */}
          <div className="mt-4 space-y-1">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Discount ({discountRate}%)</span>
              <span>-{discountAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Net Total</span>
              <span>{netTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Return
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
