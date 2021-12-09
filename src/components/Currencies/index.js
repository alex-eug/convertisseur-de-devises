import PropTypes from 'prop-types';
import './currencies.scss';

const Currencies = ({
  searchValue, setSearchValue, currencies, onCurrencyClick,
}) => (
  <div className="currencies">
    <h2 className="currencies__title">Currencies</h2>
    <input
      value={searchValue}
      onChange={setSearchValue}
      className="currencies__input"
      placeholder="Recherchez une devise..."
    />
    <ul className="currencies__list">
      {
        currencies.map((currency) => (
          <li
            key={currency.name}
            className="currencies__list__item"
            onClick={() => {
              onCurrencyClick(currency.name);
            }}
          >
            {currency.name}
          </li>
        ))
      }
    </ul>
  </div>
);

Currencies.propTypes = {
  // un tableau de ...
  currencies: PropTypes.arrayOf(
    // formes (objets) de type....
    PropTypes.shape({
      // un nom et un taux de conversion
      name: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  onCurrencyClick: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
};

export default Currencies;
