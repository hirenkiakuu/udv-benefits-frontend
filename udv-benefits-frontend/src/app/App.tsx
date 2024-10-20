import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <h1>Hello world</h1>
      <Outlet />
    </>
  );
};

export default App;
