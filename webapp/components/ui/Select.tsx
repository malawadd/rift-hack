import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  error,
  options,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-bold text-sm uppercase tracking-wide text-[var(--foreground)]">
          {label}
        </label>
      )}
      <select
        className={`px-4 py-3 border-4 border-[var(--border)] bg-white text-[var(--foreground)] font-semibold focus:outline-none focus:shadow-[0_0_0_4px_var(--accent)] transition-all cursor-pointer ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-[var(--danger)] font-bold">{error}</span>}
    </div>
  );
}
