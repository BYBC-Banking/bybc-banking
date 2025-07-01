
import React, { useState } from "react";
import { ArrowUp, DollarSign, ArrowDown, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// Updated icons to match the provided image
const SendIcon: React.FC<{ className?: string }> = (props) => (
  <ArrowUp {...props} />
);

const SwapIcon: React.FC<{ className?: string }> = (props) => (
  <ArrowRightLeft {...props} />
);

const BuyIcon: React.FC<{ className?: string }> = (props) => (
  <DollarSign {...props} />
);

const ReceiveIcon: React.FC<{ className?: string }> = (props) => (
  <ArrowDown {...props} />
);

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
  Icon: React.FC<{ className?: string }>;
}[] = [
  {
    key: "send",
    label: "Send",
    Icon: SendIcon,
  },
  {
    key: "swap",
    label: "Swap",
    Icon: SwapIcon,
  },
  {
    key: "buy",
    label: "Buy / Sell",
    Icon: BuyIcon,
  },
  {
    key: "receive",
    label: "Receive",
    Icon: ReceiveIcon,
  },
];

const CryptoWalletActions: React.FC<CryptoWalletActionsProps> = ({
  onSend,
  onSwap,
  onBuy,
  onReceive,
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

  return (
    <div className="w-full flex justify-center items-center py-3">
      <div
        className="flex w-full max-w-xl items-center justify-between px-2 py-2 rounded-2xl shadow-lg"
        style={{
          background: "#2D3C48",
          minHeight: 82,
        }}
      >
        {ACTIONS.map(({ key, label, Icon }, idx) => {
          const isActive = active === key;
          const handleClick = () => {
            setActive(key);
            const cb = getHandler(key);
            if (cb) cb();
          };

          // Color settings - special styling for buy button to match image
          let btnClass =
            "flex flex-col items-center justify-center flex-1 rounded-xl mx-1 transition-all duration-150 py-2";
          
          if (key === "buy" && isActive) {
            btnClass += " bg-amber-400 shadow-md";
          } else if (isActive) {
            btnClass += " bg-slate-700 shadow-md";
          } else {
            btnClass += " bg-transparent hover:bg-slate-700/40";
          }

          let iconClass = "w-6 h-6 mb-1 ";
          let textClass = "text-sm font-medium ";

          if (key === "buy" && isActive) {
            iconClass += "text-black";
            textClass += "text-black";
          } else if (isActive) {
            iconClass += "text-white";
            textClass += "text-white";
          } else {
            iconClass += "text-slate-300";
            textClass += "text-slate-300";
          }

          return (
            <button
              key={key}
              className={btnClass}
              style={{
                minWidth: 72,
                outline: "none",
                border: "none",
              }}
              aria-pressed={isActive}
              tabIndex={0}
              onClick={handleClick}
              type="button"
            >
              <Icon className={iconClass} />
              <span className={textClass} style={{ letterSpacing: 0.3 }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CryptoWalletActions;
