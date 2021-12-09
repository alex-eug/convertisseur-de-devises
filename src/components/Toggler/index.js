import PropTypes from 'prop-types';

const Toggler = ({ isCurrenciesListOpen, onButtonClick }) => (
  <button
  // si la liste est ouverte, je vais ajouter une classe : toggler--open
    className={isCurrenciesListOpen ? 'toggler toggler--open' : 'toggler'}
    type="button"
    onClick={onButtonClick}
  >
    =
  </button>
);

Toggler.propTypes = {
  isCurrenciesListOpen: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default Toggler;
