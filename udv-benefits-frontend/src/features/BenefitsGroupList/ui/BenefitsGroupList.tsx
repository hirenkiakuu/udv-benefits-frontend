import cls from "./BenefitsGroupList.module.scss";
import { BenefitsGroup } from "entities/benefit.model";
import BenefitCard from "features/BenefitCard";
import { NavLink } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, Heading } from "shared/ui";

interface BenefitsGroupListProps {
  className?: string;
  benefitsGroup: BenefitsGroup;
  benefitsAvailability: string;
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
        <Heading className={cls.benefitsCategoryTitle}>
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
        {benefitsGroup.benefits.map((benefit) => (
          <li key={benefit.id}>
            <BenefitCard benefitData={benefit} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BenefitsGroupList;
