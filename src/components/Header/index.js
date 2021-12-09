import PropTypes from 'prop-types';
import './header.scss';

const Header = ({ amount, onAmountChange }) => (
  <header className="header">
    <h1 className="header__title">Converter</h1>
    <div className="header__input__container">
      <input
        className="header__input"
        placeholder="Saississez un montant en euros"
        type="number"
        min="0"
        max="10000"
        value={amount}
        onChange={onAmountChange}
      />
      <span className="header__input__legend">€</span>
    </div>
  </header>
);

Header.defaultProps = {
  amount: 1,
};

// si une prop n'est pas obligatoire (isRequired)
// il faut donner sa valeur par défaut dans les defaultProps (au dessus)
Header.propTypes = {
  amount: PropTypes.number,
  onAmountChange: PropTypes.func.isRequired,
};

export default Header;
