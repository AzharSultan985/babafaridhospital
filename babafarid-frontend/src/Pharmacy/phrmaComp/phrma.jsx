import React, { useState, useEffect, useCallback } from "react";
import { usePharmacy } from "../ContextPharma/PharmaContext";
import PatientINFOModal from "../Modals/patientINFO";

export default function Pharmacy() {
  const [open, setOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0); // 👈 discount state (percentage)
const { fetchPharmacyMed, setSearchTerm,
          filteredMed,pharmacyMed,setPatientModal ,summary, setSummary,setBillingPriceRates,Logoutpharma} = usePharmacy();

// console.log("Summary ",summary.Medname);

  // Calculate totals
  const total = summary.reduce((acc, item) => acc + item.PriceOFMedPerBuy, 0);
  const discountAmount = (total * discount) / 100;
  const netTotal = total - discountAmount;


const handleConfirmNext = () => {
  setPatientModal(true);
const BillObj={
  Total:total,
  DicountRate:discount,
NetTotal:netTotal
}
setBillingPriceRates(BillObj)

};




  const handleUse = (medicine) => {
    setSelectedMedicine(medicine);
    setQuantity(1);
    setOpen(true);
  };

  const stableFetch = useCallback(() => {
    fetchPharmacyMed();
  }, [fetchPharmacyMed]);

  useEffect(() => {
    stableFetch();
  }, [stableFetch]);

  const handleConfirm = () => {
    if (!selectedMedicine) return;

    const existing = summary.find((item) => item.id === selectedMedicine._id);
    let updatedSummary;

    const priceOfMedPerBuy = quantity * selectedMedicine.PricePerMed;

    if (existing) {
      updatedSummary = summary.map((item) =>
        item.id === selectedMedicine._id
          ? {
              ...item,
              quantity: item.quantity + quantity,
              PriceOFMedPerBuy: item.PriceOFMedPerBuy + priceOfMedPerBuy,
            }
          : item
      );
    } else {
      updatedSummary = [
        ...summary,
        {
          id: selectedMedicine._id,
          Medname: selectedMedicine.PharmaMedname,
          PricePerTablet: selectedMedicine.PricePerMed,
          PriceOFMedPerBuy: priceOfMedPerBuy,
          quantity,
        },
      ];
    }

    setSummary(updatedSummary);
    setOpen(false);
  };


// Utility to format date
function formatDateToEng(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  return `${day} ${month} ${year}`;
}

// Utility to calculate days left
function getDaysLeft(date) {
  if (!date) return null;
  const today = new Date();
  const exp = new Date(date);
  const diffTime = exp - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}


  return (
    <>
      {/* Navbar */}
      <nav class="bg-[#282829] border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            class="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/logo.png" className="h-12 w-15" alt="babafarid" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Baba Farid Hospital
            </span>
          </a>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <button
            onClick={Logoutpharma}
              type="button"
              class="focus:outline-none text-white  bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Medicine + Summary */}
      <div className="grid grid-cols-3 gap-1 p-6">
        {/* Medicine Table */}
        <div className="col-span-2 w-[100%] bg-white shadow-xl rounded-xl p-4">
<div className="w-full flex justify-between"> 
        <h1 className="text-xl font-bold mb-4">💊 Manage Pharmacy   </h1>
  <div className="flex">
  <div className="flex px-4 h-10  rounded-md border-2 border-blue-500 overflow-hidden max-w-md  mx-2">
        <input         onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search Medicine..."
          className="w-full outline-none bg-transparent text-gray-600 text-sm" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" class="fill-gray-600">
          <path
            d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
          </path>
        </svg>
  
      </div>
    

</div>
    </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Medicine</th>
                <th className="p-2 border">Company</th>
                <th className="p-2 border">Qty(Unit)</th>
                <th className="p-2 border">Price/Unit</th>
                <th className="p-2 border">Expire Date</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
     <tbody>
              {(filteredMed.length > 0 ? filteredMed : pharmacyMed).map((med) => {
                const daysLeft = getDaysLeft(med.PharmaMedexpireDate);
                const rowColor =
                  daysLeft <= 0
                    ? "bg-red-100 hover:bg-red-200"
                    : daysLeft <= 30
                    ? "bg-yellow-100 hover:bg-yellow-200"
                    : "hover:bg-slate-100";

                return (
                  <tr key={med._id} className={`text-center border ${rowColor}`}>
                    <td className="p-2 border">{med.PharmaMedname}</td>
                    <td className="p-2 border">{med.PharmaMedcompany}</td>
                    <td className="p-2 border">{med.available}</td>
                    <td className="p-2 border">{Number(med.PricePerMed).toFixed(2)}</td>

                    {/* Expiry date + badge */}
                    <td className="p-2 border relative">
                      {daysLeft !== null && daysLeft <= 30 && (
                        <span
                          className={`absolute -top-1 -right-0 text-[10px] px-1 py-0.5 rounded-full shadow ${
                            daysLeft <= 0 ? "bg-red-600" : "bg-yellow-500"
                          } text-white`}
                        >
                          {daysLeft <= 0 ? "Exp" : `${daysLeft}d`}
                        </span>
                      )}
                      {formatDateToEng(med.PharmaMedexpireDate)}
                    </td>

                    <td className="p-2 border">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() => handleUse(med)}
                      >
                        + Add
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>



          </table>
        </div>

        {/* Summary Section */}
       {/* Summary Section */}
<div className="bg-white w-[95%] shadow-slate-300 shadow-2xl rounded-xl p-4 h-[500px] flex flex-col">
  <h2 className="text-xl font-bold mb-4">Summary</h2>
  
  <div className="flex-1 overflow-y-auto">
    {summary.length === 0 ? (
      <p className="text-gray-500" >🧾 No medicines selected</p>
    ) : (
      <>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Medicine</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Price</th>
       
            </tr>
          </thead>
          <tbody>
            {summary.map((item) => (
              <tr key={item.id} className="text-center border">
       
                <td className="p-2 border items-end flex justify-center gap-4"> 
                     <button
          type="button"
          onClick={() => {
            setSummary((prev) =>
              prev
                .map((row) =>
                  row.id === item.id
                    ? {
                        ...row,
                        quantity: row.quantity - 1,
                        PriceOFMedPerBuy:
                          row.PriceOFMedPerBuy - row.PricePerTablet,
                      }
                    : row
                )
                .filter((row) => row.quantity > 0) // remove if qty = 0
            );
          }}
          className="size-4 flex justify-center items-center align-middle rounded-md border border-gray-300 bg-white text-gray-800 shadow hover:bg-gray-50"
        >
          <svg
            className="w-3.5 h-3.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14" />
          </svg>
        </button>
                  {item.Medname}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">
                  {item.PriceOFMedPerBuy.toFixed(2)}
                </td>
               

              </tr>
            ))}
          </tbody>
        </table>
      </>
    )}
  </div>

  {/* Discount + Totals always pinned at bottom */}
  {summary.length > 0 && (
    <div className="mt-4 space-y-2 border-t pt-3 shadow-inner">
      <div className="flex justify-between">
        <span className="font-bold">Discount (%)</span>
        <input
          type="number"
          min="0"
          max="100"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          className="border px-2 py-1 w-20 rounded text-right"
        />
      </div>
      <div className="flex justify-between">
        <span className="font-bold">Total</span>
        <span>{total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">Discount</span>
        <span>-{discountAmount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-lg font-bold">
        <span>Net Total</span>
        <span>{netTotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-end mt-8">
        <button   onClick={handleConfirmNext}   className="px-3 py-1 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Confirm & Next
        </button>
        <button  onClick={()=>setSummary([])} className="px-3 py-1 mx-2 mt-2 bg-red-600 text-white rounded hover:bg-red-700">
          Cancel
        </button>
      </div>
    </div>
  )}
</div>

      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
            <h3 className="text-lg font-bold mb-2">Use Medicine</h3>
            <p className="mb-2">{selectedMedicine?.PharmaMedname}</p>
            <input
              type="number"
              min={1}
              max={selectedMedicine?.available || 1}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded px-2 py-1 w-full mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

<PatientINFOModal/>




    </>
  );
}
