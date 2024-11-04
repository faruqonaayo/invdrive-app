import PropTypes from "prop-types";

export default function Option({
  optionText,
  optionValue,
  className,
  onChangeFunction,
}) {
  function handleOptionChange(e) {
    onChangeFunction(e);
  }
  return (
    <option
      className={`option ${className}`}
      onChange={handleOptionChange}
      value={optionValue}
    >
      {optionText}
    </option>
  );
}

Option.propTypes = {
  optionText: PropTypes.string,
  optionValue: PropTypes.string,
  className: PropTypes.string,
  onChangeFunction: PropTypes.func,
};
