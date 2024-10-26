import App from "app/App";
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
    ],
  },
]);

export default AppRouter;
