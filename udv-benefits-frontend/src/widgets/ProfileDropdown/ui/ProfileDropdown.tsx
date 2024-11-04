import { useState } from "react";
import cls from "./ProfileDropdown.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import Avatar from "shared/assets/images/Avatar.png";
import { RootState } from "app/providers/store/store";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "app/providers/store/user.slice";
import { createPortal } from "react-dom";
import ProfileModal from "widgets/ProfileModal";

interface ProfileDropdownProps {
  className?: string;
}

const ProfileDropdown = ({ className }: ProfileDropdownProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { firstName, lastName, email, balance } = useSelector(
    (s: RootState) => s.user.userProfile
  );

  const handleOpenModal = () => {
    setIsVisible((prevState) => !prevState);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    dispatch(userActions.clearTokens());
  };

  return (
    <div className={classNames(cls.profileDropdown, {}, [className])}>
      <button
        className={cls.dropdownToggleButton}
        onClick={() => setIsVisible((prevState) => !prevState)}
      >
        <img src={Avatar} alt="Изображение профиля" />
      </button>

      {isVisible && (
        <div className={cls.profileDropdownMenu}>
          <div className={cls.profileDropdownMenuHeader}>
            {/*возможно не по бэму*/}
            <img
              src={Avatar}
              alt="Аватар пользователя"
              width="48px"
              height="48px"
            />

            <div className={cls.userInfo}>
              <p className={cls.name}>
                {firstName} {lastName}
              </p>
              <p className={cls.email}>{email}</p>
            </div>
          </div>

          <div className={cls.divider}></div>

          <button className={cls.viewProfileButton} onClick={handleOpenModal}>
            Просмотреть профиль
          </button>

          <div className={cls.balance}>
            <p>Баланс</p>
            <div className={cls.balanceLabel}>{balance} U</div>
          </div>

          <div className={cls.divider}></div>

          <button className={cls.logoutButton} onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        </div>
      )}

      {openModal &&
        createPortal(
          <ProfileModal onClose={handleCloseModal} />,
          document.getElementById("modal-root")
        )}
    </div>
  );
};

export default ProfileDropdown;
