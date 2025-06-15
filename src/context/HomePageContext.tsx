
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Account, 
  Transaction, 
  AccountSection, 
  HomePageContextType 
} from "./HomePageTypes";
import { 
  getSectionFromRoute, 
  getAccountSection, 
  getStoredSection, 
  storeSection 
} from "./homePageUtils";

const HomePageContext = createContext<HomePageContextType | undefined>(undefined);

export const useHomePage = () => {
  const context = useContext(HomePageContext);
  if (!context) {
    throw new Error("useHomePage must be used within a HomePageProvider");
  }
  return context;
};

interface HomePageProviderProps {
  children: ReactNode;
  accounts: Account[];
}

export const HomePageProvider = ({ children, accounts }: HomePageProviderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract account ID from URL if present
  const params = new URLSearchParams(location.search);
  const accountIdFromUrl = params.get("account");

  // State for account section (P or B) - prioritize URL, then localStorage, then default
  const [accountSection, setAccountSection] = useState<AccountSection>(() => {
    const routeSection = getSectionFromRoute(location.pathname);
    if (routeSection) return routeSection;
    if (accountIdFromUrl) {
      return getAccountSection(accountIdFromUrl, accounts, location.pathname, getStoredSection);
    }
    return getStoredSection();
  });

  // Filter accounts based on selected section
  const filteredAccounts = accounts.filter(account => {
    if (accountSection === "personal") {
      return ["Spending", "Investments"].includes(account.type);
    } else {
      return ["Business", "Nonprofit", "Investments"].includes(account.type);
    }
  });

  // State for selected account - default to first filtered account
  const [selectedAccountId, setSelectedAccountId] = useState<string>(() => {
    if (accountIdFromUrl && accounts.some(account => account.id === accountIdFromUrl)) {
      return accountIdFromUrl;
    }
    return filteredAccounts[0]?.id || accounts[0]?.id || "";
  });

  // Update selected account when URL changes
  useEffect(() => {
    if (accountIdFromUrl && accounts.some(account => account.id === accountIdFromUrl)) {
      setSelectedAccountId(accountIdFromUrl);
      const newSection = getAccountSection(accountIdFromUrl, accounts, location.pathname, getStoredSection);
      if (newSection !== accountSection) {
        setAccountSection(newSection);
        storeSection(newSection);
      }
    }
    // eslint-disable-next-line
  }, [accountIdFromUrl, accounts]);

  // Update section when route changes (only for routes that explicitly specify section)
  useEffect(() => {
    const routeSection = getSectionFromRoute(location.pathname);
    if (routeSection && routeSection !== accountSection) {
      setAccountSection(routeSection);
      storeSection(routeSection);
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  // Update selected account when section changes
  useEffect(() => {
    const currentAccount = accounts.find(acc => acc.id === selectedAccountId);
    if (currentAccount) {
      if (currentAccount.type === "Investments") {
        return;
      }
      const currentAccountSection = getAccountSection(selectedAccountId, accounts, location.pathname, getStoredSection);
      if (currentAccountSection !== accountSection) {
        const firstAccountInSection = filteredAccounts[0];
        if (firstAccountInSection) {
          setSelectedAccountId(firstAccountInSection.id);
        }
      }
    } else {
      const firstAccountInSection = filteredAccounts[0];
      if (firstAccountInSection) {
        setSelectedAccountId(firstAccountInSection.id);
      }
    }
    // eslint-disable-next-line
  }, [accountSection, filteredAccounts]);

  // Custom setAccountSection that also handles route updates and storage
  const handleSetAccountSection = (section: AccountSection) => {
    const currentPath = location.pathname;
    if (currentPath.includes("/accounts-")) {
      navigate(`/accounts-${section}`);
    } else if (currentPath.includes("/investments-")) {
      navigate(`/investments-${section}`);
    } else if (currentPath.includes("/education-")) {
      navigate(`/education-${section}`);
    }
    setAccountSection(section);
    storeSection(section);
  };

  const selectedAccount = accounts.find(account => account.id === selectedAccountId) || accounts[0];

  return (
    <HomePageContext.Provider value={{
      accounts,
      filteredAccounts,
      selectedAccountId,
      setSelectedAccountId,
      selectedAccount,
      accountSection,
      setAccountSection: handleSetAccountSection
    }}>
      {children}
    </HomePageContext.Provider>
  );
};
