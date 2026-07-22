import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  // TODO: replace with real design tokens/styling.
  return <button data-variant={variant} className={className} {...props} />;
}
