import cls from "./BenefitsPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import BenefitsExplorer from "features/BenefitsExplorer";

interface BenefitsPageProps {
  className?: string;
}

const BenefitsPage = ({ className }: BenefitsPageProps) => {
  return (
    <>
      <div className={classNames(cls.benefitsPage, {}, [className])}>
        <BenefitsExplorer />
      </div>
    </>
  );
};

export default BenefitsPage;
