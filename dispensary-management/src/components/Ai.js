import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './Ai.css';

const genAI = new GoogleGenerativeAI("AIzaSyCqUDLB0RfdYAHfW3j-FZowH1vEY5hLm7o");

const Tab = ({ label, isActive, onClick }) => (
  <button
    className={`tab-button ${isActive ? "active" : ""}`}
    onClick={onClick}
  >
    {label} {isActive && '>>'}
  </button>
);

const MedicalForm = ({ data, setData }) => {
  return (
    <div className="card">
      <h2>Medical Form</h2>
      <input
        type="text"
        placeholder="Enter symptoms"
        value={data.symptoms}
        onChange={(e) => setData({ ...data, symptoms: e.target.value })}
        className="form-input"
      />
      <textarea
        placeholder="Enter medical history"
        value={data.medicalHistory}
        onChange={(e) => setData({ ...data, medicalHistory: e.target.value })}
        className="form-input"
      />
      <input
        type="text"
        placeholder="Enter current medications"
        value={data.currentMedications}
        onChange={(e) => setData({ ...data, currentMedications: e.target.value })}
        className="form-input"
      />
      <input
        type="text"
        placeholder="Enter allergies"
        value={data.allergies}
        onChange={(e) => setData({ ...data, allergies: e.target.value })}
        className="form-input"
      />
    </div>
  );
};

const PersonalInfo = ({ data, setData }) => {
  return (
    <div className="card">
      <h2>Personal Information</h2>
      <input
        type="number"
        placeholder="Enter age"
        value={data.age}
        onChange={(e) => setData({ ...data, age: e.target.value })}
        className="form-input"
      />
      <select
        value={data.gender}
        onChange={(e) => setData({ ...data, gender: e.target.value })}
        className="form-input"
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
};

const Enquiry = ({ data, setData }) => {
  return (
    <div className="card">
      <h2>Medicine Enquiry</h2>
      <textarea
        placeholder="Enter any enquiries about medicines"
        value={data.medicineEnquiry}
        onChange={(e) => setData({ ...data, medicineEnquiry: e.target.value })}
        className="form-input"
      />
    </div>
  );
};

const MedicalFormTabbed = ({ onSubmit }) => {
  const [activeTab, setActiveTab] = useState("medical");
  const [data, setData] = useState({
    symptoms: "",
    medicalHistory: "",
    currentMedications: "",
    allergies: "",
    age: "",
    gender: "",
    medicineEnquiry: "",
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = () => {
    onSubmit(data);
  };

  return (
    <div className="tabbed-form-container">
      <div className="tabs">
        <Tab label="Medical Form" isActive={activeTab === "medical"} onClick={() => handleTabClick("medical")} />
        <Tab label="Personal Info" isActive={activeTab === "personal"} onClick={() => handleTabClick("personal")} />
        <Tab label="Enquiry" isActive={activeTab === "enquiry"} onClick={() => handleTabClick("enquiry")} />
      </div>
      <div className="form-content">
        {activeTab === "medical" && <MedicalForm data={data} setData={setData} />}
        {activeTab === "personal" && <PersonalInfo data={data} setData={setData} />}
        {activeTab === "enquiry" && <Enquiry data={data} setData={setData} />}
      </div>
      {activeTab === "enquiry" && (
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
}

function Ai() {
  const [medicalText, setMedicalText] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    setLoading(true);
    try {
      const prompt = `Based on the available patient details, create a medical treatment plan or provide relevant information: Symptoms: ${data.symptoms}. Medical History: ${data.medicalHistory}. Current Medications: ${data.currentMedications}. Allergies: ${data.allergies}. Profile: Age: ${data.age}, Gender: ${data.gender}. Enquiry: ${data.medicineEnquiry}.`;

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      if (typeof text === "string" && text.length > 0) {
        setMedicalText(text);
      } else {
        setMedicalText("No valid response received.");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setMedicalText("Failed to generate medical treatment plan. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ai-container">
      <div className="ai-content">
        <div className="section-header">
          <p className="badge">Discover Our AI Assistance</p>
          <p className="description">Tailored to the needs of the Dispensary Management System.</p>
        </div>
        <div className="form-wrapper">
          <MedicalFormTabbed onSubmit={onSubmit} />
          <div className="generated-output">
            {loading ? (
              <div className="loading-container">
                <ClipLoader color={"#274187"} size={60} />
                <span className="loading-text">Generating Medical Plan...</span>
              </div>
            ) : (
              <GeneratedText text={medicalText} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GeneratedText({ text }) {
  const paragraphs = text ? text.split("\n\n") : [];
  return (
    <div>
      {paragraphs.map((paragraph, index) => {
        const headingMatch = paragraph.match(/^(.*?):/);
        const isHeading = headingMatch !== null;
        const heading = headingMatch ? headingMatch[0].replace(":", "").trim() : "";

        return (
          <div key={index}>
            {isHeading ? (
              <h2 className="generated-heading">{heading}</h2>
            ) : (
              <p className="generated-paragraph">{paragraph.replace(":", "").trim()}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Ai;
