import BenefitCard from "features/BenefitCard";
import cls from "./BenefitsCarousel.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Heading } from "shared/ui";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import CarouselButton from "features/CarouselButton";
import { Benefit } from "entities/benefit.model";

interface BenefitsCarouselProps {
  className?: string;
  categoryTitle: string;
  categoryId: number;
  benefits: Benefit[];
  benefitsAvailability: string;
}

const BenefitsCarousel = ({
  className,
  benefits,
  categoryTitle,
  categoryId,
  benefitsAvailability,
}: BenefitsCarouselProps) => {
  const benefitsListRef = useRef<HTMLUListElement | null>(null);

  // const isBought = benefitsAvailability === "active";

  if (!benefits.length) return;

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
        <Heading>{categoryTitle}</Heading>
        <NavLink
          to={`/benefits/category/${categoryId}?benefit_type=${benefitsAvailability}`}
        >
          Посмотреть все предложения ({benefits.length})
        </NavLink>
      </div>

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

      <ul className={cls.benefitsList} ref={benefitsListRef}>
        {benefits.map((benefit) => (
          <BenefitCard
            key={benefit.id}
            benefitData={benefit}
            benefitsAvailability={benefitsAvailability}
          /> // сюда дата по бенефиту
        ))}
      </ul>
    </div>
  );
};

export default BenefitsCarousel;
