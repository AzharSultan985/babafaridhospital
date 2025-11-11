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
  total_payment: "",
  received_payment: "",
  pending_payment: "",
  paymentstatus: "",
});


  const [RecepInvoiceData, setRecepInvoiceData] = useState();
  const [AdmissionInvoiceData, setAdmissionInvoiceData] = useState();
  const [PatientData, setPatientData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [receptionUsers, setReceptionUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [patientIDforAdmission, setpatientIDforAdmission] = useState(false);
  const [Alert, setAlert] = useState({ isAlert: false, alertmsg: "", type: "" });

  const navigate = useNavigate();

  // Initialize localStorage patientID
  if (!localStorage.getItem("patientID")) {
    localStorage.setItem("patientID", 1000);
  }

  useEffect(() => {
    setDoctors([
      "Dr. Ahmad - Cardiologist",
      "Dr. Fatima - Gynecologist",
      "Dr. Usman - Dentist",
      "Dr. Hina - Pediatrician",
    ]);
    setReceptionUsers([
      "Reception - Ayesha",
      "Reception - Bilal",
      "Reception - Sana",
      "Reception - Ali",
    ]);
  }, []);

  // 🔹 Register a new patient
const registerPatient = async (data) => {
  setLoading(true);
  try {
    let currentID = localStorage.getItem("patientID");
    currentID = currentID ? parseInt(currentID) + 1 : 1000;
    localStorage.setItem("patientID", currentID);

    const patientWithID = { ...data, patientID: currentID };
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
    console.log("✅ Patient Registered:", savedPatient);

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
    console.error("Error registering patient:", error);
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
    console.error("❌ Fetch patient error:", error);
    setAlert({ isAlert: true, alertmsg: error.message, type: "error" });
    setPatientData([]);
  }
};

// 🔹 Create new admission
const createAdmission = async (admissionData) => {
  try {
    setLoading(true);

    // Validation before sending
    const required = ["department", "roomNo", "Admission_Type", "operating_doctor", "Operating_handledBy"];
    const missing = required.filter(f => !admissionData[f] || admissionData[f].toString().trim() === "");
    if (missing.length) {
      setAlert({ isAlert: true, alertmsg: `Missing fields: ${missing.join(", ")}`, type: "error" });
      return;
    }

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
      total_payment: "",
      received_payment: "",
      pending_payment: "",
      paymentstatus: "",
    });

  } catch (error) {
    console.error("❌ Create admission error:", error);
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
        doctors,
        receptionUsers,
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
      }}
    >
      {children}
    </ReciptionContext.Provider>
  );
};
