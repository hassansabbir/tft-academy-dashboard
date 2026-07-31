import { useNavigate } from "react-router-dom";

const assignedSquads = [
  {
    id: 1,
    ageGroup: "U16",
    badgeColor: "bg-[#1239D4]",
    name: "U16 Futsal Fridays",
    players: 18,
    attendanceLabel: "92%",
    attendanceRate: 92,
    progressColor: "bg-[#1239D4]",
    isActive: true,
  },
  {
    id: 2,
    ageGroup: "U14",
    badgeColor: "bg-[#7C3AED]",
    name: "U14 Youth Development",
    players: 16,
    attendanceLabel: "88%",
    attendanceRate: 88,
    progressColor: "bg-[#7C3AED]",
    isActive: false,
  },
  {
    id: 3,
    ageGroup: "U12",
    badgeColor: "bg-[#059669]",
    name: "U12 Foundation",
    players: 14,
    attendanceLabel: "85%",
    attendanceRate: 95,
    progressColor: "bg-[#059669]",
    isActive: false,
  },
  {
    id: 4,
    ageGroup: "U10",
    badgeColor: "bg-[#0891B2]",
    name: "U10 Future Goalkeeper",
    players: 18,
    attendanceLabel: "92%",
    attendanceRate: 92,
    progressColor: "bg-[#0891B2]",
    isActive: false,
  },
  {
    id: 5,
    ageGroup: "U08",
    badgeColor: "bg-[#C026D3]",
    name: "U14 TFP Girls Academy",
    players: 16,
    attendanceLabel: "88%",
    attendanceRate: 88,
    progressColor: "bg-[#C026D3]",
    isActive: false,
  },
  {
    id: 6,
    ageGroup: "U06",
    badgeColor: "bg-[#9A3412]",
    name: "U12 Mini Kickers",
    players: 14,
    attendanceLabel: "85%",
    attendanceRate: 95,
    progressColor: "bg-[#9A3412]",
    isActive: false,
  },
];

const CoachDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto">
      {/* Top Profile Section */}
      <div className="flex flex-col md:flex-row items-start gap-6 mb-10">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-2xl bg-[#2563EB] text-white font-bold text-[32px] flex items-center justify-center shrink-0 shadow-sm mt-1">
          JH
        </div>

        <div className="flex flex-col flex-1">
          <h1 className="text-[28px] font-bold text-gray-900 leading-tight">James Hargreaves</h1>
          
          <div className="flex items-center gap-3 mt-2 text-[14px] text-gray-500 font-medium">
            <span>Coach ID: TFP-CO-1025</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>Date of Birth: 25-12-1998</span>
          </div>

          <div className="flex items-center gap-3 mt-1.5 text-[14px] text-gray-500 font-medium">
            <span>james.hargreaves@tfpacademy.co.uk</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>+44 2541 243375</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>+44 3251 233475</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-6">
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-bold text-gray-400">Gender</span>
              <span className="text-[14px] font-bold text-gray-900">Male</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-bold text-gray-400">Nationality</span>
              <span className="text-[14px] font-bold text-gray-900">British</span>
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <span className="text-[12px] font-bold text-gray-400">Location</span>
              <span className="text-[14px] font-bold text-gray-900 truncate" title="24 Greenfield Avenue, Manchester, Greater Manchester, M20 4AB, United Kingdom">
                24 Greenfield Avenue, Manchester, Greater Manchester, M20 4AB, United Kingdom
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Assigned Squads Section */}
      <h2 className="text-[22px] font-bold text-gray-900 mb-6">Assigned Squads</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {assignedSquads.map((squad) => (
          <div 
            key={squad.id}
            className={`bg-white rounded-2xl p-6 shadow-sm flex flex-col border ${
              squad.isActive ? "border-[#1239D4]" : "border-gray-100"
            }`}
          >
            <div className={`${squad.badgeColor} w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-[14px] mb-4`}>
              {squad.ageGroup}
            </div>
            
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">{squad.name}</h3>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">PLAYERS</span>
                <span className="text-[16px] font-bold text-gray-900 mt-1">{squad.players}</span>
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">ATTENDANCE</span>
                <span className="text-[16px] font-bold text-gray-900 mt-1">{squad.attendanceLabel}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium text-gray-500">Attendance Rate</span>
                <span className="font-bold text-gray-900">{squad.attendanceRate}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${squad.progressColor}`} 
                  style={{ width: `${squad.attendanceRate}%` }}
                />
              </div>
            </div>

            <button 
              onClick={() => navigate('/squads/details')}
              className={`w-full py-2.5 rounded-full text-[13px] font-bold transition-colors cursor-pointer border ${
                squad.isActive 
                  ? "bg-[#1239D4] text-white border-[#1239D4] shadow-sm hover:bg-blue-800" 
                  : "bg-white text-gray-400 border-gray-300 hover:border-gray-400 hover:text-gray-600"
              }`}
            >
              View Squad
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachDetails;
