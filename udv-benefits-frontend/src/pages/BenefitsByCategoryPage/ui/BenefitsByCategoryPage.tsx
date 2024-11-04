import { NavLink, useLocation, useParams } from "react-router-dom";
import cls from "./BenefitsByCategoryPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { useEffect, useState } from "react";
import api from "shared/api/api";
import BenefitCard from "features/BenefitCard";
import { Heading } from "shared/ui";
import { BenefitsGroup } from "entities/benefit.model";
import Arrow from "shared/assets/icons/arrow.svg";

interface BenefitsByCategoryPageProps {
  className?: string;
}

const BenefitsByCategoryPage = ({ className }: BenefitsByCategoryPageProps) => {
  const [benefits, setBenefits] = useState<BenefitsGroup>();

  const { id } = useParams();
  const location = useLocation();

  const benefitType = new URLSearchParams(location.search).get("benefit_type");
  console.log(benefitType);

  useEffect(() => {
    const getBenefitsByCategory = async () => {
      try {
        const res = await api.get(
          `api/categories/${id}/benefits?benefit_type=${benefitType}`
        );

        if (res) {
          const { data } = res;
          console.log(data);
          setBenefits(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getBenefitsByCategory();
  }, []);

  return (
    <div className={classNames(cls.benefitsByCategoryPage, {}, [className])}>
      <div className={cls.benefitsByCategoryPageContainerInner}>
        <div className={cls.benefitsByCategoryPageHeading}>
          <NavLink to="/benefits">
            <Arrow />
          </NavLink>
          <Heading>Категория &quot;{benefits?.categoryTitle}&quot;</Heading>
        </div>
        <div className={cls.benefitsContainer}>
          {benefits &&
            benefits?.benefits?.map((benefit) => (
              <BenefitCard key={benefit.id} benefitData={benefit} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsByCategoryPage;
