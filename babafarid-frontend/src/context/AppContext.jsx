import { createContext, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [Indoor_Med_name, setIndoor_Med_name] = useState("");
  const [Indoor_Med_quntity, setIndoor_Med_quntity] = useState("");
  const [Indoor_Med_company, setIndoor_Med_company] = useState("");
  const [, setIndoor_Med_current] = useState("");
  const [Indoor_Med_Exp_date, setIndoor_Med_Exp_date] = useState("");
  const [FetcAllMed, setFetchAllMed] = useState([]); 
  const [IsMedAddAlert ,setIsMedAddAlert]=useState(false)
  const [IsMedDelAlert ,setIsMedDelAlert]=useState(false)
const [EditMed_Medname,setEditMed_Medname]=useState()
const [EditMed_company,setEditMed_company]=useState()
const [EditMed_MedId,setEditMed_MedId]=useState()
const [EditMed_quntity,setEditMed_quntity]=useState()
const [EditMed_current,setEditMed_current]=useState()
const [EditMed_expdate,setEditMed_expdate]=useState()
const [loading,setloading]=useState(false)
// const [startDate,setstartDate]=useState("")
// const [EndDate,setendDate]=useState("")
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const location = useLocation();
  const Isdashboard = location.pathname === "/admindashboard";
  const Istaff_dashboard =location.pathname === "/indoormedmangment"
// //////console.log(Indoor_Med_current);
const [ListOFNewstack,setListOFNewstack]=useState([])
// //console.log(ListOFNewstack);
// Medicines list
  // const [LastMonthindoorMed, setLastMonindoorMed] = useState([]);
  // const [currentMonthindoorMed, setcurrentMonindoorMed] = useState([]);

  const IndoorMedSubmitHandle = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/addindoormed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Medname: Indoor_Med_name,
          company: Indoor_Med_company,
          quntity: Indoor_Med_quntity,
          current: Indoor_Med_quntity,
          expdate: Indoor_Med_Exp_date
        }),
      });
      const data = await res.json();

if (data.success) {
  
  setIsMedAddAlert(true)
}
else {
        throw new Error("Failed to create medicine record");
      }
    } catch (err) {
      //////console.error("Error:", err);
    }
  };


// Add new stock medicines for indoor use
const AddNewstock_Indoor = async () => {
  try {
    // Ensure ListOFNewstack is not empty
    if (!Array.isArray(ListOFNewstack) || ListOFNewstack.length === 0) {
      alert("Please add at least one medicine before saving.");
      return;
    }

    // Prepare request body as object (to keep it clean and consistent)
    const payload = { medicines: ListOFNewstack };
//console.log(payload);

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/addnewstockindormed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setIsMedAddAlert(true);
      FetchMedicine()
      //console.log("✅ Medicines saved successfully!");
      // Optionally clear the list after save
      // setListOFNewstack([]);
    } else {
      //console.error("❌ Failed to create medicine record:", data.message || "Unknown error");
      alert("Failed to save medicines. Please try again.");
    }
  } catch (err) {
    //console.error("🚨 Error saving new stock:", err);
    alert("Something went wrong while saving medicines.");
  }
};



// update indoor medicines
const Updatestock_Indoor = async () => {
  try {
    // Ensure ListOFNewstack is not empty
    if (!Array.isArray(ListOFNewstack) || ListOFNewstack.length === 0) {
      alert("Please add at least one medicine before saving.");
      return;
    }

    // Prepare request body as object (to keep it clean and consistent)
    const payload = { medicines: ListOFNewstack };
//console.log(payload);

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/updatestockindormed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setIsMedAddAlert(true);
      FetchMedicine()
      //console.log("✅ Medicines saved successfully!");
      // Optionally clear the list after save
      // setListOFNewstack([]);
    } else {
      //console.error("❌ Failed to create medicine record:", data.message || "Unknown error");
      alert("Failed to save medicines. Please try again.");
    }
  } catch (err) {
    //console.error("🚨 Error saving new stock:", err);
    alert("Something went wrong while saving medicines.");
  }
};









 
const FetchMedicine = useCallback(async () => {
   try {
     const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/fetchallindoormed`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const allMed = await res.json();
    if (Array.isArray(allMed)) setFetchAllMed(allMed);
  } catch (err) {
    ////console.log(err);
  }
}, [setFetchAllMed]);
// Delect Row using ID




const DelMedByID = async (id) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/delmed/${id}`, {
      method: "DELETE",   // ✅ correct method
    });
    const delOK = await res.json();

    if (res.ok && delOK.message === "Deleted successfully") {
      FetchMedicine();
      setIsMedDelAlert(true);
    } else {
      alert(delOK.error || "Error deleting medicine");
    }
  } catch (err) {
    //////console.error("Delete failed:", err);
    alert("Something went wrong while deleting");
  }
};


const HandleEditModal =async()=>{
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/updatemed/${EditMed_MedId}`,{
    method:"post",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updateMedname: EditMed_Medname,
          updateMedcompany: EditMed_company,
         updatequntity: EditMed_quntity,
         updatecurrent: EditMed_current,
          updateexpdate: EditMed_expdate
        }),
    
  })
   const updatedata =await res.json()
  //  ////////console.log(updatedata);
   
   if (updatedata.success) {
    FetchMedicine()
    setIsMedAddAlert(true)
   }

}

  useEffect(() => {
  if (!searchTerm) {
    setResults([]);
    return;
  }
  
  const delayDebounce = setTimeout(async () => {
    const resSearch = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/searchbyname/${searchTerm}`);
    const dataSearch = await resSearch.json();
    ////////console.log(dataSearch.data);
    
    setResults(Array.isArray(dataSearch.data) ? dataSearch.data : []);
  }, 300);

  return () => clearTimeout(delayDebounce);
}, [searchTerm]);




// Auto-refresh medicines every 10 seconds
useEffect(() => {
  if (Isdashboard || Istaff_dashboard) {
    // Initial fetch on page load
    FetchMedicine();

    // Set interval to auto-refresh every 10 seconds
    const interval = setInterval(() => {
      FetchMedicine();
    }, 200000); // refresh every 10 seconds

    // Cleanup when component unmounts
    return () => clearInterval(interval);
  }
}, [Isdashboard, Istaff_dashboard, FetchMedicine]);

  // ✅ Fetch for new stock  Medicines
//   const FetchlastMonthIndoorMed = async () => {
//   try {
// // Build query parameters if start and end are provided
    
//     const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/fetchlastmonthindoormed`);
//     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

//     const result = await res.json();
//     //console.log(result);
    
//     // ✅ Only update if different (avoid infinite re-renders)
//     setLastMonindoorMed((prev) => {
//       const newData = result.data || [];
//       return JSON.stringify(prev) === JSON.stringify(newData) ? prev : newData;
//     });
//   } catch (error) {
//     //console.log("❌ Error fetching medicines:", error);
//     // setAlertMsg("❌ Failed to fetch medicines.");
//   //   setAlertType("error");
//   //    setTimeout(() => {
//   //   setAlertMsg("");
//   //   setAlertType("");
//   // }, 2000);
//   }
// };
  // ✅ Fetch for current  Medicines
//   const FetchIndoorMedStock = async () => {
//   try {
// // Build query parameters if start and end are provided
    
//     const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/fetchindoorstock`);
//     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

//     const result = await res.json();
//     //console.log(result);
    
//     // ✅ Only update if different (avoid infinite re-renders)
//     setcurrentMonindoorMed((prev) => {
//       const newData = result.data || [];
//       return JSON.stringify(prev) === JSON.stringify(newData) ? prev : newData;
//     });
//   } catch (error) {
//     //console.log("❌ Error fetching medicines:", error);
//     // setAlertMsg("❌ Failed to fetch medicines.");
//   //   setAlertType("error");
//   //    setTimeout(() => {
//   //   setAlertMsg("");
//   //   setAlertType("");
//   // }, 2000);
//   }
// };

  return (
    <AppContext.Provider
      value={{
        Indoor_Med_name,
        Indoor_Med_quntity,
        Indoor_Med_Exp_date,
        setIndoor_Med_name,
        setIndoor_Med_quntity,
        setIndoor_Med_Exp_date,
        IndoorMedSubmitHandle,
        FetcAllMed,
        IsMedAddAlert,
        DelMedByID,
        setIsMedAddAlert,

     setEditMed_Medname,
setEditMed_quntity,
setEditMed_expdate,
HandleEditModal,
setIsMedDelAlert,
IsMedDelAlert,
setSearchTerm,
results,
 setIndoor_Med_company,
setIndoor_Med_current,
setEditMed_company,
setEditMed_current,
FetchMedicine,
loading,setloading,
  // ✅ edit fields
        EditMed_MedId,
        EditMed_Medname,
        EditMed_company,
        EditMed_quntity,
        EditMed_current,
        EditMed_expdate,
        setEditMed_MedId,

      setListOFNewstack,
      ListOFNewstack,
      AddNewstock_Indoor
   ,
  //  fetch last month medicine for indoor new stock added 
  
 Updatestock_Indoor
      }}  
    >
      {children}
    </AppContext.Provider>
  );
};
