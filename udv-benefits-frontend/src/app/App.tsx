import { Outlet } from "react-router-dom";
import "./styles/index.scss";
import Heading from "shared/ui/Heading/Heading";

const App = () => {
  return (
    <>
      <Heading size="medium">H1 Demibold</Heading>
      <Outlet />
    </>
  );
};

export default App;
