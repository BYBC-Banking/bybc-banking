
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface CryptoAccessModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CryptoAccessModal = ({ isOpen, onOpenChange }: CryptoAccessModalProps) => {
  const handleOpenInvestmentAccount = () => {
    // Navigate to investment account switching but don't proceed with the action
    window.location.href = "/dashboard?account=1";
    // Close modal without allowing the user to proceed
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
            To access the crypto wallet feature, you must first switch to your investments account.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <div className="rounded-full bg-amber-100 p-3">
            <Wallet className="h-6 w-6 text-amber-600" />
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button 
            onClick={handleOpenInvestmentAccount}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
          >
            Switch to Investment Account
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

export default CryptoAccessModal;
