import PropTypes from "prop-types";

export default function Container({ children, className }) {
  return <div className={`container ${className}`}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
