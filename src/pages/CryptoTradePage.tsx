
import { useState, useRef, useEffect } from "react";
import { ArrowDown, ArrowUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Crypto asset data
const CRYPTOS = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "Ξ",
    color: "#627eea",
    price: 45000,
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    icon: "₿",
    color: "#f7931a",
    price: 1250000,
  },
  {
    name: "Ripple",
    symbol: "XRP",
    icon: "◊",
    color: "#23292f",
    price: 12.5,
  },
  {
    name: "Stellar",
    symbol: "XLM",
    icon: "⭐",
    color: "#14b6e7",
    price: 2.15,
  },
  {
    name: "Litecoin",
    symbol: "LTC",
    icon: "Ł",
    color: "#345d9d",
    price: 1850,
  },
  {
    name: "Solana",
    symbol: "SOL",
    icon: "◎",
    color: "#9945ff",
    price: 3200,
  },
  {
    name: "Toncoin",
    symbol: "TON",
    icon: "💎",
    color: "#0088cc",
    price: 95.5,
  },
  {
    name: "BNB",
    symbol: "BNB",
    icon: "🔶",
    color: "#f3ba2f",
    price: 8500,
  },
];

// Slider config
const SLIDER_MIN = 100;
const SLIDER_MAX = 25000;
const SLIDER_STEP = 100;
const SLIDER_TICKS = [100, 1000, 5000, 10000, 15000, 20000, 25000];

// Utility for formatting currency
function formatCurrency(val: number) {
  return "R" + val.toLocaleString("en-ZA", {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

export default function CryptoTradePage() {
  // State
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTOS[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountType, setAmountType] = useState<"fiat" | "crypto">("fiat");
  const [sliderValue, setSliderValue] = useState(SLIDER_MIN);

  // For closing dropdown on click outside
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Conversion calculations
  const price = selectedCrypto.price;
  const amountNum = parseFloat(amount) || 0;
  let cryptoAmount = amountType === "fiat" ? amountNum / price : amountNum;
  let fiatAmount = amountType === "fiat" ? amountNum : amountNum * price;

  // Input field logic: limit to 8 decimals for crypto, 2 for fiat, update slider sync
  useEffect(() => {
    if (amountType === "fiat") {
      // Sync slider if changed in input and value in range
      if (
        Math.abs(fiatAmount - sliderValue) > 0.5 &&
        fiatAmount >= SLIDER_MIN &&
        fiatAmount <= SLIDER_MAX
      ) {
        setSliderValue(fiatAmount);
      }
    }
    // eslint-disable-next-line
  }, [amount, amountType, selectedCrypto]);

  useEffect(() => {
    // if dropdown open, setup click outside
    if (!showDropdown) return;
    function handle(e: MouseEvent) {
      if (!dropdownRef.current?.contains(e.target as Node)) setShowDropdown(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [showDropdown]);

  // When slider moves, set amount in fiat (if type==fiat)
  function handleSlider(val: number) {
    setSliderValue(val);
    if (amountType === "fiat") setAmount(val.toString());
    else setAmount((val / price).toFixed(8).replace(/\.?0+$/, "")); // to max 8 decimals
  }

  // Handle input
  function handleInput(val: string) {
    // validate: allow decimals, prevent negatives, limit length
    if (!/^(\d+(\.\d{0,8})?)?$/.test(val)) return;
    setAmount(val);
    if (amountType === "fiat" && val) setSliderValue(Math.max(SLIDER_MIN, Math.min(SLIDER_MAX, parseFloat(val))));
  }

  // Handle type toggle
  function toggleAmountType(tp: "fiat" | "crypto") {
    if (amount === "") {
      setAmountType(tp);
      return;
    }
    // Convert value on switch
    if (tp === "fiat" && amountType === "crypto") {
      setAmount((cryptoAmount * price).toFixed(2));
      setSliderValue(Math.min(SLIDER_MAX, Math.max(SLIDER_MIN, cryptoAmount * price)));
    }
    if (tp === "crypto" && amountType === "fiat") {
      setAmount((fiatAmount / price).toFixed(8).replace(/\.?0+$/, ""));
    }
    setAmountType(tp);
  }

  // Header Action button disabled if invalid
  const isActionDisabled = !amountNum || fiatAmount < SLIDER_MIN || fiatAmount > SLIDER_MAX;

  // Main colors
  const buyActive = activeTab === "buy";
  const actionColor = buyActive ? "bg-green-600 hover:bg-green-700 focus:bg-green-700" : "bg-red-600 hover:bg-red-700 focus:bg-red-700";
  const actionText = buyActive ? `Buy ${selectedCrypto.symbol}` : `Sell ${selectedCrypto.symbol}`;
  const tabBg = buyActive ? "bg-green-600" : "bg-red-600";
  const sliderAmber =
    "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-2 sm:px-0">
      {/* --- Buy/Sell Toggle Section --- */}
      <div className="w-full max-w-md px-2 mb-6">
        <div className="flex relative bg-slate-700 rounded-full p-1 h-14 transition-all shadow">
          <div
            className={cn(
              "absolute left-0 top-0 h-full w-1/2 rounded-full transition-transform duration-300",
              buyActive
                ? "translate-x-0 bg-green-600"
                : "translate-x-full bg-red-600"
            )}
            style={{
              width: "50%",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              transform: buyActive
                ? "translateX(0%)"
                : "translateX(100%)",
            }}
          />
          <button
            className={cn(
              "relative w-1/2 z-10 text-center text-base font-semibold transition-colors duration-300 px-2 py-2 rounded-full",
              buyActive ? "text-white" : "text-gray-400"
            )}
            onClick={() => setActiveTab("buy")}
          >
            Buy
          </button>
          <button
            className={cn(
              "relative w-1/2 z-10 text-center text-base font-semibold transition-colors duration-300 px-2 py-2 rounded-full",
              !buyActive ? "text-white" : "text-gray-400"
            )}
            onClick={() => setActiveTab("sell")}
          >
            Sell
          </button>
        </div>
      </div>
      {/* --- Available Assets Dropdown --- */}
      <div className="w-full max-w-md px-2 mb-3">
        <h2 className="font-medium text-sm mb-2 text-gray-700">Available Assets</h2>
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            className={cn(
              "w-full flex items-center justify-between px-4 py-4 bg-slate-700 rounded-xl cursor-pointer shadow text-white hover:bg-slate-800 focus:outline-none transition"
            )}
            onClick={() => setShowDropdown((o) => !o)}
          >
            <span className="flex items-center gap-3">
              <span
                className="text-lg font-bold"
                style={{
                  color: selectedCrypto.color,
                  background: "#fff",
                  borderRadius: "50%",
                  width: 38,
                  height: 38,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px 0 rgba(62,62,62,.11)"
                }}
              >
                {selectedCrypto.icon}
              </span>
              <span>
                <span className="block font-medium">{selectedCrypto.name}</span>
                <span className="text-xs font-normal text-gray-200">Available</span>
              </span>
            </span>
            <span className="flex flex-col items-end gap-0.5">
              <span className="text-sm text-gray-100 font-semibold">
                {selectedCrypto.symbol}
              </span>
              <span className="text-xs text-gray-400">
                {formatCurrency(selectedCrypto.price)}
              </span>
            </span>
            {/* Arrow, rotates */}
            <ArrowDown
              className={cn(
                "ml-2 w-5 h-5 text-gray-300 transition-transform duration-300",
                showDropdown && "rotate-180"
              )}
              strokeWidth={2}
            />
          </button>
          {showDropdown && (
            <div className="absolute z-30 top-full left-0 right-0 mt-1 max-h-72 bg-slate-800 border border-slate-900 shadow-xl rounded-xl overflow-y-auto animate-fade-in">
              {CRYPTOS.map((c) => (
                <button
                  key={c.symbol}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 px-4 py-3 focus:bg-slate-700 hover:bg-slate-700 text-white transition rounded-lg",
                    selectedCrypto.symbol === c.symbol && "bg-slate-700"
                  )}
                  onClick={() => {
                    setSelectedCrypto(c);
                    setShowDropdown(false);
                    setAmount("");
                    setSliderValue(SLIDER_MIN);
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="text-lg font-bold"
                      style={{
                        color: c.color,
                        background: "#fff",
                        borderRadius: "50%",
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px 0 rgba(62,62,62,.11)"
                      }}
                    >
                      {c.icon}
                    </span>
                    <span>
                      <span className="block font-medium">{c.name}</span>
                      <span className="text-xs text-gray-300">{c.symbol}</span>
                    </span>
                  </span>
                  <span className="flex flex-col items-end gap-0.5">
                    <span className="text-sm text-gray-100 font-semibold">
                      {formatCurrency(c.price)}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* --- Trading Card --- */}
      <div className="w-full max-w-md px-2 mb-5">
        <div className="bg-white rounded-xl shadow-xl px-4 pt-4 pb-3">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-base font-semibold text-gray-900 flex items-center gap-2">
                {buyActive ? "Buy" : "Sell"} {selectedCrypto.name}
              </div>
              <div className="flex items-center text-xs text-amber-600 gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-medium">Live Price</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-gray-800">
                {selectedCrypto.symbol}
              </span>
              <span className="text-xs text-gray-500">
                {formatCurrency(selectedCrypto.price)}
              </span>
            </div>
          </div>
          {/* Dual-Input: Crypto/ZAR toggle */}
          <div className="flex mb-3 gap-2">
            <button
              className={cn(
                "flex-1 text-sm font-medium px-3 py-2 rounded-lg border border-amber-300 transition-colors duration-200",
                amountType === "fiat"
                  ? "bg-amber-500 text-white border-amber-500 shadow"
                  : "bg-gray-50 text-amber-500 hover:bg-amber-100"
              )}
              onClick={() => toggleAmountType("fiat")}
            >
              ZAR
            </button>
            <button
              className={cn(
                "flex-1 text-sm font-medium px-3 py-2 rounded-lg border border-amber-300 transition-colors duration-200",
                amountType === "crypto"
                  ? "bg-amber-500 text-white border-amber-500 shadow"
                  : "bg-gray-50 text-amber-500 hover:bg-amber-100"
              )}
              onClick={() => toggleAmountType("crypto")}
            >
              {selectedCrypto.symbol}
            </button>
          </div>
          <div>
            <input
              value={amount}
              onChange={(e) => handleInput(e.target.value)}
              type="text"
              placeholder={
                amountType === "fiat"
                  ? "Enter amount (ZAR)"
                  : `Enter amount (${selectedCrypto.symbol})`
              }
              className="w-full rounded-lg border border-slate-200 bg-gray-50 px-4 py-3 text-xl font-semibold mb-2 focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
              min="0"
              inputMode="decimal"
            />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">
                Cash: <span className="font-medium text-gray-700">R25,430.50</span>
              </span>
              <span className="text-xs text-gray-400">
                Min R100 • Max R25,000
              </span>
            </div>
            {/* Conversion Box */}
            {(amountNum > 0) && (
              <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-2 transition-all duration-300">
                <span className="text-sm font-medium text-gray-700">
                  You {buyActive ? "pay" : "receive"}
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-lg font-bold text-gray-800">
                    {amountType === "fiat"
                      ? (cryptoAmount > 0.0000001 ? `${cryptoAmount.toFixed(8).replace(/\.?0+$/, "")}` : "0") 
                      : formatCurrency(fiatAmount)
                    }
                  </span>
                  <span className="ml-0.5 text-base">
                    {amountType === "fiat" ? selectedCrypto.symbol : "ZAR"}
                  </span>
                  <ArrowRightIcon />
                </span>
              </div>
            )}
          </div>
          {/* Slider section */}
          <div className="my-4 pb-1 px-1">
            <label className="block text-xs text-gray-700 mb-2 ml-1">
              Amount ({amountType === "fiat" ? "ZAR" : selectedCrypto.symbol})
            </label>
            <div className="w-full relative">
              {/* Custom slider bar */}
              <input
                type="range"
                min={SLIDER_MIN}
                max={SLIDER_MAX}
                step={SLIDER_STEP}
                value={amountType === "fiat" ? sliderValue : Math.min(SLIDER_MAX, Math.max(SLIDER_MIN, fiatAmount))}
                onChange={(e) => handleSlider(parseInt(e.target.value))}
                className="w-full appearance-none bg-transparent slider-thumb-amber"
                style={{ height: 36 }}
              />
              {/* Amber slider BG */}
              <div className="pointer-events-none absolute top-1/2 left-0 w-full h-2 rounded-full -translate-y-1/2 z-[-1] bg-gray-200 overflow-hidden">
                <div
                  className={sliderAmber}
                  style={{
                    width: `${
                      ((amountType === "fiat" ? sliderValue : Math.min(SLIDER_MAX, Math.max(SLIDER_MIN, fiatAmount))) -
                        SLIDER_MIN) /
                        (SLIDER_MAX - SLIDER_MIN) *
                      100
                    }%`,
                    height: "100%",
                  }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between mt-2 px-1">
              {SLIDER_TICKS.map((tick) => (
                <span key={tick} className="text-[11px] text-gray-400 font-medium">
                  {tick === SLIDER_MIN || tick === SLIDER_MAX ? formatCurrency(tick) : `${tick >= 1000 ? `R${tick / 1000}k` : formatCurrency(tick)}`}
                </span>
              ))}
            </div>
          </div>
          {/* Action Button */}
          <button
            type="button"
            className={cn(
              "mt-2 w-full py-3 rounded-lg font-semibold text-lg shadow transition-colors duration-300 focus:outline-none",
              isActionDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : actionColor
            )}
            disabled={isActionDisabled}
            style={{ letterSpacing: 0.2 }}
            tabIndex={0}
          >
            {actionText}
          </button>
        </div>
      </div>
      {/* --- Disclaimer Footer --- */}
      <footer className="w-full max-w-md px-2 mt-auto">
        <div className="bg-amber-50 border-l-4 border-amber-300 rounded-xl px-4 py-3 text-xs text-amber-700 mb-6">
          Trading cryptocurrency carries market risk. Prices may fluctuate. Ensure you understand our&nbsp;
          <a href="#" className="underline hover:text-amber-800">terms</a> before placing trades.
        </div>
      </footer>
      {/* slider css */}
      <style>{`
        .slider-thumb-amber::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #f59e0b;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(245,158,11,0.22);
          cursor: pointer;
          transition: box-shadow 0.2s;
        }
        .slider-thumb-amber:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 4px #fde68a;
        }
        /* Firefox */
        .slider-thumb-amber::-moz-range-thumb {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #f59e0b;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(245,158,11,0.22);
          cursor: pointer;
          transition: box-shadow 0.2s;
        }
        .slider-thumb-amber:focus::-moz-range-thumb {
          box-shadow: 0 0 0 4px #fde68a;
        }
        /* track */
        .slider-thumb-amber::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 4px;
          background: transparent;
        }
        .slider-thumb-amber::-moz-range-track {
          height: 8px;
          border-radius: 4px;
          background: transparent;
        }
        .slider-thumb-amber {
          outline: none;
        }
      `}</style>
    </div>
  );
}

// ArrowRight icon as an inline SVG (for better style control)
function ArrowRightIcon() {
  return (
    <svg width="20" height="18" viewBox="0 0 18 18" fill="none" className="inline-block -mx-2" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9H15M15 9L11 5M15 9L11 13" stroke="#a16207" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
