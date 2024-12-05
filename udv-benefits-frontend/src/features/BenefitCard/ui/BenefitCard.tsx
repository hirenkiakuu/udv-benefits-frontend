import cls from "./BenefitCard.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui";
import { Benefit } from "entities/benefit.model";
import { NavLink } from "react-router-dom";

interface BenefitCardProps {
  className?: string;
  benefitData: Benefit;
  benefitsAvailability?: "available" | "active" | "unavailable";
}

const BenefitCard = ({
  className,
  benefitData,
  benefitsAvailability = "available",
}: BenefitCardProps) => {
  const { title, price, id, picture, provider } = benefitData;

  const buttonStates = {
    active: { buttonText: "Приобретено", disabled: true },
    unavailable: { buttonText: "Просмотреть", disabled: false },
    available: { buttonText: "Приобрести", disabled: false },
  };

  const { buttonText, disabled } = buttonStates[benefitsAvailability];

  return (
    <div className={classNames(cls.benefitCard, {}, [className])}>
      <div className={cls.benefitHeader}>
        <img
          src={picture}
          className={cls.benefitImg}
          alt="изображение льготы"
        />
      </div>

      <div className={cls.benefitFooter}>
        <div className={cls.benefitDescription}>
          <p className={cls.benefitTitle}>{title}</p>
          <p className={cls.benefitDistributor}>{provider}</p>
        </div>
        <div className={cls.benefitPrice}>
          <span>{price} U</span>
          <NavLink to={`/benefits/${id}`}>
            <Button variant="primary" size="large" disabled={disabled}>
              {buttonText}
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BenefitCard;
