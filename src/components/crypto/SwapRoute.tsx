
import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Token {
  symbol: string;
  logo: string;
}

interface SwapRouteProps {
  fromToken: Token;
  toToken: Token;
}

const SwapRoute: React.FC<SwapRouteProps> = ({ fromToken, toToken }) => {
  // Mock DEX sources
  const dexSources = [
    { name: 'Uniswap V3', percentage: 60, color: '#FF007A' },
    { name: '1inch', percentage: 25, color: '#1FC7D4' },
    { name: 'SushiSwap', percentage: 15, color: '#FA52A0' },
  ];

  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/70">Route</span>
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-[#FFB81C]" />
            <span className="text-xs text-[#FFB81C]">Best Price</span>
          </div>
        </div>
        
        {/* Route Visualization */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <span className="text-lg">{fromToken.logo}</span>
            <span className="text-sm font-medium text-white">{fromToken.symbol}</span>
          </div>
          <ArrowRight className="h-4 w-4 text-white/50" />
          <div className="flex items-center gap-1">
            <span className="text-lg">{toToken.logo}</span>
            <span className="text-sm font-medium text-white">{toToken.symbol}</span>
          </div>
        </div>

        {/* DEX Sources */}
        <div className="space-y-2">
          <span className="text-xs text-white/70">Sources:</span>
          {dexSources.map((dex) => (
            <div key={dex.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: dex.color }}
                />
                <span className="text-xs text-white">{dex.name}</span>
              </div>
              <span className="text-xs text-white/70">{dex.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SwapRoute;
