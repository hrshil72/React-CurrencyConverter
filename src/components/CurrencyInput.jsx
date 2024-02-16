import React from "react";

const CurrencyInput = ({
  currency,
  currencyOptions,
  onChangeCurrency,
  onChangeAmount,
  amount,
}) => {
  return (
    <div>
      <input
        className="field"
        onChange={onChangeAmount}
        type="number"
        placeholder="Enter amount"
        value={amount}></input>
      <select
        className="curr-options"
        value={currencyOptions}
        onChange={onChangeCurrency}>
        {currency.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CurrencyInput;
