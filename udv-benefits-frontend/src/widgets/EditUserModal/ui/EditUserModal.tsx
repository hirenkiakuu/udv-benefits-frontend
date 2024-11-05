import Input from "shared/ui/Input/Input";
import cls from "./EditUserModal.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui";
import { User } from "entities/user.model";
import { ChangeEvent, useState } from "react";
import api from "shared/api/api";

interface EditUserModalProps {
  className?: string;
  onClose: () => void;
  currentUser: User;
}

function formatDate(dateString: string): string {
  if (!dateString) return;

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

const EditUserModal = ({
  className,
  onClose,
  currentUser,
}: EditUserModalProps) => {
  const [formData, setFormData] = useState({
    lastName: currentUser.lastName || "",
    firstName: currentUser.firstName || "",
    middleName: currentUser.middleName || "",
    birthDate: currentUser.birthDate || "",
    phone: currentUser.phone || "",
    position: currentUser.position || "hr",
    department: currentUser.department || "",
    hasChildren: currentUser.hasChildren || false,
    isAdmin: currentUser.isAdmin || false,
    workStartDate: currentUser.workStartDate || "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await api.patch(`/api/users/${currentUser.id}`, {
        ...formData,
        workStartDate: formatDate(formData.workStartDate),
      });

      if (res) {
        console.log(res);
        onClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classNames(cls.editUserModal, {}, [className])}>
      <form className={cls.editUserForm} onSubmit={handleSubmit}>
        <div className={cls.formInputRow}>
          <label htmlFor="lastName">Фамилия</label>
          <Input
            name="lastName"
            placeholder={currentUser.lastName}
            onChange={handleInputChange}
          />
        </div>

        <div className={cls.formInputRow}>
          <label htmlFor="firstName">Имя</label>
          <Input
            name="firstName"
            placeholder={currentUser.firstName}
            onChange={handleInputChange}
          />
        </div>

        <div className={cls.formInputRow}>
          <label htmlFor="middleName">Отчество</label>
          <Input
            name="middleName"
            placeholder={currentUser.middleName}
            onChange={handleInputChange}
          />
        </div>

        <div className={cls.formInputRow}>
          <label htmlFor="birthDate">Дата рождения</label>
          <Input
            name="birthDate"
            placeholder={currentUser.birthDate}
            onChange={handleInputChange}
          />
        </div>

        <div className={cls.formInputRow}>
          <label htmlFor="phone">Телефон</label>
          <Input
            name="phone"
            placeholder={currentUser.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className={cls.formInputRow}>
          <label htmlFor="position">Выберите должность</label>
          <select name="position" id="" onChange={handleSelectChange}>
            <option value="hr">hr</option>
            <option value="backend">backend</option>
            <option value="frontend">frontend</option>
            <option value="tester">tester</option>
            <option value="manager">manager</option>
          </select>
        </div>

        <div className={cls.formInputRow}>
          <label htmlFor="department">Отдел</label>
          <Input
            name="department"
            placeholder={currentUser.department || "Например, отдел разработки"}
            onChange={handleInputChange}
          />
        </div>

        <div className={cls.formInputRow}>
          <label htmlFor="department">Дата начала работы</label>
          <Input
            name="workStartDate"
            placeholder={formatDateToDot(formData.workStartDate)}
            onChange={handleInputChange}
          />
        </div>

        <div className={cls.formInputRow}>
          <div className={cls.inputCheckbox}>
            <label htmlFor="hasChildren">Есть дети</label>
            <input
              name="hasChildren"
              type="checkbox"
              checked={formData.hasChildren}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>

        <div className={cls.formInputRow}>
          <div className={cls.inputCheckbox}>
            <label htmlFor="isAdmin">Сотрудник является администратором</label>
            <input
              name="isAdmin"
              type="checkbox"
              checked={formData.isAdmin}
              onChange={handleCheckboxChange}
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
  );
};

export default EditUserModal;
