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

// la classe App (composant) hérite de React.Component
// et du coup cette fois ci, on n'échappera pas a l'import de React
// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  // le constructeur est appelé a la creation de la classe (donc du composant App)
  // ce constructeur prend en parametre des props
  constructor(props) {
    // le constructeur "remonte" les props au parent
    // c'est a dire React.Component
    super(props);

    // ici, on va déclarer notre état
    // notre état est un objet
    // dans lequel on va définir des clés/valeurs
    // ici, on définit les valeurs initiales du state
    this.state = {
      isCurrenciesListOpen: true,
      baseAmount: 1,
      selectedCurrency: 'Canadian Dollar',
      searchValue: '',
    };

    // bind permet qu'une fonction "parte" avec son contexte
    // c'est a dire que si elle se trouve dans un état "détaché"
    // par exemple si on la donne a un onClick
    // elle saura quand même retrouver son contexte
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleBaseAmountChange = this.handleBaseAmountChange.bind(this);
  }

  // "mon composant a été monté"
  // "mon composant a été inséré dans le DOM"
  // après le premier rendu quoi
  componentDidMount() {
    document.title = `Conversion de euro vers ${this.state.selectedCurrency}`;
  }

  // "mon composant a été mis a jour"
  // "un nouveau rendu a eu lieu"
  // mais pas le rendu initial du coup !
  // didUpdate prend en param (optionnels) les anciennes props, et l'ancien state
  componentDidUpdate(prevProps, prevState) {
    // ici, après chaque nouveau rendu, nous allons modifier le titre de la page
    // en fonction de la devise selectionnée
    // on veut changer le titre du document, que si la devise a changé !
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
