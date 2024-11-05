import BenefitCard from "features/BenefitCard";
import cls from "./BenefitsCarousel.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Heading } from "shared/ui";
import { useEffect, useRef, useState } from "react";
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
  const [showButtons, setShowButtons] = useState(true); // Состояние для отображения кнопок

  useEffect(() => {
    const updateButtonVisibility = () => {
      if (benefitsListRef.current) {
        const containerWidth = benefitsListRef.current.clientWidth; // ширина контейнера
        const contentWidth = benefitsListRef.current.scrollWidth; // ширина содержимого
        setShowButtons(contentWidth > containerWidth); // показывать кнопки, если содержимое больше контейнера
      }
    };

    // Проверка размеров при первом рендере
    updateButtonVisibility();

    // Проверка размеров при изменении окна
    window.addEventListener("resize", updateButtonVisibility);
    return () => {
      window.removeEventListener("resize", updateButtonVisibility);
    };
  }, [benefits]);

  if (!benefits.length) return null;

  const scrollLeft = () => {
    if (benefitsListRef.current) {
      benefitsListRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (benefitsListRef.current) {
      benefitsListRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <div className={classNames(cls.benefitsCarousel, {}, [className])}>
      <div className={cls.rowTitle}>
        <Heading>{categoryTitle}</Heading>
        <NavLink
          to={`/benefits/category/${categoryId}?benefit_type=${benefitsAvailability}`}
        >
          Посмотреть все{" "}
          {benefitsAvailability === "active"
            ? "приобретенные льготы"
            : "предложения"}{" "}
          ({benefits.length})
        </NavLink>
      </div>

      {showButtons && (
        <>
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
        </>
      )}

      <ul className={cls.benefitsList} ref={benefitsListRef}>
        {benefits.map((benefit) => (
          <BenefitCard
            key={benefit.id}
            benefitData={benefit}
            benefitsAvailability={benefitsAvailability}
          />
        ))}
      </ul>
    </div>
  );
};

export default BenefitsCarousel;
