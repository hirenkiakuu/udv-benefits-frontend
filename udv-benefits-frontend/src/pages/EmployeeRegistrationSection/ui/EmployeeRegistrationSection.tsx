import { Heading } from "shared/ui";
import cls from "./EmployeeRegistrationSection.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import EmployeeDetailsForm from "features/EmployeeDetailsForm";

interface EmployeeRegistrationSectionProps {
  className?: string;
}

const EmployeeRegistrationSection = ({
  className,
}: EmployeeRegistrationSectionProps) => {
  return (
    <div
      className={classNames(cls.employeeRegistrationSection, {}, [className])}
    >
      <Heading className={cls.formTitle}>Регистрация сотрудника</Heading>
      <EmployeeDetailsForm />
    </div>
  );
};

export default EmployeeRegistrationSection;
