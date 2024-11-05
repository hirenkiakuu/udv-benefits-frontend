import { useNavigate } from "react-router-dom";
import cls from "./EmployeeDetailsForm.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui";
import Input from "shared/ui/Input/Input";
import { useSelector } from "react-redux";
import { RootState } from "app/providers/store/store";
import { ChangeEvent, FormEvent, useState } from "react";
import api from "shared/api/api";

const formatDate = (date: string) => {
  const [day, month, year] = date.split(".");

  return `${year}-${month}-${day}`;
};

interface EmployeeDetailsFormProps {
  className?: string;
}

const EmployeeDetailsForm = ({ className }: EmployeeDetailsFormProps) => {
  const email = useSelector((s: RootState) => s.registration.email);
  const [formData, setFormData] = useState({
    email: email,
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    phone: "",
    hasChildren: false,
  });

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log(formatDate(formData.birth_date));

    try {
      const res = await api.post("/api/users", {
        ...formData,
        birthDate: formatDate(formData.birthDate),
      });

      if (res) {
        console.log(res);
        // alert("success");

        navigate("/register/success");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className={classNames(cls.employeeDetailsForm, {}, [className])}
      onSubmit={handleSubmit}
    >
      <div className={cls.formInputRow}>
        <div className={cls.formInput}>
          <label htmlFor="">Фамилия</label>
          <Input
            name="lastName"
            placeholder="Фамилия"
            onChange={handleInputChange}
          />
        </div>

        <div className={cls.formInput}>
          <label htmlFor="">Имя</label>
          <Input
            name="firstName"
            placeholder="Имя"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className={cls.formInputRow}>
        <div className={cls.formInput}>
          <label htmlFor="">Отчество</label>
          <Input
            name="middleName"
            placeholder="Отчество"
            onChange={handleInputChange}
          />
        </div>

        <div className={cls.formInput}>
          <label htmlFor="">Дата рождения</label>
          <Input
            name="birthDate"
            placeholder="00.00.0000"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className={cls.formInput}>
        <label htmlFor="">Номер телефона</label>
        <Input
          name="phone"
          placeholder="+7 (000) 000-00-00"
          onChange={handleInputChange}
        />
      </div>

      <label>
        <input
          name="hasChildren"
          type="checkbox"
          onChange={handleSelectChange}
        />
        Есть дети
      </label>

      <div className={cls.formButtons}>
        <Button
          onClick={() => navigate("/register")}
          variant="default"
          size="large"
        >
          Вернуться назад
        </Button>
        <Button type="submit" variant="primary" size="large">
          Продолжить
        </Button>
      </div>
    </form>
  );
};

export default EmployeeDetailsForm;
