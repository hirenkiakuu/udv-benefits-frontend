import cls from "./Header.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui";
import Logo from "shared/assets/images/Logo.png";
import Avatar from "shared/assets/images/Avatar.png";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  className?: string;
}

// сделать button navigation

export const Header = ({ className }: HeaderProps) => {
  return (
    <header className={classNames(cls.header, {}, [className])}>
      <img src={Logo} alt="Логотип" />
      <nav>
        <ul className={cls.navButtons}>
          <li>
            <NavLink to="/">
              <Button className={cls.navButton} variant="text" size="large">
                Обучение
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <Button className={cls.navButton} variant="text" size="large">
                Обучение
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <Button className={cls.navButton} variant="text" size="large">
                Обучение
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <Button className={cls.navButton} variant="text" size="large">
                Обучение
              </Button>
            </NavLink>
          </li>
          <img src={Avatar} alt="Изображение профиля" /> {/**будет дропдаун */}
        </ul>
      </nav>
    </header>
  );
};
