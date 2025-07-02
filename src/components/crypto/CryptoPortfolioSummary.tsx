
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CryptoPortfolioSummaryProps {
  totalValue: number;
  onAssetClick: () => void;
}

const CryptoPortfolioSummary = ({ totalValue, onAssetClick }: CryptoPortfolioSummaryProps) => {
  return (
    <Card className="mb-6" onClick={onAssetClick}>
      <CardHeader>
        <CardTitle className="text-center">Total Portfolio Value</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">
            R{totalValue.toLocaleString('en-ZA', {
              minimumFractionDigits: 2
            })}
          </div>
          <div className="text-green-600 text-sm">
            +R2,594.57 (+3.8%) today
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoPortfolioSummary;
