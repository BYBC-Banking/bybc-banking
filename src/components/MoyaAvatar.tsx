
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MoyaAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const MoyaAvatar = ({ size = "md", className }: MoyaAvatarProps) => {
  const sizeClass = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <Avatar className={cn(sizeClass[size], className)}>
      <AvatarImage src="/moya-avatar.svg" alt="Moya AI Assistant" />
      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
        M
      </AvatarFallback>
    </Avatar>
  );
};

export default MoyaAvatar;
