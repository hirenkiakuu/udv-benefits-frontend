import cls from "./Badge.module.scss";
import { classNames } from "shared/lib/classNames/classNames";

interface BadgeProps {
  className?: string;
  status: boolean | "in_work" | "approved" | "rejected";
}

const classMappings = {
  in_work: "pending",
  approved: "approved",
  rejected: "rejected",
  true: "approved",
  false: "pending",
};

const statusMappings = {
  in_work: "На рассмотрении",
  approved: "Одобрено",
  rejected: "Отклонено",
  true: "Действующий",
  false: "Ожидает подтверждения",
};

const Badge = ({ className, status }: BadgeProps) => {
  const statusKey = String(status) as keyof typeof classMappings;
  const statusClass = classMappings[statusKey];

  return (
    <div className={classNames(cls.badge, {}, [className, cls[statusClass]])}>
      <div className={classNames(cls.statusDot, {}, [cls[statusClass]])}></div>
      <p>{statusMappings[statusKey]}</p>
    </div>
  );
};

export default Badge;
