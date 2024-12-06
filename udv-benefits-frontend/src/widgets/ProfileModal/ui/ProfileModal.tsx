import { Button, Heading } from "shared/ui";
import cls from "./ProfileModal.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import Cross from "shared/assets/icons/cross.svg";
import Avatar from "shared/assets/images/Avatar.png";
import { RootState } from "app/providers/store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  formatDateToDot,
  formatYearsAndMonths,
} from "shared/lib/formatters/formatDate";
import Input from "shared/ui/Input/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import api from "shared/api/api";

interface ProfileModalProps {
  className?: string;
  onClose: () => void;
}

type UserFormData = {
  phone: string;
  image: File | null; // Тип для изображения, которое будет передаваться в FormData
  hasChildren: boolean;
};

const ProfileModal = ({ className, onClose }: ProfileModalProps) => {
  const {
    firstName,
    middleName,
    lastName,
    birthDate,
    email,
    legalEntity,
    phone,
    position,
    isAdmin,
    workExperience,
    department,
    id,
    hasChildren,
    profilePhoto,
  } = useSelector((s: RootState) => s.user.userProfile);

  const { register, handleSubmit, control } = useForm<UserFormData>({
    defaultValues: {
      hasChildren,
      phone,
      image: null, // по умолчанию изображения нет
    },
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      // 1. Обновляем данные пользователя
      const res = await api.patch(`/api/users/${id}`, {
        phone: data.phone,
        hasChildren: data.hasChildren,
      });

      if (res) {
        console.log("Profile updated successfully:", res);

        // 2. Отправляем фото, если оно изменилось
        if (data.image) {
          const pictureFormData = new FormData();
          pictureFormData.append("photo", data.image);

          const resImage = await api.patch(
            `/api/users/me/photo`,
            pictureFormData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          if (resImage) {
            console.log("Image updated successfully:", resImage);
          }
        }

        onClose(); // Закрываем модальное окно после успешной отправки
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <>
      <div className={cls.overlay}>
        <div className={classNames(cls.profileModal, {}, [className])}>
          <div className={cls.profileModalContainerInner}>
            <button className={cls.modalCloseButton} onClick={onClose}>
              <Cross />
            </button>
            <Heading>Личные данные</Heading>
            <div className={cls.profileHeader}>
              <img
                className={cls.profilePhoto}
                src={profilePhoto || Avatar}
                alt="Avatar"
              />
              <div>
                <p>
                  {lastName} {firstName} {middleName}
                </p>
                <p>{email}</p>
              </div>
            </div>

            <div className={cls.profileContent}>
              <div className={cls.profileInfo}>
                <div className={cls.infoRow}>
                  <p className={cls.infoProp}>Дата рождения</p>
                  <p className={cls.infoValue}>{formatDateToDot(birthDate)}</p>
                </div>
                <div className={cls.infoRow}>
                  <p className={cls.infoProp}>Стаж работы в UDV</p>
                  <p className={cls.infoValue}>
                    {formatYearsAndMonths(
                      workExperience.years,
                      workExperience.months
                    )}
                  </p>
                </div>
                <div className={cls.infoRow}>
                  <p className={cls.infoProp}>Юридическое лицо</p>
                  <p className={cls.infoValue}>{legalEntity}</p>
                </div>
                <div className={cls.infoRow}>
                  <p className={cls.infoProp}>Подразделение</p>
                  <p className={cls.infoValue}>{department}</p>
                </div>
                <div className={cls.infoRow}>
                  <p className={cls.infoProp}>Должность</p>
                  <p className={cls.infoValue}>{position}</p>
                </div>
                <div className={cls.infoRow}>
                  <p className={cls.infoProp}>Статус</p>
                  <p className={cls.infoValue}>
                    {isAdmin ? "Администратор" : "Сотрудник"}
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className={cls.profileForm}
              >
                <div className={cls.formInputRow}>
                  <label>Номер телефона</label>
                  <Input placeholder={phone} {...register("phone")} />
                </div>

                <div className={cls.formInputRowPicture}>
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
                    Изменить фотографию профиля
                  </label>
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className={cls.fileLoader}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file); // Обновляем состояние формы
                            setPreviewUrl(URL.createObjectURL(file)); // Отображаем превью
                          }
                        }}
                      />
                    )}
                  />
                </div>

                <div className={cls.formInputCheckbox}>
                  <label>Есть дети</label>
                  <input type="checkbox" {...register("hasChildren")} />
                </div>

                <div className={cls.actionButtons}>
                  <Button size="large" variant="primary" type="submit">
                    Сохранить
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
