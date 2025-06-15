
import { Account, AccountSection } from "./HomePageTypes";

// Determines "personal" or "business" section from current route
export const getSectionFromRoute = (pathname: string): AccountSection | null => {
  if (pathname.includes("-business")) return "business";
  if (pathname.includes("-personal")) return "personal";
  return null;
};

// Get section type from account type
export const getAccountSection = (
  accountId: string,
  accounts: Account[],
  pathname: string,
  getStoredSection: () => AccountSection
): AccountSection => {
  const account = accounts.find(acc => acc.id === accountId);
  if (!account) return "personal";

  if (account.type === "Investments") {
    return getSectionFromRoute(pathname) || getStoredSection() || "personal";
  }
  const personalTypes = ["Spending"];
  const businessTypes = ["Business", "Nonprofit"];
  if (personalTypes.includes(account.type)) return "personal";
  if (businessTypes.includes(account.type)) return "business";
  return "personal";
};

// Get section stored in localStorage
export const getStoredSection = (): AccountSection => {
  const stored = localStorage.getItem("accountSection");
  return stored === "business" || stored === "personal" ? stored : "personal";
};

// Store section in localStorage
export const storeSection = (section: AccountSection) => {
  localStorage.setItem("accountSection", section);
};
