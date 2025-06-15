
import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Repeat2, DollarSign, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionOption {
  key: "send" | "swap" | "buy" | "receive";
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}

interface CryptoWalletActionsProps {
  onSend?: () => void;
  onSwap?: () => void;
  onBuy?: () => void;
  onReceive?: () => void;
}

const CryptoWalletActions: React.FC<CryptoWalletActionsProps> = ({
  onSend,
  onSwap,
  onBuy,
  onReceive
}) => {
  // By default highlight "swap" or "buy" as "active", or let active be controlled by parent if needed.
  const [activeTab, setActiveTab] = useState<"swap" | "buy">("swap");

  // Data for the controls
  const options: ActionOption[] = [
    {
      key: "send",
      label: "Send",
      icon: <ArrowUpRight className="w-5 h-5" />,
      onClick: onSend
    },
    {
      key: "swap",
      label: "Swap",
      icon: <Repeat2 className="w-5 h-5" />,
      onClick: () => {
        setActiveTab("swap");
        onSwap && onSwap();
      },
      active: activeTab === "swap"
    },
    {
      key: "buy",
      label: "Buy / Sell",
      icon: (
        <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full border-2 border-white/30 shadow-inner mx-auto">
          <DollarSign className="h-5 w-5 text-white" />
        </span>
      ),
      onClick: () => {
        setActiveTab("buy");
        onBuy && onBuy();
      },
      active: activeTab === "buy"
    },
    {
      key: "receive",
      label: "Receive",
      icon: <ArrowDownLeft className="w-5 h-5" />,
      onClick: onReceive
    }
  ];

  return (
    <div className="w-full flex justify-center items-center py-3">
      {/* Segmented bar */}
      <div className="flex bg-[#20194F] rounded-full px-2 py-1 w-full max-w-xl items-center shadow-md transition-colors" style={{ minHeight: 75 }}>
        {options.map((option, idx) => {
          // Is this option in the "center" where the purple highlight should be
          const isSwap = option.key === "swap";
          const isBuy = option.key === "buy";
          const isActive = !!option.active;
          // Central highlight: centered flex, overlapping gradient background for 'swap' and 'buy/sell'
          if (isSwap || isBuy) {
            return (
              <React.Fragment key={option.key}>
                {isSwap && (
                  <div
                    className={cn(
                      "flex-1 flex flex-col items-center justify-center z-10 transition-all rounded-full cursor-pointer",
                      isActive
                        ? "bg-gradient-to-r from-[#7A5DFA] to-[#836DF2] shadow-md"
                        : "bg-transparent"
                    )}
                    style={{
                      borderTopLeftRadius: 30,
                      borderBottomLeftRadius: 30,
                      marginRight: 0,
                      minHeight: 65,
                    }}
                    onClick={option.onClick}
                  >
                    <div className={cn(
                      "w-10 h-10 flex items-center justify-center",
                      isActive ? "text-white" : "text-violet-200"
                    )}>
                      {option.icon}
                    </div>
                    <span className={cn(
                      "text-xs mt-1 font-medium tracking-wide",
                      isActive ? "text-white" : "text-violet-200"
                    )}>{option.label}</span>
                  </div>
                )}
                <div className="w-px h-9 mx-0.5 bg-white/10 rounded-full select-none pointer-events-none" aria-hidden />
                {isBuy && (
                  <div
                    className={cn(
                      "flex-1 flex flex-col items-center justify-center z-10 transition-all rounded-full cursor-pointer",
                      isActive
                        ? "bg-gradient-to-l from-[#7A5DFA] to-[#836DF2] shadow-md"
                        : "bg-transparent"
                    )}
                    style={{
                      borderTopRightRadius: 30,
                      borderBottomRightRadius: 30,
                      minHeight: 65,
                    }}
                    onClick={option.onClick}
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      {option.icon}
                    </div>
                    <span className={cn(
                      "text-xs mt-1 font-medium tracking-wide",
                      isActive ? "text-white" : "text-violet-200"
                    )}>{option.label}</span>
                  </div>
                )}
              </React.Fragment>
            );
          }
          // Edge options (Send / Receive)
          return (
            <div
              key={option.key}
              className={cn(
                "flex flex-col items-center justify-center flex-[0.8] cursor-pointer z-10 transition-all",
                "hover:bg-white/10 rounded-full py-1",
                "group"
              )}
              style={{
                minHeight: 55,
              }}
              onClick={option.onClick}
            >
              <div className="w-9 h-9 flex items-center justify-center text-violet-200 group-hover:text-white transition-colors">{option.icon}</div>
              <span className="text-xs mt-0.5 text-violet-200 font-medium">{option.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CryptoWalletActions;
