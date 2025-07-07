
import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Copy, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import QrCode from '@/components/QrCode';

interface NetworkData {
  symbol: string;
  fullName: string;
  minAmount: string;
  network: string;
  icon: string;
  color: string;
}

const networkData: Record<string, NetworkData> = {
  chainlink: {
    symbol: 'LINK',
    fullName: 'LINK (Chainlink)',
    minAmount: '0.1 LINK',
    network: 'Ethereum (ERC-20)',
    icon: 'LN',
    color: '#375BD2'
  },
  bitcoin: {
    symbol: 'BTC',
    fullName: 'Bitcoin',
    minAmount: '0.0001 BTC',
    network: 'Bitcoin Network',
    icon: '₿',
    color: '#F7931A'
  },
  ethereum: {
    symbol: 'ETH',
    fullName: 'Ethereum',
    minAmount: '0.001 ETH',
    network: 'Ethereum Mainnet',
    icon: 'Ξ',
    color: '#627EEA'
  },
  litecoin: {
    symbol: 'LTC',
    fullName: 'Litecoin',
    minAmount: '0.01 LTC',
    network: 'Litecoin Network',
    icon: 'Ł',
    color: '#BFBBBB'
  },
  ripple: {
    symbol: 'XRP',
    fullName: 'Ripple',
    minAmount: '1 XRP',
    network: 'XRP Ledger',
    icon: 'XRP',
    color: '#23292F'
  },
  solana: {
    symbol: 'SOL',
    fullName: 'Solana',
    minAmount: '0.01 SOL',
    network: 'Solana Mainnet',
    icon: '◎',
    color: '#9945FF'
  },
  stellar: {
    symbol: 'XLM',
    fullName: 'Stellar',
    minAmount: '1 XLM',
    network: 'Stellar Network',
    icon: '*',
    color: '#7D00FF'
  }
};

const CryptoReceive = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedNetwork, setSelectedNetwork] = useState('chainlink');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Mock wallet address - in real app this would come from wallet
  const walletAddress = "1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S";
  
  const currentNetworkData = networkData[selectedNetwork];

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      toast({
        title: "Address copied!",
        description: "Wallet address copied to clipboard",
      });
    } catch (err) {
      console.error('Failed to copy address:', err);
      toast({
        title: "Copy failed",
        description: "Unable to copy address to clipboard",
        variant: "destructive"
      });
    }
  };

  const handleShareAddress = async () => {
    const shareText = `Send ${currentNetworkData.fullName} tokens to this address: ${walletAddress}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentNetworkData.fullName} Wallet Address`,
          text: shareText,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      // Fallback - copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Share text copied!",
          description: "Share text copied to clipboard",
        });
      } catch (err) {
        console.error('Failed to copy share text:', err);
      }
    }
  };

  const handleNetworkSelect = (networkId: string) => {
    setSelectedNetwork(networkId);
    setDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003366] to-[#001A33] text-white p-5 flex items-center justify-center">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-8 relative">
          <button 
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          
          {/* Logo */}
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-2xl flex items-center justify-center shadow-lg shadow-[#FFD700]/30 relative">
            <div className="w-8 h-8 bg-[#003366] rounded-lg transform rotate-45"></div>
          </div>
          
          {/* Network Dropdown */}
          <div className="relative inline-block">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent hover:transform hover:-translate-y-px transition-all"
            >
              <span>{currentNetworkData.fullName}</span>
              <ChevronDown 
                className={`h-5 w-5 text-[#FFD700] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {dropdownOpen && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-[#003366]/95 backdrop-blur-lg rounded-2xl p-3 min-w-[200px] border border-[#FFD700]/20 shadow-xl z-50">
                {Object.entries(networkData).map(([networkId, data]) => (
                  <button
                    key={networkId}
                    onClick={() => handleNetworkSelect(networkId)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all font-medium ${
                      selectedNetwork === networkId 
                        ? 'bg-[#FFD700]/20 text-[#FFD700]' 
                        : 'text-white hover:bg-[#FFD700]/10 hover:text-[#FFD700]'
                    }`}
                  >
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: data.color }}
                    >
                      {data.icon}
                    </div>
                    <span>{data.fullName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <p className="text-[#B0C4DE] mt-2">
            Receive {currentNetworkData.symbol} tokens
          </p>
        </div>

        {/* QR Code Section */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-2xl p-6 inline-block shadow-lg mb-4">
            <QrCode 
              value={walletAddress} 
              size={200} 
              bgColor="#FFFFFF" 
              fgColor="#000000"
            />
          </div>
          <p className="text-[#B0C4DE] text-sm">
            Scan QR code to send {currentNetworkData.symbol} tokens
          </p>
        </div>

        {/* Address Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Your {currentNetworkData.symbol} Address
          </h3>
          <div className="bg-[#003366]/40 rounded-2xl p-5 border border-[#FFD700]/20 relative hover:border-[#FFD700]/40 hover:shadow-lg hover:shadow-[#FFD700]/10 transition-all">
            <div className="font-mono text-sm text-white break-all leading-relaxed pr-10">
              {walletAddress}
            </div>
            <button
              onClick={handleCopyAddress}
              className="absolute top-5 right-5 w-8 h-8 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-lg flex items-center justify-center text-[#003366] hover:scale-110 hover:shadow-lg hover:shadow-[#FFD700]/40 transition-all active:scale-95"
              title="Copy address"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-[#003366]/30 rounded-2xl p-5 mb-8 border border-[#FFD700]/20">
          <h4 className="text-base font-semibold mb-3 text-white">Important Information</h4>
          <p className="text-[#B0C4DE] text-sm mb-3 leading-relaxed">
            Only send {currentNetworkData.fullName} tokens to this address. Sending other tokens may result in permanent loss.
          </p>
          <p className="text-[#B0C4DE] text-sm mb-3">
            Minimum transfer amount: {currentNetworkData.minAmount}
          </p>
          
          <div className="flex justify-between items-center p-3 bg-[#FFD700]/10 rounded-lg">
            <span className="text-[#B0C4DE] text-sm">Network:</span>
            <span className="text-[#FFD700] text-sm font-semibold">{currentNetworkData.network}</span>
          </div>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShareAddress}
          className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#003366] font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#FFD700]/40 transition-all active:translate-y-0 shadow-lg shadow-[#FFD700]/30"
        >
          <Share2 className="h-5 w-5" />
          Share Address
        </button>
      </div>

      {/* Click outside to close dropdown */}
      {dropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default CryptoReceive;
