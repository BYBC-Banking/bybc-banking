
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import MobileNavigation from "./navigation/MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Determine if we should show navigation based on the current route
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isFullscreenPage = location.pathname === '/crypto-wallet' || location.pathname === '/crypto-trade';
  
  return (
    <>
      {!isAuthPage && !isFullscreenPage && (
        <>
          {!isMobile && <NavBar />}
          <MobileNavigation />
        </>
      )}
      <div className={isMobile && !isAuthPage && !isFullscreenPage ? "pb-16" : ""}>
        {children}
      </div>
    </>
  );
};

export default AppLayout;
