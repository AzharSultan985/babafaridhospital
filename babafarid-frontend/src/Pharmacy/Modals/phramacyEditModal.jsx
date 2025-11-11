

import {usePharmacy}  from "../ContextPharma/PharmaContext";
export default function PhramacyEditModal() {
    
    const {setEditPharmMed_Medname,
setEditPharmMed_company,
setEditPharmMed_available,
setEditPharmMed_expdate,
setEditPharmMed_quntity,setisEditModalOpen,pharmaeditMedData,setEditPharmMed_unitprice,setEditPharmMed_Boxprice,UpdatePharmaEditModal} = usePharmacy();



const HandleEditModal=()=>{
    UpdatePharmaEditModal()
setisEditModalOpen(false)
}
  return (
   <>
   
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
                        <input type="text" name="name" id="name" onChange={(e)=>{setEditPharmMed_Medname(e.target.value);}} defaultValue={pharmaeditMedData?.PharmaMedname || ""} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=""/>
                    </div>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                        <input type="text" name="name" id="name" onChange={(e)=>{setEditPharmMed_company(e.target.value);}} defaultValue={pharmaeditMedData?.PharmaMedcompany || ""} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=""/>
                    </div>
                    <div>
                        <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total</label>
                        <input type="number" name="brand" id="brand" onChange={(e)=>setEditPharmMed_quntity(e.target.value)}  defaultValue={pharmaeditMedData?.TotalTablets || ""} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=""/>
                    </div>
                    <div>
                        <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available</label>
                        <input type="number" name="brand" id="brand" onChange={(e)=>setEditPharmMed_available(e.target.value)}  defaultValue={pharmaeditMedData?.available || ""}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=""/>
                    </div>
                    <div>
                        <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price/unit</label>
                        <input type="number" name="brand" id="brand" onChange={(e)=>setEditPharmMed_unitprice(e.target.value)}  defaultValue={pharmaeditMedData?.PricePerMed || ""}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=""/>
                    </div>
                    <div>
                        <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price/Box</label>
                        <input type="number" name="brand" id="brand" onChange={(e)=>setEditPharmMed_Boxprice(e.target.value)}  defaultValue={pharmaeditMedData?.PharmaMedprice || ""}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=""/>
                    </div>
                    <div>
                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expire date</label>
                        <input type="date" onChange={(e)=>setEditPharmMed_expdate(e.target.value)}  defaultValue={pharmaeditMedData?.PharmaMedexpireDate || ""}name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=""/>
                    </div>
                
                
                </div>
            </form>
                <div className="flex items-center space-x-4">
           
                    <button onClick={(HandleEditModal)} className="bg-blue-500 text-white p-3 rounded-md text-xs md:text-sm">
                        Update
                    </button>
                </div>
        </div>
      </div>
    </div>
   </>
  )
}
