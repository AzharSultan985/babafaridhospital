import Alert from "../../components/alert";
import { usePharmacy } from "../ContextPharma/PharmaContext";

export default function AddPharamaMedicineForm() {
  const {
    setPharmaMedName,
    setPharmaMedStock,
    setPharmaMedPrice,
    setPharmaMedExpireDate,
    addPharmaMedicine,
    setPharmaMedCompany,
    setPharmaMedTablets,
    alertMsg,alertType
    ,setAlertMsg
    ,namePharmaMed,
        companyPharmaMed,
        stockPharmaMed,
        pricePharmaMed,
        expireDatePharmaMed,
        tabletsPharmaMed,
  } = usePharmacy();

  
  const handleSubmit = () => {
    addPharmaMedicine();
  
    // auto hide alert after 3s
    setTimeout(() => setAlertMsg(""), 3000);
  };

  return (
    <>
      {/* Show Alert only if alertMsg is not empty */}
      {alertMsg && <Alert alertMsg={alertMsg} type={alertType} />}

      <section className="flex justify-center mt-10">
        <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md ">
          <h2 className="text-xl font-bold mb-4">Add Medicine</h2>
          <form className="space-y-4">
            {/* Medicine Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Medicine Name
              </label>
              <input
                type="text"
                value={namePharmaMed}
                onChange={(e) => setPharmaMedName(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter medicine name"
              />
            </div>

            {/* Stock + Tablets */}
            <div className="flex gap-2">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Quantity
                </label>
                <input
                value={stockPharmaMed}
                  type="number"
                  onChange={(e) => setPharmaMedStock(e.target.value)}
                  className="w-50 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter stock quantity"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Per Box Tablets
                </label>
                <input
                value={tabletsPharmaMed}
                  type="number"
                  onChange={(e) => setPharmaMedTablets(e.target.value)}
                  className="w-40 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter No. of Tablets"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <input
                type="text"
                value={companyPharmaMed}
                onChange={(e) => setPharmaMedCompany(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company name"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Box Price (PKR)
              </label>
              <input
              value={pricePharmaMed}
                type="number"
                onChange={(e) => setPharmaMedPrice(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Box price of medicine"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Expire Date
              </label>
              <input
                type="date"
                value={expireDatePharmaMed}
                onChange={(e) => setPharmaMedExpireDate(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Add Medicine
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
