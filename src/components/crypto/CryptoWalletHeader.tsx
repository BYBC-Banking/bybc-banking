
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CryptoWalletHeaderProps {
  onBackClick: () => void;
}

const CryptoWalletHeader = ({ onBackClick }: CryptoWalletHeaderProps) => {
  return (
    <header className="flex items-center gap-4 mb-6">
      <Button variant="ghost" size="icon" onClick={onBackClick} className="h-10 w-10">
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-2xl font-bold">Crypto Wallet</h1>
    </header>
  );
};

export default CryptoWalletHeader;
