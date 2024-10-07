import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Link } from "react-router-dom";
const genAI = new GoogleGenerativeAI("AIzaSyCqUDLB0RfdYAHfW3j-FZowH1vEY5hLm7o");

const MedicalForm = ({ onSubmit }) => {
  const [symptoms, setSymptoms] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [currentMedications, setCurrentMedications] = useState("");
  const [allergies, setAllergies] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [medicineEnquiry, setMedicineEnquiry] = useState("");

  const handleSubmit = () => {
    const medicalData = {
      symptoms,
      medicalHistory,
      currentMedications,
      allergies,
      age,
      gender,
      medicineEnquiry,
    };
    onSubmit(medicalData);
  };

  return (
    <div className="w-full sm:w-[350px] border rounded-lg overflow-hidden shadow-lg">
      <div className="px-6 py-4">
      

        <div className="font-bold text-base mb-4 text-green py-3 ">Medical Assistance Form</div>
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="symptoms">
            Symptoms
          </label>
          <input
            className="px-4 w-full py-2 border rounded-lg"
            id="symptoms"
            type="text"
            placeholder="Enter symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicalHistory">
            Medical History
          </label>
          <textarea
            className="px-4 py-2 w-full border rounded-lg"
            id="medicalHistory"
            placeholder="Enter medical history"
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
          />
        </div>
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentMedications">
            Current Medications
          </label>
          <input
            className="px-4 py-2 border w-full rounded-lg"
            id="currentMedications"
            type="text"
            placeholder="Enter current medications"
            value={currentMedications}
            onChange={(e) => setCurrentMedications(e.target.value)}
          />
        </div>
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="allergies">
            Allergies
          </label>
          <input
            className="px-4 py-2 w-full border rounded-lg"
            id="allergies"
            type="text"
            placeholder="Enter allergies"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
            Age
          </label>
          <input
            className="px-4 w-full py-2 border rounded-lg"
            id="age"
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
            Gender
          </label>
          <select
            className="px-4 w-full py-2 border rounded-lg"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicineEnquiry">
            Enquiry about Medicines
          </label>
          <textarea
            className="px-4 py-2 border w-full rounded-lg"
            id="medicineEnquiry"
            placeholder="Enter any enquiries about medicines"
            value={medicineEnquiry}
            onChange={(e) => setMedicineEnquiry(e.target.value)}
          />
        </div>
        <div className="px-6 py-4">
          <button
            className="bg-green-600 px-4 w-full py-2 rounded hover:bg-green-700 transition duration-100"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

function GeneratedText({ text }) {
    // Split text by double new lines for paragraphs
    const paragraphs = text ? text.split("\n\n") : [];
    
    return (
      
      <div>
        {paragraphs.map((paragraph, index) => {
          // Match headings by checking for a colon at the end
          const headingMatch = paragraph.match(/^(.*?):/);
          const isHeading = headingMatch !== null;
          const heading = headingMatch ? headingMatch[0].replace(":", "").trim() : "";
  
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {isHeading ? (
                <motion.h2
                  className="text-lg font-bold mb-2 text-center"
                  style={{ fontFamily: "Patrick Hand, cursive" }}
                >
                  {heading}
                </motion.h2>
              ) : (
                <p>{paragraph.replace(":", "").trim()}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  }
  
  function Ai() {
    const [medicalText, setMedicalText] = useState("");
    const [loading, setLoading] = useState(false);
  

    async function onSubmit(data) {
      setLoading(true);
      try {
        const { symptoms, medicalHistory, currentMedications, allergies, age, gender, medicineEnquiry } = data;
    
        const prompt = `
          Based on the available patient details, create a medical treatment plan or provide relevant information:
          
          ${symptoms ? `Symptoms: ${symptoms}. Please diagnose potential causes and suggest appropriate treatment.` : ''}
          
          ${medicalHistory ? `Medical History: ${medicalHistory}. Consider the medical history when recommending diagnostics and treatments.` : ''}
          
          ${currentMedications ? `Current Medications: ${currentMedications}. Consider possible drug interactions or conflicts with new medications.` : ''}
          
          ${allergies ? `Allergies: ${allergies}. Ensure that any suggested medications or treatments avoid these allergens.` : ''}
          
          ${age || gender ? `Patient Profile: ${age ? `Age: ${age}` : ''}${age && gender ? ', ' : ''}${gender ? `Gender: ${gender}` : ''}. Take the patient's age and gender into account when proposing treatment.` : ''}
          
          ${medicineEnquiry ? `Enquiry about Medicines: ${medicineEnquiry}. Provide detailed information about this medication, including its uses, side effects, contraindications, and possible alternatives.` : ''}
          
          Please provide a comprehensive and personalized treatment plan based on the available information. This should include recommended diagnostics, tests, medications, lifestyle adjustments, and any other relevant advice. 
          Prioritize patient safety and effectiveness. 
          
          Additionally, suggest any necessary follow-up actions and monitoring guidelines based on the patient’s profile.
        `;
    
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
    
        if (typeof text === 'string' && text.length > 0) {
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
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        
      <div className="mx-auto mb-10 lg:max-w-xl sm:text-center">
          <p className="inline-block px-3 md:text-xl py-px mb-4 text-xs font-semibold tracking-wider text-[#274187] uppercase rounded-full bg-teal-accent-400">
            Discover Our Dispensary Artificial intelligence
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700">
          Designed for assistance, equipped with a variety of functionalities for the "Dispensary_Management_System"
          </p>
        </div>
        <div className="flex flex-col items-center mt-10 px-4 sm:px-0 mb-10">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            
            <MedicalForm onSubmit={onSubmit} />
            
            <div className="w-full sm:w-[350px] h-[800px] text-xs text-gray-600 p-4 border rounded-lg shadow-xl whitespace-pre-line overflow-y-auto mt-4">
              {loading ? (
                <div className="flex justify-center items-center h-full" >
                  <ClipLoader color={"#274187"} size={60} />
                  <span className="ml-4">Please Wait, Generating Medical Plan...</span>
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
  
  export default Ai;
  