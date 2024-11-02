import { Heading } from "shared/ui";
import cls from "./RegistrationSuccessSection.module.scss";
import { classNames } from "shared/lib/classNames/classNames";

interface RegistrationSuccessSectionProps {
  className?: string;
}

const RegistrationSuccessSection = ({
  className,
}: RegistrationSuccessSectionProps) => {
  return (
    <div
      className={classNames(cls.registrationSuccessSection, {}, [className])}
    >
      <Heading>Спасибо за регистрацию!</Heading>
      <p>
        Ваши данные успешно отправлены на проверку. Пожалуйста, подождите, пока
        администратор проверит вашу информацию.
      </p>
      <p>
        После успешной проверки на вашу электронную почту будет отправлено
        уведомление о доступе к сервису.
      </p>
    </div>
  );
};

export default RegistrationSuccessSection;
