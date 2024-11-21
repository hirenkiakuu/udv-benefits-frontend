import { Button } from "shared/ui";
import cls from "./EmailForm.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import Input from "shared/ui/Input/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/providers/store/store";
import { registrationActions } from "app/providers/store/registration.slice";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { emailSchema } from "../model/email-schema";
import { EmailFormData } from "../model/email-schema";
import { useEffect } from "react";

interface EmailFormProps {
  className?: string;
  submitAction: "store" | "request";
  buttonText: string;
}

const EmailForm = ({ className, submitAction, buttonText }: EmailFormProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((s: RootState) => s.registration.email);

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email,
    },
  });

  useEffect(() => {
    setValue("email", email);
  }, [email, setValue]);

  const onSubmit: SubmitHandler<EmailFormData> = async (data) => {
    if (submitAction === "store") {
      dispatch(registrationActions.setEmail(data.email));
      navigate("/register/details");
    } else if (submitAction === "request") {
      try {
        const res = await axios.post(
          `/api/auth/send-email?email=${data.email}`
        );

        if (res) {
          navigate("/login/success");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <form
      className={classNames(cls.emailForm, {}, [className])}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={cls.formInput}>
        <label htmlFor="">Электронная почта</label>
        <Input
          name="email"
          placeholder="hello@udv.io"
          {...register("email", {
            onChange: () => clearErrors("email"),
          })}
          danger={!!errors.email}
        />
        {errors.email && (
          <p className={cls.errorMessage}>{errors.email.message}</p>
        )}
      </div>
      <Button
        className={cls.formButton}
        type="submit"
        variant="primary"
        size="large"
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default EmailForm;
