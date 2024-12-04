import cls from "./UserBalanceHeader.module.scss";
import { RootState } from "app/providers/store/store";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { Heading } from "shared/ui";

interface UserBalanceHeaderProps {
  className?: string;
}

const UserBalanceHeader = ({ className }: UserBalanceHeaderProps) => {
  const { balance } = useSelector((s: RootState) => s.user.userProfile);

  return (
    <div className={classNames(cls.userBalanceHeader, {}, [className])}>
      <Heading>
        Ваш баланс <span className={cls.balance}>{balance} U-points</span>
      </Heading>
    </div>
  );
};

export default UserBalanceHeader;
