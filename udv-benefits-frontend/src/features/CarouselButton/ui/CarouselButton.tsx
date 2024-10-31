import cls from "./CarouselButton.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import ArrowLeft from "shared/assets/icons/arrow-left.svg";
import ArrowRight from "shared/assets/icons/arrow-right.svg";
import { ButtonHTMLAttributes } from "react";

interface CarouselButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  direction: "left" | "right";
}

const CarouselButton = ({
  className,
  direction,
  ...props
}: CarouselButtonProps) => {
  return (
    <button
      className={classNames(cls.carouselButton, {}, [className])}
      {...props}
    >
      {direction === "left" ? <ArrowLeft /> : <ArrowRight />}
    </button>
  );
};

export default CarouselButton;
