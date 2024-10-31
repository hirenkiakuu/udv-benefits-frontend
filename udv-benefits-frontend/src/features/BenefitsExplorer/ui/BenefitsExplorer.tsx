import cls from "./BenefitsExplorer.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import BenefitsCarousel from "features/BenefitsCarousel";
import FilterPanel from "features/FilterPanel";
import { useState } from "react";
import AvailabilityPanel from "features/AvailabilityPanel";

interface BenefitsExplorerProps {
  className?: string;
}

// interface Benefit {
//   title: string;
//   description: string;
//   price: number;
// }

const BenefitsExplorer = ({ className }: BenefitsExplorerProps) => {
  //   const [benefits, setBenefits] = useState<Benefit[]>();
  const [benefitsAvailability, setBenefitsAvailability] = useState("available");
  const [benefitsCategory, setBenefitsCategory] = useState("all");

  const handleBenefitCategoryChange = (category: string) => {
    console.log("CALLLL");
    setBenefitsCategory(category);
  };

  const handleAvailabilityChange = (availability: string) => {
    setBenefitsAvailability(availability);
  };

  return (
    <section className={classNames(cls.BenefitsExplorer, {}, [className])}>
      <AvailabilityPanel
        currentBenefitsAvailability={benefitsAvailability}
        onAvailabilityChange={handleAvailabilityChange}
      />
      <div className={cls.benefitsBoard}>
        <FilterPanel
          className={cls.filterPanel}
          currentBenefitsCategory={benefitsCategory}
          onBenefitCategoryChange={handleBenefitCategoryChange}
        />
        <div className={cls.benefitCarousels}>
          <BenefitsCarousel />
          <BenefitsCarousel />
          <BenefitsCarousel />
        </div>
      </div>
    </section>
  );
};

export default BenefitsExplorer;
