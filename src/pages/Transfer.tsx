
import React, { useState } from 'react';
import { ArrowLeft, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { accounts } from "@/data/accountsData";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Transfer() {
  const { toast } = useToast();
  const [fromAccount, setFromAccount] = useState(accounts[0]?.id || "");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromAccount || !toAccount || !amount) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (fromAccount === toAccount) {
      toast({
        title: "Same Account",
        description: "You cannot transfer to the same account",
        variant: "destructive",
      });
      return;
    }

    // In a real app, we would make an API call here to process the transfer
    toast({
      title: "Transfer Successful",
      description: `R${amount} transferred successfully`,
    });
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Transfer Money</h1>
        </header>

        {/* Transfer Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <form onSubmit={handleTransfer} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">From Account</label>
              <Select
                value={fromAccount}
                onValueChange={setFromAccount}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} - R{account.balance.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center my-4">
              <div className="bg-slate-100 p-2 rounded-full">
                <ArrowDown className="h-5 w-5 text-slate-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">To Account</label>
              <Select
                value={toAccount}
                onValueChange={setToAccount}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} - R{account.balance.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">R</span>
                </div>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Transfer Money
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
