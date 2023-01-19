import PropTypes from 'prop-types';

export const dataIngredientsPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

export const handleOpenModalPropTypes = PropTypes.func;

export const handleCloseModalPropTypes = PropTypes.func;

export const childrenPropTypes = PropTypes.element;
