import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils"; // utility for className merging

type Variant = "default" | "primary" | "danger" | "ghost";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  label?: string;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-muted text-foreground hover:bg-muted/80",
  primary: "bg-primary text-white hover:bg-primary/80",
  danger: "bg-destructive text-white hover:bg-destructive/80",
  ghost: "bg-transparent text-foreground hover:bg-accent/10",
};

const sizeStyles = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  isActive = false,
  label,
  variant = "ghost",
  size = "md",
  className,
  disabled = false
}) => {
  const baseStyles = cn(
    "inline-flex items-center justify-center rounded-lg transition-all duration-200",
    sizeStyles[size],
    variantStyles[variant],
    isActive && "ring-2 ring-offset-2 ring-primary",
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const button = (
    <button
      onClick={onClick}
      className={baseStyles}
      aria-label={label}
      disabled={disabled}
    >
      {icon}
    </button>
  );

  return label ? (
    <Tooltip>
      <TooltipTrigger asChild>
        {button}
      </TooltipTrigger>
      <TooltipContent side="top">{label}</TooltipContent>
    </Tooltip>
  ) : (
    button
  );
};

export default IconButton;
