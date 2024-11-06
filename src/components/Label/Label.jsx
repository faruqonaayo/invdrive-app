import PropTypes from "prop-types";

export default function Label({ labelFor, labelText, style }) {
  return (
    <label htmlFor={labelFor} className={`label`} style={style}>
      {labelText}
    </label>
  );
}

Label.propTypes = {
  labelFor: PropTypes.node,
  labelText: PropTypes.string,
  style: PropTypes.object,
};
