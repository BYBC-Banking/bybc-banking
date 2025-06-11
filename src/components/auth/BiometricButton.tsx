
import { Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const BiometricButton = () => {
  const { toast } = useToast();

  const handleBiometricAuth = () => {
    // This would integrate with device biometric APIs in a real app
    toast({
      title: "Biometric authentication",
      description: "This feature is not available in the demo",
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleBiometricAuth}
      className="flex items-center justify-center gap-2 hover:bg-gray-50 border-[#9b87f5] text-[#9b87f5] transition-colors"
    >
      <Fingerprint className="text-[#9b87f5]" size={18} />
      <span>Login with Biometrics</span>
    </Button>
  );
};

export default BiometricButton;
