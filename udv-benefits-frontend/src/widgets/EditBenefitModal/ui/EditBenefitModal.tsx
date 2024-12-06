import { Button, Heading } from "shared/ui";
import cls from "./EditBenefitModal.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import Input from "shared/ui/Input/Input";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import api from "shared/api/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { BenefitFormData } from "../model/BenefitFormSchema";
import { useEffect, useState } from "react";
// import { Benefit } from "entities/benefit.model";

export type BenefitFormData = {
  title: string;
  provider: string;
  description: string;
  price: number;
  requiredExperience: string;
  childsRequired: boolean;
  categoryId: number;
  isActive: boolean;
  instructions: string;
  period: string;
  isCancellable: boolean;
  image: File;
  options: {
    title: string;
    description: string;
    requiredExperience: string;
  }[];
};

interface EditBenefitModalProps {
  className?: string;
  editableBenefitId: number;
  onClose: () => void;
}

const EditBenefitModal = ({
  className,
  editableBenefitId,
  onClose,
}: EditBenefitModalProps) => {
  const { register, handleSubmit, control, watch, reset } =
    useForm<BenefitFormData>({
      defaultValues: {
        title: "",
        provider: "",
        description: "",
        price: undefined,
        requiredExperience: "",
        childsRequired: false,
        categoryId: null,
        period: "",
        isCancellable: false,
        // enableOptions: false,
        options: [],
        instructions: "",
      },
    });

  const isOptionsEnabled = watch("enableOptions" as keyof BenefitFormData);
  //   const options = watch("options");

  const { fields } = useFieldArray({
    control,
    name: "options", // Массив для вариантов льгот
  });

  //   const [benefit, setBenefit] = useState<Benefit>();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const getBenefit = async () => {
      try {
        const res = await api.get(`api/benefits/${editableBenefitId}`);

        if (res) {
          const { data } = res;
          //   setBenefit(data);

          reset({
            title: data.title,
            provider: data.provider,
            description: data.description,
            price: data.price,
            requiredExperience: data.requiredExperience,
            childsRequired: data.childsRequired,
            categoryId: data.categoryId,
            period: data.content?.period,
            isCancellable: data.content?.isCancellable,
            // enableOptions: data.options?.length > 0,
            options: data.options || [],
            instructions: data.content?.instructions || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    getBenefit();
  }, []);

  const onSubmit = async (data: BenefitFormData) => {
    console.log(data);

    // console.log(data.options);

    // const dataToSend = {
    //   title: data.title,
    //   provider: data.provider,
    //   description: data.description,
    //   price: data.price,
    //   requiredExperience: data.requiredExperience || null,
    //   childsRequired: data.childsRequired,
    //   categoryId: data.categoryId,
    //   isActive: true,
    //   content: {
    //     instructions: data.instructions || null,
    //     period: data.period,
    //     isCancellable: data.isCancellable,
    //   },
    //   options: data.options,
    // };

    // console.log(dataToSend);

    try {
      // Отправка текстовых данных на создание льготы
      const { data: respData } = await api.patch(
        `/api/benefits/${editableBenefitId}`,
        data
      );

      console.log(respData); // Ответ с информацией о созданной льготе
      const { id } = respData; // Получаем ID созданного бенефита
      console.log(id);

      if (data.image instanceof File) {
        const pictureFormData = new FormData();
        pictureFormData.append("picture", data.image);

        const res = await api.put(
          `/api/benefits/${id}/picture`,
          pictureFormData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (res) {
          onClose();
        }
      } else {
        onClose();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={cls.modalOverlay}>
      <div className={classNames(cls.createBenefitModal, {}, [className])}>
        <Heading>Редактирование льготы</Heading>
        <form
          className={cls.createBenefitForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={cls.formInputRow}>
            {previewUrl && (
              <div className={cls.imagePreview}>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className={cls.previewImage}
                />
              </div>
            )}
            <label className={cls.fileLoaderLabel} htmlFor="image">
              Загрузить изображение льготы
            </label>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <input
                  className={cls.fileLoader}
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file); // Обновляем значение через field.onChange
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }}
                />
              )}
            />
          </div>

          <div className={cls.formInputRow}>
            <label htmlFor="title">Наименование</label>
            <Input
              {...register("title")}
              placeholder="Введите название льготы"
            />
          </div>

          <div className={cls.formInputRow}>
            <label htmlFor="provider">Компания-поставщик услуги</label>
            <Input
              {...register("provider")}
              placeholder="Введите название компании"
            />
          </div>

          <div className={cls.formInputRow}>
            <label htmlFor="price">Стоимость</label>
            <Input
              {...register("price", {
                valueAsNumber: true,
                min: { value: 1, message: "Стоимость должна быть больше 0" },
              })}
              placeholder="Укажите стоимость в U-points"
            />
          </div>

          <div className={cls.formInputRow}>
            <label htmlFor="description">Описание</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  {...field}
                  placeholder="Введите описание льготы"
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      ["link"],
                      [{ align: [] }],
                    ],
                  }}
                />
              )}
            />
          </div>

          <div className={cls.formInputRow}>
            <label htmlFor="instructions">Инструкция по активации</label>
            <Controller
              name="instructions"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  {...field}
                  placeholder="Введите описание льготы"
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      ["link"],
                      [{ align: [] }],
                    ],
                  }}
                />
              )}
            />
          </div>

          <div className={cls.formInputRow}>
            <label htmlFor="categoryId">Выберите категорию льготы</label>
            <select {...register("categoryId")}>
              <option value="">Выберите категорию</option>
              <option value="1">Здоровье</option>
              <option value="2">Образование</option>
              <option value="3">Спорт</option>
              <option value="4">Перемещение</option>
              <option value="5">Питание</option>
              <option value="6">Подарочные карты</option>
            </select>
          </div>

          <div className={cls.formInputRow}>
            <label htmlFor="period">Время действия льготы</label>
            <select {...register("period")}>
              <option value="one_month">1 месяц</option>
              <option value="three_months">3 месяца</option>
              <option value="one_year">1 год</option>
            </select>
          </div>

          <div className={cls.formInputRow}>
            <label htmlFor="period">
              Необходимый для получения льготы стаж
            </label>
            <select {...register("requiredExperience")}>
              <option value="">Не требуется</option>
              <option value="one_month">1 месяц</option>
              <option value="three_months">3 месяца</option>
              <option value="six_months">6 месяцев</option>
              <option value="nine_months">9 месяцев</option>
              <option value="one_year">1 год</option>
              <option value="two_years">2 года</option>
              <option value="three_years">3 года</option>
              <option value="four_years">4 года</option>
              <option value="five_years">5 лет</option>
            </select>
          </div>

          <div className={cls.formInputRow}>
            <div className={cls.inputCheckbox}>
              <label htmlFor="childsRequired">Необходимо наличие детей</label>
              <input type="checkbox" {...register("childsRequired")} />
            </div>
          </div>

          <div className={cls.formInputRow}>
            <div className={cls.inputCheckbox}>
              <label htmlFor="isCancellable">Отменяемая льгота</label>
              <input type="checkbox" {...register("isCancellable")} />
            </div>
          </div>

          {/* <div className={cls.formInputRow}>
          <div className={cls.inputCheckbox}>
            <label htmlFor="">Несколько вариантов</label>
            <input
              type="checkbox"
              {...register("enableOptions" as keyof BenefitFormData)}
            />
          </div>
        </div> */}

          {isOptionsEnabled && <div className={cls.divider}></div>}

          <div className={cls.optionsSection}>
            {fields.map((field, index) => (
              <div key={field.id} className={cls.option}>
                <Heading size="medium" className={cls.optionHeading}>
                  Вариант {index + 1}
                </Heading>
                <div className={cls.formInputRow}>
                  <label htmlFor={`options.${index}.title`}>
                    Название варианта
                  </label>
                  <Input
                    {...register(`options.${index}.title`)}
                    placeholder="Введите название варианта"
                  />
                </div>

                <div className={cls.formInputRow}>
                  <label htmlFor={`options.${index}.description`}>
                    Описание варианта
                  </label>
                  <Controller
                    name={`options.${index}.description`}
                    control={control}
                    render={({ field }) => (
                      <ReactQuill
                        {...field}
                        placeholder="Введите описание варианта"
                        modules={{
                          toolbar: [
                            [{ header: "1" }, { header: "2" }],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["bold", "italic", "underline"],
                            ["link"],
                            [{ align: [] }],
                          ],
                        }}
                      />
                    )}
                  />
                </div>

                <div className={cls.formInputRow}>
                  <label htmlFor={`options.${index}.requiredExperience`}>
                    Необходимый стаж
                  </label>
                  <select {...register(`options.${index}.requiredExperience`)}>
                    <option value="">Не требуется</option>
                    <option value="one_month">1 месяц</option>
                    <option value="three_months">3 месяца</option>
                    <option value="six_months">6 месяцев</option>
                    <option value="one_year">1 год</option>
                  </select>
                </div>

                {/* <Button
                  size="small"
                  onClick={() => {
                    remove(index);
                    setValue(
                      "options",
                      fields.filter((_, i) => i !== index) // Убираем вариант из состояния
                    );
                  }}
                  variant="danger"
                >
                  Удалить вариант
                </Button> */}

                <div
                  className={cls.divider}
                  style={{ marginTop: "24px" }}
                ></div>
              </div>
            ))}

            {/* <Button
              size="small"
              type="button"
              variant="primary"
              style={{ marginTop: "40px" }}
              onClick={() =>
                append({
                  title: "",
                  description: "",
                  requiredExperience: "",
                })
              }
            >
              Добавить вариант
            </Button> */}
          </div>

          <div className={cls.formButtons}>
            <Button size="large" onClick={onClose}>
              Отменить
            </Button>
            <Button variant="primary" size="large" type="submit">
              Редактировать
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBenefitModal;
