import clsx from "clsx";

function Card({
  title,
  description,
  children,
  footer,
  className = "",
}) {
  const titleId = title ? "card-title" : undefined;

  return (
    <section
      aria-labelledby={titleId}
      className={clsx(
        "w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm",
        className
      )}
    >
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h1
              id={titleId}
              className="text-2xl font-bold tracking-tight text-slate-900"
            >
              {title}
            </h1>
          )}

          {description && (
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {description}
            </p>
          )}
        </div>
      )}

      {children}

      {footer && (
        <div className="mt-6 border-t border-slate-100 pt-6">
          {footer}
        </div>
      )}
    </section>
  );
}

export default Card;