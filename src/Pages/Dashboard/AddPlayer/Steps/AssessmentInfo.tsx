import { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const RangeSlider = ({ label, initialValue }: { label: string, initialValue: number }) => {
  const [value, setValue] = useState(initialValue);
  const percent = ((value - 1) / 9) * 100;
  
  return (
    <div className="flex items-center justify-between gap-8 py-3">
      <span className="text-[14px] font-bold text-gray-900 w-[160px]">{label}</span>
      
      <div className="flex-1 relative flex items-center">
        <input 
          type="range" 
          min="1" 
          max="10" 
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none outline-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #1239D4 ${percent}%, #E5E7EB ${percent}%)`,
          }}
        />
        <style>{`
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #ffffff;
            border: 2px solid #1239D4;
            box-shadow: 0 0 0 2px white;
          }
          input[type=range]::-moz-range-thumb {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #ffffff;
            border: 2px solid #1239D4;
            box-shadow: 0 0 0 2px white;
          }
        `}</style>
      </div>

      <div className="w-[32px] h-[32px] rounded-full flex shrink-0 items-center justify-center font-bold text-[14px] text-blue-600 bg-white">
        {value}
      </div>
    </div>
  );
};

const StarRating = ({ label, initialValue }: { label: string, initialValue: number }) => {
  const [value, setValue] = useState(initialValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue !== null ? hoverValue : value;

  return (
    <div className="flex items-center justify-between gap-8 py-3">
      <span className="text-[14px] font-bold text-gray-900 w-[160px]">{label}</span>
      
      <div 
        className="flex-1 flex items-center gap-1.5 justify-center"
        onMouseLeave={() => setHoverValue(null)}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = displayValue >= star;
          const isHalf = displayValue >= star - 0.5 && displayValue < star;

          return (
            <div key={star} className="relative cursor-pointer w-[22px] h-[22px]">
              {/* Left half hit target */}
              <div 
                className="absolute left-0 top-0 w-1/2 h-full z-10"
                onMouseEnter={() => setHoverValue(star - 0.5)}
                onClick={() => setValue(star - 0.5)}
              />
              {/* Right half hit target */}
              <div 
                className="absolute right-0 top-0 w-1/2 h-full z-10"
                onMouseEnter={() => setHoverValue(star)}
                onClick={() => setValue(star)}
              />
              
              {isFilled ? (
                <FaStar className="text-[#FBBF24]" size={22} />
              ) : isHalf ? (
                <FaStarHalfAlt className="text-[#FBBF24]" size={22} />
              ) : (
                <FaStar className="text-[#E5E7EB]" size={22} />
              )}
            </div>
          );
        })}
      </div>

      <div className="w-12 h-[32px] rounded-full flex shrink-0 items-center justify-center font-bold text-[13px] text-blue-600 bg-white tracking-wide">
        {value}★
      </div>
    </div>
  );
};

const AssessmentInfo = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col">
      <h2 className="text-[18px] font-bold text-gray-900 leading-tight">Initial Assessment</h2>
      <p className="text-[14px] font-bold text-[#6277A6] mb-8 mt-2">Rate the player on each attribute from 1 (beginner) to 10 (elite)</p>
      
      <div className="flex flex-col gap-10">
        {/* Core Development Areas */}
        <div>
          <h3 className="text-[16px] font-bold text-gray-900 mb-4">Core Development Areas</h3>
          <div className="flex flex-col gap-1">
            <RangeSlider label="Technical" initialValue={7} />
            <RangeSlider label="Mentality" initialValue={7} />
            <RangeSlider label="Physicality" initialValue={7} />
            <RangeSlider label="Psychological" initialValue={7} />
            <RangeSlider label="Social" initialValue={7} />
          </div>
        </div>

        {/* Football Skill */}
        <div>
          <h3 className="text-[16px] font-bold text-gray-900 mb-4">Football Skill</h3>
          <div className="flex flex-col gap-1">
            <StarRating label="Passing" initialValue={3.5} />
            <StarRating label="Dribbling" initialValue={3.5} />
            <StarRating label="Shooting" initialValue={3.5} />
            <StarRating label="Football IQ" initialValue={3.5} />
            <StarRating label="Speed" initialValue={3.5} />
            <StarRating label="Communication" initialValue={3.5} />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 mt-2">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Coach Remarks</label>
          <textarea 
            placeholder="Initial observations, standout qualities, and areas to develop..." 
            className="w-full px-5 py-4 rounded-2xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm resize-none h-32"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AssessmentInfo;
