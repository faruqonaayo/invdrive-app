import PropTypes from "prop-types";

export default function Input({
  inputType,
  inputName,
  inputPlaceholder,
  inputValue,
  className,
  onChangeFunction,
}) {
  return (
    <input
      type={inputType}
      name={inputName}
      placeholder={inputPlaceholder}
      value={inputValue}
      className={className}
      onChange={(e) => onChangeFunction(e)}
    />
  );
}

Input.propTypes = {
  inputType: PropTypes.string,
  inputName: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputValue: PropTypes.string,
  className: PropTypes.string,
  onChangeFunction: PropTypes.func,
};
