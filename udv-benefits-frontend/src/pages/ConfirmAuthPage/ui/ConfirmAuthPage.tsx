import { useLocation, useNavigate } from "react-router-dom";
import cls from "./ConfirmAuthPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userActions } from "app/providers/store/user.slice";
import { loginWithTempToken } from "../api/login";

interface ConfirmAuthPageProps {
  className?: string;
}

const ConfirmAuthPage = ({ className }: ConfirmAuthPageProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tempToken = params.get("token");
    dispatch(userActions.setTempToken(tempToken));

    const login = async () => {
      try {
        const { accessToken, refreshToken } =
          await loginWithTempToken(tempToken);

        dispatch(userActions.setTokens({ accessToken, refreshToken }));

        navigate("/benefits");
      } catch (err) {
        console.error(err);
      }
    };

    login();
  }, []);

  return (
    <div className={classNames(cls.confirmAuthPage, {}, [className])}>
      <span className={cls.loader}></span>
    </div>
  );
};

export default ConfirmAuthPage;
