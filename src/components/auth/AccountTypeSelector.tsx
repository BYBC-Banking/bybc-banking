
import React from 'react';
import { RadioGroup } from '@/components/ui/radio-group';
import AccountTypeCard from './AccountTypeCard';

interface AccountType {
  id: string;
  name: string;
  description: string;
  color: string;
}

interface AccountTypeSelectorProps {
  accountTypes: AccountType[];
  selectedType: string;
  onTypeChange: (typeId: string) => void;
}

const AccountTypeSelector = ({ accountTypes, selectedType, onTypeChange }: AccountTypeSelectorProps) => {
  return (
    <RadioGroup 
      value={selectedType} 
      onValueChange={onTypeChange}
      className="space-y-3"
    >
      {accountTypes.map((type) => (
        <AccountTypeCard
          key={type.id}
          type={type}
          isSelected={selectedType === type.id}
          onSelect={onTypeChange}
        />
      ))}
    </RadioGroup>
  );
};

export default AccountTypeSelector;
