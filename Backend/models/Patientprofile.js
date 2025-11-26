import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  // --- Basic Information ---
  patientID:Number,
  name: { type: String, required: true },
  F_H_Name: { type: String, required: true },
  age: Number,
  gender: String,
  phone: String,
  address: String,
   doctor: {type: String},
     registerby: String,
  Appointment:[
{
    NoofTime: Number,
    fees: Number, 
     handledBy: String,

    Appdate:{ type: Date, default: Date.now }
  },
  ]
,


  // --- Admission Information ---
  admission: {
    isadmitted: { type: Boolean, default: false },
    department: String,
    roomNumber: String,

    operating_doctorName:{
    type: String
    
  }, 

roomNo:Number,
Admission_Type:String,
Operating_handledBy:String,
desc:String,
    admittedAt: Date,
    
  },
discharge:{
isdischarge:{ type: Boolean, default: false },
    dischargedAt:{ type: Date, default: Date.now },
dischargedBy:String
},

  // --- Pharmacy Billing Information ---
  pharmacyInvoices: [
    { type: mongoose.Schema.Types.ObjectId, ref: "PharmacyInvoice" }
  ],

  // --- Payment Details ---
  payment: {

  total_payment:Number,
received_payment:Number,
pending_payment:Number,
paymentstatus:{ type: String, default: "pending" }
  },

  createdAt: { type: Date, default: Date.now },
});

const PatientModel = mongoose.model("Patient", patientSchema);
export default PatientModel;
