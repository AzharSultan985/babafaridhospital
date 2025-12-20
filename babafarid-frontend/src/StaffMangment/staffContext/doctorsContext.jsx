
import { createContext,useState,useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";

export const DoctorsContext = createContext();

 export const DoctorsMangementProvider = ({ children }) => {
const [loggedin_Doctor_Res,setloggedin_Doctor_Res]=useState()
const [DoctorData,setDoctorData]=useState()
const navigate = useNavigate();

useEffect(() => {
    const storedDoctor = localStorage.getItem("doctorData");
    if (storedDoctor) {
      setDoctorData(JSON.parse(storedDoctor));
    }
  }, []);
const HandleLogindoctor=async (Authdata)=>{
    
try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/doctor_login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },  credentials: "include" ,
        body: JSON.stringify({
        username:Authdata.username,
        password:Authdata.password
        })
      });
      const data = await res.json();

      if (data.message === "Login successful") {
        setloggedin_Doctor_Res(data.message)
        
        setTimeout(() => {
          setloggedin_Doctor_Res("")
          
        }, 2000);
      
      // console.log("Doctor from backend:", data.doctor);
setDoctorData(data.doctor)
 localStorage.setItem("doctorData", JSON.stringify(data.doctor));

          navigate("/doctor_profile");

        


}else {
        throw new Error("Failed to logged doctor");
      }
    } catch (err) {
      ////console.log.error("Error:", err);
    }

}

 // ✅ useCallback for stable function reference (ESLint fix)
  const refreshDoctorData = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/refresh_doctor`, {
        credentials: "include"
      });
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      if (data.doctor) {
        setDoctorData(data.doctor);
        localStorage.setItem("doctorData", JSON.stringify(data.doctor)); // ✅ Update localStorage too
        console.log("✅ Doctor refreshed:", data.doctor);
      }
    } catch (err) {
      console.error("Refresh failed:", err);
    }
  }, []);


  return (
    <DoctorsContext.Provider value={{HandleLogindoctor,loggedin_Doctor_Res,DoctorData,refreshDoctorData}}>
      {children}
    </DoctorsContext.Provider>
  );
};

