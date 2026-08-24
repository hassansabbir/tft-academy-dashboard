import { useState } from "react";
import { FiShield, FiCalendar, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import { useGetAllAgeGroupsQuery } from "@/redux/apiSlices/dashboardSlice";
import { useGetCoachesQuery } from "@/redux/apiSlices/coachSlice";
import { useCreateSquadMutation } from "@/redux/apiSlices/squadSlice";

const CreateSquad = () => {
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState<string[]>(['Mon', 'Tue']);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const [formData, setFormData] = useState({
    name: "",
    ageGroupId: "",
    maxPlayers: "",
    sessionStartTime: "",
    sessionEndTime: "",
    sessionDuration: "",
    trainingVenue: "",
    coachId: ""
  });

  const { data: ageGroups, isLoading: isLoadingAgeGroups } = useGetAllAgeGroupsQuery(undefined);
  const { data: coachesData, isLoading: isLoadingCoaches } = useGetCoachesQuery({ limit: 100 });
  const [createSquad, { isLoading: isCreating }] = useCreateSquadMutation();

  const coaches = coachesData?.data || [];

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateSquad = async () => {
    if (!formData.name || !formData.ageGroupId || !formData.coachId) {
      message.error("Please fill all required fields (Name, Age Group, Coach)");
      return;
    }

    const payload = {
      ...formData,
      maxPlayers: Number(formData.maxPlayers) || 0,
      trainingDays: selectedDays
    };

    try {
      await createSquad(payload).unwrap();
      message.success("Squad created successfully!");
      navigate('/squads');
    } catch (error: any) {
      message.error(error.data?.message || "Failed to create squad");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto relative">
      {(isCreating) && (
        <div className="absolute inset-0 bg-white/60 z-50 flex items-center justify-center">
          <Spin size="large" />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col mb-6">
        <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Create New Squad</h1>
        <p className="text-[14px] text-gray-500 font-medium mt-1">Set up a new squad and configure all details</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Squad Details Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <FiShield size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-[16px] font-bold text-gray-900">Squad Details</h2>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[13px] font-bold text-gray-900 tracking-wide">Squad Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Futsal Fridays"
                className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[13px] font-bold text-gray-900 tracking-wide">Age Group</label>
              <select
                name="ageGroupId"
                value={formData.ageGroupId}
                onChange={handleInputChange}
                className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white shadow-sm appearance-none"
              >
                <option value="" disabled>Select Age Group</option>
                {isLoadingAgeGroups ? (
                  <option disabled>Loading...</option>
                ) : (
                  ageGroups?.map((group: any) => (
                    <option key={group._id} value={group._id}>
                      {group.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[13px] font-bold text-gray-900 tracking-wide">Maximum Players</label>
              <input
                type="number"
                name="maxPlayers"
                value={formData.maxPlayers}
                onChange={handleInputChange}
                placeholder="e.g. 20"
                className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Training Schedule Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <FiCalendar size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-[16px] font-bold text-gray-900">Training Schedule</h2>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[13px] font-bold text-gray-900 tracking-wide">Training Days</label>
              <div className="flex items-center gap-3">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`w-14 h-10 rounded-full flex items-center justify-center text-[13px] font-bold transition-colors border cursor-pointer ${selectedDays.includes(day)
                        ? "bg-[#1239D4] text-white border-[#1239D4]"
                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-2.5">
                <label className="text-[13px] font-bold text-gray-900 tracking-wide">Session Start Time</label>
                <input
                  type="time"
                  name="sessionStartTime"
                  value={formData.sessionStartTime}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm tracking-wider"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-[13px] font-bold text-gray-900 tracking-wide">Session End Time</label>
                <input
                  type="time"
                  name="sessionEndTime"
                  value={formData.sessionEndTime}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm tracking-wider"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-[13px] font-bold text-gray-900 tracking-wide">Session Duration (mins)</label>
                <input
                  type="text"
                  name="sessionDuration"
                  value={formData.sessionDuration}
                  onChange={handleInputChange}
                  placeholder="e.g. 90"
                  className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-2.5">
                <label className="text-[13px] font-bold text-gray-900 tracking-wide">Training Venue</label>
                <input
                  type="text"
                  name="trainingVenue"
                  value={formData.trainingVenue}
                  onChange={handleInputChange}
                  placeholder="e.g. Pitch 1 — Main Academy Ground"
                  className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Coach Assignment Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col mb-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <FiUser size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-[16px] font-bold text-gray-900">Coach Assignment</h2>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[13px] font-bold text-gray-900 tracking-wide">Coach Name</label>
              <select
                name="coachId"
                value={formData.coachId}
                onChange={handleInputChange}
                className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white shadow-sm appearance-none"
              >
                <option value="" disabled>Select Coach</option>
                {isLoadingCoaches ? (
                  <option disabled>Loading...</option>
                ) : (
                  coaches.map((coach: any) => (
                    <option key={coach._id} value={coach._id}>
                      {coach.firstName} {coach.lastName}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex items-center justify-between mt-auto pt-6">
        <button
          onClick={() => navigate('/squads')}
          className="px-8 py-3 rounded-full border border-gray-200 text-[14px] font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleCreateSquad}
          disabled={isCreating}
          className="bg-gradient-to-r from-[#081A4A] to-[#1239D4] hover:opacity-90 disabled:opacity-50 text-white px-8 py-3 rounded-full flex items-center gap-2.5 text-[14px] font-bold transition-opacity shadow-md cursor-pointer"
        >
          <FiShield size={16} />
          {isCreating ? 'Creating...' : 'Create Squad'}
        </button>
      </div>
    </div>
  );
};

export default CreateSquad;
