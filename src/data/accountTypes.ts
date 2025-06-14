
export interface AccountType {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const accountTypes: AccountType[] = [
  {
    id: "spending",
    name: "Personal Account",
    description: "Everyday banking for daily transactions",
    color: "blue"
  },
  {
    id: "business",
    name: "Business Account",
    description: "Manage your business finances",
    color: "purple"
  }
];
