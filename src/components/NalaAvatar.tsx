
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface NalaAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const NalaAvatar = ({ size = "md", className }: NalaAvatarProps) => {
  const sizeClass = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <Avatar className={cn(sizeClass[size], className)}>
      <AvatarImage src="/nala-avatar.svg" alt="Nala AI Assistant" />
      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
        N
      </AvatarFallback>
    </Avatar>
  );
};

export default NalaAvatar;
