import { forwardRef, useId } from "react";
import clsx from "clsx";

const Input = forwardRef(
  (
    {
      id,
      label,
      error,
      helperText,
      className = "",
      type = "text",
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperTextId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

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

        <input
          id={inputId}
          ref={ref}
          type={type}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? errorId
              : helperText
              ? helperTextId
              : undefined
          }
          className={clsx(
            "w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400",
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

        {error ? (
          <p id={errorId} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperTextId} className="mt-1 text-sm text-slate-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;