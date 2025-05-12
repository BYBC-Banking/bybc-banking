
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface AllocationChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

const AllocationChart = ({ data }: AllocationChartProps) => {
  // Calculate total to display percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Funds Allocation</h2>
        <div className="h-[200px]">
          <ChartContainer
            id="allocation-chart"
            config={data.reduce((config, item) => ({
              ...config,
              [item.name]: { color: item.color }
            }), {})}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                    />
                  ))}
                </Pie>
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value: number) => [`${value}% (${(value/100 * total).toFixed(2)})`]}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="text-sm">
                {item.name} ({item.value}%)
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllocationChart;
