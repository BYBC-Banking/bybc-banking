
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InvestmentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  actionType: 'buy' | 'sell';
  assetName?: string;
}

const InvestmentModal = ({
  isOpen,
  onOpenChange,
  actionType,
  assetName = 'assets',
}: InvestmentModalProps) => {
  const handleSwitchAccount = () => {
    // Navigate to investment account but don't proceed with the action
    console.log("Switching to investment account");
    // Close modal without allowing the user to proceed with their intended action
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg">
            Investment Account Required
          </DialogTitle>
          <DialogDescription className="text-center">
            Switch to your Investment Account to {actionType} {assetName}.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <div className="rounded-full bg-amber-100 p-3">
            {actionType === 'buy' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                <path d="M17 14V20M14 17H20M6 10h12M6 6h12M6 14h4M6 18h4"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                <path d="M14 17H20M6 10h12M6 6h12M6 14h4M6 18h4"/>
              </svg>
            )}
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button 
            onClick={handleSwitchAccount}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
          >
            Switch Now
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentModal;
