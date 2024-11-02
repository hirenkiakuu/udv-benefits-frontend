import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppRouter from "app/providers/router";
import { Provider } from "react-redux";
import { store } from "app/providers/store/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={AppRouter} />
  </Provider>
);
