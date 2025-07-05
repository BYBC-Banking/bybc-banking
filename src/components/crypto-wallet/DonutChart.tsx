
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const chartData = [
  { name: 'Bitcoin', value: 45, color: '#FFD700' },
  { name: 'Ethereum', value: 30, color: '#00D4FF' },
  { name: 'Cardano', value: 12, color: '#16A34A' },
  { name: 'Solana', value: 8, color: '#A855F7' },
  { name: 'Others', value: 5, color: '#FB7185' }
];

interface DonutChartProps {
  isDarkMode: boolean;
}

const DonutChart = ({ isDarkMode }: DonutChartProps) => {
  return (
    <Card className={`${isDarkMode ? 'bg-gray-800/50 border-yellow-400/30 backdrop-blur-md' : 'bg-white/60 border-yellow-600/50'} hover:scale-[1.01] transition-transform duration-300`}>
      <CardContent className="p-6">
        <h2 className={`text-lg font-bold mb-4 text-center ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
          Asset Allocation
        </h2>
        
        <div className="flex justify-center">
          <div className="relative w-64 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={3}
                  stroke="#1f2937"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonutChart;
