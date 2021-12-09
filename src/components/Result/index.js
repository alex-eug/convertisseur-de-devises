import CountUp from 'react-countup';
import PropTypes from 'prop-types';
import './result.scss';

const Result = ({ convertedAmount, selectedCurrency }) => (
  <div className="result">
    {/* <p >{convertedAmount}</p> */}
    <CountUp
      className="result__amount"
      // 2 decimales apres la virgule
      decimals={2}
      // l'anim dure 1 seconde
      duration={0.5}
      // a la fin, la valeur vaudra convertedAmount
      end={convertedAmount}
    />
    <p className="result__currency">{selectedCurrency}</p>
  </div>
);

Result.propTypes = {
  convertedAmount: PropTypes.number.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
};

export default Result;
