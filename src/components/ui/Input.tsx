import type { ChangeEvent } from "react";
import { cn } from "../../lib/utils";

/* 16px on phones: anything smaller makes iOS Safari zoom the page on focus. */
const FIELD =
  "w-full rounded-lg border bg-white px-3.5 py-2.5 text-base text-ink-900 placeholder:text-ink-500/70 focus:outline-none focus:ring-2 focus:ring-brand-600/40 sm:text-sm";

interface BaseFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
}

function FieldShell({
  label,
  name,
  required,
  error,
  children,
}: BaseFieldProps & { children: React.ReactNode }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-ink-900"
      >
        {label}
        {required ? <span className="text-accent-600"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-accent-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function borderClass(error?: string): string {
  return error ? "border-accent-500" : "border-line";
}

export function Input({
  label,
  name,
  value,
  onChange,
  required,
  error,
  placeholder,
  type = "text",
}: BaseFieldProps & { type?: string }) {
  return (
    <FieldShell
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      error={error}
    >
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
        className={cn(FIELD, borderClass(error))}
      />
    </FieldShell>
  );
}

export function Textarea({
  label,
  name,
  value,
  onChange,
  required,
  error,
  placeholder,
}: BaseFieldProps) {
  return (
    <FieldShell
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      error={error}
    >
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          onChange(event.target.value)
        }
        className={cn(FIELD, borderClass(error), "resize-y")}
      />
    </FieldShell>
  );
}

interface SelectProps extends BaseFieldProps {
  options: { value: string; label: string }[];
}

export function Select({
  label,
  name,
  value,
  onChange,
  options,
  required,
  error,
}: SelectProps) {
  return (
    <FieldShell
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      error={error}
    >
      <select
        id={name}
        name={name}
        value={value}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          onChange(event.target.value)
        }
        className={cn(FIELD, borderClass(error), "pr-8")}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
