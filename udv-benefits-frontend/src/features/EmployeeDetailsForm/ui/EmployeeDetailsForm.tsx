import { useNavigate } from "react-router-dom";
import cls from "./EmployeeDetailsForm.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui";
import Input from "shared/ui/Input/Input";
import { useSelector } from "react-redux";
import { RootState } from "app/providers/store/store";
// import { ChangeEvent, FormEvent, useState } from "react";
import api from "shared/api/api";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  employeeDetailsSchema,
  EmployeeFormData,
} from "../model/employee-details-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "shared/lib/formatters/formatDate";

interface EmployeeDetailsFormProps {
  className?: string;
}

const EmployeeDetailsForm = ({ className }: EmployeeDetailsFormProps) => {
  const email = useSelector((s: RootState) => s.registration.email);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeDetailsSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<EmployeeFormData> = async (data) => {
    console.log(data);

    try {
      const res = await api.post("/api/users", {
        email,
        ...data,
        birthDate: formatDate(data.birthDate),
        workStartDate: formatDate(data.workStartDate),
      });

      if (res) {
        console.log(res);

        navigate("/register/success");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className={classNames(cls.employeeDetailsForm, {}, [className])}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={cls.formInputRow}>
        <div className={cls.formInput}>
          <label htmlFor="">Фамилия</label>
          <Input
            name="lastName"
            placeholder="Фамилия"
            {...register("lastName")}
            danger={!!errors.lastName}
          />
          {errors.lastName && (
            <p className="error-message">{errors.lastName.message}</p>
          )}
        </div>

        <div className={cls.formInput}>
          <label htmlFor="">Имя</label>
          <Input
            name="firstName"
            placeholder="Имя"
            {...register("firstName")}
            danger={!!errors.firstName}
          />
          {errors.firstName && (
            <p className="error-message">{errors.firstName.message}</p>
          )}
        </div>
      </div>

      <div className={cls.formInputRow}>
        <div className={cls.formInput}>
          <label htmlFor="">Отчество</label>
          <Input
            name="middleName"
            placeholder="Отчество"
            {...register("middleName")}
          />
        </div>

        <div className={cls.formInput}>
          <label htmlFor="">Дата рождения</label>
          <Input
            name="birthDate"
            placeholder="00.00.0000"
            {...register("birthDate")}
            danger={!!errors.birthDate}
          />
          {errors.birthDate && (
            <p className="error-message">{errors.birthDate.message}</p>
          )}
        </div>
      </div>

      <div className={cls.formInputRow}>
        <div className={cls.formInput}>
          <label htmlFor="">Дата начала работы в компании</label>
          <Input
            name="workStartDate"
            placeholder="00.00.0000"
            {...register("workStartDate")}
          />
        </div>

        <div className={cls.formInput}>
          <label htmlFor="">Юридическое лицо</label>
          <Input
            name="ЮрЛицо"
            placeholder="ООО Сайберлимфа"
            {...register("legalEntity")}
          />
        </div>
      </div>

      <div className={cls.formInputRow}>
        <div className={cls.formInput}>
          <label htmlFor="">Подразделение</label>
          <Input
            name="department"
            placeholder="Web"
            {...register("department")}
          />
        </div>

        <div className={cls.formInput}>
          <label htmlFor="">Должность</label>
          <Input
            name="position"
            placeholder="Дизайнер"
            {...register("position")}
          />
        </div>
      </div>

      <div className={cls.formInput}>
        <label htmlFor="">Номер телефона</label>
        <Input
          name="phone"
          placeholder="+7 (000) 000-00-00"
          {...register("phone")}
          danger={!!errors.phone}
        />
        {errors.phone && (
          <p className="error-message">{errors.phone.message}</p>
        )}
      </div>

      <label>
        <input
          name="hasChildren"
          type="checkbox"
          {...register("hasChildren")}
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
