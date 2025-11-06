import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-bold uppercase tracking-wide border-4 border-[var(--border)] transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-[var(--foreground)] hover:scale-105 active:scale-95";

  const variantStyles = {
    primary:
      "bg-[var(--primary)] hover:bg-[var(--primary)] shadow-[6px_6px_0_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--border)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0_var(--border)]",
    secondary:
      "bg-[var(--secondary)] hover:bg-[var(--secondary)] shadow-[6px_6px_0_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--border)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0_var(--border)]",
    danger:
      "bg-[var(--danger)] text-white hover:bg-[var(--danger)] shadow-[6px_6px_0_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--border)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0_var(--border)]",
    success:
      "bg-[var(--success)] hover:bg-[var(--success)] shadow-[6px_6px_0_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--border)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0_var(--border)]",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base md:text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
