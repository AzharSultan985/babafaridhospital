
import { AppContext } from "../context/AppContext"
import { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import { useContext } from "react"

export default function IndoorMed() {

  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const {FetcAllMed,DelMedByID,setEditMed_Medname,
setEditMed_quntity,
setEditMed_expdate,HandleEditModal,IsMedAddAlert,setIsMedAddAlert,setIsMedDelAlert,IsMedDelAlert,setSearchTerm,results,setEditMed_company,
setEditMed_current,FetchMedicine,  // ✅ edit fields
        setEditMed_MedId,
        EditMed_Medname,
        EditMed_company,
        EditMed_quntity,
        EditMed_current,
        EditMed_expdate, startDate,EndDate,} =useContext(AppContext)
 const [showModal, setShowModal] = useState(false);
  const [selectedMedId, setSelectedMedId] = useState(null);
     // Auto-hide toast after 2 seconds
   useEffect(() => {
     if (IsMedAddAlert || IsMedDelAlert) {
      setisEditModalOpen(false)
       const timer = setTimeout(() => {
         setIsMedAddAlert(false);
      setIsMedDelAlert(false)

       }, 1000);
       return () => clearTimeout(timer);
     }
   }, [IsMedAddAlert, setIsMedAddAlert,IsMedDelAlert,setIsMedDelAlert]);

  function formatDateToEng(dateString) {
  const date = new Date(dateString);
  const day = date.getDate(); // 1–31
  const month = date.toLocaleString('en-US', { month: 'short' }); // Jan, Feb, Mar...
  const year = date.getFullYear().toString().slice(-2); // last 2 digits
  return `${day} ${month} ${year}`;
}
// 
//  Open modal & store ID
  const handleDeleteClick = (id) => {
    setSelectedMedId(id);
    setShowModal(true);
//console.log.log("del id ",selectedMedId);

  };

//  Confirm deletion
  const confirmDelete = () => {
    if (selectedMedId) {
      DelMedByID(selectedMedId);
      setShowModal(false);
    }
  };

//Edit Modal
const EditModal = (editid) => {
  // find data from already fetched medicine
  const medToEdit = results && results.length > 0 
    ? results.find((med) => med._id === editid)
    : FetcAllMed.find((med) => med._id === editid);

  if (medToEdit) {
    // set data in state instead of fetching from API
    setEditMed_Medname(medToEdit.Medname);
    setEditMed_company(medToEdit.company);
    setEditMed_quntity(medToEdit.quntity);
    setEditMed_current(medToEdit.current);
    setEditMed_expdate(medToEdit.expdate);
  }
  setEditMed_MedId(editid)

  // open modal
  setisEditModalOpen(true);
};

 // Function to get remaining days

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
  📦💊 Track, Manage & Refill Your Medicine Stock
</h2>



  {/* <!-- classNamees Table --> */}
  <div className="relative overflow-auto">

<div className="w-full flex justify-end"> 
   <h1 className="text-2xl  mr-4">{  startDate} <span className="text-3xl font-bold">To</span>  {EndDate} </h1>
  <div className="flex px-4 h-10  rounded-md border-2 border-blue-500 overflow-hidden max-w-md  mx-2">
        <input type="text" placeholder="Search Medicine..." onChange={(e)=>setSearchTerm(e.target.value)}
          className="w-full outline-none bg-transparent text-gray-600 text-sm" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" class="fill-gray-600">
          <path
            d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
          </path>
        </svg>
      </div>
  
    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> <Link to="/addindoormed">Add Medicine</Link> </button>

<button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add a New stock</button>
    

<form class="w-40 cursor-pointer">
 
  <select id="countries" onChange={(e)=>FetchMedicine(e.target.value)} class="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected>Current Month</option>
    <option value="lastMonth">Last Month</option>
    <option value="lastTwoMonths">Last two Month</option>
 
  </select>
</form>
    </div>

    <div className="overflow-x-auto rounded-lg">
   
<table className="w-full bg-white border mb-20">
  <thead>
    <tr className="bg-[#2B4DC994] text-center text-xs md:text-sm font-thin text-white">
      <th className="p-0">
        <span className="block py-2 px-3 border-r border-gray-300">Medicine </span>
      </th>
      <th className="p-0">
        <span className="block py-2 px-3 border-r border-gray-300">Company </span>
      </th>
      <th className="p-4 text-xs md:text-sm">
        <span className="block py-2 px-3 border-r border-gray-300">Expire date</span>
      </th>
      <th className="p-0">
        <span className="block py-2 px-3 border-r border-gray-300">Available</span>
      </th>
      <th className="p-0">
        <span className="block py-2 px-3 border-r border-gray-300">Total</span>
      </th>
      <th className="p-4 text-xs md:text-sm">Action</th>
    </tr>
  </thead>
  <tbody>
  
{results && results.length > 0 ? (
  results.map((item, index) => {
 
    const daysLeft = getDaysLeft(item.expdate);
    const isSoonToExpire = daysLeft !== null && daysLeft <= 30;
    
    return (
      <tr
        key={item._id || index}
        className={`border-b text-xs md:text-sm text-center cursor-pointer text-gray-800 
          ${isSoonToExpire ? "bg-red-100 hover:bg-red-200" : "hover:bg-slate-100"}
        `}
      >
        <td className="p-2 md:p-4">{item.Medname}</td>
        <td className="p-2 md:p-4">{item?.company || "empty"}</td>
        
        {/* Expiry date with badge */}
        <td className="p-2 md:p-4 relative">
          {isSoonToExpire && (
            <span
              className={`absolute -top-[-2px] -right-[-3rem] text-[10px] px-1 py-0.5 rounded-full shadow 
                ${daysLeft <= 0 ? "bg-red-600" : "bg-orange-500"} text-white`}
            >
              {daysLeft <= 0 ? "Exp" : `${daysLeft}d`}
            </span>
          )}
          {formatDateToEng(item.expdate)}
        </td>
        
        <td className="p-2 md:p-4">{item.current}</td>
        <td className="p-2 md:p-4">{item.quntity}</td>
        <td className="relative p-2 md:p-4 flex justify-center space-x-2">
          <button
            onClick={() => EditModal(item._id)}
            className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs md:text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteClick(item._id)}
            className="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  })
) : (
  FetcAllMed.map((data, index) => {
    const daysLeft = getDaysLeft(data.expdate);
    const isSoonToExpire = daysLeft !== null && daysLeft <= 30;
    
    return (
      <tr
        key={data._id || index}
        className={`border-b text-xs md:text-sm text-center cursor-pointer text-gray-800 
          ${isSoonToExpire ? "bg-red-100 hover:bg-red-200" : "hover:bg-slate-100"}
        `}
      >
        <td className="p-2 md:p-4">{data.Medname}</td>
        <td className="p-2 md:p-4">{data?.company || "empty"}</td>
        
        {/* Expiry date with badge */}
        <td className="p-2 md:p-4 relative">
          {isSoonToExpire && (
            <span
              className={`absolute -top-[-2px] -right-[-2rem]  text-[10px] px-1 py-0.5 rounded-full shadow 
                ${daysLeft <= 0 ? "bg-red-600" : "bg-orange-500"} text-white`}
            >
              {daysLeft <= 0 ? "Exp" : `${daysLeft}d`}
            </span>
          )}
          {formatDateToEng(data.expdate)}
        </td>
        
        <td className="p-2 md:p-4">{data.current}</td>
        <td className="p-2 md:p-4">{data.quntity}</td>
        <td className="relative p-2 md:p-4 flex justify-center space-x-2">
          <button
            onClick={() => EditModal(data._id)}
            className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs md:text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteClick(data._id)}
            className="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  })
)}
  </tbody>
</table>

    </div>
  </div>
</div>



</section>
      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">
              Confirm Deletion
            </h2>
            <p className="mb-6">
              Are you sure you want to delete this medicine?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
{/* Edit modal */}


{/* ✅ Edit Modal */}
{isEditModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Edit Medicine</h2>

      {/* Medicine Name */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Medicine Name
      </label>
      <input
        type="text"
        value={EditMed_Medname || ""}
        onChange={(e) => setEditMed_Medname(e.target.value)}
        placeholder="Enter medicine name"
        className="w-full border rounded p-2 mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {/* Company */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Company
      </label>
      <input
        type="text"
        value={EditMed_company || ""}
        onChange={(e) => setEditMed_company(e.target.value)}
        placeholder="Enter company name"
        className="w-full border rounded p-2 mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {/* Quantity */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Total
      </label>
      <input
        type="number"
        value={EditMed_quntity || ""}
        onChange={(e) => setEditMed_quntity(e.target.value)}
        placeholder="Enter total quantity"
        className="w-full border rounded p-2 mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {/* Current */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Available
      </label>
      <input
        type="number"
        value={EditMed_current || ""}
        onChange={(e) => setEditMed_current(e.target.value)}
        placeholder="Enter current stock"
        className="w-full border rounded p-2 mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {/* Expiry Date */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Expiry Date
      </label>
      <input
        type="date"
        value={EditMed_expdate || ""}
        onChange={(e) => setEditMed_expdate(e.target.value)}
        className="w-full border rounded p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {/* Buttons */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setisEditModalOpen(false)}
          className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            HandleEditModal();
            setisEditModalOpen(false);
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Update
        </button>
      </div>
    </div>
  </div>
)}


     
</div>

    
    
    
    
    
    </>
  )
}
