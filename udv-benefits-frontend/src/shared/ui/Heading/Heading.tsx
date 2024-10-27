import { HTMLAttributes, ReactNode } from "react";
import cls from "./Heading.module.scss";
import { classNames } from "shared/lib/classNames/classNames";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  children: ReactNode;
  size?: "large" | "medium";
}

const Heading = ({
  className,
  children,
  size = "large",
  ...props
}: HeadingProps) => {
  return size === "large" ? (
    <h1
      className={classNames(cls.heading, {}, [className, cls[size]])}
      {...props}
    >
      {children}
    </h1>
  ) : (
    <h2
      className={classNames(cls.heading, {}, [className, cls[size]])}
      {...props}
    >
      {children}
    </h2>
  );
};

export default Heading;
