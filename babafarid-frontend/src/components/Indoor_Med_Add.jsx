import { useContext,useEffect } from "react"
import { AppContext } from "../context/AppContext"

const IndoorMedAdd=()=>{
    const {setIndoor_Med_name,setIndoor_Med_quntity,setIndoor_Med_Exp_date,IndoorMedSubmitHandle,IsMedAddAlert,setIsMedAddAlert,Indoor_Med_Exp_date,    Indoor_Med_quntity,Indoor_Med_name, setIndoor_Med_company,
}=useContext(AppContext)
 
  // Auto-hide toast after 2 seconds
  useEffect(() => {
    if (IsMedAddAlert) {
      const timer = setTimeout(() => {
        setIsMedAddAlert(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [IsMedAddAlert, setIsMedAddAlert]);
    return(
        <>

<section className="w-full flex justify-center mt-3 h-[8vh] ">
{IsMedAddAlert &&

<div id="toast-simple" class="flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
    <svg class="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
    </svg>
    <div class="ps-4 text-sm font-normal">Medicine  Added Successfully.</div>
</div>

}
</section>

        <section className="w-[100%] h-[110%] flex   gap-6" style={{flexDirection:"column",marginTop:"5rem",justifyContent:'center',alignItems:'center'}}>
          <div className="p-8  sm:p-8 rounded-2xl bg-white border border-gray-300 shadow-sm">

            <h1 className="text-3xl text-gray-800 font-bold">Added Indoor Medicine    </h1>

<form className="max-w-md mx-auto">
    <div className="relative z-0 w-full mb-5 group text-white" >

        <input type="text" name="Medname" onChange={(e)=>setIndoor_Med_name(e.target.value)} id="Medname" className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />

        <label for="Medicine Name" className="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Medicine Name</label>
    </div>
    
 
  <div className="grid md:grid-cols-2 md:gap-6">
    
    <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="Company" onChange={(e)=>setIndoor_Med_company(e.target.value)}   id="quntity" className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="number" name="quntity" onChange={(e)=>setIndoor_Med_quntity(e.target.value)}   id="quntity" className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quantity</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="date"  name="expdata" onChange={(e)=>setIndoor_Med_Exp_date(e.target.value)}  id="expdata" className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Expire date</label>
    </div>
  </div>
  </form>

  <button type="button"   disabled={
    !Indoor_Med_name || !Indoor_Med_quntity || !Indoor_Med_Exp_date
  } className="text-white my-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"   onClick={(e) => {
      e.preventDefault();
      IndoorMedSubmitHandle(); 
    }}>Add Medicine</button>
          </div>

        </section>
        </>
    )
}
export default IndoorMedAdd