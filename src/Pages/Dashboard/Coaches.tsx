import { FiPlus, FiEye, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const coachesData = [
  { id: 1, initials: 'JH', name: 'James Hargreaves', email: 'j.hargreaves@tfp.com', phone: '+44 7700 900123', speciality: 'Attacking Play', squad: 'U14 Lions', players: 18, status: 'Active', joined: 'Sep 2020', avatarColor: 'bg-[#1239D4]' },
  { id: 2, initials: 'SM', name: 'Sofia Martins', email: 's.martins@tfp.com', phone: '+44 7700 900456', speciality: 'Midfield Dynamics', squad: 'U12 Eagles', players: 22, status: 'Active', joined: 'Jan 2021', avatarColor: 'bg-[#2563EB]' },
  { id: 3, initials: 'DO', name: 'David Okafor', email: 'd.okafor@tfp.com', phone: '+44 7700 900789', speciality: 'Defensive Structure', squad: 'U16 Hawks', players: 16, status: 'Active', joined: 'Mar 2019', avatarColor: 'bg-[#1D4ED8]' },
  { id: 4, initials: 'CD', name: 'Claire Dumont', email: 'c.dumont@tfp.com', phone: '+44 7700 901012', speciality: 'Youth Development', squad: 'U10 Falcons', players: 14, status: 'Inactive', joined: 'Sep 2022', avatarColor: 'bg-[#1E40AF]' },
  { id: 5, initials: 'MR', name: 'Marco Ricci', email: 'm.ricci@tfp.com', phone: '+44 7700 901345', speciality: 'Elite Performance', squad: 'U18 Titans', players: 12, status: 'Active', joined: 'Jun 2018', avatarColor: 'bg-[#3B82F6]' },
];

const Coaches = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Coaches</h1>
          <p className="text-[14px] text-gray-500 font-medium mt-1">5 coaches registered</p>
        </div>
        <button 
          onClick={() => navigate('/coaches/add')}
          className="bg-gradient-to-r from-[#081A4A] to-[#1239D4] hover:opacity-90 text-white px-6 py-2.5 rounded-full flex items-center gap-2 text-[15px] font-semibold transition-opacity shadow-md"
        >
          <FiPlus size={18} strokeWidth={3} />
          Add Coach
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden">
        {/* Search Bar */}
        <div className="p-5 border-b border-gray-100">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search coaches..." 
              className="w-full pl-11 pr-5 py-3 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 shadow-sm transition-shadow bg-[#F9FAFC]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Coach</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Phone</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Speciality</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Squad</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Players</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Joined</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {coachesData.map((coach) => (
                <tr key={coach.id} className="hover:bg-[#F8FAFF] transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${coach.avatarColor} flex items-center justify-center text-white font-bold text-[13px] tracking-wide shrink-0 shadow-sm`}>
                        {coach.initials}
                      </div>
                      <span className="text-[14px] font-bold text-gray-900">{coach.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[14px] font-medium text-[#6277A6]">{coach.email}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[14px] font-medium text-[#6277A6]">{coach.phone}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[14px] font-bold text-gray-900">{coach.speciality}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[14px] font-bold text-gray-900">{coach.squad}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-[14px] font-bold text-gray-900">{coach.players}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-bold inline-block border ${
                      coach.status === 'Active' 
                        ? 'bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]' 
                        : 'bg-[#FEF2F2] text-[#EF4444] border-[#FECACA]'
                    }`}>
                      {coach.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[14px] font-medium text-[#6277A6]">{coach.joined}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => navigate(`/coaches/${coach.id}`)}
                        className="text-blue-500 hover:text-blue-700 transition-colors p-1"
                      >
                        <FiEye size={18} strokeWidth={2.5} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                        <FiEdit2 size={16} strokeWidth={2.5} />
                      </button>
                      <button className="text-red-400 hover:text-red-600 transition-colors p-1">
                        <FiTrash2 size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Coaches;
