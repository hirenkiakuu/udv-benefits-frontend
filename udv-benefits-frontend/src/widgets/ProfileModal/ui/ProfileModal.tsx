import { Heading } from "shared/ui";
import cls from "./ProfileModal.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import Cross from "shared/assets/icons/cross.svg";
import Avatar from "shared/assets/images/Avatar.png";
import { RootState } from "app/providers/store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  formatDateToDot,
  formatYearsAndMonths,
} from "shared/lib/formatters/formatDate";

interface ProfileModalProps {
  className?: string;
  onClose: () => void;
}

const ProfileModal = ({ className, onClose }: ProfileModalProps) => {
  const {
    firstName,
    middleName,
    lastName,
    birthDate,
    email,
    // hasChildren,
    phone,
    position,
    isAdmin,
    workExperience,
  } = useSelector((s: RootState) => s.user.userProfile);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <div className={cls.overlay} onClick={onClose}></div>
      <div className={classNames(cls.profileModal, {}, [className])}>
        <div className={cls.profileModalNavigation}>
          <div className={cls.profileModalNavigationHeader}>
            <img src={Avatar} alt="" />
            <div className={cls.userInfo}>
              <p className={cls.name}>
                {firstName} {lastName}
              </p>
              <p className={cls.email}>{email}</p>
            </div>
          </div>
          <div className={cls.tab}>Личные данные</div>
        </div>
        {/* Модалка */}
        <div className={cls.profileModalInfo}>
          <Heading>Личные данные</Heading>
          <div className={cls.profileModalInfoInner}>
            <div className={cls.profileModalDataRow}>
              <div className={cls.profileModalDataCell}>
                <p>Фамилия</p>
                <p>{lastName}</p>
              </div>
              <div className={cls.profileModalDataCell}>
                <p>Имя</p>
                <p>{firstName}</p>
              </div>
            </div>

            <div className={cls.profileModalDataRow}>
              <div className={cls.profileModalDataCell}>
                <p>Отчество</p>
                <p>{middleName}</p>
              </div>
              <div className={cls.profileModalDataCell}>
                <p>Дата рождения</p>
                <p>{formatDateToDot(birthDate)}</p>
              </div>
            </div>

            <div className={cls.profileModalDataRow}>
              <div className={cls.profileModalDataCell}>
                <p>Стаж работы в UDV</p>
                <p>
                  {formatYearsAndMonths(
                    workExperience.years,
                    workExperience.months
                  )}
                </p>
              </div>
              <div className={cls.profileModalDataCell}>
                <p>Электронная почта</p>
                <p>{email}</p>
              </div>
            </div>

            <div className={cls.profileModalDataRow}>
              <div className={cls.profileModalDataCell}>
                <p>Должность</p>
                <p>{position || "не определена"}</p>
              </div>
              <div className={cls.profileModalDataCell}>
                <p>Статус</p>
                <p>{isAdmin ? "администратор" : "сотрудник"}</p>
              </div>
            </div>

            <div className={cls.profileModalDataRow}>
              <div className={cls.profileModalDataCell}>
                <p>Номер телефона</p>
                <p>{phone}</p>
              </div>
            </div>
          </div>
        </div>
        <button className={cls.modalCloseButton} onClick={onClose}>
          <Cross />
        </button>
      </div>
    </>
  );
};

export default ProfileModal;
