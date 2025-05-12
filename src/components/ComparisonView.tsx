
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ComparisonItemProps {
  label: string;
  value1: string | number;
  value2: string | number;
  highlight?: "first" | "second" | null;
}

const ComparisonItem = ({ label, value1, value2, highlight }: ComparisonItemProps) => (
  <div className="grid grid-cols-[2fr_1fr_1fr] gap-2 py-1">
    <div className="text-sm">{label}</div>
    <div className={`text-sm text-right ${highlight === "first" ? "font-bold text-[#1EAEDB]" : ""}`}>
      {value1}
    </div>
    <div className={`text-sm text-right ${highlight === "second" ? "font-bold text-[#7E69AB]" : ""}`}>
      {value2}
    </div>
  </div>
);

interface ComparisonViewProps {
  title: string;
  comparisonData: {
    option1Name: string;
    option2Name: string;
    items: Array<{
      label: string;
      value1: string | number;
      value2: string | number;
      highlight?: "first" | "second" | null;
    }>;
  };
}

const ComparisonView = ({ title, comparisonData }: ComparisonViewProps) => {
  const { option1Name, option2Name, items } = comparisonData;
  
  return (
    <Card className="bg-white shadow-sm overflow-hidden w-full">
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-2 border-b pb-1 mb-1">
          <div className="text-xs text-muted-foreground">Comparison</div>
          <div className="text-xs text-right font-medium text-[#1EAEDB]">{option1Name}</div>
          <div className="text-xs text-right font-medium text-[#7E69AB]">{option2Name}</div>
        </div>
        {items.map((item, index) => (
          <ComparisonItem 
            key={index} 
            label={item.label} 
            value1={item.value1} 
            value2={item.value2} 
            highlight={item.highlight}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default ComparisonView;
