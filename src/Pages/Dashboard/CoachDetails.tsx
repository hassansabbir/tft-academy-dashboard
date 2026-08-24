import { useNavigate, useParams } from "react-router-dom";
import { Spin } from "antd";
import { useGetCoachByIdQuery } from "@/redux/apiSlices/coachSlice";
import moment from "moment";



const badgeColors = ["bg-[#1239D4]", "bg-[#7C3AED]", "bg-[#059669]", "bg-[#0891B2]", "bg-[#C026D3]", "bg-[#9A3412]"];

const CoachDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: coach, isLoading: isCoachLoading } = useGetCoachByIdQuery(id as string, {
    skip: !id,
  });

  if (isCoachLoading) {
    return <div className="flex items-center justify-center h-full"><Spin size="large" /></div>;
  }

  if (!coach) {
    return <div className="flex items-center justify-center h-full">Coach not found</div>;
  }

  const squads = coach.assignedSquads || [];

  // Generate initials
  const initials = coach.firstName && coach.lastName
    ? (coach.firstName[0] + coach.lastName[0]).toUpperCase()
    : "NA";

  const address = coach?.address;
  const locationString = typeof address === 'object' && address !== null
    ? [address.homeAddress, address.city, address.postcode].filter(Boolean).join(", ")
    : String(address || "N/A");

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto">
      {/* Top Profile Section */}
      <div className="flex flex-col md:flex-row items-start gap-6 mb-10">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-2xl bg-[#2563EB] text-white font-bold text-[32px] flex items-center justify-center shrink-0 shadow-sm mt-1">
          {initials}
        </div>

        <div className="flex flex-col flex-1">
          <h1 className="text-[28px] font-bold text-gray-900 leading-tight">{coach?.fullName}</h1>
          
          <div className="flex items-center gap-3 mt-2 text-[14px] text-gray-500 font-medium">
            <span>Coach ID: {coach?.coachId || "N/A"}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>Date of Birth: {coach?.dateOfBirth ? moment(coach.dateOfBirth).format("DD-MM-YYYY") : "N/A"}</span>
          </div>

          <div className="flex items-center gap-3 mt-1.5 text-[14px] text-gray-500 font-medium">
            <span>{coach?.email}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>{coach?.phone || "N/A"}</span>
            {coach?.alternativePhone && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>{coach.alternativePhone}</span>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-6">
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-bold text-gray-400">Gender</span>
              <span className="text-[14px] font-bold text-gray-900 capitalize">{coach?.gender || "N/A"}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-bold text-gray-400">Nationality</span>
              <span className="text-[14px] font-bold text-gray-900">{coach?.nationality || "N/A"}</span>
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <span className="text-[12px] font-bold text-gray-400">Location</span>
              <span className="text-[14px] font-bold text-gray-900 truncate" title={locationString}>
                {locationString}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Assigned Squads Section */}
      <h2 className="text-[22px] font-bold text-gray-900 mb-6">Assigned Squads</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {squads?.length > 0 ? (
          squads.map((squad: any, index: number) => {
            const badgeColor = badgeColors[index % badgeColors.length];
            const playersCount = squad.playersCount || 0;
            const attendanceRate = squad.attendanceRate || 0;
            const isActive = index === 0; // Just for UI styling

            return (
              <div 
                key={squad._id}
                className={`bg-white rounded-2xl p-6 shadow-sm flex flex-col border ${
                  isActive ? "border-[#1239D4]" : "border-gray-100"
                }`}
              >
                <div className={`${badgeColor} px-3 h-10 w-fit rounded-xl flex items-center justify-center text-white font-bold text-[14px] mb-4 whitespace-nowrap`}>
                  {squad.ageGroupId?.name || "N/A"}
                </div>
                
                <h3 className="text-[16px] font-bold text-gray-900 mb-4 truncate" title={squad.name}>{squad.name}</h3>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">PLAYERS</span>
                    <span className="text-[16px] font-bold text-gray-900 mt-1">{playersCount}</span>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">ATTENDANCE</span>
                    <span className="text-[16px] font-bold text-gray-900 mt-1">{attendanceRate}%</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-medium text-gray-500">Attendance Rate</span>
                    <span className="font-bold text-gray-900">{attendanceRate}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${badgeColor}`} 
                      style={{ width: `${attendanceRate}%` }}
                    />
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/squads/${squad._id}`)}
                  className={`w-full py-2.5 rounded-full text-[13px] font-bold transition-colors cursor-pointer border ${
                    isActive 
                      ? "bg-[#1239D4] text-white border-[#1239D4] shadow-sm hover:bg-blue-800" 
                      : "bg-white text-gray-400 border-gray-300 hover:border-gray-400 hover:text-gray-600"
                  }`}
                >
                  View Squad
                </button>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500 mt-10">
            No squads assigned to this coach.
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachDetails;
