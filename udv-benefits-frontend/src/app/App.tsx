import { Outlet } from "react-router-dom";
import "./styles/index.scss";
import { Header } from "widgets/Header";

const App = () => {
  return (
    <>
      <div className="app">
        <Header />
        <div className={"content"}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
