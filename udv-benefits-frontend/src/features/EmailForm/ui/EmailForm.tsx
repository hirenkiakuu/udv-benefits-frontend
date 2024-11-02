import { Button } from "shared/ui";
import cls from "./EmailForm.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import Input from "shared/ui/Input/Input";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/providers/store/store";
import { registrationActions } from "app/providers/store/registration.slice";
import axios from "axios";

interface EmailFormProps {
  className?: string;
  submitAction: "store" | "request";
  buttonText: string;
}

const EmailForm = ({ className, submitAction, buttonText }: EmailFormProps) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitAction === "store") {
      dispatch(registrationActions.setEmail(email));
      navigate("/register/details");
    } else if (submitAction === "request") {
      try {
        const res = await axios.post(`/api/auth/send-email?email=${email}`);

        if (res) {
          alert("Login совершен");
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
      onSubmit={handleSubmit}
    >
      <div className={cls.formInput}>
        <label htmlFor="">Электронная почта</label>
        <Input
          name="email"
          placeholder="hello@udv.io"
          onChange={handleInputChange}
        />
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
