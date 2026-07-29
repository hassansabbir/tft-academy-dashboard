import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 68 },
  { name: 'Feb', value: 65 },
  { name: 'Mar', value: 72 },
  { name: 'Apr', value: 78 },
  { name: 'May', value: 75 },
  { name: 'Jun', value: 80 },
  { name: 'Jul', value: 74 },
];

const MonthlyAttendance = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 leading-tight">Monthly Attendance</h2>
          <p className="text-[13px] font-medium text-gray-500 mt-1">Present • Absent • Late</p>
        </div>
        <div className="bg-[#EBF1FF] text-[#5B79F2] px-4 py-1.5 rounded-full text-[13px] font-bold tracking-wide">
          2025
        </div>
      </div>
      <div className="flex-1 min-h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 500 }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 500 }}
              ticks={[0, 20, 40, 60, 80]}
            />
            <Bar dataKey="value" fill="#E88B35" radius={[2, 2, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyAttendance;