import { useState } from 'react';
import './App.css';

function App() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [errors, setErrors] = useState({ productName: "", productPrice: "" });

  const handleSubmit = () => {
    let hasError = false;
    const newErrors = { productName: "", productPrice: "" };

    if (!productName) {
      newErrors.productName = "Product Name is required.";
      hasError = true;
    }

    if (!productPrice) {
      newErrors.productPrice = "Product Price is required.";
      hasError = true;
    } else {
      const price = parseFloat(productPrice);
      if (isNaN(price)) {
        newErrors.productPrice = "Please enter a valid number for Product Price.";
        hasError = true;
      }
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const price = parseFloat(productPrice);
    setProducts((prev) => [...prev, { name: productName, price }]);
    setTotalPrice((prev) => prev + price);
    setProductName("");
    setProductPrice("");
    setErrors({ productName: "", productPrice: "" });
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
          {errors.productName && <p className='error'>{errors.productName}</p>}
        </div>

        <div className="input_1">
          <label htmlFor="pprice" className='productN'>Product Price *</label>
          <input
            type="text"
            id="pprice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          {errors.productPrice && <p className='error'>{errors.productPrice}</p>}
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