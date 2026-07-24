import { forwardRef, useId, useState } from "react";
import clsx from "clsx";

const PasswordInput = forwardRef(
  (
    {
      id,
      label,
      error,
      helperText,
      className = "",
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const [showPassword, setShowPassword] =
      useState(false);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={showPassword ? "text" : "password"}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error
                ? errorId
                : helperText
                ? helperId
                : undefined
            }
            className={clsx(
              "w-full rounded-lg border bg-white px-4 py-2.5 pr-20 text-sm text-slate-900 placeholder:text-slate-400",
              "transition-colors duration-200",
              "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-slate-300",
              "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
              className
            )}
            {...props}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
            className="absolute inset-y-0 right-3 flex items-center text-sm font-medium text-slate-500 transition hover:text-slate-700"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error ? (
          <p
            id={errorId}
            className="mt-1 text-sm text-red-600"
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={helperId}
            className="mt-1 text-sm text-slate-500"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;