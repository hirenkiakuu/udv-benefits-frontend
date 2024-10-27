import { InputHTMLAttributes } from "react";
import cls from "./Input.module.scss";
import { classNames } from "shared/lib/classNames/classNames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input className={classNames(cls.input, {}, [className])} {...props} />
  );
};

export default Input;
