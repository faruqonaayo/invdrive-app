import PropTypes from "prop-types";

export default function Label({ labelFor, labelText }) {
  return (
    <label htmlFor={labelFor} className={`label`}>
      {labelText}
    </label>
  );
}

Label.propTypes = {
  labelFor: PropTypes.node,
  labelText: PropTypes.string,
};
