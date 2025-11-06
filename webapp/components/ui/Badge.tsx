import { HTMLAttributes, ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: "default" | "blue" | "red" | "yellow" | "pink" | "success";
}

export function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[var(--foreground)] text-white",
    blue: "bg-[var(--secondary)] text-[var(--foreground)]",
    red: "bg-[var(--danger)] text-white",
    yellow: "bg-[var(--accent)] text-[var(--foreground)]",
    pink: "bg-[var(--primary)] text-[var(--foreground)]",
    success: "bg-[var(--success)] text-[var(--foreground)]",
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wide border-3 border-[var(--border)] ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
