

import { createContext, useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// 1. Create Context
const PharmacyContext = createContext();

// 2. Custom hook
export const usePharmacy = () => useContext(PharmacyContext);

// 3. Provider Component
export const PharmacyProvider = ({ children }) => {
  // Medicine form states
  const [namePharmaMed, setPharmaMedName] = useState("");
  const [stockPharmaMed, setPharmaMedStock] = useState("");
  const [pricePharmaMed, setPharmaMedPrice] = useState("");
  const [expireDatePharmaMed, setPharmaMedExpireDate] = useState("");
  const [companyPharmaMed, setPharmaMedCompany] = useState("");
  const [tabletsPharmaMed, setPharmaMedTablets] = useState("");
  const navigate = useNavigate(); // ✅ React Router hook

  // Medicines list
  const [pharmacyMed, setPharmaMed] = useState([]);

  // Search
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMed, setFilteredMed] = useState([]);

  // Alerts
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("info");

// patient info state
const [patientModal, setPatientModal] = useState(false);
const [patientName, setPatientName] = useState("");
const [patientNumber, setPatientNumber] = useState("");
const [patientAddress, setPatientAddress] = useState("");
const [summary, setSummary] = useState([]);
const [InvoiceData ,setInvoiceData]=useState({})
const [BillingPriceRates,setBillingPriceRates]=useState({})
const [username,setusername]=useState("")
const [password,setpassword]=useState("")
const [spiner,setSpiner]=useState(false)
// //console.log.log(username,password);
// pharmacy edit 
const [EditPharmMed_Medname,setEditPharmMed_Medname]=useState()
const [EditPharmMed_company,setEditPharmMed_company]=useState()

// const [EditPharmMed_MedId,setEditPharmMed_MedId]=useState()

const [EditPharmMed_quntity,setEditPharmMed_quntity]=useState()
const [EditPharmMed_available,setEditPharmMed_available]=useState()
const [Unitprice,setEditPharmMed_unitprice]=useState()
const [boxprice,setEditPharmMed_Boxprice]=useState()
const [EditPharmMed_expdate,setEditPharmMed_expdate]=useState()
  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const [pharmaeditMedData, setEditpharmaMedData] = useState(false);
  const [forupdatemedid, setupdatepharmaMed_MedId] = useState(false);

  // ✅ Add Medicine
  const addPharmaMedicine = async () => {
    try {
      if (
        !namePharmaMed ||
        !companyPharmaMed ||
        !stockPharmaMed ||
        !pricePharmaMed ||
        !expireDatePharmaMed ||
        !tabletsPharmaMed
      ) {
        setAlertMsg("⚠️ Please fill all the fields before submitting!");
        setAlertType("warning");
        return;
      }
      setSpiner(true)

      const response = await fetch("/api/addpharmamed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          PharmaMedname: namePharmaMed,
          PharmaMedcompany: companyPharmaMed,
          PharmaMedstock: stockPharmaMed,
          PharmaMedTablets: tabletsPharmaMed,
          PharmaMedprice: pricePharmaMed,
          PharmaMedexpireDate: expireDatePharmaMed,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setAlertMsg("✅ Medicine added successfully!");
        setAlertType("success");
      setSpiner(false)

        // Refresh medicine list
        fetchPharmacyMed();

        // Clear form
        setPharmaMedName("");
        setPharmaMedCompany("");
        setPharmaMedStock("");
        setPharmaMedPrice("");
        setPharmaMedExpireDate("");
        setPharmaMedTablets("");
      } else {
        setAlertMsg(result.message || "❌ Failed to add medicine.");
        setAlertType("error");
      }
    } catch (error) {
      //console.log.error("❌ Error adding medicine:", error);
      setAlertMsg("❌ Error adding medicine. Please try again.");
      setAlertType("error");
       setTimeout(() => {
    setAlertMsg("");
    setAlertType("");
  }, 2000);
    }
  };

  // ✅ Fetch Medicines
  const fetchPharmacyMed = async () => {
  try {
    const res = await fetch("/api/fetchpharmacymed");
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const result = await res.json();

    // ✅ Only update if different (avoid infinite re-renders)
    setPharmaMed((prev) => {
      const newData = result.data || [];
      return JSON.stringify(prev) === JSON.stringify(newData) ? prev : newData;
    });
  } catch (error) {
    //console.log.error("❌ Error fetching medicines:", error);
    // setAlertMsg("❌ Failed to fetch medicines.");
    setAlertType("error");
     setTimeout(() => {
    setAlertMsg("");
    setAlertType("");
  }, 2000);
  }
};


  // ✅ Auto-fetch on mount
  useEffect(() => {
    fetchPharmacyMed();
  }, []);

  // 🔍 Debounced Search
  useEffect(() => {
    if (!searchTerm) return;

    const delayDebounce = setTimeout(async () => {
      try {
      setSpiner(true)

        const resSearch = await fetch(
          `/api/searchpharmacymed/${searchTerm}`
        );
        const dataSearch = await resSearch.json();
        setFilteredMed(Array.isArray(dataSearch.data) ? dataSearch.data : []);
    setSpiner(false)

      } catch (error) {
        //console.log.error("❌ Search failed:", error);
        setFilteredMed([]);
      }
    }, 300);
    
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // ✅ Sync full list when no search
 useEffect(() => {
  if (!searchTerm) {
    // Avoid unnecessary updates
    setFilteredMed((prev) => {
      if (prev !== pharmacyMed) {
        return pharmacyMed;
      }
      return prev;
    });
  }
}, [pharmacyMed, searchTerm]);











// invoice handle
const InvoiceHandle = () => {
      setSpiner(true)

  const invoiceObj = {
    patient: {
      name: patientName,
      number: patientNumber,
      address: patientAddress,
    },
    medicines: summary, // array of selected medicines with qty/price
    date: new Date().toLocaleDateString(),
    BillData:BillingPriceRates
  };

  setInvoiceData(invoiceObj);
      setSpiner(false)

    navigate("/invoice"); 
  //console.log.log("✅ Final Invoice:", invoiceObj);
  
  HandlepharmaMedQuntity()
};

const HandlepharmaMedQuntity = async () => {
  try {
    // Sirf id aur quantity extract karna
    const medicinesToSend = summary.map(item => ({
      id: item.id,
      quantity: item.quantity,
    }));

    const res = await fetch("/api/setquntitybypharmacyinvoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ medicineDetails: medicinesToSend }),
    });

     await res.json();
    if (res.ok) {
      //console.log.log("✅ Sent to backend:", result);
    } else {
      //console.log.error("❌ Failed:", result);
    }
  } catch (err) {
    //console.log.log("❌ Error sending medicines:", err);
  }
};




// Login system 

// Login system
const PharmaLogin = async () => {
  try {
    setSpiner(true)
    const res = await fetch("http://localhost:3002/api/pharmalogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ✅ allow cookies/session
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await res.json();
    //console.log.log("Login response:", data);

    if (res.ok && data.message === "Login successful") {
      navigate("/pharmacy"); // ✅ redirect to pharmacy page
      setSpiner(false)
    } else {
      setAlertMsg(data.message || "❌ Invalid username or password");
      setAlertType("error");
    }
  } catch (err) {
    //console.log.error("Login error:", err);
    setAlertMsg("❌ Server error during login");
    setAlertType("error");
     setTimeout(() => {
    setAlertMsg("");
    setAlertType("");
  }, 2000);
  }
};


// 🚀 Logout function
const Logoutpharma = async () => {
  try {
      setSpiner(true)

    let res = await fetch("/api/pharmalogout", {
      method: "POST",
      credentials: "include",
    });

    let data = await res.json(); // ✅ parse response JSON
    //console.log.log("Logout response:", data);

    if (data.message === "Logged out") {
      setSpiner(false)

      navigate("/pharmalogin"); // ✅ Redirect after logout
    }
  } catch (err) {
    //console.log.error("Logout failed:", err);
  }
};


// fetch with specific id for edit
const FetchwitIdforEdit=async (id)=>{
  const res = await fetch(`/api/fetchpharmamededit/${id}`)
   const Editdata =await res.json()
  if (res.ok && Editdata) {
  setEditpharmaMedData(Editdata.data ||   '');
  setupdatepharmaMed_MedId(id);
} else {
  //console.log.error("Failed to fetch data for edit");
}




}
const UpdatePharmaEditModal=async ()=>{

 const res = await fetch(`/api/updatepharmamed/${forupdatemedid}`,{
    method:"post",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         updateMedname: EditPharmMed_Medname,
         updateMedcompany: EditPharmMed_company,
         updatequntity: EditPharmMed_quntity,
         updateavailable: EditPharmMed_available,
         updateunitprice: Unitprice,
         updateboxprice: boxprice,
         updateexpdate: EditPharmMed_expdate
        }),
    
  })
   const updatedata =await res.json()
   ////console.log.log(updatedata);
   
   if (updatedata.success) {
    fetchPharmacyMed()
     setAlertMsg("Medicine Updated Succesfully");
    setAlertType("success");
     // Auto hide after 2 seconds
  setTimeout(() => {
    setAlertMsg("");
    setAlertType("");
  }, 2000);
   }

}

const DelPharmaMedByID= async(id)=>{
  try {
    const res = await fetch(`/api/delpharmamed/${id}`, {
      method: "DELETE",   // ✅ correct method
    });
    const delOK = await res.json();

    if (res.ok && delOK.message === "Deleted successfully") {
      fetchPharmacyMed();
      // setIsMedDelAlert(true);
    } else {
      alert(delOK.error || "Error deleting medicine");
    }
  } catch (err) {
    //console.log.error("Delete failed:", err);
    alert("Something went wrong while deleting");
  }
}


  return (
    <PharmacyContext.Provider
      value={{
        // States
        pharmacyMed,

        // Form values
        namePharmaMed,
        companyPharmaMed,
        stockPharmaMed,
        pricePharmaMed,
        expireDatePharmaMed,
        tabletsPharmaMed,

        // Form setters
        setPharmaMedName,
        setPharmaMedStock,
        setPharmaMedPrice,
        setPharmaMedExpireDate,
        setPharmaMedCompany,
        setPharmaMedTablets,

        // Actions
        addPharmaMedicine,
        fetchPharmacyMed,

        // Alerts
        alertMsg,
        alertType,
        setAlertMsg,

        // Search
        setSearchTerm,
        filteredMed,
// patientInfo
setPatientModal,
setPatientAddress,
setPatientName,
setPatientNumber,patientModal,


// summary
summary, setSummary,

InvoiceHandle,
setBillingPriceRates,
InvoiceData,


// Login
setusername,
setpassword,
PharmaLogin,Logoutpharma,

// spiner
spiner,setSpiner,
// pharmacy edit mdal
setEditPharmMed_Medname,
setEditPharmMed_company,
setEditPharmMed_available,
setEditPharmMed_expdate,
setEditPharmMed_quntity,isEditModalOpen, setisEditModalOpen,
setEditPharmMed_unitprice,
FetchwitIdforEdit,
setEditPharmMed_Boxprice,
pharmaeditMedData,
UpdatePharmaEditModal,
DelPharmaMedByID
      }}
    >
      {children}
    </PharmacyContext.Provider>
  );
};

