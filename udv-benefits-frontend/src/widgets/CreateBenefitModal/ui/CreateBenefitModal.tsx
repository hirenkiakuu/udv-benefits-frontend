import { Button, Heading } from "shared/ui";
import cls from "./CreateBenefitModal.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import Input from "shared/ui/Input/Input";
import api from "shared/api/api";
import { ChangeEvent, FormEvent, useState } from "react";

interface CreateBenefitModalProps {
  className?: string;
  onClose: () => void;
}

const CreateBenefitModal = ({
  className,
  onClose,
}: CreateBenefitModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    period: "one_year",
    instructions: "",
    categoryId: 0,
    isCancellable: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
    try {
      const res = await api.post("/api/benefits", formData);

      if (res) {
        const { data } = res;

        console.log(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnCloseClick = () => {
    onClose();
  };

  return (
    <div className={classNames(cls.createBenefitModal, {}, [className])}>
      <Heading>Создание льготы</Heading>
      <form className={cls.createBenefitForm} onSubmit={handleSubmit}>
        <div className={cls.formInputRow}>
          <label htmlFor="">Название</label>
          <Input
            name="title"
            placeholder="Введите название льготы"
            onChange={handleInputChange}
          />
        </div>

        <div className={cls.formInputRow}>
          <label htmlFor="">Описание</label>
          <Input
            name="description"
            placeholder="Введите описание"
            onChange={handleInputChange}
          />
        </div>

        <div className={cls.formInputRow}>
          <label htmlFor="">Стоимость</label>
          <Input
            name="price"
            placeholder="Укажите стоимость в U-points"
            onChange={handleInputChange}
          />
        </div>

        <div className={cls.formInputRow}>
          <label htmlFor="">Добавьте инструкцию по активации</label>
          <Input
            name="instructions"
            placeholder="Чтобы активировать бенефит, вам необходимо..."
            onChange={handleInputChange}
          />
        </div>

        <div className={cls.formInputRow}>
          <label htmlFor="">Выберите категорию льготы</label>
          <select name="categoryId" id="" onChange={handleSelectChange}>
            <option value="1">Здоровье</option>
            <option value="2">Образование</option>
            <option value="3">Спорт</option>
            <option value="4">Перемещение</option>
            <option value="5">Питание</option>
            <option value="6">Подарочные карты</option>
          </select>
        </div>

        <div className={cls.formInputRow}>
          <label htmlFor="">Время действия льготы</label>
          <select name="period" id="" onChange={handleSelectChange}>
            <option value="one_month">1 месяц</option>
            <option value="three_months">3 месяца</option>
            <option value="one_year">один год</option>
          </select>
        </div>

        <div className={cls.formInputRow}>
          <label htmlFor="">Отменяемая льгота</label>
          <input
            name="isCancellable"
            type="checkbox"
            onChange={handleCheckboxChange}
          />
        </div>

        <div className={cls.formButtons}>
          <Button size="large" onClick={handleOnCloseClick}>
            Отменить
          </Button>
          <Button variant="primary" size="large">
            Создать
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBenefitModal;
