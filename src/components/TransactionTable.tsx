
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { FileText, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionFilters {
  dateRange: { from: Date | undefined; to: Date | undefined };
  searchQuery: string;
  categories: string[];
  amountRange: { min: number; max: number };
}

interface TransactionTableProps {
  filters: TransactionFilters;
}

// Mock transaction data
const mockTransactions = [
  {
    id: "tx-001",
    date: "2025-05-10",
    description: "School Supplies for Education Program",
    amount: 12500.00,
    category: "Education Programs",
    type: "expense",
    purpose: "Purchased textbooks, notebooks, and stationery for 50 students in our after-school literacy program.",
    details: "These supplies will support our goal of improving reading skills for underserved children aged 8-12 in the Eastern Cape community.",
    documents: ["invoice-001.pdf", "delivery-receipt-001.pdf"]
  },
  {
    id: "tx-002",
    date: "2025-05-08",
    description: "Corporate Donation - Standard Bank",
    amount: 50000.00,
    category: "Donations",
    type: "income",
    purpose: "Annual corporate social responsibility contribution.",
    details: "Unrestricted funds to be allocated according to our strategic plan, with focus on education initiatives as discussed with donor representatives.",
    documents: ["donation-agreement-002.pdf"]
  },
  {
    id: "tx-003",
    date: "2025-05-05",
    description: "Community Health Workshop",
    amount: 8750.50,
    category: "Healthcare Initiatives",
    type: "expense",
    purpose: "Organized a health education workshop on nutrition and preventive care for 35 families.",
    details: "The workshop included professional healthcare speakers, educational materials, and healthy meal demonstrations aimed at improving community wellness outcomes.",
    documents: ["receipts-003.pdf", "attendance-003.pdf", "photos-003.zip"]
  },
  {
    id: "tx-004",
    date: "2025-05-02",
    description: "Staff Salaries - May 2025",
    amount: 32500.00,
    category: "Administrative",
    type: "expense",
    purpose: "Monthly compensation for 5 full-time employees.",
    details: "Includes program director, two program coordinators, finance manager, and administrative assistant who directly implement and support our mission-critical work.",
    documents: ["payroll-004.pdf"]
  },
  {
    id: "tx-005",
    date: "2025-04-29",
    description: "Foundation Grant - Johnson Family",
    amount: 75000.00,
    category: "Donations",
    type: "income",
    purpose: "Restricted grant for healthcare programs.",
    details: "Funds designated specifically for expanding our community health screening initiative in underserved townships over the next 6 months.",
    documents: ["grant-agreement-005.pdf", "proposal-005.pdf"]
  },
  {
    id: "tx-006",
    date: "2025-04-25",
    description: "Office Rent - May 2025",
    amount: 7500.00,
    category: "Administrative",
    type: "expense",
    purpose: "Monthly rent for main office space.",
    details: "Our office serves as the headquarters for program coordination, volunteer training, and community meetings. The location was selected for its accessibility to the communities we serve.",
    documents: ["lease-006.pdf"]
  },
  {
    id: "tx-007",
    date: "2025-04-22",
    description: "Educational Field Trip",
    amount: 9350.75,
    category: "Education Programs",
    type: "expense",
    purpose: "Science museum visit for 40 program participants.",
    details: "Transportation, entrance fees, and lunch for students from our education program. This experiential learning opportunity is aligned with our STEM education objectives.",
    documents: ["receipts-007.pdf", "permission-forms-007.pdf"]
  },
  {
    id: "tx-008",
    date: "2025-04-20",
    description: "Fundraising Gala Proceeds",
    amount: 120000.00,
    category: "Fundraising",
    type: "income",
    purpose: "Annual benefit dinner and auction.",
    details: "Net proceeds from our yearly fundraising event, attended by 150 supporters. Funds are allocated to our general operating budget to support all program areas.",
    documents: ["financial-summary-008.pdf", "donor-list-008.pdf"]
  },
  {
    id: "tx-009",
    date: "2025-04-18",
    description: "Technology Equipment",
    amount: 15430.25,
    category: "Technology",
    type: "expense",
    purpose: "Computers and tablets for education center.",
    details: "Purchased 5 computers and 10 tablets to enhance our digital literacy program for youth and adult learners. Equipment will serve approximately 100 participants weekly.",
    documents: ["invoice-009.pdf", "asset-register-009.pdf"]
  },
  {
    id: "tx-010",
    date: "2025-04-15",
    description: "Individual Donations - April Campaign",
    amount: 28750.00,
    category: "Donations",
    type: "income",
    purpose: "Online fundraising campaign for education initiative.",
    details: "Consolidated smaller donations from 143 individual donors contributing to our 'Educate to Empower' campaign focused on expanding our after-school programs.",
    documents: ["donation-report-010.pdf"]
  },
];

const TransactionTable = ({ filters }: TransactionTableProps) => {
  const [openTransactionId, setOpenTransactionId] = useState<string | null>(null);
  
  // Filter transactions based on the provided filters
  const filteredTransactions = mockTransactions.filter(transaction => {
    // Filter by search query
    if (filters.searchQuery && !transaction.description.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by categories
    if (filters.categories.length > 0 && !filters.categories.includes(transaction.category)) {
      return false;
    }
    
    // Filter by amount range
    if (transaction.amount < filters.amountRange.min || transaction.amount > filters.amountRange.max) {
      return false;
    }
    
    // Filter by date range
    if (filters.dateRange.from || filters.dateRange.to) {
      const txDate = new Date(transaction.date);
      if (filters.dateRange.from && txDate < filters.dateRange.from) {
        return false;
      }
      if (filters.dateRange.to) {
        const endDate = new Date(filters.dateRange.to);
        endDate.setDate(endDate.getDate() + 1); // Include the "to" date
        if (txDate > endDate) {
          return false;
        }
      }
    }
    
    return true;
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10"></TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Documents</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No transactions match your search criteria.
              </TableCell>
            </TableRow>
          ) : (
            filteredTransactions.map((transaction) => (
              <Collapsible
                key={transaction.id}
                open={openTransactionId === transaction.id}
                onOpenChange={() => {
                  setOpenTransactionId(
                    openTransactionId === transaction.id ? null : transaction.id
                  );
                }}
                className="w-full"
              >
                <TableRow className={cn(
                  "cursor-pointer hover:bg-muted/80",
                  openTransactionId === transaction.id && "bg-muted/50"
                )}>
                  <TableCell className="w-10 p-0">
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        {openTransactionId === transaction.id ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>
                    <CollapsibleTrigger asChild className="flex-1 cursor-pointer">
                      <div>{transaction.description}</div>
                    </CollapsibleTrigger>
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell className={cn(
                    "text-right font-medium",
                    transaction.type === "income" ? "text-green-600" : "text-amber-700"
                  )}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {transaction.type === "income" ? "+" : "-"}R{transaction.amount.toLocaleString()}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{transaction.type === "income" ? "Income" : "Expense"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex justify-end">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="ml-1 text-xs text-muted-foreground">{transaction.documents.length}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Supporting documentation available</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
                
                <CollapsibleContent>
                  <TableRow className="bg-muted/30 border-t-0">
                    <TableCell colSpan={6} className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium">Purpose</h4>
                          <p className="text-sm text-muted-foreground">{transaction.purpose}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium">Details</h4>
                          <p className="text-sm text-muted-foreground">{transaction.details}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Supporting Documents</h4>
                          <div className="flex flex-wrap gap-2">
                            {transaction.documents.map((doc) => (
                              <Button
                                key={doc}
                                variant="outline"
                                size="sm"
                                className="text-xs flex items-center gap-1"
                              >
                                <FileText className="h-3 w-3" />
                                {doc}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </CollapsibleContent>
              </Collapsible>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
