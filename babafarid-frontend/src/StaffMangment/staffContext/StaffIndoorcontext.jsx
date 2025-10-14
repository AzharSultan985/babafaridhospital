
import { createContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react"
import { AppContext } from "../../context/AppContext";
export const StaffIndoorMedCotext = createContext();

 export const StaffIndoorMangmentProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const [loggedin_Indoor_Res,setloggedin_Indoor_Res]=useState()
const [UsedMEd,setUsedMEd]=useState()
const [UsedMedId, setUsedMedId]=useState()
const [CurrentMed, setCurrentMed]=useState()
const [AlertResofCurMed, setAlertResofCurMed]=useState()
const navigate = useNavigate();
  const {FetchMedicine} =useContext(AppContext)

  const LoginStaffIndoor = async () => {
  try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/loginstaffindoor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },  credentials: "include" ,
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      const data = await res.json();

      if (data.message === "Login successful") {
        setloggedin_Indoor_Res(data.message)
  navigate("/indoormedmangment", { replace: true });
}else {
        throw new Error("Failed to logged admin");
      }
    } catch (err) {
      //console.log.error("Error:", err);
    }
  };

const HandleUsedMed =async()=>{
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/usedmed/${UsedMedId}`,{
    method:"POST",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         
         updateUsedMed: UsedMEd,
          currentquntityMed:CurrentMed
        }),
    
  })
   const updatedata =await res.json()
  //  //////console.log.log(updatedata);
   
   if (updatedata.success ) {
FetchMedicine()
// //////console.log.log("used successful");
setAlertResofCurMed(updatedata.message)
   }

}



   // 🚀 New logout function
  const LogoutIndoor = async () => {
    try {
//////console.log.log("logout clicked");


      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/LogoutIndoor`, {
        method: "POST",
        credentials: "include"
      });
   
     navigate( "/stafflogin");
    } catch (err) {
      //console.log.error("Logout failed:", err);
    }
  };

  return (
    <StaffIndoorMedCotext.Provider value={{setUsername,setPassword ,LoginStaffIndoor, loggedin_Indoor_Res,LogoutIndoor,HandleUsedMed,setUsedMEd,setUsedMedId,setCurrentMed,AlertResofCurMed,setAlertResofCurMed}}>
      {children}
    </StaffIndoorMedCotext.Provider>
  );
};

