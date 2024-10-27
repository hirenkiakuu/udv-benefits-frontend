import Heading from "shared/ui/Heading/Heading";
import cls from "./BenefitCard.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import Button from "shared/ui/Button/Button";
import benefitPlaceholder from "shared/assets/images/benefit-placeholder.png";
import Divider from "shared/assets/icons/divider.svg";

interface BenefitCardProps {
  className?: string;
}

const benefitMock = {
  title: "Benefit title",
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique.`,
  price: 100,
};

const BenefitCard = ({ className }: BenefitCardProps) => {
  const { title, description, price } = benefitMock;

  return (
    <div className={classNames(cls.benefitCard, {}, [className])}>
      <div className={cls.benefitTitle}>
        <img src={benefitPlaceholder} alt="изображение льготы" />
        <Heading>{title}</Heading>
      </div>
      <div className={cls.benefitDescription}>
        <p>{description}</p>
      </div>
      <Divider width="100%" height="0.38px" viewBox="0 0 270 0.38" />
      <div className={cls.benefitPrice}>
        <span>{price} U</span>
        <Button variant="primary" size="large">
          Приобрести
        </Button>
      </div>
    </div>
  );
};

export default BenefitCard;
