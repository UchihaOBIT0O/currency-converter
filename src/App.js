// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [currencyOne, setCurrencyOne] = useState("USD");
  const [currencyTwo, setCurrencyTwo] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function convertCurrency() {
      setIsLoading(true);
      if (amount <= 0) return;
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currencyOne}&to=${currencyTwo}`
      );
      const data = await res.json();
      setConverted(data.rates[currencyTwo]);
      setIsLoading(false);
    }

    if (currencyOne === currencyTwo) return setConverted(amount);
    convertCurrency();
  }, [amount, currencyOne, currencyTwo]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={currencyOne}
        onChange={(e) => setCurrencyOne(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={currencyTwo}
        onChange={(e) => setCurrencyTwo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {converted} {currencyTwo}
      </p>
    </div>
  );
}
