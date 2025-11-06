import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-bold text-sm uppercase tracking-wide text-[var(--foreground)]">
          {label}
        </label>
      )}
      <input
        className={`px-4 py-3 border-4 border-[var(--border)] bg-white text-[var(--foreground)] font-semibold focus:outline-none focus:shadow-[0_0_0_4px_var(--accent)] transition-all ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-[var(--danger)] font-bold">{error}</span>}
    </div>
  );
}
