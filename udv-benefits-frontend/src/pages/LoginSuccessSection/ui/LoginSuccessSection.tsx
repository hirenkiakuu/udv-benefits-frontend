import { Heading } from "shared/ui";
import cls from "./LoginSuccessSection.module.scss";
import { classNames } from "shared/lib/classNames/classNames";

interface LoginSuccessSectionProps {
  className?: string;
}

const LoginSuccessSection = ({ className }: LoginSuccessSectionProps) => {
  return (
    <div className={classNames(cls.loginSuccessSection, {}, [className])}>
      <Heading>Доступ к сервису</Heading>
      <p>
        Ссылка для доступа к сервису была отправлена на вашу электронную почту.
        Пожалуйста, проверьте свой почтовый ящик и следуйте инструкциям в
        письме, чтобы получить доступ.
      </p>
      <p>
        Если вы не получили письмо, проверьте папку &quot;Спам&quot; или
        &quot;Нежелательная почта&quot;.
      </p>
    </div>
  );
};

export default LoginSuccessSection;
