import { usePharmacy } from "../Pharmacy/ContextPharma/PharmaContext";
import { Link } from "react-router-dom";
import { useEffect, useCallback } from "react";
import PhramacyEditModal from '../Pharmacy/Modals/phramacyEditModal'


export default function HandlePharmacy() {
  const { fetchPharmacyMed, setSearchTerm, filteredMed ,isEditModalOpen,setisEditModalOpen,FetchwitIdforEdit,DelPharmaMedByID} = usePharmacy();

  const stableFetch = useCallback(() => {
    fetchPharmacyMed();
  }, [fetchPharmacyMed]);

  useEffect(() => {
    stableFetch();
  }, [stableFetch]);

  // Format date like IndoorMed
  function formatDateToEng(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return `${day} ${month} ${year}`;
  }
//Edit Modal
const EditModal=(editid)=>{
FetchwitIdforEdit(editid)
setisEditModalOpen(true)

}
// Function to get remaining days until expiry
const getDaysLeft = (date) => {
  if (!date) return null;
  const today = new Date();
  const exp = new Date(date);
  const diffTime = exp - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

  return (
    <>
      <div className="p-4 sm:ml-60">
        <section>
          <div className="bg-white p-8 overflow-auto w-full h-screen">
            <h2 className="text-2xl mb-4 flex items-center gap-2">
              🏥💊 Manage & Track Pharmacy Medicines
            </h2>

            {/* Search Bar */}
            <div className="w-full flex justify-end mb-4">
                  <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> <Link to="/addpharmaMed">Add Pharmacy Medicine</Link> </button>
              <div className="flex px-4 h-10 rounded-md border-2 border-blue-500 overflow-hidden max-w-md mx-2">
                <input
                  type="text"
                  placeholder="Search Medicine..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full outline-none bg-transparent text-gray-600 text-sm"
                />
  

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 192.904 192.904"
                  width="16px"
                  className="fill-gray-600"
                >
                  <path d="m190.707 180.101-47.078-47.077c11.702-14.072 
                    18.752-32.142 18.752-51.831C162.381 36.423 125.959 
                    0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 
                    36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 
                    51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 
                    5.303 2.197 7.498 7.498 0 0 0 
                    5.303-12.803zM15 81.193C15 44.694 44.693 15 
                    81.191 15c36.497 0 66.189 29.694 
                    66.189 66.193 0 36.496-29.692 
                    66.187-66.189 66.187C44.693 147.38 
                    15 117.689 15 81.193z"></path>
                </svg>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full bg-white border mb-20">
                <thead>
                  <tr className="bg-[#2B4DC994] text-center text-xs md:text-sm font-thin text-white">
                    <th className="p-2">Medicine</th>
                    <th className="p-2">Company</th>
                    <th className="p-2">Available</th>
                    <th className="p-2">Price/Unit</th>
                    <th className="p-2">Box/Unit</th>
                    <th className="p-2">Expire Date</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
  {filteredMed
  .filter(med => med && med._id)
  .map((med, index) => {
    const daysLeft = getDaysLeft(med.PharmaMedexpireDate);
    const isSoonToExpire = daysLeft !== null && daysLeft <= 30;

    return (
      <tr
        key={med._id || index}
        className={`border-b text-xs md:text-sm text-center cursor-pointer text-gray-800 
          ${isSoonToExpire ? "bg-red-100 hover:bg-red-200" : "hover:bg-slate-100"}
        `}
      >
        <td className="p-2 md:p-4">{med.PharmaMedname}</td>
        <td className="p-2 md:p-4">{med.PharmaMedcompany}</td>
        <td className="p-2 md:p-4">{med.available}</td>
        <td className="p-2 md:p-4">{Number(med.PricePerMed).toFixed(2)}</td>
        <td className="p-2 md:p-4">{Number(med.PharmaMedprice).toFixed(2)}</td>

        {/* Expiry Date with badge */}
        <td className="p-2 md:p-4 relative">
          {isSoonToExpire && (
            <span
              className={`absolute -top-[-2px] -right-[-2rem] text-[10px] px-1 py-0.5 rounded-full shadow 
                ${daysLeft <= 0 ? "bg-red-600" : "bg-orange-500"} text-white`}
            >
              {daysLeft <= 0 ? "Exp" : `${daysLeft}d`}
            </span>
          )}
          {formatDateToEng(med.PharmaMedexpireDate)}
        </td>

        <td className="p-2 md:p-4">
          <button
            onClick={() => EditModal(med._id)}
            className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs md:text-sm hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => DelPharmaMedByID(med._id)}
            className="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm hover:bg-red-700 mx-2"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  })}

                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>


      {isEditModalOpen && <PhramacyEditModal/>}
    </>


  );
}
