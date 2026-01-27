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
import PharmacyReport from "./Pharmacy/Report/pharmaReport";
import ReceptionDashboard from "./Reciption/RecepComp/RecepDashboard";
import RecepInvoice from "./Reciption/RecepComp/RecepInvoice";
import AdmissionInvoice from "./Reciption/RecepComp/AdmssionInvoice";
import RecepLogin from "./Reciption/RecepComp/RecepLogin";
import RecepUserProtectedRoute from "./ProtectedRoutes/recepuserProtectRoute";
import ClearnceInvoice from "./Reciption/RecepComp/clearnceInvoice";
import DischargeInvoice from "./Reciption/RecepComp/dischargeslip";
import DoctorDashboard from "./StaffMangment/Doctors_Profile/doctorProfile";
import DoctorLogin from "./StaffMangment/Doctors_Profile/logindoctor";
import DocotorProtectedRoute from "./ProtectedRoutes/doctorProtectedRoute";
import LabRecepInvoice from "./Reciption/RecepComp/LabInvoice";

function App() {
  const {spiner } = usePharmacy();
    const {loading} =useContext(AppContext)
  return (
    <>
{
  (spiner || loading) && <HeartbeatLoader></HeartbeatLoader>
 
}


      <Routes>

        <Route path="/" element={<Mainpage />} />
        {/* <Route path="/" element={<HeartbeatLoader />} /> */}

        <Route path="/addindoormed" element={<IndoorMedAdd />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stafflogin" element={< StaffIndoorLogin />} />


        <Route path="/recepition" element={
          <RecepUserProtectedRoute>
          < ReceptionDashboard />
          </RecepUserProtectedRoute>
          } />
        <Route path="/recep-login" element={< RecepLogin />} />


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
  <PharmacyProtectedRoute>
    <ReturnMedicine />
  </PharmacyProtectedRoute>
} />
<Route path="/pharmacyreport" element={
  <PharmacyProtectedRoute>
    <PharmacyReport />
  </PharmacyProtectedRoute>
} />

        <Route path="/pharmalogin" element={< PhramaLogin />} />
        <Route path="/recep-invoice" element={< RecepInvoice />} />
        <Route path="/admission-invoice" element={< AdmissionInvoice />} />
        <Route path="/lab-recepinvoice" element={< LabRecepInvoice />} />
        <Route path="/clearnce-invoice" element={< ClearnceInvoice />} />
        <Route path="/discharge-invoice" element={< DischargeInvoice />} />
        <Route path="/doctor_profile" element={
          <DocotorProtectedRoute>
          < DoctorDashboard />
          </DocotorProtectedRoute>
          } />
        
        <Route path="/doctor_login" element={< DoctorLogin />} />

 
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
  
    </>
  );
}


export default App;
