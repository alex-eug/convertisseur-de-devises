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
    // pour changer une valeur dans le state
    // on doit utiliser setState
    // on n 'a pas le droit de modifier directement la valeur
    // a travers this.state
    this.setState({
      // on inverse la valeur avec !
      isCurrenciesListOpen: !this.state.isCurrenciesListOpen,
    });
  }

  handleBaseAmountChange(event) {
    // ici, je vais changer le montant de base, en fonction
    // de la saisie dans le champ controlé
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
    // objectif : filtrer les devises, selon la valeur de this.state.searchValue

    // si pas de recherche, on renvoie la liste telle quelle
    if (this.state.searchValue === '') {
      return currenciesList;
    }
    // sinon, c'est parti pour le filtrage :)

    // on met la recherche en minuscule pour ignorer la case
    const loweredSearch = this.state.searchValue.toLowerCase();

    const filteredCurrencies = currenciesList.filter((currency) => {
      // on met la devise en minuscule pour ignorer la casse
      const loweredCaseCurrency = currency.name.toLowerCase();

      // on regarde si le nom de la devise en minuscule contient la recherche en minuscule aussi
      return loweredCaseCurrency.includes(loweredSearch);
    });

    // enfin, on renvoie la liste filtrée
    return filteredCurrencies;
  }

  computeResult() {
    // il faut qu'on trouve le taux de conversion
    // qui correspond a la devise selectionnée dans selectedCurrency
    // une fois que l'on a ce taux, on va le multiplier par le montant a convertir (baseAmount)

    // et ainsi, on obtiendra le montant converti, que l'on pourra renvoyer

    // 1er probleme => trouver le bon taux
    // find prend en parametre un callback
    const foundCurrency = currenciesList.find((currency) => {
      // dans le callback, je dois renvoyer true pour dire que je veux garder cet élément
      // ok mais je veux garder quel element ?
      // celui qui a le même nom que this.state.selectedCurrency
      return currency.name === this.state.selectedCurrency;
    });

    const conversionRate = foundCurrency.rate;
    // 2eme probleme => faire le calcul
    const result = conversionRate * this.state.baseAmount;

    // on renvoie
    return result;
  }

  // dans la classe, on met une méthode render
  render() {
    console.log('App -- render');
    // dedans, on va juste retourner notre JSX, comme on faisait dans la fonction avant
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

// ca change rien a l'export. juste on exporte une classe au lieu d'une fonction
export default App;
