
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Token {
  id: string;
  symbol: string;
  name: string;
  balance: number;
  price: number;
  logo: string;
  network: string;
}

interface TokenSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
  tokens: Token[];
  selectedToken?: Token;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
  tokens,
  selectedToken
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTokens = tokens.filter(token =>
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularTokens = tokens.slice(0, 4);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#000000] border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Select Token</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tokens..."
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          {/* Popular Tokens */}
          {!searchTerm && (
            <div>
              <p className="text-sm text-white/70 mb-3">Popular Tokens</p>
              <div className="grid grid-cols-2 gap-2">
                {popularTokens.map((token) => (
                  <button
                    key={token.id}
                    onClick={() => onSelect(token)}
                    className="flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-xl">{token.logo}</span>
                    <div className="text-left">
                      <p className="font-semibold text-white text-sm">{token.symbol}</p>
                      <p className="text-xs text-white/70">{token.balance}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Token List */}
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {filteredTokens.map((token) => (
              <button
                key={token.id}
                onClick={() => onSelect(token)}
                className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors ${
                  selectedToken?.id === token.id ? 'bg-[#006634]/20' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{token.logo}</span>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white">{token.symbol}</p>
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-[#001489] text-white"
                      >
                        {token.network}
                      </Badge>
                    </div>
                    <p className="text-sm text-white/70">{token.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{token.balance}</p>
                  <p className="text-sm text-white/70">
                    R{(token.balance * token.price).toLocaleString('en-ZA')}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenSelector;
