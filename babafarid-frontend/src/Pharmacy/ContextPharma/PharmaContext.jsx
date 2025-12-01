

import { createContext, useContext, useState,useCallback, useEffect} from "react";
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

  // setInvoiceReport list
  const [InvoiceReport, setInvoiceReport] = useState([]);
  // Medicines list
  // const [LastMonthpharmacyMed, setLastMonthPharmaMed] = useState([]);
  // const [currentMonthpharmacyMed, setcurrentMonthPharmaMed] = useState([]);

  // Search
  // const [filteredMed, setFilteredMed] = useState([]);

  // Alerts
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("info");

// patient info state
const [patientModal, setPatientModal] = useState(false);
const [PatientID, setPatientID] = useState("");

const [summary, setSummary] = useState([]);
const [InvoiceData ,setInvoiceData]=useState({})
const [BillingPriceRates,setBillingPriceRates]=useState({})
const [username,setusername]=useState("")
const [password,setpassword]=useState("")
const [spiner,setSpiner]=useState(false)
// //////console.log.log(username,password);
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

  const [InvoiceDataByID, setInvoiceDatabyID] = useState(null);

    const [ListOfNewStock, setListOfNewStock] = useState([]);
  const [ExtractMedForReport, setExtractMedForReport] = useState([]);


const [updatedInvoiceData ,setupdatedInvoiceData]=useState()
  const [alert, setAlert] = useState({ msg: "", type: "info" });


// ✅ Fetch from backend instead of relying only on localStorage
useEffect(() => {
  const fetchLastInvoiceID = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/last-invoice-id`);
      const data = await res.json();
      const nextID = data.lastID + 1;
      setInvoiceID(nextID);
      localStorage.setItem("lastInvoiceID", nextID); // optional for local speed
    } catch (error) {
      console.error("❌ Failed to fetch last invoice ID:", error);
      // fallback to localStorage if backend fails
      const saved = localStorage.getItem("lastInvoiceID");
      setInvoiceID(saved ? parseInt(saved) + 1 : 1000);
    }
  };
  fetchLastInvoiceID();
}, []);
  const [InvoiceID, setInvoiceID] = useState(() => {

  // Initialize from localStorage (to persist after reload)
  const saved = localStorage.getItem("lastInvoiceID");
  return saved ? parseInt(saved) + 1 : 1000; // start from 1000
});

const generateNextInvoiceID = () => {
  setInvoiceID((prev) => {
    const next = prev + 1;
    localStorage.setItem("lastInvoiceID", next);
    return next;
  });
};


// ✅ Auto-remove alert after 2 seconds
useEffect(() => {
  if (alertMsg) {
    const timer = setTimeout(() => {
      setAlertMsg("");
      setAlertType("");
    }, 2000);
    return () => clearTimeout(timer);
  }
}, [alertMsg,setAlertMsg]);
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

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/addpharmamed`, {
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
      //////console.log.error("❌ Error adding medicine:", error);
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

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/fetchpharmacymed`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const result = await res.json();
    
    // ✅ Only update if different (avoid infinite re-renders)
    setPharmaMed((prev) => {
      const newData = result.data || [];
      return JSON.stringify(prev) === JSON.stringify(newData) ? prev : newData;
    });
  } catch (error) {
    //////console.log.error("❌ Error fetching medicines:", error);
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
  // useEffect(() => {
  //   if (!searchTerm) return;

  //   const delayDebounce = setTimeout(async () => {
  //     try {
  //     setSpiner(true)

  //       const resSearch = await fetch(
  //         `${process.env.REACT_APP_BACKEND_URL}/api/searchpharmacymed/${searchTerm}`
  //       );
  //       const dataSearch = await resSearch.json();
  //       setFilteredMed(Array.isArray(dataSearch.data) ? dataSearch.data : []);
  //   setSpiner(false)

  //     } catch (error) {
  //       //////console.log.error("❌ Search failed:", error);
  //       setFilteredMed([]);
  //     }
  //   }, 300);
    
  //   return () => clearTimeout(delayDebounce);
  // }, [searchTerm]);

  // ✅ Sync full list when no search
//  useEffect(() => {
//   if (!searchTerm) {
//     // Avoid unnecessary updates
//     setFilteredMed((prev) => {
//       if (prev !== pharmacyMed) {
//         return pharmacyMed;
//       }
//       return prev;
//     });
//   }
// }, [pharmacyMed, searchTerm]);











// invoice handle
const InvoiceHandle = () => {
  setSpiner(true);

  // ✅ Prepare Invoice Object
  const invoiceObj = {
    PatientID: PatientID,
    InvoiceID: InvoiceID,
    medicines: summary, // selected medicines with qty/price
    date: new Date().toLocaleDateString(),
    BillData: BillingPriceRates,
  };

  setInvoiceData(invoiceObj);

  // ✅ Update for next invoice
  generateNextInvoiceID();

  setSpiner(false);
  navigate("/invoice");
};

const HandlepharmaMedQuntity = async () => {
  try {
    // Sirf id aur quantity extract karna
    const medicinesToSend = summary.map(item => ({
      id: item.id,
      quantity: item.quantity,
      PricePerTablet: item.PricePerTablet,
      PriceOFMedPerBuy: item.PriceOFMedPerBuy,
    }));
////console.log("medicene to send",medicinesToSend);

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/setquntitybypharmacyinvoice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ medicineDetails: medicinesToSend }),
    });

     await res.json();
    if (res.ok) {
      //////console.log.log("✅ Sent to backend:", result);
    } else {
      //////console.log.error("❌ Failed:", result);
    }
  } catch (err) {
    //////console.log.log("❌ Error sending medicines:", err);
  }

};


// Invoice saved Api 
const SaveInvoiceData = async () => {
  try {


    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/saveinvoice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ InvoiceDetails: InvoiceData }),
    });

     await res.json();
    if (res.ok) {
      //////console.log.log("✅ Sent to backend:", result);
    } else {
      //////console.log.error("❌ Failed:", result);
    }
  } catch (err) {
    //////console.log.log("❌ Error sending medicines:", err);
  }
};














// Login system 

// Login system
const PharmaLogin = async () => {
  try {
    setSpiner(true)
    const res = await fetch( `${process.env.REACT_APP_BACKEND_URL}/api/pharmalogin `, {
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
    //////console.log.log("Login response:", data);

    if (res.ok && data.message === "Login successful") {
      navigate("/pharmacy"); // ✅ redirect to pharmacy page
      setSpiner(false)
    } else {
      setAlertMsg(data.message || "❌ Invalid username or password");
      setAlertType("error");
    }
  } catch (err) {
    //////console.log.error("Login error:", err);
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

    let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/pharmalogout`, {
      method: "POST",
      credentials: "include",
    });

    let data = await res.json(); // ✅ parse response JSON
    //////console.log.log("Logout response:", data);

    if (data.message === "Logged out") {
      setSpiner(false)

      navigate("/pharmalogin"); // ✅ Redirect after logout
    }
  } catch (err) {
    //////console.log.error("Logout failed:", err);
  }
};


// fetch with specific id for edit
const FetchwitIdforEdit=async (id)=>{
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/fetchpharmamededit/${id}`)
   const Editdata =await res.json()
  if (res.ok && Editdata) {
  setEditpharmaMedData(Editdata.data ||   '');
  setupdatepharmaMed_MedId(id);
} else {
  //////console.log.error("Failed to fetch data for edit");
}

}
const UpdatePharmaEditModal=async ()=>{

 const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/updatepharmamed/${forupdatemedid}`,{
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
   ////////console.log.log(updatedata);
   
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
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/delpharmamed/${id}`, {
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
    //////console.log.error("Delete failed:", err);
    alert("Something went wrong while deleting");
  }
}


  // ✅ Fetch for new stock  Medicines
//   const FetchlastMonthPharmaMed = async () => {
//   try {
// // Build query parameters if start and end are provided
    
//     const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/fetchlastmonthpharmacymed`);
//     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

//     const result = await res.json();
    
//     // ✅ Only update if different (avoid infinite re-renders)
//     setLastMonthPharmaMed((prev) => {
//       const newData = result.data || [];
//       return JSON.stringify(prev) === JSON.stringify(newData) ? prev : newData;
//     });
//   } catch (error) {
//     //////console.log.error("❌ Error fetching medicines:", error);
//     // setAlertMsg("❌ Failed to fetch medicines.");
//     setAlertType("error");
//      setTimeout(() => {
//     setAlertMsg("");
//     setAlertType("");
//   }, 2000);
//   }
// };

  // ✅ Fetch for currennt stock  Medicines
//   const FetchCurrentMonthPharmaMed = async () => {
//   try {
// // Build query parameters if start and end are provided
    
//     const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/fetchcurrentmonthpharmacymed`);
//     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

//     const result = await res.json();
    
//     // ✅ Only update if different (avoid infinite re-renders)
//     setcurrentMonthPharmaMed((prev) => {
//       const newData = result.data || [];
//       return JSON.stringify(prev) === JSON.stringify(newData) ? prev : newData;
//     });
//   } catch (error) {
//     //////console.log.error("❌ Error fetching medicines:", error);
//     // setAlertMsg("❌ Failed to fetch medicines.");
//     setAlertType("error");
//      setTimeout(() => {
//     setAlertMsg("");
//     setAlertType("");
//   }, 2000);
//   }
// };



// Add new stock medicines for indoor use
const AddNewstock_Pharmacy = async () => {
  try {
    // Ensure ListOFNewstack is not empty
    if (!Array.isArray(ListOfNewStock) || ListOfNewStock.length === 0) {
      alert("Please add at least one medicine before saving.");
      return;
    }

    // Prepare request body as object (to keep it clean and consistent)
    const payload = { medicines: ListOfNewStock };
////console.log("payload",payload);

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/addnewstockpharmamed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
setAlertMsg("✅ Medicines saved successfully!");
        setAlertType("success");
      setListOfNewStock([]);
    } else {
      setAlertMsg("❌ Failed to create medicine record");
        setAlertType("warning");
    }
  } catch (err) {
    //console.error("🚨 Error saving new stock:", err);
    alert("Something went wrong while saving medicines.");
  }
};




// Add new stock medicines for indoor use
const UpdateNewstock_Pharmacy = async () => {
  try {


   
    // Prepare request body as object (to keep it clean and consistent)
    const payload = { medicines: ListOfNewStock };
////console.log("payload",payload);

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/updatecurrentpharma_stock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      // setIsMedAddAlert(true);
      ////console.log("✅ Medicines saved successfully!");
setAlertMsg("✅ Medicines saved successfully!");
        setAlertType("success");
      // Optionally clear the list after save
      setListOfNewStock([]);
    } else {
      //console.error("❌ Failed to create medicine record:", data.message || "Unknown error");
      setAlertMsg("❌ Failed to create medicine record");
        setAlertType("warning");
    }
  } catch (err) {
    //console.error("🚨 Error saving new stock:", err);
    setAlert("Something went wrong while saving medicines.");
  }
};





// Fetch Invoices



  // ✅ Fetch Medicines
 const FetchInvoicesReport =useCallback( async (start, end) => {
  try {
    let query = "";

    // handle filter logic
    if (start && end) {
      query = `?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;
    } else if (start && !end) {
      query = `?start=${encodeURIComponent(start)}`;
    }

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/fetchinvoicesreport${query}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const result = await res.json();
    setInvoiceReport(result.data || []);
  } catch (error) {
    //console.error("❌ Error fetching invoices:", error);
  }
},[])


// fetch invoice by id


  // ✅ Fetch Medicines
 const FetchInvoicesByID =async (ID) => {
  try {
const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/fetchinvoicesbyid?InvoiceID=${ID}`);

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const result = await res.json();
    setInvoiceDatabyID(result.data || []);
    ////console.log("InvoiceDataByID",InvoiceDataByID);
    
  } catch (error) {
    //console.error("❌ Error fetching invoices:", error);
  }
}


// handle update invoice 

const handleUdateInvoice = async (invoiceIDParam) => {
  try {
    if (!updatedInvoiceData) {
      setAlert({ msg: "No data to update", type: "warning" });
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/update-return/${invoiceIDParam}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInvoiceData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // ✅ Success alert
      setAlert({ msg: "Return confirmed successfully!", type: "success" });

      // ✅ After 3 seconds -> clear alert & reset page
      setTimeout(() => {
        setAlert({ msg: "", type: "" });
        setInvoiceDatabyID(null);  // clear fetched invoice data
        setupdatedInvoiceData(null);
        setSummary([]);
      }, 3000);
    } else {
      setAlert({ msg: data.message || "Failed to update invoice", type: "error" });

      // auto-clear alert
      setTimeout(() => setAlert({ msg: "", type: "" }), 3000);
    }
  } catch (error) {
    setAlert({ msg: "Failed to update invoice", type: "error" });
    setTimeout(() => setAlert({ msg: "", type: "" }), 3000);
  }
};

  
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

        // // Search
        // setSearchTerm,
        // filteredMed,
// patientInfo
setPatientModal,
setPatientID,

patientModal,


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
DelPharmaMedByID,




// list
ListOfNewStock, setListOfNewStock
,
// add stock 
AddNewstock_Pharmacy,

ExtractMedForReport, setExtractMedForReport,

HandlepharmaMedQuntity,

// save invoice data 
SaveInvoiceData,
FetchInvoicesReport,
InvoiceReport,
InvoiceDataByID,
FetchInvoicesByID,
setupdatedInvoiceData,
handleUdateInvoice,
alert,setAlert,UpdateNewstock_Pharmacy
}}
    >
      {children}
    </PharmacyContext.Provider>
  );
};

