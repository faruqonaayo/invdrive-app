import { useState } from "react";

const selectedStyle = {
  backgroundColor: "#ebf6ff",
  color: "#000080",
  border: "2px solid #ffdab9",
};

export default function Day({ dayName, className, dispatch }) {
  const [isSelected, setIsSelected] = useState(false);

  function handleClick() {
    dispatch({ type: "day", payload: dayName });
    setIsSelected(!isSelected);
  }

  return (
    <li
      className={className}
      style={isSelected ? selectedStyle : null}
      onClick={handleClick}
    >
      {dayName}
    </li>
  );
}
