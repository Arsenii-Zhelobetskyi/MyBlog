export function TypographyP({ children, className}: { children: string, className?: string }) {
  return <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}>{children}</p>;
}
