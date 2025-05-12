
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

interface FinancialChartViewProps {
  title: string;
  chartData: any;
}

const FinancialChartView = ({ title, chartData }: FinancialChartViewProps) => {
  return (
    <Card className="bg-white shadow-sm overflow-hidden w-full">
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <ChartContainer 
          className="h-[140px] w-full" 
          config={{
            primary: { theme: { light: "#7E69AB", dark: "#9b87f5" } },
            secondary: { theme: { light: "#1EAEDB", dark: "#0FA0CE" } },
          }}
        >
          <LineChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={10} tickMargin={5} />
            <YAxis fontSize={10} tickMargin={5} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              name="primary"
              dataKey="value"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            {chartData[0]?.comparison && (
              <Line
                type="monotone"
                name="secondary"
                dataKey="comparison"
                stroke="var(--color-secondary)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            )}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default FinancialChartView;
