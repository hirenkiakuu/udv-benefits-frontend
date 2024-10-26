import { Outlet } from "react-router-dom";
import { classNames } from "../shared/lib/classNames/classNames";

const App = () => {
  return (
    <>
      <h1>Hello world</h1>
      <Outlet />
    </>
  );
};

export default App;
