import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { StepProgressBar } from "./components/StepProgressBar";
import BasicInfo from "./Steps/BasicInfo";
import FootballInfo from "./Steps/FootballInfo";
import ParentInfo from "./Steps/ParentInfo";
import AppAccess from "./Steps/AppAccess";

import MedicalInfo from "./Steps/MedicalInfo";
import AssessmentInfo from "./Steps/AssessmentInfo";
import Review from "./Steps/Review";

const AddPlayer = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(c => c + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(c => c - 1);
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1: return <BasicInfo />;
      case 2: return <FootballInfo />;
      case 3: return <ParentInfo />;
      case 4: return <AppAccess />;
      case 5: return <MedicalInfo />;
      case 6: return <AssessmentInfo />;
      case 7: return <Review />;
      default: return <BasicInfo />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto">
      {/* Header */}
      <div className="mb-6 px-4">
        <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Register New Player</h1>
        <p className="text-[14px] text-gray-500 font-medium mt-1">Complete all steps to add a player to the academy</p>
      </div>

      <div className="flex flex-col gap-6 max-w-[1200px] w-full px-4">
        <StepProgressBar currentStep={currentStep} />
        
        {/* Step Content */}
        {renderStep()}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button 
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-full flex items-center gap-2 text-[14px] font-bold transition-all ${
              currentStep === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-70' 
                : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <FiChevronLeft size={18} strokeWidth={3} />
            Previous
          </button>
          
          <span className="text-[14px] font-bold text-[#6277A6]">
            Step {currentStep} of {totalSteps}
          </span>
          
          <button 
            onClick={handleNext}
            className="bg-gradient-to-r from-[#081A4A] to-[#1239D4] hover:opacity-90 text-white px-8 py-3 rounded-full flex items-center gap-2 text-[14px] font-bold transition-opacity shadow-md"
          >
            {currentStep === totalSteps ? 'Save Player' : 'Next'}
            {currentStep !== totalSteps && <FiChevronRight size={18} strokeWidth={3} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlayer;
