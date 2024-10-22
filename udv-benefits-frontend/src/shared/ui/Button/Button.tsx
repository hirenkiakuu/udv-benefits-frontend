import { useState } from "react";

const Button = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <button onClick={() => setIsClicked((prevState) => !prevState)}>
      button is clicked: {isClicked.toString()}
    </button>
  );
};

export default Button;
