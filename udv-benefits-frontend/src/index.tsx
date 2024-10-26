import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppRouter from "app/providers/router";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={AppRouter} />
);
