import Heading from "shared/ui/Heading/Heading";
import cls from "./BenefitCard.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import benefitPlaceholder from "shared/assets/images/benefit-placeholder.png";
import Divider from "shared/assets/icons/divider.svg";
import { Button } from "shared/ui";
import { Benefit } from "entities/benefit.model";
import { NavLink } from "react-router-dom";

interface BenefitCardProps {
  className?: string;
  benefitData: Benefit;
  benefitsAvailability?: string;
}

const BenefitCard = ({
  className,
  benefitData,
  benefitsAvailability,
}: BenefitCardProps) => {
  const { title, description, price, id } = benefitData;

  let buttonText = "Приобрести";
  let disabledState = false;

  if (benefitsAvailability === "active") {
    buttonText = "Приобретено";
    disabledState = true;
  } else if (benefitsAvailability === "unavailable") {
    buttonText = "Недоступно";
    disabledState = true;
  }

  return (
    <div className={classNames(cls.benefitCard, {}, [className])}>
      <div className={cls.benefitTitle}>
        <img src={benefitPlaceholder} alt="изображение льготы" />
        <Heading size="medium">{title}</Heading>
      </div>
      <div className={cls.benefitDescription}>
        <p>{description}</p>
      </div>
      <Divider width="100%" height="0.38px" viewBox="0 0 270 0.38" />
      <div className={cls.benefitPrice}>
        <span>{price} U</span>
        <NavLink to={`/benefits/${id}`}>
          <Button variant="primary" size="large" disabled={disabledState}>
            {buttonText}
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default BenefitCard;
