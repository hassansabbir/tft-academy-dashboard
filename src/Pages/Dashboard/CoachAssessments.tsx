import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FiCheckCircle, FiRotateCcw } from "react-icons/fi";
import { Spin, message } from "antd";
import { jwtDecode } from "jwt-decode";
import { useGetMySquadsQuery } from "@/redux/apiSlices/squadSlice";
import { useGetPlayersBySquadQuery } from "@/redux/apiSlices/playerSlice";
import { useGetCoachPlayerLatestAssessmentQuery, useSaveAssessmentMutation } from "@/redux/apiSlices/dashboardSlice";

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

const defaultCoreAreas: CoreAreaItem[] = [
  { key: "technical", label: "Technical", prev: 0, current: 0 },
  { key: "physical", label: "Physical", prev: 0, current: 0 },
  { key: "mentality", label: "Mentality", prev: 0, current: 0 },
  { key: "psychological", label: "Psychological", prev: 0, current: 0 },
  { key: "social", label: "Social", prev: 0, current: 0 },
];

const defaultSkills: SkillItem[] = [
  { key: "passing", label: "Passing", prev: 0, current: 0 },
  { key: "dribbling", label: "Dribbling", prev: 0, current: 0 },
  { key: "shooting", label: "Shooting", prev: 0, current: 0 },
  { key: "footballIQ", label: "Football IQ", prev: 0, current: 0 },
  { key: "speed", label: "Speed", prev: 0, current: 0 },
  { key: "communication", label: "Communication", prev: 0, current: 0 },
];

const Assessments = () => {
  const [isCoach, setIsCoach] = useState(false);
  const [selectedSquad, setSelectedSquad] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Core Areas State
  const [coreAreas, setCoreAreas] = useState<CoreAreaItem[]>(defaultCoreAreas);
  // Football Skills State
  const [footballSkills, setFootballSkills] = useState<SkillItem[]>(defaultSkills);

  // Overall scores mapped from API directly (rather than calculating if the user hasn't changed them, but we'll recalculate when they drag sliders)
  const [apiOverall, setApiOverall] = useState(0);
  const [apiPrevOverall, setApiPrevOverall] = useState(0);

  // APIs
  const { data: mySquads, isLoading: isLoadingSquads } = useGetMySquadsQuery(undefined);
  const { data: players, isLoading: isLoadingPlayers } = useGetPlayersBySquadQuery(selectedSquad, { skip: !selectedSquad });
  const { data: assessment, isFetching, refetch } = useGetCoachPlayerLatestAssessmentQuery(selectedPlayer, { skip: !selectedPlayer });
  const [saveAssessment, { isLoading: isSaving }] = useSaveAssessmentMutation();

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setIsCoach(decoded.role === "CHOACH");
      } catch (e) {
        setIsCoach(false);
      }
    }
  }, []);

  // Default squad
  useEffect(() => {
    if (mySquads?.length > 0 && !selectedSquad) {
      setSelectedSquad(mySquads[0]._id);
    }
  }, [mySquads, selectedSquad]);

  // Default player
  useEffect(() => {
    if (players?.length > 0) {
      const currentPlayerExists = players.find((p: any) => p._id === selectedPlayer);
      if (!currentPlayerExists) {
        setSelectedPlayer(players[0]._id);
      }
    } else {
      setSelectedPlayer("");
    }
  }, [players, selectedSquad]);

  // Sync API Data to local state
  useEffect(() => {
    if (assessment) {
      const apiCore = assessment.coreAreas || {};
      const apiSkills = assessment.footballSkills || {};

      setCoreAreas([
        { key: "technical", label: "Technical", prev: apiCore.technical?.prev || 0, current: apiCore.technical?.current || 0 },
        { key: "physical", label: "Physical", prev: apiCore.physical?.prev || 0, current: apiCore.physical?.current || 0 },
        { key: "mentality", label: "Mentality", prev: apiCore.mentality?.prev || 0, current: apiCore.mentality?.current || 0 },
        { key: "psychological", label: "Psychological", prev: apiCore.psychological?.prev || 0, current: apiCore.psychological?.current || 0 },
        { key: "social", label: "Social", prev: apiCore.social?.prev || 0, current: apiCore.social?.current || 0 },
      ]);

      setFootballSkills([
        { key: "passing", label: "Passing", prev: apiSkills.passing?.prev || 0, current: apiSkills.passing?.current || 0 },
        { key: "dribbling", label: "Dribbling", prev: apiSkills.dribbling?.prev || 0, current: apiSkills.dribbling?.current || 0 },
        { key: "shooting", label: "Shooting", prev: apiSkills.shooting?.prev || 0, current: apiSkills.shooting?.current || 0 },
        { key: "footballIQ", label: "Football IQ", prev: apiSkills.footballIQ?.prev || 0, current: apiSkills.footballIQ?.current || 0 },
        { key: "speed", label: "Speed", prev: apiSkills.speed?.prev || 0, current: apiSkills.speed?.current || 0 },
        { key: "communication", label: "Communication", prev: apiSkills.communication?.prev || 0, current: apiSkills.communication?.current || 0 },
      ]);

      setApiOverall(assessment.overallScore || 0);
      setApiPrevOverall(assessment.previousScore || 0);
    } else if (!isFetching) {
      // Reset if no assessment
      setCoreAreas(defaultCoreAreas);
      setFootballSkills(defaultSkills);
      setApiOverall(0);
      setApiPrevOverall(0);
    }
  }, [assessment, isFetching]);

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

  // Dynamic recalculation
  const totalCore = coreAreas.reduce((acc, curr) => acc + curr.current, 0);
  const totalSkillsScaled = footballSkills.reduce((acc, curr) => acc + curr.current * 2, 0); // scale 5-star to 10

  // Calculate dynamic overall score (if the user touches sliders it changes, otherwise matches initial roughly)
  const isModified = JSON.stringify(coreAreas) !== JSON.stringify(defaultCoreAreas) && assessment;
  const currentOverall = isModified
    ? ((totalCore + totalSkillsScaled) / (coreAreas.length + footballSkills.length)).toFixed(1)
    : apiOverall.toFixed(1);

  const prevOverall = apiPrevOverall.toFixed(1);

  const overallDelta = (parseFloat(currentOverall) - parseFloat(prevOverall)).toFixed(1);
  const isOverallDeltaPositive = parseFloat(overallDelta) >= 0;

  const handleSaveAssessment = async () => {
    if (!selectedSquad || !selectedPlayer) {
      message.error("Please select a squad and a player first.");
      return;
    }

    const payload = {
      playerId: selectedPlayer,
      squadId: selectedSquad,
      coreAreas: {
        technical: coreAreas.find((c) => c.key === "technical")?.current || 0,
        physical: coreAreas.find((c) => c.key === "physical")?.current || 0,
        mentality: coreAreas.find((c) => c.key === "mentality")?.current || 0,
        psychological: coreAreas.find((c) => c.key === "psychological")?.current || 0,
        social: coreAreas.find((c) => c.key === "social")?.current || 0,
      },
      footballSkills: {
        passing: footballSkills.find((s) => s.key === "passing")?.current || 0,
        dribbling: footballSkills.find((s) => s.key === "dribbling")?.current || 0,
        shooting: footballSkills.find((s) => s.key === "shooting")?.current || 0,
        footballIQ: footballSkills.find((s) => s.key === "footballIQ")?.current || 0,
        speed: footballSkills.find((s) => s.key === "speed")?.current || 0,
        communication: footballSkills.find((s) => s.key === "communication")?.current || 0,
      },
      remarks: "",
    };

    try {
      await saveAssessment(payload).unwrap();
      message.success("Assessment saved successfully!");
      setSubmitted(true);
      // Optional: Refetch data to ensure everything is in sync next time we load
      refetch();
    } catch (error) {
      message.error("Failed to save assessment. Please try again.");
      console.error(error);
    }
  };

  const selectedPlayerName = players?.find((p: any) => p._id === selectedPlayer)?.fullName || "Player";

  return (
    <div
      className={`flex flex-col h-full p-6 pb-12 overflow-y-auto relative ${isCoach ? "bg-[#050E21]" : "bg-[#050E21]"
        }`}
    >
      {(isLoadingSquads || isLoadingPlayers || (isFetching && selectedPlayer)) && (
        <div className="absolute inset-0 bg-[#050E21]/60 z-50 flex items-center justify-center">
          <Spin size="large" />
        </div>
      )}

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
            Assessment for <strong className="text-white font-bold">{selectedPlayerName}</strong> has been updated. Overall score:{" "}
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
                className="bg-[#0B1B38] text-white border border-[#162E58] px-4 py-2 pr-8 rounded-full text-[13px] font-bold focus:outline-none focus:border-blue-500 appearance-none cursor-pointer shadow-xs max-w-[200px] truncate"
              >
                {mySquads?.map((squad: any) => (
                  <option key={squad._id} value={squad._id}>
                    {squad.name}
                  </option>
                ))}
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
                className="bg-[#0B1B38] text-white border border-[#162E58] px-4 py-2 pr-8 rounded-full text-[13px] font-bold focus:outline-none focus:border-blue-500 appearance-none cursor-pointer shadow-xs max-w-[250px] truncate"
              >
                {players?.map((p: any) => (
                  <option key={p._id} value={p._id}>
                    {p.fullName || `${p.firstName} ${p.lastName}`}
                  </option>
                ))}
                {(!players || players.length === 0) && (
                  <option value="" disabled>No players available</option>
                )}
              </select>
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                ▼
              </span>
            </div>
          </div>

          {!assessment && !isFetching && selectedPlayer ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              No assessment data available for this player.
            </div>
          ) : (
            /* Main Content Grid */
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
                                Prev: {item.prev.toFixed(1)}
                              </span>
                              <span
                                className={`font-bold ${isPositive ? "text-[#10B981]" : "text-[#EF4444]"
                                  }`}
                              >
                                {isPositive ? `+${delta}` : delta}
                              </span>
                              <span className="text-white font-bold text-[15px] min-w-[20px] text-right">
                                {item.current.toFixed(1)}
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
                                className={`transition-colors ${star <= item.current
                                  ? "text-[#F59E0B]"
                                  : "text-[#162E58] hover:text-[#F59E0B]/50"
                                  }`}
                              />
                            ))}
                          </div>

                          {/* Score Meta */}
                          <div className="flex items-center gap-3 text-[13px] shrink-0">
                            <span className="text-[#94A3B8] font-medium">
                              Prev: {item.prev.toFixed(1)}
                            </span>
                            <span
                              className={`font-bold ${isPositive ? "text-[#10B981]" : "text-[#EF4444]"
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
                        className={`font-bold ${isOverallDeltaPositive ? "text-[#10B981]" : "text-[#EF4444]"
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
                    disabled={isSaving}
                    className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 disabled:opacity-50 text-white font-bold px-7 py-3 rounded-full flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    {isSaving ? <Spin size="small" /> : <FiCheckCircle size={18} />}
                    <span>{isSaving ? "Saving..." : "Save Assessment"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Assessments;
