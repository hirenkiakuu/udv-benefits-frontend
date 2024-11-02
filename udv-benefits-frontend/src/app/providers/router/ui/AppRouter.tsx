import App from "app/App";
import BenefitsPage from "pages/BenefitsPage";
import EmailLoginSection from "pages/EmailLoginSection";
import EmailRegistrationSection from "pages/EmailRegistrationSection";
import EmployeeRegistrationSection from "pages/EmployeeRegistrationSection";
import RegistrationPage from "pages/RegistrationPage";
import LoginPage from "pages/LoginPage";
import RegistrationSuccessSection from "pages/RegistrationSuccessSection";
import RequireAuth from "app/providers/RequireAuth/ui/RequireAuth";

import { createBrowserRouter } from "react-router-dom";
import LoginSuccessSection from "pages/LoginSuccessSection";
import ConfirmAuthPage from "pages/ConfirmAuthPage";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <App />
      </RequireAuth>
    ),
    children: [
      {
        path: "benefits",
        element: <BenefitsPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegistrationPage />,
    children: [
      {
        element: <EmailRegistrationSection />,
        index: true,
      },
      {
        path: "details",
        element: <EmployeeRegistrationSection />,
      },
      {
        path: "success",
        element: <RegistrationSuccessSection />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    children: [
      {
        index: true,
        element: <EmailLoginSection />,
      },
      {
        path: "success",
        element: <LoginSuccessSection />,
      },
    ],
  },
  {
    path: "/auth-confirm",
    element: <ConfirmAuthPage />,
  },
]);

export default AppRouter;
