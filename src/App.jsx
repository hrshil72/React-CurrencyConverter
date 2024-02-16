import { useEffect, useState } from "react";
import CurrencyInput from "./components/CurrencyInput";
import { CURR_API } from "./Constants";
// import useCurrency from "./hooks/useCurrency";

const App = () => {
  const [currency, setCurrency] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  const fetchData = async () => {
    const data = await fetch(CURR_API);
    const json = await data.json();
    const firstCurrency = Object.keys(json.inr)[0];
    const lastCurrency = Object.keys(json.inr)[100];
    setCurrency([...Object.keys(json.inr)]);
    setFromCurrency(firstCurrency);
    setToCurrency(lastCurrency);
    setExchangeRate(Object.values(json.inr)[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <h1>Currency Converter</h1>
      <CurrencyInput
        currency={currency}
        currencyOptions={fromCurrency}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
      />
      <div className="equals">=</div>
      <CurrencyInput
        currency={currency}
        currencyOptions={toCurrency}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
        han
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
      />
    </div>
  );
};

export default App;
