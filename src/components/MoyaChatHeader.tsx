
import { Button } from "@/components/ui/button";
import MoyaAvatar from "@/components/MoyaAvatar";

interface MoyaChatHeaderProps {
  onClose: () => void;
}

const MoyaChatHeader = ({ onClose }: MoyaChatHeaderProps) => {
  return (
    <div className="bg-[#1A1F2C] text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <MoyaAvatar size="sm" />
        <div className="ml-2">
          <h3 className="font-semibold">Moya</h3>
          <p className="text-xs text-white/70">Your Financial Assistant</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
        Close
      </Button>
    </div>
  );
};

export default MoyaChatHeader;
