import { usePharmacy } from "../ContextPharma/PharmaContext";


const PatientINFOModal=()=>{

const { setPatientModal,setPatientID,
patientModal,InvoiceHandle} = usePharmacy();






return(<>
{/* patient info Modal */}

{patientModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
      <h3 className="text-lg font-bold mb-4">Patient Information</h3>

      <input
        type="text"
        placeholder="Patient ID"
        onChange={(e) => setPatientID(e.target.value)}
        className="border rounded px-2 py-1 w-full mb-3"
      />

     

    
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setPatientModal(false)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
      onClick={InvoiceHandle}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save & Next
        </button>
      </div>
    </div>
  </div>
)}

</>)


}
export default PatientINFOModal