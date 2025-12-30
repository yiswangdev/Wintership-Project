import { useState } from "react";

function App() {
  const [symbol, setSymbol] = useState("");
  const [stock, setStock] = useState(null);

  const getStock = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/quote/${symbol}`);
      const data = await response.json();
      setStock(data);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <>
      <h2>Stock App</h2>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter Symbol"
      />
      <button onClick={getStock}>Search</button>
      {stock && (
        <div>
          <p>Open Price: {stock.o}</p>
          <p>Current Price: {stock.c}</p>
        </div>
      )}
    </>
  );
}

export default App;
