import cls from "./FilterButton.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface FilterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  isActive: boolean;
}

const FilterButton = ({
  className,
  children,
  isActive,
  ...props
}: FilterButtonProps) => {
  return (
    <button
      className={classNames(cls.filterButton, { [cls.active]: isActive }, [
        className,
      ])}
      {...props}
    >
      {children}
    </button>
  );
};

export default FilterButton;
