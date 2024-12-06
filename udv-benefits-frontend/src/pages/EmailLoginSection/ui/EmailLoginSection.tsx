import { Heading } from "shared/ui";
import cls from "./EmailLoginSection.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import EmailForm from "features/EmailForm";
import { NavLink } from "react-router-dom";

interface EmailLoginSectionProps {
  className?: string;
}

const EmailLoginSection = ({ className }: EmailLoginSectionProps) => {
  return (
    <div className={classNames(cls.emailLoginSection, {}, [className])}>
      <div className={cls.greeting}>
        <Heading size="medium">С возвращением в кафетерий льгот!</Heading>
        <p>Введите свою электронную почту, чтобы продолжить</p>
      </div>

      <EmailForm submitAction="request" buttonText="Войти" />

      <div className={cls.helpLinks}>
        <NavLink to="/register">
          Нет аккаунта? <b>Зарегистрироваться</b>
        </NavLink>
      </div>
    </div>
  );
};

export default EmailLoginSection;
