import { Button, Heading } from "shared/ui";
import cls from "./PurchaseSuccessModal.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { NavLink } from "react-router-dom";

interface PurchaseSuccessModalProps {
  onClose: () => void;
  className?: string;
}

const PurchaseSuccessModal = ({
  onClose,
  className,
}: PurchaseSuccessModalProps) => {
  return (
    <div className={cls.modalOverlay}>
      <div className={classNames(cls.purchaseSuccessModal, {}, [className])}>
        <Heading size="medium">Бенефит приобретен!</Heading>
        <p>Вы можете просмотреть статус вашей заявки во вкладке «Заявки»</p>
        <div className={cls.actionButtons}>
          <Button onClick={onClose} variant="default" size="large">
            Продолжить покупки
          </Button>
          <NavLink to={"/orders"}>
            <Button variant="primary" size="large">
              Перейти к заявкам
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessModal;
