import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'U10', value: 18, color: '#3B82F6' }, // Light Blue starts at top right
  { name: 'U8', value: 12, color: '#1D4ED8' },  // Dark Blue
  { name: 'U18', value: 10, color: '#FBBF24' }, // Yellow
  { name: 'U16', value: 14, color: '#EF4444' }, // Red
  { name: 'U14', value: 16, color: '#F97316' }, // Orange
  { name: 'U12', value: 22, color: '#22C55E' }, // Green
];

const AgeDistribution = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 leading-tight">Age Distribution</h2>
        <p className="text-[13px] font-medium text-gray-500 mt-1">Players by age group</p>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <div className="grid grid-cols-3 gap-y-3 w-full mt-4 text-[12px] font-semibold text-gray-600">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]"></div>
            <span>U8 · 12</span>
          </div>
          <div className="flex items-center gap-1.5 justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></div>
            <span>U10 · 18</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></div>
            <span>U12 · 22</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F97316]"></div>
            <span>U14 · 16</span>
          </div>
          <div className="flex items-center gap-1.5 justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></div>
            <span>U16 · 14</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]"></div>
            <span>U18 · 10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeDistribution;