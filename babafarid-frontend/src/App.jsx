import Dashboard from "./components/dasboard";
// import Home from "./components/home";
import IndoorMedAdd from "./components/Indoor_Med_Add";
import { Routes, Route } from 'react-router-dom';
import Login from "./components/login";
import ProtectedRoute from "./components/protectroute";
import StaffIndoorLogin from "./StaffMangment/staffIndoorComponents/staffLogin";
import IndoorMedManage from "./StaffMangment/staffIndoorComponents/indoorMedMange";
import StaffIndoorProtectedRoute from "./ProtectedRoutes/staffindoorProtect";

function App() {
  return (
    <>

 
      <Routes>
       
        <Route path="/" element={<Login />} />
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
 
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
  
    </>
  );
}


export default App;
