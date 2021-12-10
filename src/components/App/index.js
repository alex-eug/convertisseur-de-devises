/* eslint-disable arrow-body-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React from 'react';

import Header from 'src/components/Header';
import Currencies from 'src/components/Currencies';
import Result from 'src/components/Result';
import Toggler from 'src/components/Toggler';

import currenciesList from 'src/data/currencies';

import './app.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCurrenciesListOpen: true,
      baseAmount: 1,
      selectedCurrency: 'Canadian Dollar',
      searchValue: '',
    };

    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleBaseAmountChange = this.handleBaseAmountChange.bind(this);
  }

  componentDidMount() {
    document.title = `Conversion de euro vers ${this.state.selectedCurrency}`;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCurrency !== this.state.selectedCurrency) {
      document.title = `Conversion de euro vers ${this.state.selectedCurrency}`;
    }
  }

  handleToggleClick() {
    this.setState({
      // on inverse la valeur avec !
      isCurrenciesListOpen: !this.state.isCurrenciesListOpen,
    });
  }

  handleBaseAmountChange(event) {
    this.setState({
      baseAmount: Number(event.target.value),
    });
  }

  handleSearchChange(event) {
    this.setState({
      searchValue: event.target.value,
    });
  }

  handleCurrencyClick(newCurrency) {
    // on change la devise dans le state
    this.setState({
      selectedCurrency: newCurrency,
    });
  }

  getFilteredCurrencies() {
    if (this.state.searchValue === '') {
      return currenciesList;
    }

    const loweredSearch = this.state.searchValue.toLowerCase();

    const filteredCurrencies = currenciesList.filter((currency) => {
      const loweredCaseCurrency = currency.name.toLowerCase();

      return loweredCaseCurrency.includes(loweredSearch);
    });

    return filteredCurrencies;
  }

  computeResult() {
    const foundCurrency = currenciesList.find((currency) => {
      return currency.name === this.state.selectedCurrency;
    });

    const conversionRate = foundCurrency.rate;

    const result = conversionRate * this.state.baseAmount;

    return result;
  }

  render() {
    console.log('App -- render');

    return (
      <div className="app">
        <Header
          amount={this.state.baseAmount}
          onAmountChange={this.handleBaseAmountChange}
        />
        <Toggler
          isCurrenciesListOpen={this.state.isCurrenciesListOpen}
          onButtonClick={this.handleToggleClick}
        />
        {this.state.isCurrenciesListOpen && (
          <Currencies
            searchValue={this.state.searchValue}
            setSearchValue={this.handleSearchChange}
            currencies={this.getFilteredCurrencies()}
            onCurrencyClick={this.handleCurrencyClick}
          />
        )}
        <Result
          convertedAmount={this.computeResult()}
          selectedCurrency={this.state.selectedCurrency}
        />
      </div>
    );
  }
}

export default App;
