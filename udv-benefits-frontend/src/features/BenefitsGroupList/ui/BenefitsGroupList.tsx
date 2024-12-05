import cls from "./BenefitsGroupList.module.scss";
import { BenefitsGroup } from "entities/benefit.model";
import BenefitCard from "features/BenefitCard";
import { NavLink } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, Heading } from "shared/ui";

interface BenefitsGroupListProps {
  className?: string;
  benefitsGroup: BenefitsGroup;
  benefitsAvailability: "available" | "active" | "unavailable";
}

const BenefitsGroupList = ({
  className,
  benefitsGroup,
  benefitsAvailability,
}: BenefitsGroupListProps) => {
  if (!benefitsGroup.benefits.length) return;

  return (
    <div className={classNames(cls.benefitsGroupList, {}, [className])}>
      <div className={cls.benefitsGroupListHeader}>
        <Heading
          className={cls.benefitsCategoryTitle}
          id={`${benefitsGroup.categoryId}`}
        >
          {benefitsGroup.categoryTitle}
        </Heading>
        <NavLink
          to={`/benefits/category/${benefitsGroup.categoryId}?benefit_type=${benefitsAvailability}`}
        >
          <Button variant="primary" size="large">
            Еще
          </Button>
        </NavLink>
      </div>

      <ul className={cls.benefitsList} key={benefitsGroup.categoryId}>
        {benefitsGroup.benefits.slice(0, 4).map((benefit) => (
          <li key={benefit.id}>
            <BenefitCard
              benefitData={benefit}
              benefitsAvailability={benefitsAvailability}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BenefitsGroupList;
