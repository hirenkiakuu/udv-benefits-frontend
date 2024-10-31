import App from "app/App";
import BenefitsPage from "pages/BenefitsPage";
import LoginPage from "pages/login";
import { createBrowserRouter } from "react-router-dom";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/benefits",
        element: <BenefitsPage />,
      },
    ],
  },
]);

export default AppRouter;
