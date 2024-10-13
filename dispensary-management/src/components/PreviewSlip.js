import React from "react";
import { ToastContainer } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css";
import { jsPDF } from "jspdf";

const PreviewSlip = ({ appointmentDetails }) => {
  const {
    patientName,
    patientAge,
    patientPhone,
    weight,
    height,
    BP,
    BG,
    SPO2,
    complaints,
    history,
    clinicalFinding,
    medicines,
    reports,
    doctorName,
    doctorPhone,
    advice,
  } = appointmentDetails;

  // PDF Generation Function
  const handleDownloadPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    pdf.html(document.querySelector("#prescription-slip"), {
      callback: (doc) => {
        doc.save(`Prescription_Details.pdf`);
      },
      margin: [10, 10, 10, 25],
      html2canvas: { scale: 0.8 },
    });
  };

  if (!appointmentDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-6">
            Loading appointment slip preview...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white p-10 rounded-lg shadow-2xl border border-gray-300">
        <div id="prescription-slip">
          <h1 className="text-center mb-8 text-3xl font-extrabold text-blue-700">
            Prescription Details
          </h1>
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-blue-600 mb-4 border-b border-blue-300 pb-2">
              Patient Information
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <p>
                <span className="font-medium">Name:</span> {patientName}
              </p>
              <p>
                <span className="font-medium">Age:</span> {patientAge}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {patientPhone}
              </p>
              <p>
                <span className="font-medium">Weight:</span> {weight} kg
              </p>
              <p>
                <span className="font-medium">Height:</span> {height} cm
              </p>
              <p>
                <span className="font-medium">BP:</span> {BP}
              </p>
              <p>
                <span className="font-medium">Blood Glucose:</span> {BG} mg/dL
              </p>
              <p>
                <span className="font-medium">SpO2:</span> {SPO2}%
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-blue-600 mb-4 border-b border-blue-300 pb-2">
              Patient Complaints & History
            </h2>
            <p className="text-gray-700">
              <strong>Complaints:</strong> {complaints}
            </p>
            <p className="mt-2 text-gray-700">
              <strong>History:</strong> {history}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-blue-600 mb-4 border-b border-blue-300 pb-2">
              Clinical Findings
            </h2>
            <p className="text-gray-700">
              {clinicalFinding || "No significant findings."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-blue-600 mb-4 border-b border-blue-300 pb-2">
              Prescribed Medicines
            </h2>
            <p className="text-gray-700">
              {medicines || "No medicines prescribed."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-blue-600 mb-4 border-b border-blue-300 pb-2">
              Reports & Doctor's Advice
            </h2>
            <p className="text-gray-700">
              <strong>Reports:</strong> {reports || "No reports required."}
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Advice:</strong>{" "}
              {advice || "Follow general health advice."}
            </p>
          </section>

          <footer className="text-right mt-8">
            <p className="text-gray-500">Dr. {doctorName}</p>
            <p className="text-gray-500">{doctorPhone}</p>
            <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
          </footer>
        </div>

        <div className="flex justify-between mt-10">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow-md"
            onClick={() => (window.location.href = "/appointment")}
          >
            Go to Home
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded shadow-md"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PreviewSlip;
