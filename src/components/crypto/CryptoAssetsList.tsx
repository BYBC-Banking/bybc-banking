
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CryptoAsset {
  symbol: string;
  name: string;
  balance: number;
  value: number;
  change: number;
  changeAmount: number;
}

interface CryptoAssetsListProps {
  assets: CryptoAsset[];
  onAssetClick: () => void;
}

const CryptoAssetsList = ({ assets, onAssetClick }: CryptoAssetsListProps) => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Wallets</h2>
      {assets.map(asset => 
        <Card key={asset.symbol} className="hover:shadow-md transition-shadow cursor-pointer" onClick={onAssetClick}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="font-bold text-orange-600">{asset.symbol[0]}</span>
                </div>
                <div>
                  <div className="font-semibold">{asset.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {asset.balance} {asset.symbol}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  R{asset.value.toLocaleString('en-ZA', {
                    minimumFractionDigits: 2
                  })}
                </div>
                <div className={`text-sm flex items-center gap-1 ${asset.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {asset.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {asset.change >= 0 ? '+' : ''}{asset.change}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CryptoAssetsList;
