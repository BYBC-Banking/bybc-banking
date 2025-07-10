
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Investments from "@/pages/Investments";
import Education from "@/pages/Education";
import Topics from "@/pages/Topics";
import FinancialNews from "@/pages/FinancialNews";
import Watchlist from "@/pages/Watchlist";
import NonprofitLedger from "@/pages/NonprofitLedger";
import Advisor from "@/pages/Advisor";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Help from "@/pages/Help";
import Legal from "@/pages/Legal";
import Language from "@/pages/Language";
import Accounts from "@/pages/Accounts";
import Transactions from "@/pages/Transactions";
import Notifications from "@/pages/Notifications";
import Buy from "@/pages/Buy";
import Send from "@/pages/Send";
import SendMoney from "@/pages/SendMoney";
import QuickActionsMore from "@/pages/QuickActionsMore";
import Receive from "@/pages/Receive";
import Transfer from "@/pages/Transfer";
import Inbox from "@/pages/Inbox";
import CreateAccount from "@/pages/CreateAccount";
import Register from "@/pages/Register";
import AccountOnboarding from "@/pages/AccountOnboarding";
import CryptoPage from "@/pages/CryptoPage";
import CryptoWalletPage from "@/pages/CryptoWalletPage";
import StocksPage from "@/pages/StocksPage";
import Cards from "@/pages/Cards";
import CardControls from "@/pages/CardControls";
import AppAppearance from "@/pages/AppAppearance";
import ReferralAndEarn from "@/pages/ReferralAndEarn";
import PayBills from "@/pages/PayBills";
import CryptoWalletOnboarding from "@/pages/CryptoWalletOnboarding";
import CryptoSwap from "@/pages/CryptoSwap";
import MultisigWallet from "@/pages/MultisigWallet";
import AccountRecovery from "@/pages/AccountRecovery";
import Recovery from "@/pages/Recovery";
import ComplianceCenter from "@/pages/ComplianceCenter";
import PrivacyDashboard from "@/pages/PrivacyDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import CryptoTradePage from "@/pages/CryptoTradePage";
import CryptoReceive from "@/pages/CryptoReceive";
import CryptoSend from "@/pages/CryptoSend";

const AppRoutes = () => {
  const { user, loading } = useAuth();
  
  // Show loading while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account-recovery" element={<AccountRecovery />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        } />
        
        {/* Personal section routes */}
        <Route path="/accounts-personal" element={
          <ProtectedRoute>
            <Accounts />
          </ProtectedRoute>
        } />
        <Route path="/investments-personal" element={
          <ProtectedRoute>
            <Investments />
          </ProtectedRoute>
        } />
        <Route path="/education-personal" element={
          <ProtectedRoute>
            <Education />
          </ProtectedRoute>
        } />
        
        {/* Business section routes */}
        <Route path="/accounts-business" element={
          <ProtectedRoute>
            <Accounts />
          </ProtectedRoute>
        } />
        <Route path="/investments-business" element={
          <ProtectedRoute>
            <Investments />
          </ProtectedRoute>
        } />
        <Route path="/education-business" element={
          <ProtectedRoute>
            <Education />
          </ProtectedRoute>
        } />
        
        {/* Legacy routes - redirect to personal by default */}
        <Route path="/accounts" element={<Navigate to="/accounts-personal" replace />} />
        <Route path="/investments" element={<Navigate to="/investments-personal" replace />} />
        <Route path="/education" element={<Navigate to="/education-personal" replace />} />
        
        <Route path="/topics" element={
          <ProtectedRoute>
            <Topics />
          </ProtectedRoute>
        } />
        <Route path="/financial-news" element={
          <ProtectedRoute>
            <FinancialNews />
          </ProtectedRoute>
        } />
        <Route path="/watchlist" element={
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        } />
        <Route path="/nonprofit" element={
          <ProtectedRoute>
            <NonprofitLedger />
          </ProtectedRoute>
        } />
        <Route path="/advisor" element={
          <ProtectedRoute>
            <Advisor />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="/help" element={
          <ProtectedRoute>
            <Help />
          </ProtectedRoute>
        } />
        <Route path="/legal" element={
          <ProtectedRoute>
            <Legal />
          </ProtectedRoute>
        } />
        <Route path="/language" element={
          <ProtectedRoute>
            <Language />
          </ProtectedRoute>
        } />
        <Route path="/transactions" element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />
        <Route path="/buy" element={
          <ProtectedRoute>
            <Buy />
          </ProtectedRoute>
        } />
        <Route path="/send" element={
          <ProtectedRoute>
            <Send />
          </ProtectedRoute>
        } />
        <Route path="/send-money" element={
          <ProtectedRoute>
            <SendMoney />
          </ProtectedRoute>
        } />
        <Route path="/quick-actions-more" element={
          <ProtectedRoute>
            <QuickActionsMore />
          </ProtectedRoute>
        } />
        <Route path="/receive" element={
          <ProtectedRoute>
            <Receive />
          </ProtectedRoute>
        } />
        <Route path="/transfer" element={
          <ProtectedRoute>
            <Transfer />
          </ProtectedRoute>
        } />
        <Route path="/inbox" element={
          <ProtectedRoute>
            <Inbox />
          </ProtectedRoute>
        } />
        <Route path="/create-account" element={
          <ProtectedRoute>
            <CreateAccount />
          </ProtectedRoute>
        } />
        <Route path="/account-onboarding/:accountType" element={
          <ProtectedRoute>
            <AccountOnboarding />
          </ProtectedRoute>
        } />
        <Route path="/crypto" element={
          <ProtectedRoute>
            <CryptoPage />
          </ProtectedRoute>
        } />
        <Route path="/crypto-wallet" element={
          <ProtectedRoute>
            <CryptoWalletPage />
          </ProtectedRoute>
        } />
        <Route path="/stocks" element={
          <ProtectedRoute>
            <StocksPage />
          </ProtectedRoute>
        } />
        <Route path="/cards" element={
          <ProtectedRoute>
            <Cards />
          </ProtectedRoute>
        } />
        <Route path="/card-controls" element={
          <ProtectedRoute>
            <CardControls />
          </ProtectedRoute>
        } />
        <Route path="/app-appearance" element={
          <ProtectedRoute>
            <AppAppearance />
          </ProtectedRoute>
        } />
        <Route path="/referral" element={
          <ProtectedRoute>
            <ReferralAndEarn />
          </ProtectedRoute>
        } />
        <Route path="/pay-bills" element={
          <ProtectedRoute>
            <PayBills />
          </ProtectedRoute>
        } />
        <Route path="/crypto-wallet-onboarding" element={
          <ProtectedRoute>
            <CryptoWalletOnboarding />
          </ProtectedRoute>
        } />
        <Route path="/crypto-swap" element={
          <ProtectedRoute>
            <CryptoSwap />
          </ProtectedRoute>
        } />
        <Route path="/multisig-wallet" element={
          <ProtectedRoute>
            <MultisigWallet />
          </ProtectedRoute>
        } />
        
        <Route path="/compliance" element={
          <ProtectedRoute>
            <ComplianceCenter />
          </ProtectedRoute>
        } />

        <Route path="/privacy-dashboard" element={
          <ProtectedRoute>
            <PrivacyDashboard />
          </ProtectedRoute>
        } />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="/crypto-trade" element={
          <ProtectedRoute>
            <CryptoTradePage />
          </ProtectedRoute>
        } />
        <Route path="/crypto-receive" element={
          <ProtectedRoute>
            <CryptoReceive />
          </ProtectedRoute>
        } />
        <Route path="/crypto-send" element={
          <ProtectedRoute>
            <CryptoSend />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
};

export default AppRoutes;
