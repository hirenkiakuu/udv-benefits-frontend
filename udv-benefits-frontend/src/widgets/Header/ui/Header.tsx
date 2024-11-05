import cls from "./Header.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui";
import Logo from "shared/assets/images/Logo.png";
import ProfileDropdown from "widgets/ProfileDropdown/ui/ProfileDropdown";
import { NavLink, useLocation } from "react-router-dom";
// import { RootState } from "app/providers/store/store";
// import { useSelector } from "react-redux";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  // const { isAdmin } = useSelector((s: RootState) => s.user.userProfile);
  const isAdmin = true; // временно

  const location = useLocation();
  const isAdminActive = location.pathname.startsWith("/hr-dashboard");

  return (
    <header className={classNames(cls.header, {}, [className])}>
      <img src={Logo} alt="Логотип" />
      <nav>
        <ul className={cls.navButtons}>
          {isAdmin && (
            <li>
              <NavLink
                className={isAdminActive ? cls.active : ""}
                to="/hr-dashboard/my-benefits"
                end={false}
              >
                <Button className={cls.navButton} variant="text" size="large">
                  Администрирование
                </Button>
              </NavLink>
            </li>
          )}
          {/* <li>
            <NavLink
              className={({ isActive }) => (isActive ? cls.active : "")}
              to="/tutorial"
            >
              <Button className={cls.navButton} variant="text" size="large">
                Обучение
              </Button>
            </NavLink>
          </li> */}
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? cls.active : "")}
              to="/benefits"
            >
              <Button className={cls.navButton} variant="text" size="large">
                Главная
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? cls.active : "")}
              to="/orders"
            >
              <Button className={cls.navButton} variant="text" size="large">
                Заявки
              </Button>
            </NavLink>
          </li>
          {/* <img src={Avatar} alt="Изображение профиля" />  */}
          <ProfileDropdown />
        </ul>
      </nav>
    </header>
  );
};
