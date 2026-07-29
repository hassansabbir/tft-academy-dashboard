import { FiCheck } from 'react-icons/fi';

interface Step {
  id: number;
  label: string;
}

const steps: Step[] = [
  { id: 1, label: 'Basic Info' },
  { id: 2, label: 'Football' },
  { id: 3, label: 'Parent' },
  { id: 4, label: 'App Access' },
  { id: 5, label: 'Medical' },
  { id: 6, label: 'Assessment' },
  { id: 7, label: 'Review' },
];

export const StepProgressBar = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-12 py-6 flex justify-between items-center relative">
      {/* Background Line */}
      <div className="absolute top-1/2 left-20 right-20 h-[2px] bg-gray-100 -translate-y-1/2 -z-0">
        <div 
          className="h-full bg-[#10B981] transition-all duration-300" 
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>
      
      {steps.map((step) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;
        
        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] transition-all ${
              isActive ? 'bg-[#1239D4] text-white shadow-md ring-[6px] ring-blue-50/50' : 
              isCompleted ? 'bg-[#10B981] text-white' : 
              'bg-gray-100 text-gray-400'
            }`}>
              {isCompleted ? <FiCheck size={20} strokeWidth={3} /> : step.id}
            </div>
            <span className={`text-[12px] font-bold transition-colors ${
              isActive ? 'text-[#1239D4]' : 
              isCompleted ? 'text-[#10B981]' : 
              'text-gray-400'
            }`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
