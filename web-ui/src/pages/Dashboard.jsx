import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(
          `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cue74p9r01qiosq1oov0cue74p9r01qiosq1oovg`
        );
        setStocks(response.data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Stock Dashboard</h1>
      
      <input
        type="text"
        placeholder="Search stock..."
        className="w-full p-2 mb-4 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-3 gap-4">
        {stocks
          .filter((stock) =>
            stock.description.toLowerCase().includes(search.toLowerCase())
          )
          .slice(0, 10)
          .map((stock) => (
            <div key={stock.symbol} className="p-4 border rounded shadow-md">
              <h2 className="text-xl font-semibold">{stock.description}</h2>
              <p className="text-gray-500">{stock.symbol}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
