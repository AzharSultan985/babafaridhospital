
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider }from './context/LoginContext';
import { StaffIndoorMangmentProvider } from './StaffMangment/staffContext/StaffIndoorcontext';
import { PharmacyProvider } from './Pharmacy/ContextPharma/PharmaContext';
import { ReceptionProvider } from './Reciption/RecepContext/RecepContext';
import { DoctorsMangementProvider } from './StaffMangment/staffContext/doctorsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
<AppProvider>
  <AuthProvider>
    <StaffIndoorMangmentProvider>
    
 <PharmacyProvider>
    <ReceptionProvider>
    <DoctorsMangementProvider>
      
    <App />
    </DoctorsMangementProvider>
    </ReceptionProvider>
 </PharmacyProvider>
 
    </StaffIndoorMangmentProvider>
  </AuthProvider>
  </AppProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
