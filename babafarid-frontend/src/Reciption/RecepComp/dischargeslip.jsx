
import { Link } from "react-router-dom";
import { useReception } from "../RecepContext/RecepContext";
import { useNavigate } from "react-router-dom";

const DischargeInvoice = () => {
  const { RecepInvoiceData,setRecepInvoiceData} = useReception();
////console.log('patiet',RecepInvoiceData);
  const navigate = useNavigate();

  if (!RecepInvoiceData) {
  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <p>No Invoice Data Available</p>
      <Link
        to="/recepition"
        className="px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        Back
      </Link>
    </div>
  );
}


  // Auto generate Invoice number and date
  
  const currentDate = new Date().toLocaleDateString("en-GB");
  

  return (
    <>
      <style>{`
  @media print {
    body {
      margin: 0;
      padding: 0;
      background: #fff;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body * {
      visibility: hidden;
    }
    .printable, .printable * {
      visibility: visible;
    }
    .printable {
      position: absolute;
      top: 0;                 /* ✅ starts from very top */
      left: 0;
      width: 85mm;            /* thermal readable width */
      margin-left: 5mm;       /* ✅ left margin safe zone */
      margin-top: 0;          /* ✅ remove all top margin */
      padding: 3mm 5mm;       /* light balanced padding */
      background: #fff;
      font-size: 12.5px;
      font-weight: bold;
      line-height: 1.55;
      letter-spacing: 0.35px;
      color: #000 !important;
      box-shadow: none;
    }
    table th, table td {
      padding: 3px 5px;
    }
    h1, h2, h3, p, td, th {
      color: #000 !important;
    }
    @page {
      size: 80mm auto;
      margin: 0;  /* ✅ removes default printer margin */
    }
  }

  /* Screen view */
  .printable {
    width: 85mm;
    margin: 10px auto;
    padding: 8px;
    border: 1px solid #ddd;
    background: #fff;
    font-size: 13px;
    line-height: 1.8;
    letter-spacing: 0.35px;
  }
`}</style>

      <div className="bg-white border rounded-md shadow-md px-4 py-2 max-w-md mx-auto mt-2 printable text-black font-bold">
        <h1 className="font-bold text-xl text-center mb-1">
          BABA FARID Hospital 
        </h1>
        <hr className="border-black mb-2" />

      <table className="w-full border mb-2">
  <tbody>
    <tr>
      <td className="font-semibold w-1/2">MR No</td>
      <td>{RecepInvoiceData.patientID || "N/A"}</td>
    </tr>
    <tr>
      <td className="font-semibold">Name</td>
      <td>{RecepInvoiceData.name || "N/A"}</td>
    </tr>
    <tr>
      <td className="font-semibold">OPD Doctor</td>
      <td>{RecepInvoiceData.admission.operating_doctorName || "N/A"}</td>
    </tr>
    <tr>
      <td className="font-semibold">Date</td>
      <td>{currentDate}</td>
    </tr>
    <tr>
      <td className="font-semibold">Discharge By</td>
      <td>{RecepInvoiceData.discharge.dischargedBy || "N/A"}</td>
    </tr>
  </tbody>
</table>

        <table className="w-full border mb-2 ">
          <tbody>
        <div className="flex justify-center ml-6 p-2">

            <h1 className="text-xl">Discharge Slip</h1>
        </div>
          
             <tr>
              <td className="font-semibold">Payment Status:</td>
              <td> {RecepInvoiceData.payment.paymentstatus }</td>
            </tr>
            <tr>
              <td className="font-semibold">Payment:</td>
              <td>Rs. {RecepInvoiceData.payment.total_payment || "0.00"}</td>
            </tr>
            <tr>
              <td className="font-semibold"> Received Payment:</td>
              <td>Rs. {RecepInvoiceData.payment.received_payment || "0.00"}</td>
            </tr>
            <tr>
              <td className="font-semibold">Pending Payment :</td>
              <td>Rs. {RecepInvoiceData.payment.pending_payment || "0.00"}</td>
            </tr>
          </tbody>
        </table>

        <div className="text-center mt-3 border-t border-black pt-2 text-xs">
    <p>بابا فرید ہسپتال میں تشریف آوری کا شکریہ۔ جلد آپ کو آپ کے ٹوکن نمبر کے مطابق پکارا جائے گا۔</p>
        <p>براہِ کرم ویٹنگ ایریا میں تشریف رکھیں۔ شکریہ</p>
        </div>

        <div className="text-center text-xs border-t border-black pt-1 mt-1">
          Powered By <span className="font-bold">  Azhar Sultan  </span>
        </div>
      </div>

      <div className="w-full flex gap-2 justify-center print:hidden mt-3">
        <button
          onClick={() => {window.print(); 
            setTimeout(() => {
              
              setRecepInvoiceData(null)

    navigate("/recepition");

            }, 2000);
          
          }}
          className="px-4 py-2 w-[30%] bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Print Invoice
        </button>
        <Link
          to={"/recepition"}
          className="px-4 py-2 w-[20%] bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex justify-center items-center"
        >
          Back
        </Link>
      </div>
    </>
  );
};

export default DischargeInvoice;