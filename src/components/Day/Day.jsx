import { useState } from "react";

const selectedStyle = {
  color : "#ef8354",
  border: "2px solid #ef8354",
  backgroundColor: "#cbd3e2",
};

export default function Day({ dayName, dayInt, className, dispatch }) {
  const [isSelected, setIsSelected] = useState(false);

  function handleClick() {
    dispatch({ type: "day", payload: dayInt });
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
