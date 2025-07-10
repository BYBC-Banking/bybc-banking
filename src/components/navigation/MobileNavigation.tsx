
import { useIsMobile } from "@/hooks/use-mobile";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";

export default function MobileNavigation() {
  const isMobile = useIsMobile();
  
  // Only render on mobile
  if (!isMobile) {
    return null;
  }
  
  return (
    <>
      <TopNav />
      <BottomNav />
    </>
  );
}
