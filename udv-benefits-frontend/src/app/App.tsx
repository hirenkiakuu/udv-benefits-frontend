import { Outlet } from "react-router-dom";
import "./styles/index.scss";
import BenefitCard from "feauters/BenefitCard";

const App = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <BenefitCard />
    </div>
  );
};

export default App;
