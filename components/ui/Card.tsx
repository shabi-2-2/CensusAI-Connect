import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  highlightBorder?: "none" | "saffron" | "green" | "navy";
}

export function Card({
  className,
  children,
  hoverEffect = false,
  highlightBorder = "none",
  ...props
}: CardProps) {
  const borderStyles = {
    none: "border-slate-200/80",
    saffron: "border-brand-saffron-200 hover:border-brand-saffron-400",
    green: "border-brand-green-200 hover:border-brand-green-400",
    navy: "border-brand-navy-200 hover:border-brand-navy-400",
  };

  return (
    <div
      className={cn(
        "bg-white rounded-2xl border shadow-sm transition-all duration-300",
        borderStyles[highlightBorder],
        hoverEffect && "hover:shadow-lg hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pb-3", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-bold text-slate-900 tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-slate-600 mt-1", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pt-3", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-6 pt-0 flex items-center gap-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}
