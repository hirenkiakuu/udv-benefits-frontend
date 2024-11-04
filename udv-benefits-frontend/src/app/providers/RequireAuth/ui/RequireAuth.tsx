import { Navigate } from "react-router-dom";
import { getUserData } from "../api/getUserData";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/providers/store/store";
import { userActions } from "app/providers/store/user.slice";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const accessToken = useSelector((s: RootState) => s.user.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(accessToken);
    const authorizeMe = async () => {
      try {
        const {
          id,
          email,
          firstName,
          middleName,
          lastName,
          birthDate,
          phone,
          position,
          hasChildren,
          isAdmin,
          balance,
        } = await getUserData();

        dispatch(
          userActions.setProfile({
            id,
            email,
            firstName,
            middleName,
            lastName,
            birthDate,
            phone,
            position,
            hasChildren,
            isAdmin,
            balance,
          })
        );
      } catch (err) {
        console.error(err);
      }
    };

    if (accessToken !== undefined) {
      authorizeMe();
    }
  }, []);

  if (!accessToken) return <Navigate to="/login" replace />;
  return children;
};

export default RequireAuth;
