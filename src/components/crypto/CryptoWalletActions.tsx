
import React, { useState } from "react";
import { ArrowUp, DollarSign, ArrowDown, Icon } from "lucide-react";
import { cn } from "@/lib/utils";

// Create a SwapIcon wrapper using Lucide's generic Icon
const SwapIcon: React.FC<{ className?: string }> = (props) => (
  <Icon name="swap" {...props} />
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
    Icon: (props) => <ArrowUp {...props} />,
  },
  {
    key: "swap",
    label: "Swap",
    Icon: (props) => <SwapIcon {...props} />,
  },
  {
    key: "buy",
    label: "Buy / Sell",
    Icon: (props) => <DollarSign {...props} />,
  },
  {
    key: "receive",
    label: "Receive",
    Icon: (props) => <ArrowDown {...props} />,
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

          // Color settings
          let btnClass =
            "flex flex-col items-center justify-center flex-1 rounded-xl mx-1 transition-all duration-150 py-2";
          if (key === "buy" && isActive) {
            btnClass += " bg-[#FFA726] shadow-md";
          } else if (isActive) {
            btnClass += " bg-slate-700 shadow-md";
          } else {
            btnClass += " bg-transparent hover:bg-slate-700/40";
          }

          let iconClass =
            "w-6 h-6 mb-1 " +
            (isActive
              ? key === "buy"
                ? "text-black"
                : "text-white"
              : "text-slate-300");

          let textClass =
            "text-sm font-medium " +
            (isActive
              ? key === "buy"
                ? "text-black"
                : "text-white"
              : "text-slate-300");

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

