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
    const authorizeMe = async () => {
      try {
        const {
          email,
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          birth_date: birthDate,
          phone,
          position,
          has_children: hasChildren,
          is_admin: isAdmin,
          coins,
        } = await getUserData();

        dispatch(
          userActions.setProfile({
            email,
            firstName,
            middleName,
            lastName,
            birthDate,
            phone,
            position,
            hasChildren,
            isAdmin,
            coins,
          })
        );
      } catch (err) {
        console.error(err);
      }
    };

    if (accessToken) {
      authorizeMe();
    }
  }, []);

  if (!accessToken) return <Navigate to="/login" replace />;
  return children;
};

export default RequireAuth;
