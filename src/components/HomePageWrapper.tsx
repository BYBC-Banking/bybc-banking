
import { HomePageProvider } from "@/context/HomePageContext";
import { accounts } from "@/data/accountsData";
import { ReactNode } from "react";

interface HomePageWrapperProps {
  children: ReactNode;
}

export const HomePageWrapper = ({ children }: HomePageWrapperProps) => {
  return (
    <HomePageProvider accounts={accounts}>
      {children}
    </HomePageProvider>
  );
};
