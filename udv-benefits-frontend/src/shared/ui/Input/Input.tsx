import { forwardRef, InputHTMLAttributes } from "react";
import cls from "./Input.module.scss";
import { classNames } from "shared/lib/classNames/classNames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  danger?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, danger, ...props }: InputProps, ref) => {
    return (
      <input
        ref={ref}
        className={classNames(cls.input, { [cls.danger]: danger }, [className])}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
