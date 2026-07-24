import clsx from "clsx";

const sizes = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-[3px]",
  lg: "h-12 w-12 border-4",
};

function Loader({
  fullScreen = false,
  size = "md",
  message,
  className = "",
}) {
  const spinner = (
    <div
      aria-hidden="true"
      className={clsx(
        "animate-spin rounded-full border-slate-200 border-t-blue-600",
        sizes[size] ?? sizes.md
      )}
    />
  );

  const content = (
    <div
      role="status"
      aria-live="polite"
      className={clsx("flex flex-col items-center gap-3", className)}
    >
      {spinner}

      {message && (
        <p className="text-sm text-slate-500">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        {content}
      </div>
    );
  }

  return content;
}

export default Loader;