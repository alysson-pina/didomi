import PropTypes from "prop-types";

const userPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  consents: PropTypes.array.isRequired,
});

export {
  userPropTypes,
};
