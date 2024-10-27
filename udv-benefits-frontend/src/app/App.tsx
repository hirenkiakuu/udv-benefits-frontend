import { Outlet } from "react-router-dom";
import "./styles/index.scss";
import Heading from "shared/ui/Heading/Heading";
import Button from "shared/ui/Button/Button";

const App = () => {
  return (
    <>
      <Heading size="medium">H2 Demibold</Heading>
      <Heading size="large">H1 Demibold</Heading>
      <Outlet />
      <div
        style={{
          display: "flex",

          gap: "10px",
          alignItems: "center",
        }}
      >
        <Button variant="primary">Button</Button>
        <Button variant="primary" size="large">
          Button
        </Button>
        <Button variant="primary" size="large" disabled>
          Button
        </Button>
        <Button>Button</Button>
        <Button size="large">Button</Button>
        <Button size="large" disabled>
          Button
        </Button>
        <Button variant="text">Button</Button>
        <Button variant="text" size="large">
          Button
        </Button>
        <Button variant="text" size="large" disabled>
          Button
        </Button>
        <Button variant="link">Button</Button>
        <Button variant="link" size="large">
          Button
        </Button>
        <Button variant="link" size="large" disabled>
          Button
        </Button>
      </div>
    </>
  );
};

export default App;
