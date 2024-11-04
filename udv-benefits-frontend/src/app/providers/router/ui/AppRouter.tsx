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
import BenefitsByCategoryPage from "pages/BenefitsByCategoryPage";
import BenefitPage from "pages/BenefitPage";
import OrdersPage from "pages/OrdersPage";
import OrderPage from "pages/OrderPage";
import DashboardPage from "pages/DashboardPage";
import MyBenefitsPage from "pages/MyBenefitsPage";
import OrdersFromUsersPage from "pages/OrdersFromUsersPage";
import EmployeesPage from "pages/EmployeesPage";

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
      {
        path: "benefits/category/:id",
        element: <BenefitsByCategoryPage />,
      },
      {
        path: "benefits/:id",
        element: <BenefitPage />,
      },
      {
        path: "orders/",
        element: <OrdersPage />,
      },
      {
        path: "orders/:id",
        element: <OrderPage />,
      },
      {
        path: "hr-dashboard",
        element: <DashboardPage />,
        children: [
          {
            path: "my-benefits",
            element: <MyBenefitsPage />,
          },
          {
            path: "orders",
            element: <OrdersFromUsersPage />,
          },
          {
            path: "employees",
            element: <EmployeesPage />,
          },
        ],
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
