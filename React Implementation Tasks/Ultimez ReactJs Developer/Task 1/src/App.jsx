import { useState } from 'react';
import './App.css';

function App() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSubmit = () => {
    if (productName && productPrice) {
      const price = parseFloat(productPrice);
      if (!isNaN(price)) {
        setProducts((prev) => [...prev, { name: productName, price }]);
        setTotalPrice((prev) => prev + price);
        setProductName("");
        setProductPrice("");
      } else {
        alert("Please enter a valid number for the product price.");
      }
    } else {
      alert("Both fields are required.");
    }
  };

  return (
    <div className="container">
      <div>
      <h1 className='head'>Task - 1</h1>
      <p className="heading">
        Storing the input data with Product Name and Product Price as an object into an array, displaying that list data, and calculating the total Product Price using JavaScript.
      </p>
      </div>
      <div className="inputs">
        <div className="input_1">
          <label htmlFor="pname" className='productN'>Product Name *</label>
          <input
            type="text"
            id="pname"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="input_1">
          <label htmlFor="pprice" className='productN'>Product Price *</label>
          <input
            type="text"
            id="pprice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>

        <button onClick={handleSubmit} className='submitBtn'>Submit</button>
      </div>

      <div className="output">
        <h2>Output Results:</h2>
        <div className="sprice">
          <h3>Sale Price</h3>
          <ul className='list'>
            {products.map((product, idx) => (
              <li key={idx}>
                {product.name} - {product.price}
              </li>
            ))}
          </ul>
        </div>

        <div className="tprice">
          <h3>Total Price</h3>
          <p className='price'>{totalPrice === 0 ? "" : totalPrice}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
