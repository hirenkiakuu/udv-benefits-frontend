import cls from "./LoginPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import Logo from "shared/assets/images/Logo.png";
import { Outlet } from "react-router-dom";

interface LoginPageProps {
  className?: string;
}

const LoginPage = ({ className }: LoginPageProps) => {
  return (
    <div className={classNames(cls.loginPage, {}, [className])}>
      <img src={Logo} alt="Логотип" className={cls.logo} />
      <section className={cls.sectionContainer}>
        <Outlet />
      </section>
      <footer className={cls.footer}>© 2024 UDV</footer>
    </div>
  );
};

export default LoginPage;
