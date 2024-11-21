import cls from "./RegistrationPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import LogoWithCompanyName from "shared/assets/images/LogoWithCompanyName.png";
import { Outlet } from "react-router-dom";

interface RegistrationPageProps {
  className?: string;
}

const RegistrationPage = ({ className }: RegistrationPageProps) => {
  return (
    <div className={classNames(cls.registrationPage, {}, [className])}>
      <img src={LogoWithCompanyName} alt="Логотип" className={cls.logo} />
      <section className={cls.sectionContainer}>
        <Outlet />
      </section>
      <footer className={cls.footer}>© 2024 UDV</footer>
    </div>
  );
};

export default RegistrationPage;
