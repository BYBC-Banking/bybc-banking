
import React from 'react';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface AccountType {
  id: string;
  name: string;
  description: string;
  color: string;
}

interface AccountTypeCardProps {
  type: AccountType;
  isSelected: boolean;
  onSelect: (typeId: string) => void;
}

const AccountTypeCard = ({ type, isSelected, onSelect }: AccountTypeCardProps) => {
  return (
    <div
      className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-slate-50 cursor-pointer"
      onClick={() => onSelect(type.id)}
    >
      <RadioGroupItem value={type.id} id={type.id} />
      <div className="flex-1">
        <Label htmlFor={type.id} className="font-medium cursor-pointer">
          {type.name}
        </Label>
        <p className="text-sm text-muted-foreground">
          {type.description}
        </p>
      </div>
      <div 
        className={`w-4 h-4 rounded-full
          ${type.color === "blue" ? "bg-finance-blue" : ""} 
          ${type.color === "green" ? "bg-finance-green" : ""}
          ${type.color === "purple" ? "bg-[#7E69AB]" : ""}
          ${type.color === "orange" ? "bg-orange-500" : ""}
          ${type.color === "teal" ? "bg-teal-600" : ""}
        `}
      />
    </div>
  );
};

export default AccountTypeCard;
