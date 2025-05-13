
import { Button } from "@/components/ui/button";
import LanaAvatar from "@/components/LanaAvatar";

interface LanaChatHeaderProps {
  onClose: () => void;
}

const LanaChatHeader = ({ onClose }: LanaChatHeaderProps) => {
  return (
    <div className="bg-[#1A1F2C] text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <LanaAvatar size="sm" />
        <div className="ml-2">
          <h3 className="font-semibold">Lana</h3>
          <p className="text-xs text-white/70">Your Financial Advisor</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
        Close
      </Button>
    </div>
  );
};

export default LanaChatHeader;
