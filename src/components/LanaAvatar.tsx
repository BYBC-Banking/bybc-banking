
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface LanaAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LanaAvatar = ({ size = "md", className }: LanaAvatarProps) => {
  const sizeClass = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <Avatar className={cn(sizeClass[size], className)}>
      <AvatarFallback className="bg-blue-200 text-blue-500 font-semibold">L</AvatarFallback>
    </Avatar>
  );
};

export default LanaAvatar;
