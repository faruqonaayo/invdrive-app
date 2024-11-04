import PropTypes from "prop-types";

export default function Button({
  buttonText,
  buttonType,
  className,
  isDisabled = false,
  onClickFunction = () => {},
}) {
  return (
    <button
      type={buttonType}
      className={`button ${className}`}
      onClick={onClickFunction}
      disabled={isDisabled}
    >
      {buttonText}
    </button>
  );
}

Button.propTypes = {
  buttonText: PropTypes.string,
  buttonType: PropTypes.string,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClickFunction: PropTypes.func,
};
