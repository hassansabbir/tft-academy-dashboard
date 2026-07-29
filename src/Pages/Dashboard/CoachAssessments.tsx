import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FiCheckCircle, FiRotateCcw } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role?: string;
}

interface CoreAreaItem {
  key: string;
  label: string;
  prev: number;
  current: number;
}

interface SkillItem {
  key: string;
  label: string;
  prev: number;
  current: number;
}

const mockPlayersList = [
  { id: 1, name: "James Mitchell", squad: "U14 Youth Development" },
  { id: 2, name: "Leon Williams", squad: "U14 Youth Development" },
  { id: 3, name: "Tyler Brooks", squad: "U14 Youth Development" },
  { id: 4, name: "Kai Robertson", squad: "U16 Futsal Fridays" },
  { id: 5, name: "Aiden Clarke", squad: "U12 Foundation" },
];

const Assessments = () => {
  const [isCoach, setIsCoach] = useState(false);
  const [selectedSquad, setSelectedSquad] = useState("U14 Youth Development");
  const [selectedPlayer, setSelectedPlayer] = useState("James Mitchell");
  const [submitted, setSubmitted] = useState(false);

  // Core Areas State (0-10 scale)
  const [coreAreas, setCoreAreas] = useState<CoreAreaItem[]>([
    { key: "technical", label: "Technical", prev: 7.5, current: 7.0 },
    { key: "physical", label: "Physical", prev: 7.1, current: 7.0 },
    { key: "mentality", label: "Mentality", prev: 7.3, current: 7.0 },
    { key: "psychological", label: "Psychological", prev: 6.8, current: 7.0 },
    { key: "social", label: "Social", prev: 7.9, current: 8.0 },
  ]);

  // Football Skills State (1-5 star scale)
  const [footballSkills, setFootballSkills] = useState<SkillItem[]>([
    { key: "passing", label: "Passing", prev: 4.9, current: 5.0 },
    { key: "dribbling", label: "Dribbling", prev: 4.9, current: 5.0 },
    { key: "shooting", label: "Shooting", prev: 4.9, current: 5.0 },
    { key: "iq", label: "Football IQ", prev: 4.9, current: 5.0 },
    { key: "speed", label: "Speed", prev: 4.9, current: 5.0 },
    { key: "comm", label: "Communication", prev: 4.9, current: 5.0 },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setIsCoach(decoded.role === "COACH");
      } catch (e) {
        setIsCoach(false);
      }
    }
  }, []);

  // Update Core Area score via range slider
  const handleCoreSliderChange = (key: string, val: number) => {
    setCoreAreas((prev) =>
      prev.map((item) => (item.key === key ? { ...item, current: val } : item))
    );
  };

  // Update Football Skill score via star tap
  const handleStarClick = (key: string, starRating: number) => {
    setFootballSkills((prev) =>
      prev.map((item) => (item.key === key ? { ...item, current: starRating } : item))
    );
  };

  // Calculate overall current average score out of 10
  const totalCore = coreAreas.reduce((acc, curr) => acc + curr.current, 0);
  const totalSkillsScaled = footballSkills.reduce((acc, curr) => acc + curr.current * 2, 0); // scale 5-star to 10
  const currentOverall = ((totalCore + totalSkillsScaled) / (coreAreas.length + footballSkills.length)).toFixed(1);

  // Calculate overall previous average score out of 10
  const totalPrevCore = coreAreas.reduce((acc, curr) => acc + curr.prev, 0);
  const totalPrevSkillsScaled = footballSkills.reduce((acc, curr) => acc + curr.prev * 2, 0);
  const prevOverall = ((totalPrevCore + totalPrevSkillsScaled) / (coreAreas.length + footballSkills.length)).toFixed(1);

  const overallDelta = (parseFloat(currentOverall) - parseFloat(prevOverall)).toFixed(1);
  const isOverallDeltaPositive = parseFloat(overallDelta) >= 0;

  const handleSaveAssessment = () => {
    setSubmitted(true);
  };

  return (
    <div
      className={`flex flex-col h-full p-6 pb-12 overflow-y-auto ${
        isCoach ? "bg-[#050E21]" : "bg-[#050E21]"
      }`}
    >
      {submitted ? (
        /* Assessment Saved Success View */
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center my-auto px-4">
          {/* Glowing Green Check Circle */}
          <div className="w-20 h-20 rounded-full bg-[#064E3B]/60 border border-[#10B981]/40 flex items-center justify-center mb-6 shadow-lg">
            <FiCheckCircle className="text-[#34D399]" size={48} />
          </div>

          <h2 className="text-[28px] font-bold text-white leading-tight mb-2">
            Assessment Saved!
          </h2>

          <p className="text-[14px] text-[#94A3B8] font-medium mb-8">
            Assessment for <strong className="text-white font-bold">{selectedPlayer}</strong> has been updated. Overall score:{" "}
            <span className="text-[#34D399] font-bold">{currentOverall}/10</span>
          </p>

          {/* New Assessment Button */}
          <button
            onClick={() => setSubmitted(false)}
            className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white font-bold px-7 py-3 rounded-full flex items-center gap-2.5 shadow-md transition-all cursor-pointer"
          >
            <FiRotateCcw size={16} />
            <span>New Assessment</span>
          </button>
        </div>
      ) : (
        /* Assessment Form View */
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex flex-col mb-6">
            <h1 className="text-[24px] font-bold text-white leading-tight">Assessments</h1>
            <p className="text-[14px] text-[#94A3B8] font-medium mt-1">
              Update player development scores
            </p>
          </div>

      {/* Selectors Row */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Squad Dropdown */}
        <div className="relative">
          <select
            value={selectedSquad}
            onChange={(e) => setSelectedSquad(e.target.value)}
            className="bg-[#0B1B38] text-white border border-[#162E58] px-4 py-2 pr-8 rounded-full text-[13px] font-bold focus:outline-none focus:border-blue-500 appearance-none cursor-pointer shadow-xs"
          >
            <option value="U14 Youth Development">U14 Youth Development</option>
            <option value="U16 Futsal Fridays">U16 Futsal Fridays</option>
            <option value="U12 Foundation">U12 Foundation</option>
          </select>
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
            ▼
          </span>
        </div>

        {/* Player Dropdown */}
        <div className="relative">
          <select
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            className="bg-[#0B1B38] text-white border border-[#162E58] px-4 py-2 pr-8 rounded-full text-[13px] font-bold focus:outline-none focus:border-blue-500 appearance-none cursor-pointer shadow-xs"
          >
            {mockPlayersList.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
            ▼
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Core Areas & Football Skills) - col-span-7 */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Card 1: Core Areas Sliders */}
          <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 shadow-sm flex flex-col">
            <h3 className="text-[16px] font-bold text-white mb-5">Core Areas</h3>

            <div className="flex flex-col gap-6">
              {coreAreas.map((item) => {
                const delta = (item.current - item.prev).toFixed(1);
                const isPositive = parseFloat(delta) >= 0;

                return (
                  <div key={item.key} className="flex flex-col gap-2">
                    {/* Top Labels Row */}
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-bold text-white">
                        {item.label}
                      </span>

                      <div className="flex items-center gap-3 text-[13px]">
                        <span className="text-[#94A3B8] font-medium">
                          Prev: {item.prev}
                        </span>
                        <span
                          className={`font-bold ${
                            isPositive ? "text-[#10B981]" : "text-[#EF4444]"
                          }`}
                        >
                          {isPositive ? `+${delta}` : delta}
                        </span>
                        <span className="text-white font-bold text-[15px] min-w-[20px] text-right">
                          {item.current}
                        </span>
                      </div>
                    </div>

                    {/* Range Slider Track */}
                    <div className="relative flex items-center">
                      <input
                        type="range"
                        min={0}
                        max={10}
                        step={0.1}
                        value={item.current}
                        onChange={(e) =>
                          handleCoreSliderChange(item.key, parseFloat(e.target.value))
                        }
                        className="w-full h-2 bg-[#162E58] rounded-full appearance-none cursor-pointer focus:outline-none accent-[#3B82F6]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 2: Football Skills Stars */}
          <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 shadow-sm flex flex-col">
            <h3 className="text-[16px] font-bold text-white mb-5">Football Skills</h3>

            <div className="flex flex-col gap-4">
              {footballSkills.map((item) => {
                const delta = (item.current - item.prev).toFixed(1);
                const isPositive = parseFloat(delta) >= 0;

                return (
                  <div key={item.key} className="flex items-center justify-between py-1.5">
                    {/* Skill Name */}
                    <span className="text-[14px] font-bold text-white w-32 shrink-0">
                      {item.label}
                    </span>

                    {/* Clickable Star Rating (1 to 5) */}
                    <div className="flex items-center gap-1.5 cursor-pointer">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={16}
                          onClick={() => handleStarClick(item.key, star)}
                          className={`transition-colors ${
                            star <= item.current
                              ? "text-[#F59E0B]"
                              : "text-[#162E58] hover:text-[#F59E0B]/50"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Score Meta */}
                    <div className="flex items-center gap-3 text-[13px] shrink-0">
                      <span className="text-[#94A3B8] font-medium">
                        Prev: {item.prev}
                      </span>
                      <span
                        className={`font-bold ${
                          isPositive ? "text-[#10B981]" : "text-[#EF4444]"
                        }`}
                      >
                        {isPositive ? `+${delta}` : delta}
                      </span>
                      <span className="text-white font-bold text-[15px] w-8 text-right">
                        {item.current.toFixed(1)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (Overall Score Card & Save Button) - col-span-5 */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Overall Score Box */}
          <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-bold text-white">Overall Score</h3>
              <span className="bg-[#1E3A8A] text-[#60A5FA] px-3 py-0.5 rounded-full text-[11px] font-bold border border-[#2563EB]/40">
                Updated
              </span>
            </div>

            {/* Big Score Display */}
            <div className="flex flex-col items-center justify-center my-6">
              <span className="text-[52px] font-extrabold text-white leading-none tracking-tight">
                {currentOverall}
              </span>
              <span className="text-[13px] font-medium text-[#94A3B8] mt-1">
                out of 10.0
              </span>
            </div>

            {/* Progress Row */}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[#162E58]">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[#94A3B8] font-medium">
                  Previous: {prevOverall}
                </span>
                <span
                  className={`font-bold ${
                    isOverallDeltaPositive ? "text-[#10B981]" : "text-[#EF4444]"
                  }`}
                >
                  {isOverallDeltaPositive ? `+${overallDelta} pts` : `${overallDelta} pts`}
                </span>
              </div>

              <div className="w-full bg-[#162E58] h-2 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] rounded-full transition-all duration-300"
                  style={{ width: `${(parseFloat(currentOverall) / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-2">
            <button
              onClick={handleSaveAssessment}
              className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white font-bold px-7 py-3 rounded-full flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <FiCheckCircle size={18} />
              <span>Save Assessment</span>
            </button>
          </div>
        </div>
      </div>
      </div>
      )}
    </div>
  );
};

export default Assessments;
