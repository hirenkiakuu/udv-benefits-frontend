import BenefitCard from "features/BenefitCard";
import cls from "./BenefitsCarousel.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Heading } from "shared/ui";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import CarouselButton from "features/CarouselButton";

interface BenefitsCarouselProps {
  className?: string;
}

const BenefitsByCategory = ({ className }: BenefitsCarouselProps) => {
  const benefitsListRef = useRef<HTMLUListElement | null>(null);

  const scrollLeft = () => {
    console.log("scrolled");
    if (benefitsListRef.current) {
      benefitsListRef.current.scrollBy({ left: -400, behavior: "smooth" }); // вынести в отдельную кнопку
    }
  };

  const scrollRight = () => {
    console.log("scrolled");
    if (benefitsListRef.current) {
      benefitsListRef.current.scrollBy({ left: 400, behavior: "smooth" }); // вынести в отдельную кнопку
    }
  };

  return (
    <div className={classNames(cls.benefitsCarousel, {}, [className])}>
      <div className={cls.rowTitle}>
        <Heading>Здоровье</Heading>
        <NavLink to={"/"}>Посмотреть все предложения (8)</NavLink>
      </div>

      {/* <button onClick={scrollLeft} className={cls.scrollButton}>
        ←
      </button> */}
      <CarouselButton
        className={cls.carouselButtonLeft}
        onClick={scrollLeft}
        direction="left"
      />
      <CarouselButton
        className={cls.carouselButtonRight}
        onClick={scrollRight}
        direction="right"
      />

      {/* <button className={cls.scrollButton}>rigth</button> */}

      <ul className={cls.benefitsList} ref={benefitsListRef}>
        <BenefitCard />
        <BenefitCard />
        <BenefitCard />
        <BenefitCard />
        <BenefitCard />
        <BenefitCard />
        <BenefitCard />
      </ul>
    </div>
  );
};

export default BenefitsByCategory;
