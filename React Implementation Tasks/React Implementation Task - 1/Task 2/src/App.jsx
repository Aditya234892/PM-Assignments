import { useState } from "react";
import "./App.css";

function App() {
  const [salePrice, setSalePrice] = useState("");
  const [priceList, setPriceList] = useState([]);
  const [totalSoldPrice, setTotalSoldPrice] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [error, setError] = useState("");
  const originalPrice = 100;

  const handleSubmit = () => {
    const price = parseFloat(salePrice);
    if (isNaN(price) || price <= 0) {
      setError("The Sale Price field is required");
      return;
    }

    if(price > 300){
      setError("The Sale Price field must be less than or equal to 300");
      return;
    }

    setError("");

    setPriceList((prev) => [...prev, price]);
    setTotalSoldPrice((prev) => prev + price);
    setTotalProfit((prev) => prev + price - originalPrice);
    setSalePrice("");
  };

  return (
    <div className="p-16 w-fit h-screen flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-semibold">Task 2</h1>
        <p>
          Storing input textbox value into an array, displaying that array list,
          then calculating total sale price & total profit using Javascript
        </p>
        <p>Product Original Price: {originalPrice}</p>
      </div>

      <div className="flex flex-col">
        <label htmlFor="salePrice">Sale Price *</label>
        <input
          type="text"
          id="salePrice"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
          className="border h-12 w-96 rounded-md border-gray-300 pl-3"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Error message */}
        <button
          onClick={handleSubmit}
          className="w-20 px-1 py-2 bg-blue-500 text-white rounded-md mt-4"
        >
          Submit
        </button>
      </div>

      <div className="flex flex-col gap-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Output Result:</h2>
          <h3 className="text-xl font-semibold">Sold Price List</h3>
          <ul>
            {priceList.map((item, idx) => (
              <li key={idx} className="list-disc ml-8">{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Total Sold Price</h3>
          <p>{totalSoldPrice}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Total Profit</h3>
          <p>{totalProfit}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
