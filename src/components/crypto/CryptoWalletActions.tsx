import React, { useState } from "react";
import { ArrowUp, DollarSign, ArrowDown, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// Updated icons to match the provided image
const SendIcon: React.FC<{
  className?: string;
}> = props => <ArrowUp {...props} />;
const SwapIcon: React.FC<{
  className?: string;
}> = props => <ArrowRightLeft {...props} />;
const BuyIcon: React.FC<{
  className?: string;
}> = props => <DollarSign {...props} />;
const ReceiveIcon: React.FC<{
  className?: string;
}> = props => <ArrowDown {...props} />;
type ActionKey = "send" | "swap" | "buy" | "receive";
interface CryptoWalletActionsProps {
  onSend?: () => void;
  onSwap?: () => void;
  onBuy?: () => void;
  onReceive?: () => void;
}
const ACTIONS: {
  key: ActionKey;
  label: string;
  Icon: React.FC<{
    className?: string;
  }>;
}[] = [{
  key: "send",
  label: "Send",
  Icon: SendIcon
}, {
  key: "swap",
  label: "Swap",
  Icon: SwapIcon
}, {
  key: "buy",
  label: "Buy / Sell",
  Icon: BuyIcon
}, {
  key: "receive",
  label: "Receive",
  Icon: ReceiveIcon
}];
const CryptoWalletActions: React.FC<CryptoWalletActionsProps> = ({
  onSend,
  onSwap,
  onBuy,
  onReceive
}) => {
  const [active, setActive] = useState<ActionKey>("buy");

  // Button handlers
  const getHandler = (key: ActionKey) => {
    if (key === "send") return onSend;
    if (key === "swap") return onSwap;
    if (key === "buy") return onBuy;
    if (key === "receive") return onReceive;
    return undefined;
  };
  return <div className="w-full flex justify-center items-center py-3">
      
    </div>;
};
export default CryptoWalletActions;