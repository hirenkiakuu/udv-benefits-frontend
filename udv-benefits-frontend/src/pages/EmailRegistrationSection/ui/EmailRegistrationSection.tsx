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
        <Heading>Добро пожаловать в кафетерий льгот!</Heading>
        <Heading size="medium">
          Мы рады видеть вас здесь! <br></br> Создайте аккаунт, чтобы открыть
          доступ к выбору бенефитов.
        </Heading>
      </div>

      <EmailForm submitAction="store" buttonText="Продолжить регистрацию" />

      <div className={cls.helpLinks}>
        <NavLink to="/login">
          Уже есть аккаунт? <b>Войти</b>
        </NavLink>
        <NavLink to="/not-implemented">
          Возникла проблема? <b>Обратитесь к техподдержке</b>
        </NavLink>
      </div>
    </div>
  );
};

export default EmailRegistrationSection;