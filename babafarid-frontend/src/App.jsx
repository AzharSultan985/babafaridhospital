import Dashboard from "./components/dasboard";
// import Home from "./components/home";
import IndoorMedAdd from "./components/Indoor_Med_Add";
import { Routes, Route } from 'react-router-dom';
import Login from "./components/login";
import ProtectedRoute from "./components/protectroute";
import StaffIndoorLogin from "./StaffMangment/staffIndoorComponents/staffLogin";
import IndoorMedManage from "./StaffMangment/staffIndoorComponents/indoorMedMange";
import StaffIndoorProtectedRoute from "./ProtectedRoutes/staffindoorProtect";
import Mainpage from "./components/Mainpage";
import Pharmacy from "./Pharmacy/phrmaComp/phrma";
import AddPharamaMedicineForm from "./Pharmacy/phrmaComp/AddPharmaMed";
import Invoice from "./Pharmacy/phrmaComp/Invoice";
import PhramaLogin from "./Pharmacy/phrmaComp/PhrmaLogin";
import PharmacyProtectedRoute from "./ProtectedRoutes/PharmacyProtectRoute";
import HeartbeatLoader from "./components/spiner";
import { usePharmacy } from "./Pharmacy/ContextPharma/PharmaContext";
import { AppContext } from "./context/AppContext"
import { useContext } from "react"
import AddANewStack from "./components/addANewStackIndoor";
import ReturnMedicine from "./Pharmacy/phrmaComp/ReturnMed";

function App() {
  const {spiner } = usePharmacy();
    const {loading} =useContext(AppContext)
  return (
    <>
{
  (spiner || loading) && 
    <HeartbeatLoader></HeartbeatLoader>
}
      <Routes>

        <Route path="/" element={<Mainpage />} />
        {/* <Route path="/" element={<HeartbeatLoader />} /> */}

        <Route path="/addindoormed" element={<IndoorMedAdd />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stafflogin" element={< StaffIndoorLogin />} />
        <Route path="/indoormedmangment" element={
        <StaffIndoorProtectedRoute>
          <IndoorMedManage />
        </StaffIndoorProtectedRoute>
      } />
        <Route path="/admindashboard"   element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>

}/>


{/* addanewstack Route */}
        <Route path="/addanewstack"   element={
    <ProtectedRoute>
      <AddANewStack />
    </ProtectedRoute>

}/>

<Route path="/pharmacy" element={
  <PharmacyProtectedRoute>
    <Pharmacy />
  </PharmacyProtectedRoute>
} />

<Route path="/addpharmaMed" element={
     <ProtectedRoute>

    <AddPharamaMedicineForm />
     </ProtectedRoute>
} />

<Route path="/invoice" element={
  <PharmacyProtectedRoute>
    <Invoice />
  </PharmacyProtectedRoute>
} />
<Route path="/returnmedicine" element={
  <ProtectedRoute>
    <ReturnMedicine />
  </ProtectedRoute>
} />

        <Route path="/pharmalogin" element={< PhramaLogin />} />

 
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
  
    </>
  );
}


export default App;
