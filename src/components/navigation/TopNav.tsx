
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const menuItems = [
  { label: "Settings", href: "/settings" },
  { label: "Help", href: "/help" },
  { label: "Legal", href: "/legal" },
  { label: "Language", href: "/language" },
];

export default function TopNav() {
  return (
    <div className="sticky top-0 left-0 right-0 z-40 bg-[#1A1F2C] border-b border-white/10">
      <div className="flex justify-between items-center h-14 px-4">
        <Link to="/" className="text-white font-semibold text-lg">FinApp</Link>
        
        <Sheet>
          <SheetTrigger asChild>
            <button 
              aria-label="Menu" 
              className="p-2 rounded-md hover:bg-white/10 transition-colors"
            >
              <Menu className="h-6 w-6 text-white" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-[#222222] border-l border-white/10 p-0"
          >
            <div className="pt-6">
              <div className="px-6 pb-4 border-b border-white/10">
                <h2 className="text-lg font-medium text-white">Menu</h2>
              </div>
              
              <nav className="mt-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center py-3 px-6",
                      "text-gray-200 hover:bg-white/5 transition-colors"
                    )}
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
