import EmailForm from "features/EmailForm";
import cls from "./EmailRegistrationSection.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Heading } from "shared/ui";
import { NavLink } from "react-router-dom";

interface EmailRegistrationSectionProps {
  className?: string;
}

const EmailRegistrationSection = ({
  className,
}: EmailRegistrationSectionProps) => {
  return (
    <div className={classNames(cls.emailRegistrationSection, {}, [className])}>
      <div className={cls.greeting}>
        <Heading size="medium">Добро пожаловать в кафетерий льгот!</Heading>
        <p>
          Мы рады видеть Вас! <br></br> Создайте аккаунт, чтобы открыть доступ к
          выбору бенефитов.
        </p>
      </div>

      <EmailForm submitAction="store" buttonText="Продолжить регистрацию" />

      <div className={cls.helpLinks}>
        <NavLink to="/login">
          Уже есть аккаунт? <b>Войти</b>
        </NavLink>
      </div>
    </div>
  );
};

export default EmailRegistrationSection;
