
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
import Receive from "@/pages/Receive";
import Transfer from "@/pages/Transfer";
import Inbox from "@/pages/Inbox";
import CreateAccount from "@/pages/CreateAccount";
import Register from "@/pages/Register";
import AccountOnboarding from "@/pages/AccountOnboarding";
import CryptoPage from "@/pages/CryptoPage";
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
import ProtectedRoute from "@/components/ProtectedRoute";
import { isLoggedIn } from "@/utils/auth";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={isLoggedIn() ? "/dashboard" : "/login"} replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account-recovery" element={<AccountRecovery />} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } />
      <Route path="/investments" element={
        <ProtectedRoute>
          <Investments />
        </ProtectedRoute>
      } />
      <Route path="/education" element={
        <ProtectedRoute>
          <Education />
        </ProtectedRoute>
      } />
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
      <Route path="/accounts" element={
        <ProtectedRoute>
          <Accounts />
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
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
