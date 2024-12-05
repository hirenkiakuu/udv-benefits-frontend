import cls from "./BenefitsPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import BenefitsExplorer from "features/BenefitsExplorer";
import UserBalanceHeader from "features/UserBalanceHeader";

interface BenefitsPageProps {
  className?: string;
}

const BenefitsPage = ({ className }: BenefitsPageProps) => {
  return (
    <>
      <div className={classNames(cls.benefitsPage, {}, [className])}>
        <UserBalanceHeader />
        <BenefitsExplorer />
      </div>
    </>
  );
};

export default BenefitsPage;
