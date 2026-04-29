import { useState } from "react";

function App() {
  const [symbol, setSymbol] = useState("");
  const [stocks, setStocks] = useState([]);
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const getStock = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/quote/${symbol}`);
      const data = await res.json();
      setStocks((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
  };

  const startTimer = () => {
    const total =
      parseInt(minutes || "0") * 60 + parseInt(seconds || "0");

    if (!symbol || total <= 0) return;

    setStocks([]);
    setTimeLeft(total);

    getStock();

    const interval = setInterval(() => {
      getStock();

      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  return (
    <div className="app-container">
      <h2>Stock App</h2>

      <div className="timer-display">
        <p>
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </p>
      </div>

      <div className="input-group">
        <input
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />

        <input
          placeholder="Seconds"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
        />

        <input
          placeholder="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button onClick={startTimer}>Start</button>
        <button onClick={getStock}>Refresh</button>
        <button onClick={() => setStocks([])}>Clear</button>
      </div>

      {stocks.length > 0 && (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>#</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Current</th>
              <th>Prev Close</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((s, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{s.o}</td>
                <td>{s.h}</td>
                <td>{s.l}</td>
                <td>{s.c}</td>
                <td>{s.pc}</td>
                <td>{new Date(s.t * 1000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;