import Input from "shared/ui/Input/Input";
import cls from "./EditUserModal.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, Heading } from "shared/ui";
import { User } from "entities/user.model";
import { ChangeEvent, useState } from "react";
import api from "shared/api/api";
import { SubmitHandler, useForm } from "react-hook-form";

// interface UserData {
//   id: number;
//   firstName: string;
//   lastName: string;
//   middleName: string;
//   user: User; // Добавляем поле user
//   isVerified: boolean;
//   status: "approved" | "rejected" | "in_work"; // Adjust as per your needs
//   workExperience: {
//     months: string;
//     years: string;
//   };
//   email: string;
//   phone: string;
//   birthDate: string;
//   hasChildren: boolean;
//   position: string;
//   department: string;
//   isAdmin: boolean;
//   workStartDate: string;
//   workEndDate: string;
//   balance: number;
// }

interface EditUserModalProps {
  className?: string;
  onClose: () => void;
  currentUser: User;
  onUserUpdate: (updatedUser: User) => void;
}

function formatDate(dateString: string): string {
  if (!dateString) return null;

  const [day, month, year] = dateString.split(".");
  return `${year}-${month}-${day}`;
}

function formatDateToDot(dateString: string): string {
  if (!dateString) return "00.00.0000";
  if (dateString === "00.00.0000") return dateString;
  console.log(dateString);
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
}

type EmployeeFormData = {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  phone: string;
  position: string;
  department: string;
  hasChildren: boolean;
  isAdmin: boolean;
  workStartDate: string;
  legalEntity: string;
};

const EditUserModal = ({
  className,
  onClose,
  currentUser,
  onUserUpdate,
}: EditUserModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    defaultValues: {
      lastName: currentUser.lastName || "",
      firstName: currentUser.firstName || "",
      middleName: currentUser.middleName || "",
      birthDate: formatDateToDot(currentUser.birthDate) || "",
      workStartDate: formatDateToDot(currentUser.workStartDate) || "",
      legalEntity: currentUser.legalEntity || "",
      department: currentUser.department || "",
      position: currentUser.position || "",
      phone: currentUser.phone || "",
      isAdmin: currentUser.isAdmin || false,
      hasChildren: currentUser.hasChildren || false,
    },
  });

  const onSubmit: SubmitHandler<EmployeeFormData> = async (data) => {
    console.log(data);

    try {
      const res = await api.patch(`/api/users/${currentUser.id}`, {
        ...data,
        birthDate: data.birthDate
          ? formatDate(data.birthDate)
          : currentUser.birthDate,
        workStartDate: data.workStartDate
          ? formatDate(data.workStartDate)
          : currentUser.workStartDate,
      });

      if (res) {
        console.log(res);
        onClose();
        onUserUpdate(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={cls.modalOverlay}>
      <div className={classNames(cls.editUserModal, {}, [className])}>
        <form className={cls.editUserForm} onSubmit={handleSubmit(onSubmit)}>
          <Heading>Редактирование профиля сотрудника</Heading>
          <div className={cls.formInputRow}>
            <label htmlFor="lastName">Фамилия</label>
            <Input
              name="lastName"
              placeholder={currentUser.lastName || "Фамилия"}
              {...register("lastName")}
            />
          </div>

          <div className={cls.formInputRow}>
            <label htmlFor="firstName">Имя</label>
            <Input
              name="firstName"
              placeholder={currentUser.firstName || "Имя"}
              {...register("firstName")}
            />
          </div>

          <div className={cls.formInputRow}>
            <label htmlFor="middleName">Отчество</label>
            <Input
              name="middleName"
              placeholder={currentUser.middleName || "Отчество"}
              {...register("middleName")}
            />
          </div>

          <div className={cls.formInputRow}>
            <label htmlFor="birthDate">Дата рождения</label>
            <Input
              name="birthDate"
              placeholder={formatDateToDot(currentUser.birthDate)}
              {...register("birthDate")}
            />
          </div>

          <div className={cls.formInputRow}>
            <label htmlFor="phone">Телефон</label>
            <Input
              name="phone"
              placeholder={currentUser.phone || "+1 (555) 000-0000"}
              {...register("phone")}
            />
          </div>

          <div className={cls.formInputRow}>
            <label htmlFor="position">Выберите должность</label>
            <select name="position" id="" {...register("position")}>
              <option value="hr">hr</option>
              <option value="backend">backend-разработчик</option>
              <option value="frontend">frontend-разработчик</option>
              <option value="tester">тестировщик</option>
              <option value="manager">менеджер</option>
            </select>
          </div>

          <div className={cls.formInputRow}>
            <label htmlFor="department">Юридическое лицо</label>
            <Input
              name="legalEntity"
              placeholder={
                currentUser.legalEntity || "Например, ООО Сайберлимфа"
              }
              {...register("legalEntity")}
            />
          </div>

          <div className={cls.formInputRow}>
            <label htmlFor="department">Отдел</label>
            <Input
              name="department"
              placeholder={
                currentUser.department || "Например, отдел разработки"
              }
              {...register("department")}
            />
          </div>

          <div className={cls.formInputRow}>
            <label htmlFor="department">Дата начала работы</label>
            <Input
              name="workStartDate"
              placeholder={formatDateToDot(currentUser.workStartDate)}
              {...register("workStartDate")}
            />
          </div>

          <div className={cls.formInputRow}>
            <div className={cls.inputCheckbox}>
              <label htmlFor="hasChildren">Есть дети</label>
              <input
                name="hasChildren"
                type="checkbox"
                // checked={formData.hasChildren}
                {...register("hasChildren")}
              />
            </div>
          </div>

          <div className={cls.formInputRow}>
            <div className={cls.inputCheckbox}>
              <label htmlFor="isAdmin">
                Сотрудник является администратором
              </label>
              <input
                name="isAdmin"
                type="checkbox"
                // checked={formData.isAdmin}
                // onChange={handleCheckboxChange}
                {...register("isAdmin")}
              />
            </div>
          </div>

          <div className={cls.formButtons}>
            <Button size="large" onClick={onClose}>
              Отменить
            </Button>
            <Button type="submit" variant="primary" size="large">
              Редактировать
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
