
import React from "react";

interface DonutChartProps {
  isDarkMode: boolean;
  portfolioComposition: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const DonutChart = ({ isDarkMode, portfolioComposition }: DonutChartProps) => {
  // Calculate the total value for percentage calculations
  const total = portfolioComposition.reduce((sum, item) => sum + item.value, 0);
  
  // Create path data for each segment
  const createPath = (startAngle: number, endAngle: number, innerRadius: number, outerRadius: number) => {
    const start = polarToCartesian(50, 50, outerRadius, endAngle);
    const end = polarToCartesian(50, 50, outerRadius, startAngle);
    const innerStart = polarToCartesian(50, 50, innerRadius, endAngle);
    const innerEnd = polarToCartesian(50, 50, innerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", start.x, start.y, 
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  let currentAngle = 0;
  const segments = portfolioComposition.map((item) => {
    const angle = (item.value / total) * 360;
    const path = createPath(currentAngle, currentAngle + angle, 15, 35);
    currentAngle += angle;
    
    return {
      ...item,
      path,
      angle
    };
  });

  return (
    <div className="flex justify-center mb-6">
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 100 100" className="transform -rotate-90">
          {segments.map((segment, index) => (
            <path
              key={index}
              d={segment.path}
              fill={segment.color}
              stroke={isDarkMode ? "#1f2937" : "#ffffff"}
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default DonutChart;
