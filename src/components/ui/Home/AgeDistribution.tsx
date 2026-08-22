import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useAdminAgeDistributionQuery } from '../../../redux/apiSlices/dashboardSlice';
import { Spin } from 'antd';

const COLORS = ['#3B82F6', '#1D4ED8', '#FBBF24', '#EF4444', '#F97316', '#22C55E', '#8B5CF6', '#EC4899', '#14B8A6'];

const formatName = (fullName: string) => {
  const match = fullName.match(/U\d+/i);
  return match ? match[0].toUpperCase() : (fullName.substring(0, 10) + (fullName.length > 10 ? '...' : ''));
};

const AgeDistribution = () => {
  const { data: apiData, isLoading } = useAdminAgeDistributionQuery("");

  const chartData = apiData && Array.isArray(apiData) ? apiData.map((item: any, index: number) => ({
    name: formatName(item.squadName || ""),
    value: item.count || 0,
    color: COLORS[index % COLORS.length]
  })) : [];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full relative">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 leading-tight">Age Distribution</h2>
        <p className="text-[13px] font-medium text-gray-500 mt-1">Players by age group</p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
            <Spin size="large" />
          </div>
        )}
        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
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
                {chartData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <div className="grid grid-cols-3 gap-y-3 gap-x-2 w-full mt-4 text-[12px] font-semibold text-gray-600">
          {chartData.map((entry: any, index: number) => {
            // Distribute alignment: left, center, right
            let justifyClass = "justify-start";
            if (index % 3 === 1) justifyClass = "justify-center";
            if (index % 3 === 2) justifyClass = "justify-end";

            return (
              <div key={`legend-${index}`} className={`flex items-center gap-1.5 ${justifyClass}`}>
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }}></div>
                <span className="truncate">{entry.name} · {entry.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AgeDistribution;