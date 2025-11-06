import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  variant?: "default" | "primary" | "secondary" | "accent" | "success";
}

export function Card({
  children,
  hover = false,
  variant = "default",
  className = "",
  ...props
}: CardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-[var(--primary)] border-[var(--border)]";
      case "secondary":
        return "bg-[var(--secondary)] border-[var(--border)]";
      case "accent":
        return "bg-[var(--accent)] border-[var(--border)]";
      case "success":
        return "bg-[var(--success)] border-[var(--border)]";
      default:
        return "bg-white border-[var(--border)]";
    }
  };

  const baseStyles = `${getVariantStyles()} border-8 p-8 shadow-[12px_12px_0_var(--border)] transition-all duration-300 transform`;

  const hoverStyles = hover
    ? "hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[8px_8px_0_var(--border)] cursor-pointer hover:scale-[1.02]"
    : "";

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}
