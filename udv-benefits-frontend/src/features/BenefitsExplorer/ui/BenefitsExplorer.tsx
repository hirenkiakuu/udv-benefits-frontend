import cls from "./BenefitsExplorer.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import BenefitsCarousel from "features/BenefitsCarousel";
import FilterPanel from "features/FilterPanel";
import { useEffect, useState } from "react";
import AvailabilityPanel from "features/AvailabilityPanel";
import api from "shared/api/api";
import { BenefitsGroup } from "entities/benefit.model";

interface BenefitsExplorerProps {
  className?: string;
}

const BenefitsExplorer = ({ className }: BenefitsExplorerProps) => {
  const [benefits, setBenefits] = useState<BenefitsGroup[]>();
  const [benefitsAvailability, setBenefitsAvailability] = useState("available");
  const [benefitsCategory, setBenefitsCategory] = useState("all");

  useEffect(() => {
    const getBenefits = async () => {
      try {
        const res = await api.get(
          `/api/benefits/grouped?benefit_type=${benefitsAvailability}`
        );

        if (res) {
          console.log(res.data);
          setBenefits(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getBenefits();
  }, [benefitsAvailability]);

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
          {benefits &&
            benefits.map((benefitsGroup) => (
              <BenefitsCarousel
                benefitsAvailability={benefitsAvailability}
                key={benefitsGroup.categoryId}
                benefits={benefitsGroup.benefits}
                categoryTitle={benefitsGroup.categoryTitle}
                categoryId={benefitsGroup.categoryId}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsExplorer;
