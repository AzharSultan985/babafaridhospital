import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReciptionContext = createContext();
export const useReception = () => useContext(ReciptionContext);

export const ReceptionProvider = ({ children }) => {
  const [patient, setPatient] = useState({
    name: "",
    F_H_Name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    doctor: "",
    fees: "",
    handledBy: "",
  });

const [Addmissiondata, setAddmissiondata] = useState({
  operating_doctor: "",
  department: "",
  roomNo: "",
  Admission_Type: "",
  Operating_handledBy: "",
  desc:"",
  total_payment: "",
  received_payment: "",
  pending_payment: "",
  paymentstatus: "",
});

  const [AllDoctors, setAllDoctors] = useState([]);

  const [RecepInvoiceData, setRecepInvoiceData] = useState();
  const [AdmissionInvoiceData, setAdmissionInvoiceData] = useState();
  const [PatientData, setPatientData] = useState([]);
  const [AllPatient, setAllPatient] = useState([]);
  // const [doctors, setDoctors] = useState([]);
  // const [receptionUsers, setReceptionUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [patientIDforAdmission, setpatientIDforAdmission] = useState(false);
  const [recep_Login_Res, setrecep_Login_Res] = useState(false);
  const [Alert, setAlert] = useState({ isAlert: false, alertmsg: "", type: "" });
  const [AllReceptionUser, setAllReceptionUser] = useState([]);

  const navigate = useNavigate();

  // Initialize localStorage patientID
  if (!localStorage.getItem("patientID")) {
    localStorage.setItem("patientID", 1000);
  }
const generateDoctorWiseToken = (doctorName) => {
  let tokens = JSON.parse(localStorage.getItem("DoctorTokens")) || {};
  let today = new Date().toISOString().split("T")[0];

  if (!tokens[doctorName]) {
    tokens[doctorName] = { lastDate: today, token: 0 };
  }

  // Reset token if new day
  if (tokens[doctorName].lastDate !== today) {
    tokens[doctorName].token = 0;
    tokens[doctorName].lastDate = today;
  }

  // Increase token
  tokens[doctorName].token += 1;

  // Save back to localStorage
  localStorage.setItem("DoctorTokens", JSON.stringify(tokens));

  return tokens[doctorName].token; // return doctor-wise token
};


 

  // 🔹 Register a new patient
const registerPatient = async (data) => {
  setLoading(true);
  try {
    let currentID = localStorage.getItem("patientID");
    currentID = currentID ? parseInt(currentID) + 1 : 1000;
    localStorage.setItem("patientID", currentID);

    const newToken = generateDoctorWiseToken(data.doctor);

    const patientWithID = { ...data, patientID: currentID, Appointment: [
        {
          NoofTime: 1, // or whatever you want
          fees: Number(data.fees),
           handledBy:data.handledBy
        },
      ],
      TokenNo :newToken
     };
    setRecepInvoiceData(patientWithID);

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/patient-register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientWithID),
      }
    );

    if (!response.ok) throw new Error("Failed to register patient");
    const savedPatient = await response.json();
    ////console.log("✅ Patient Registered:", savedPatient);

    // ✅ Show alert once
    setAlert({
      isAlert: true,
      alertmsg: "Patient registered successfully",
      type: "success",
    });

    // ✅ Auto-hide alert after 2 seconds
    setTimeout(() => {
      setAlert({ isAlert: false, alertmsg: "", type: "" });
    }, 2000);

    // ✅ Navigate after showing alert
    navigate("/recep-invoice");

  } catch (error) {
    ////console.error("Error registering patient:", error);
    setAlert({
      isAlert: true,
      alertmsg: error.message,
      type: "error",
    });
  } finally {
    setLoading(false);
  }
};



  // 🔹 Fetch patient by ID or phone
// 🔹 Fetch patient by ID or phone
const FetchPatientById = async (ID) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/fetchpatientbyid?patientid=${ID}`
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error fetching patient");
    }

    const result = await res.json();
    const data = result.data || [];

    if (!data.length) {
      setAlert({ isAlert: true, alertmsg: "Patient not found", type: "error" });
      setPatientData([]);
      return;
    }

    // Already admitted check
    if (data[0].admission?.isadmitted) {
      setAlert({ isAlert: true, alertmsg: "Patient is already admitted", type: "error" });
      setPatientData([]);
      return;
    }

    setPatientData(data);
    setpatientIDforAdmission(ID);
    setAlert({ isAlert: false, alertmsg: "", type: "" });

  } catch (error) {
    ////console.error("❌ Fetch patient error:", error);
    setAlert({ isAlert: true, alertmsg: error.message, type: "error" });
    setPatientData([]);
  }
};

// 🔹 Create new admission
const createAdmission = async (admissionData) => {
  try {
    setLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/admission-patient/${patientIDforAdmission}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admission: {
            department: admissionData.department,
            roomNo: admissionData.roomNo,
            Admission_Type: admissionData.Admission_Type,
            operating_doctorName: admissionData.operating_doctor,
            Operating_handledBy: admissionData.Operating_handledBy,
            desc:admissionData.desc
          },
          payment: {
            total_payment: admissionData.total_payment,
            received_payment: admissionData.received_payment,
            pending_payment: admissionData.pending_payment,
            paymentstatus: admissionData.paymentstatus,
          },
        }),
      }
    );

    const result = await response.json();
    if (!result.success) throw new Error(result.message || "Failed to admit patient");
    setPatientData([]);
    setAlert({ isAlert: true, alertmsg: "patient admit succesfully", type: "success" });

    setAdmissionInvoiceData(result.patient)

    navigate("/admission-invoice");
    
    setAddmissiondata({
      operating_doctor: "",
      department: "",
      roomNo: "",
      Admission_Type: "",
      Operating_handledBy: "",
      desc:"",
      total_payment: "",
      received_payment: "",
      pending_payment: "",
      paymentstatus: "",
    });

  } catch (error) {
    ////console.error("❌ Create admission error:", error);
    setAlert({ isAlert: true, alertmsg: error.message, type: "error" });
  } finally {
    setLoading(false);
  }
};


// fetch all patient 
const FetchAllPatient = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/fetchall-patient`
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Error fetching patients");

      const data = result.data || [];
      if (!data.length) {
        setAlert({ isAlert: true, alertmsg: "No patients found", type: "error" });
        setAllPatient([]);
        return;
      }

      setAllPatient(data);
    } catch (error) {
      ////console.error("❌ Fetch all patients error:", error);
      setAlert({ isAlert: true, alertmsg: error.message, type: "error" });
      setAllPatient([]);
    }
  };



// update payment of patient

const UpdatePayment = async (paymentDetail) => {
  try {
    setLoading(true);

    // Validation before sending
    
    
    if (!paymentDetail.patientID) {
      setAlert({ isAlert: true, alertmsg: `patientID Required`, type: "error" });
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/update-payment/${paymentDetail.patientID}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
  status: paymentDetail.status,
  received_payment: paymentDetail.received_payment,        
}),

      }
    );

    const result = await response.json();
    if (!result.success) throw new Error(result.message || "Failed to update payment");
    setAlert({ isAlert: true, alertmsg: "Payment Update succesfully", type: "success" });
    setRecepInvoiceData(result.patient)

    navigate("/clearnce-invoice");

FetchAllPatient()

  } catch (error) {
    ////console.error("❌ failed to update payment error:", error);
    setAlert({ isAlert: true, alertmsg: error.message, type: "error" });
  } finally {
    setLoading(false);
  }
};


 
const handleDischargePatient = async (dischargeData) => {
    if (!dischargeData) {
      setAlert({ type: "error", msg: "Please select discharged by staff." });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/discharge-patient/${dischargeData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dischargedBy :dischargeData.dischargedBy}),
        }
      );
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      setAlert({ type: "success", msg: "Patient discharged successfully." });
      setRecepInvoiceData(result.patient)
    navigate("/discharge-invoice");

    } catch (error) {
      setAlert({ type: "error", msg: error.message });
    } finally {
      setLoading(false);
    }
  };


// reception login
  // In your context, update the Recep_Login function:
const Recep_Login = async (username, password) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/recep-user-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // This is important for cookies
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
    
    const data = await res.json();
    ////console.log("Login response:", data);

    if (data.success) {
      setrecep_Login_Res(data.message);
      setAlert({
        isAlert: true,
        alertmsg: "Login successful!",
        type: "success"
      });
      
      // Redirect after successful login
      setTimeout(() => {
        navigate("/recepition", { replace: true });
      }, 1000);
      
    } else {
      throw new Error(data.message || "Login failed");
    }
  } catch (err) {
    ////console.error("Login Error:", err);
    setAlert({ 
      isAlert: true, 
      alertmsg: err.message, 
      type: "error" 
    });
  }
};

  // 🚀 Logout function
  const LogoutRecepUSer = async () => {
    try {
let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/recep-user-logout`, {
      method: "POST",
      credentials: "include",
    });

    let data = await res.json(); // ✅ parse response JSON
    //////console.log("Logout response:", data);

    if (data.message === "Logged out successfully") {
      setLoading(false)
      setTimeout(() => {
        navigate("/recep-login", { replace: true });
      }, 1000);
    } 
  }catch (err) {
      //////console.error("Logout failed:", err);
    }
  };



// handle add reception staff
const HandleReceptionStaff = async (data) => {
  setLoading(true);
  try {
    // Generate random ID between 1000 and 2000
    const randomId = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/add-reception-user`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: randomId,         // Randomly generated ID
          name: data.name,
          address: data.address,
          shiftStart: data.shiftStart,
          shiftEnd: data.shiftEnd,
        }),
      }
    );

    if (!response.ok) throw new Error("Failed to add reception user");
    const savedReception = await response.json();
    ////console.log("✅ Registered reception:", savedReception);
FetchAllReceptionUser()
    // Show success alert
    setAlert({
      isAlert: true,
      alertmsg: "Reception User Added successfully",
      type: "success",
    });

    setTimeout(() => {
      setAlert({ isAlert: false, alertmsg: "", type: "" });
    }, 2000);

  } catch (error) {
    ////console.error("Error adding reception user:", error);
    setAlert({
      isAlert: true,
      alertmsg: error.message,
      type: "error",
    });
  } finally {
    setLoading(false);
  }
};

// fetch all reception user 
const FetchAllReceptionUser = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/fetchall-reception-user`
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Error fetching reception user");

      const data = result.data || [];
      if (!data.length) {
        setAlert({ isAlert: true, alertmsg: "No Reception User found", type: "error" });
        setAllReceptionUser([]);
        return;
      }

      setAllReceptionUser(data);
    } catch (error) {
      ////console.error("❌ Fetch all reception users error:", error);
      setAlert({ isAlert: true, alertmsg: error.message, type: "error" });
      setAllReceptionUser([]);
    }
  };

  const RemoveReceptionStaff = async (id) => {
    if (!id) {
      setAlert({ type: "error", msg: "Please select ID." });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/remove-receptionUser/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
FetchAllReceptionUser()

      setAlert({ type: "success", msg: "Reception User Removed successfully." });
    } catch (error) {
      setAlert({ type: "error", msg: error.message });
    } finally {
      setLoading(false);
    }
  };


//FetchAllDoctors
const FetchAllDoctors = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/fetchall-doctors`
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Error fetching doctors");

      const data = result.data || [];
      if (!data.length) {
        // setAlert({ isAlert: true, alertmsg: "No patients found", type: "error" });


        setAllDoctors([]);
        return;
      }

      setAllDoctors(data);
    } catch (error) {
      ////console.error("❌ Fetch all patients error:", error);
      setAlert({ isAlert: true, alertmsg: error.message, type: "error" });
      setAllDoctors([]);
    }
  };

// 🔹 Create new admission
const HandleReAppointment = async (data) => {
  try {
    setLoading(true);
    
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/reappointment-patient/${data.patientID}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fees: data.fees,
          reAppHandleby: data.ReappHandleby
        })
        
      }
    );
    
    const result = await response.json();
    if (!result.success) throw new Error(result.message || "Failed to admit patient");
    // console.log('Patient',result.patient.doctor);
    const newToken = generateDoctorWiseToken(result.patient.doctor);


    setAlert({ isAlert: true, alertmsg: "Reappointment succesfully", type: "success" });
    // Prepare invoice data with token
    const invoiceData = {
      ...result.patient,
      TokenNo: newToken,
    };

    setRecepInvoiceData(invoiceData)

      navigate("/recep-invoice");
  } catch (error) {
    ////console.error("❌ Create admission error:", error);
    setAlert({ isAlert: true, alertmsg: error.message, type: "error" });
  } finally {
    setLoading(false);
  }
};
  return (
    <ReciptionContext.Provider
      value={{
        patient,
        setPatient,
      
     
        registerPatient,
        loading,
        Alert,
        setAlert,
        RecepInvoiceData,
        FetchPatientById,
        PatientData,
        setAddmissiondata,
        Addmissiondata,
        createAdmission,
        AdmissionInvoiceData
        ,FetchAllPatient,AllPatient
,HandleReceptionStaff,
        UpdatePayment,handleDischargePatient,recep_Login_Res,Recep_Login,LogoutRecepUSer,

        FetchAllReceptionUser,AllReceptionUser,RemoveReceptionStaff,
        AllDoctors,FetchAllDoctors,HandleReAppointment
      }}
    >
      {children}
    </ReciptionContext.Provider>
  );
};
