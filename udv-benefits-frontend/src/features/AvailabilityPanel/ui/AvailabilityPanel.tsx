import cls from "./AvailabilityPanel.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui";

interface AvailabilityPanelProps {
  className?: string;
  currentBenefitsAvailability: string;
  onAvailabilityChange: (currentBenefitsAvailability: string) => void;
}

const AvailabilityPanel = ({
  className,
  currentBenefitsAvailability,
  onAvailabilityChange,
}: AvailabilityPanelProps) => {
  return (
    <div className={classNames(cls.availabilityPanel, {}, [className])}>
      <div className={cls.availabilityButtons}>
        <Button
          variant="text"
          size="large"
          isActive={currentBenefitsAvailability === "available"}
          onClick={() => onAvailabilityChange("available")}
        >
          Доступные льготы
        </Button>
        <Button
          variant="text"
          size="large"
          isActive={currentBenefitsAvailability === "active"}
          onClick={() => onAvailabilityChange("active")}
        >
          Приобретенные льготы
        </Button>
        {/* <Button
          variant="text"
          size="large"
          isActive={currentBenefitsAvailability === "unavailable"}
          onClick={() => onAvailabilityChange("unavailable")}
        >
          Недоступные льготы
        </Button> */}
      </div>
    </div>
  );
};

export default AvailabilityPanel;
