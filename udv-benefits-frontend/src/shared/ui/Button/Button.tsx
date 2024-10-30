import { ButtonHTMLAttributes, ReactNode } from "react";
import cls from "./Button.module.scss";
import { classNames } from "shared/lib/classNames/classNames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  variant?: "primary" | "default" | "text" | "link";
  size?: "small" | "large";
  isActive?: boolean;
}

export const Button = ({
  className,
  children,
  variant = "default",
  size = "small",
  isActive = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(cls.button, { [cls.active]: isActive }, [
        className,
        cls[variant],
        cls[size],
      ])}
      {...props}
    >
      {children}
    </button>
  );
};
