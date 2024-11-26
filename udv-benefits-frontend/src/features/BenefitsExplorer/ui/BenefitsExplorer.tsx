import cls from "./BenefitsExplorer.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import FilterPanel from "features/FilterPanel";
import AvailabilityPanel from "features/AvailabilityPanel";
import { useGroupedBenefits } from "../model/hooks/useGroupedBenefits";
import { useCallback } from "react";
import BenefitsGroupList from "features/BenefitsGroupList";

interface BenefitsExplorerProps {
  className?: string;
}

const BenefitsExplorer = ({ className }: BenefitsExplorerProps) => {
  const {
    groupedBenefits,
    benefitsAvailability,
    setBenefitsAvailability,
    benefitsCategory,
    setBenefitsCategory,
  } = useGroupedBenefits();

  const handleBenefitCategoryChange = useCallback(
    (category: string) => {
      setBenefitsCategory(category);
    },
    [setBenefitsCategory]
  );

  const handleAvailabilityChange = useCallback(
    (availability: string) => {
      setBenefitsAvailability(availability);
    },
    [setBenefitsAvailability]
  );

  return (
    <section className={classNames(cls.benefitsExplorer, {}, [className])}>
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
          {groupedBenefits.map((benefitsGroup) => (
            <BenefitsGroupList
              key={benefitsGroup.categoryId}
              benefitsAvailability={benefitsAvailability}
              benefitsGroup={benefitsGroup}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsExplorer;
