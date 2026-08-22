import { useState } from "react";
import { FiPlus, FiEye, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Pagination, Spin, Alert } from "antd";
import { useGetCoachesQuery } from "../../redux/apiSlices/coachSlice";

const Coaches = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: apiResponse, isLoading, isError } = useGetCoachesQuery({ page, limit: 10 });
  const coaches = apiResponse?.data || [];
  const meta = apiResponse?.meta || { total: 0, limit: 10, page: 1 };

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Coaches</h1>
          <p className="text-[14px] text-gray-500 font-medium mt-1">
            {meta.total} coaches registered
          </p>
        </div>
        <button
          onClick={() => navigate('/coaches/add')}
          className="bg-gradient-to-r from-[#081A4A] to-[#1239D4] hover:opacity-90 text-white px-6 py-2.5 rounded-full flex items-center gap-2 text-[15px] font-semibold transition-opacity shadow-md cursor-pointer"
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search coaches..."
              className="w-full pl-11 pr-5 py-3 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 shadow-sm transition-shadow bg-[#F9FAFC]"
            />
          </div>
        </div>

        {/* Loading / Error States */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Spin size="large" />
          </div>
        )}

        {isError && (
          <div className="p-6">
            <Alert type="error" message="Failed to load coaches. Please try again." />
          </div>
        )}

        {/* Table */}
        {!isLoading && !isError && (
          <>
            <div className="overflow-x-auto flex-1">
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
                    <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {coaches.length > 0 ? (
                    coaches.map((coach: any) => (
                      <tr key={coach._id} className="hover:bg-[#F8FAFF] transition-colors group">
                        <td className="py-4 px-6">
                          <span className="text-[14px] font-medium text-gray-900">{coach.fullName || "Unknown Coach"}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-[14px] font-medium text-gray-900">{coach.email || "N/A"}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-[14px] font-medium text-gray-900">{coach.phone || "N/A"}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-[14px] font-medium text-gray-900">{coach.speciality || "N/A"}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-[14px] font-medium text-gray-900">{coach.squadName || "Unassigned"}</span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="text-[14px] font-medium text-gray-900">{coach.playersCount || 0}</span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-[12px] font-bold inline-block border capitalize ${coach.status?.toLowerCase() === 'active'
                            ? 'bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]'
                            : 'bg-[#FEF2F2] text-[#EF4444] border-[#FECACA]'
                            }`}>
                            {coach.status || "inactive"}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => navigate(`/coaches/${coach._id}`)}
                              className="text-blue-500 hover:text-blue-700 transition-colors p-1 cursor-pointer"
                            >
                              <FiEye size={18} strokeWidth={2.5} />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer">
                              <FiEdit2 size={16} strokeWidth={2.5} />
                            </button>
                            <button className="text-red-400 hover:text-red-600 transition-colors p-1 cursor-pointer">
                              <FiTrash2 size={16} strokeWidth={2.5} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-gray-500 font-medium">
                        No coaches found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Component */}
            {meta.total > 0 && (
              <div className="p-5 border-t border-gray-100 flex justify-end bg-gray-50/30">
                <Pagination
                  current={page}
                  pageSize={meta.limit}
                  total={meta.total}
                  onChange={(newPage) => setPage(newPage)}
                  showSizeChanger={false}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Coaches;
