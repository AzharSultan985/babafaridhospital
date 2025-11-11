
import { useState ,useEffect} from "react";
import { useContext } from "react"
import { AppContext } from "../../context/AppContext";
import { StaffIndoorMedCotext } from "../staffContext/StaffIndoorcontext";


const IndoorMedManage =()=>{

  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const [MedDataForModal, setMedDataForModal] = useState(false);
  const {FetcAllMed,
IsMedAddAlert,setIsMedAddAlert,setSearchTerm,results,FetchMedicine,} =useContext(AppContext)

const {LogoutIndoor ,setUsedMEd,setUsedMedId,HandleUsedMed,setCurrentMed,AlertResofCurMed,setAlertResofCurMed} =useContext(StaffIndoorMedCotext)
 

   // Auto-hide toast after 2 seconds
   useEffect(() => {
     if ( AlertResofCurMed) {
      setisEditModalOpen(false)
      FetchMedicine()
       const timer = setTimeout(() => {
      setAlertResofCurMed(false)

       }, 2000);
       return () => clearTimeout(timer);
     }
   }, [IsMedAddAlert, setIsMedAddAlert,AlertResofCurMed,setAlertResofCurMed,FetchMedicine]);

  function formatDateToEng(dateString) {
  const date = new Date(dateString);
  const day = date.getDate(); // 1–31
  const month = date.toLocaleString('en-US', { month: 'short' }); // Jan, Feb, Mar...
  const year = date.getFullYear().toString().slice(-2); // last 2 digits
  return `${day} ${month} ${year}`;


}
// Helper: Days left till expiry
function getDaysLeft(expdate) {
  const today = new Date();
  const expiry = new Date(expdate);
  const diffTime = expiry - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert ms → days
}




//Edit Modal
const EditModal=(usedMedid)=>{
// find data from already fetched medicine
// console.log("id ",usedMedid);

  const medToUsed = results && results.length > 0 
    ? results.find((med) => med._id === usedMedid)
    :FetcAllMed.find((med) => med._id === usedMedid);
setMedDataForModal(medToUsed)

// console.log(medToUsed);

    setisEditModalOpen(true)
setUsedMedId(usedMedid)

}
    return (<>
 

<nav class="bg-[#282829] border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/indoormedmangment" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src='/logo.png' className="h-12 w-15" alt="babafarid" srcset=""/>
        
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Baba Farid Hospital</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
     
      <button type="button" onClick={LogoutIndoor}  class="focus:outline-none text-white  bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" >Logout</button>
   
    </div>
  </div>
</nav>

{AlertResofCurMed && (
  <div
    id="toast-simple"
    className="fixed top-5 right-5 flex items-center w-full max-w-xs p-4 space-x-4 
               text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow-sm 
               dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800 z-50"
    role="alert"
  >
   <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M15.133 10.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V1.1a1 1 0 0 0-2 0v2.364a.944.944 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C4.867 13.018 3 13.614 3 14.807 3 15.4 3 16 3.538 16h12.924C17 16 17 15.4 17 14.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.39A1.001 1.001 0 1 1 4.854 3.8a7.431 7.431 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 15.146 3.8a1 1 0 0 1 1.471-1.354 9.425 9.425 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM6.823 17a3.453 3.453 0 0 0 6.354 0H6.823Z"/>
</svg>
    <div className="ps-4 text-sm font-normal">{AlertResofCurMed}</div>
  </div>
)}

{/* Table content */}


<section>

<div className="bg-white p-8 overflow-auto w-full h-screen">
<h2 className="text-2xl mb-4 flex items-center gap-2">
    🗂️💉 Manage & Update Stock Levels
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
               <span className="block py-2 px-3 border-r border-gray-300">Expire date</span></th>
                <th className="p-0">
              <span className="block py-2 px-3 border-r border-gray-300">Available</span>
            </th>
             
            
            <th className="p-4 text-xs md:text-sm">Action</th>
          </tr>
        </thead>
       
<tbody>
  {results && results.length > 0 ? (
    results.map((item, index) => {
      const daysLeft = getDaysLeft(item.expdate);
      const isExpiringSoon = daysLeft <= 30;

      return (
        <tr
          key={item._id || index}
          className={`border-b text-xs md:text-sm text-center cursor-pointer text-gray-800 
            ${isExpiringSoon ? "bg-red-100 hover:bg-red-200" : "hover:bg-slate-100"}`}
        >
          <td className="p-2 md:p-4">{item.Medname}</td>
          <td className="p-2 md:p-4">{item.company}</td>
         <td className="p-2 md:p-4 relative">
            {formatDateToEng(item.expdate)}
            {isExpiringSoon && (
               <span
              className={`absolute -top-[-2px] -right-[-5rem]  text-[10px] px-1 py-0.5 rounded-full shadow 
                ${daysLeft <= 15 ? "bg-red-600" : "bg-orange-500"} text-white`}
            >
              {daysLeft <= 0 ? "Exp" : `${daysLeft}d`}
            </span>
            )}
          </td>
          <td className="p-2 md:p-4">{item.current}</td>
          <td className="relative p-2 md:p-4 flex justify-center space-x-2">
           <button
              onClick={() => { EditModal(item._id); setCurrentMed(item.current || "") }}
              disabled={daysLeft <= 15? true: false } className={ ` ${daysLeft <=15? "bg-red-600" :"bg-blue-600"  }    text-white px-3 py-1 rounded-md text-xs md:text-sm `}
            >
             {daysLeft <=15? "Expired" :"Used"  }  
            </button>
          </td>
        </tr>
      );
    })
  ) : (
    FetcAllMed.map((data, index) => {
      const daysLeft = getDaysLeft(data.expdate);
      const isExpiringSoon = daysLeft <= 30;

      return (
        <tr
          key={data._id || index}
          className={`border-b text-xs md:text-sm text-center cursor-pointer text-gray-800 
            ${isExpiringSoon ? "bg-red-100 hover:bg-red-200" : "hover:bg-slate-100"}`}
        >
          <td className="p-2 md:p-4">{data.Medname}</td>
          <td className="p-2 md:p-4">{data.company}</td>
          <td className="p-2 md:p-4 relative">
            {formatDateToEng(data.expdate)}
            {isExpiringSoon && (
               <span
              className={`absolute -top-[-2px] -right-[-5rem]  text-[10px] px-1 py-0.5 rounded-full shadow 
                ${daysLeft <= 15 ? "bg-red-600" : "bg-orange-500"} text-white`}
            >
              {daysLeft <= 0 ? "Exp" : `${daysLeft}d`}
            </span>
            )}
          </td>
          <td className="p-2 md:p-4">{data.current}</td>
          <td className="relative p-2 md:p-4 flex justify-center space-x-2">
            <button
              onClick={() => { EditModal(data._id); setCurrentMed(data.current || "") }}
              disabled={daysLeft <= 15? true: false } className={ ` ${daysLeft <=15? "bg-red-600" :"bg-blue-600"  }    text-white px-3 py-1 rounded-md text-xs md:text-sm `}
            >
             {daysLeft <=15? "Expired" :"Used"  }  
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
             Used Medicne
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
                        <input type="text" name="name" disabled id="name"  Value={MedDataForModal?.Medname || ""   } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=""/>
                    </div>
               
     
                    <div>
                        <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">How many used </label>
                        <input type="number" placeholder={`Available ${MedDataForModal.current || ""} `} onChange={(e)=> {setUsedMEd(e.target.value) }}   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    </div>
          
                
                </div>
            </form>
                <div className="flex items-center space-x-4">
           
                    <button onClick={HandleUsedMed} className="bg-blue-500 text-white p-3 rounded-md text-xs md:text-sm">
                        Update
                    </button>
                </div>
        </div>
      </div>
    </div>
  </>
)}



     


    </>)
}
export default IndoorMedManage