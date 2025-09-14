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
const [startDate,setstartDate]=useState("")
const [EndDate,setendDate]=useState("")

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const location = useLocation();
  const Isdashboard = location.pathname === "/admindashboard";
  const Istaff_dashboard =location.pathname === "/indoormedmangment"
// ////console.log(Indoor_Med_current);

  const IndoorMedSubmitHandle = async () => {
    try {
      const res = await fetch("/api/addindoormed", {
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
      ////console.error("Error:", err);
    }
  };
  // Formatter dd-MMM yy (jaise 14-Aug 25)
  const formatDate = (date) => {
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      })
      .replace(",", ""); // remove comma if any
  };
const FetchMedicine = useCallback(async (option) => {
   try {
    const now = new Date();
    let startDate, endDate;

    if (option === "lastMonth") {
      // current month se ek mahina pehle
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), 1);
 setstartDate(formatDate(startDate));
  setendDate(formatDate(endDate));

    } else if (option === "lastTwoMonths") {
      // current month se do mahine pehle
      startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      endDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
 setstartDate(formatDate(startDate));
  setendDate(formatDate(endDate));
   } else if (option === "current") {
  // Current month ka 1st date
  startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  // Aaj ka date
  endDate = now;
  setstartDate(formatDate(startDate));
  setendDate(formatDate(endDate));
}
else {
      // agar koi option select nahi hua

 startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  // Aaj ka date
  endDate = now;
  setstartDate(formatDate(startDate));
  setendDate(formatDate(endDate));
    }

    let url = `/api/fetchallmed`;
    if (startDate && endDate) {
      url += `?start=${startDate.toISOString()}&end=${endDate.toISOString()}`;
    }

  const res = await fetch(url);
    const allMed = await res.json();
    if (Array.isArray(allMed)) setFetchAllMed(allMed);
  } catch (err) {
    //console.log(err);
  }
}, [setFetchAllMed]);
// Delect Row using ID

const DelMedByID = async (id) => {
  try {
    const res = await fetch(`/api/delmed/${id}`, {
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
    ////console.error("Delete failed:", err);
    alert("Something went wrong while deleting");
  }
};


const HandleEditModal =async()=>{
  const res = await fetch(`/api/updatemed/${EditMed_MedId}`,{
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
  //  //////console.log(updatedata);
   
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
    const resSearch = await fetch(`/api/searchbyname/${searchTerm}`);
    const dataSearch = await resSearch.json();
    //////console.log(dataSearch.data);
    
    setResults(Array.isArray(dataSearch.data) ? dataSearch.data : []);
  }, 300);

  return () => clearTimeout(delayDebounce);
}, [searchTerm]);





 useEffect(() => {
    if (Isdashboard  || Istaff_dashboard ) {
      FetchMedicine();
    }
}, [Isdashboard, FetchMedicine,Istaff_dashboard]);





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

        startDate,EndDate
      
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
