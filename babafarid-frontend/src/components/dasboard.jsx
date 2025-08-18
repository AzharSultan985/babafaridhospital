import { useState ,useEffect} from "react";
import { useContext } from "react"
import { AuthContext } from '../context/LoginContext';

import { AppContext } from "../context/AppContext"
const Dashboard=()=>{
const {LogoutAdmin} =useContext(AuthContext)

  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const {FetcAllMed,DelMedByID,FetchwitIdforEdit,EditMedData,setEditMed_Medname,
setEditMed_quntity,
setEditMed_expdate,HandleEditModal,IsMedAddAlert,setIsMedAddAlert,setIsMedDelAlert,IsMedDelAlert,setSearchTerm,results,setEditMed_company,
setEditMed_current,FetchMedicine} =useContext(AppContext)
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
console.log("del id ",selectedMedId);

  };

//  Confirm deletion
  const confirmDelete = () => {
    if (selectedMedId) {
      DelMedByID(selectedMedId);
      setShowModal(false);
    }
  };

//Edit Modal
const EditModal=(editid)=>{
  FetchwitIdforEdit(editid)

setisEditModalOpen(true)

}
 // Function to get remaining days

const getDaysLeft = (date) => {
  if (!date) return null;
  const today = new Date();
  const exp = new Date(date);
  const diffTime = exp - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
return(
    <>
    
{(IsMedAddAlert || IsMedDelAlert)  && 
<section className=" flex justify-center w-full  fixed h-[10vh]  ">
{/* bg-green-500 text-white px-4 py-2 rounded shadow */}
<div id="toast-simple" class=" flex items-center w-full max-w-xs mt-4 p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-gray-100 divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
  {
    IsMedDelAlert? <svg className="w-6 h-6 text-red-600 dark:text-red" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
    <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z"/>
</svg>:
    <svg className="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
    </svg>
}
    <div className="ps-4 text-sm font-normal">Medicine {IsMedDelAlert? "Deleted" : "Updated"} Successfully.

      
    </div>
</div>

</section>
}



<button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6"  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   <path   d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>

<aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-[#282829] dark:bg-[#282829]">
      <a href="/" className="flex items-center ps-2.5 mb-5">
         {/* <img src="" className="h-6 me-3 sm:h-7" alt="Flowbite Logo" /> */}
          <img src='/logo.png' className="h-12 w-15 ml-[-10px]" alt="babafarid" srcset=""/>
         
         <span className="self-center text-xl font-semibold whitespace-nowrap text-white">BabafaridHospital</span>
      </a>
      <ul className="space-y-2 font-medium text-white">
         <li>
            <a href="/dashboard" className="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg>
               <span className="ms-3">Dashboard</span>
            </a>
         </li>
         <li>
            <a href="/" className="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Indoor Medicne</span>
            
            </a>
         </li>
         <li>
            <a href="/" className="flex items-center p-2  rounded-lg text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Pharmacy</span>
            
            </a>
         </li>
        
         <li>
            <a href="/" className="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor"  d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
               </svg>
               <span onClick={LogoutAdmin}  className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
            </a>
         </li>
        
      </ul>
   </div>
</aside>

<div className="p-4 sm:ml-64">

<section>

<div className="bg-white p-8 overflow-auto w-full h-screen">
<h2 className="text-2xl mb-4 flex items-center gap-2">
  📦💊 Track, Manage & Refill Your Medicine Stock
</h2>



  {/* <!-- classNamees Table --> */}
  <div className="relative overflow-auto">

<div className="w-full flex justify-end"> 
  
  <div className="flex px-4 h-10  rounded-md border-2 border-blue-500 overflow-hidden max-w-md  mx-2">
        <input type="text" placeholder="Search Medicine..." onChange={(e)=>setSearchTerm(e.target.value)}
          className="w-full outline-none bg-transparent text-gray-600 text-sm" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" class="fill-gray-600">
          <path
            d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
          </path>
        </svg>
      </div>
  
    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> <a href="/addindoormed">Add Medicine</a> </button>
    

<form class="w-40 cursor-pointer">
 
  <select id="countries" onChange={(e)=>FetchMedicine(e.target.value)} class="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected>Choose a Month</option>
    <option value="lastMonth">Last Month</option>
    <option value="lastTwoMonths">Last two Month</option>
 
  </select>
</form>
    </div>

    <div className="overflow-x-auto rounded-lg">
   



<table className="min-w-full bg-white border mb-20">
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
{isEditModalOpen && (
  <>
    {/* Main modal */}
    <div
      id="updateProductModal"
      tabIndex="-1"
     
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* Modal header */}
          <div className="flex justify-between items-center pb-4 mb-4 border-b dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Update Product
            </h3>
            
            <button
              type="button"
              onClick={() => setisEditModalOpen(false)}
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              ❌
            </button>
          </div>

          {/* Modal body */}
            <form>
            
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" onChange={(e)=>{setEditMed_Medname(e.target.value);}} defaultValue={EditMedData?.Medname || ""} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=""/>
                    </div>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                        <input type="text" name="name" id="name" onChange={(e)=>{setEditMed_company(e.target.value);}} defaultValue={EditMedData?.company || ""} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=""/>
                    </div>
                    <div>
                        <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total</label>
                        <input type="number" name="brand" id="brand" onChange={(e)=>setEditMed_quntity(e.target.value)}  defaultValue={EditMedData?.quntity || ""} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=""/>
                    </div>
                    <div>
                        <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available</label>
                        <input type="number" name="brand" id="brand" onChange={(e)=>setEditMed_current(e.target.value)}  defaultValue={EditMedData?.current || ""}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=""/>
                    </div>
                    <div>
                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expire date</label>
                        <input type="date" onChange={(e)=>setEditMed_expdate(e.target.value)}  defaultValue={EditMedData?.expdate || ""}name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=""/>
                    </div>
                
                
                </div>
            </form>
                <div className="flex items-center space-x-4">
           
                    <button onClick={HandleEditModal} className="bg-blue-500 text-white p-3 rounded-md text-xs md:text-sm">
                        Update
                    </button>
                </div>
        </div>
      </div>
    </div>
  </>
)}



     
</div>




    </>
)
}


export default Dashboard