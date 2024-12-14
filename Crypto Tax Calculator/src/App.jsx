import { useEffect, useState } from "react";
import "./App.css";
import Dropdown from "./components/dropdown";
import InputField from "./components/inputfield";
import InvestmentTypeSelector from "./components/selectInvestmentType";
import AnnualIncomeDropdown from "./components/annualIncomeDropdown";

function App() {
  const [purchasePrice, setPurchasePrice] = useState(null);
  const [salePrice, setSalePrice] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [capitalGains, setCapitalGains] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [annualIncome, setAnnualIncome] = useState(0);
  const [investmentType, setInvestmentType] = useState("Long Term");
  const [netCapitalGains, setNetCapitalGains] = useState("$");
  const [tax, setTax] = useState("$ 0");

  const taxRates = [
    "0%",
    "Nil + 19% of excess over $18,200",
    "$5,092 + 32.5% of excess over $45,000",
    "$29,467 + 37% of excess over $120,000",
    "$51,667 + 45% of excess over $180,000",
  ];

  const getTaxRate = (income) => {
    switch (true) {
      case income == 0:
        return taxRates[0];
      case income <= 18200:
        return taxRates[1];
      case income <= 45000:
        return taxRates[2];
      case income <= 120000:
        return taxRates[3];
      case income > 180000:
        return taxRates[4];
      default:
        return "No tax rate available";
    }
  };

  const taxToBePaid = () => {
    switch (true) {
      case annualIncome == 0:
        return `$ 0`;
      case annualIncome <= 18200:
        return `$ ${(Math.max(0, parseFloat(netCapitalGains)) * 0.19).toFixed(2)}`;
      case annualIncome <= 45000:
        return `$ ${(Math.max(0, parseFloat(netCapitalGains)) * 0.325).toFixed(2)}`;
      case annualIncome <= 120000:
        return `$ ${(Math.max(0, parseFloat(netCapitalGains)) * 0.37).toFixed(2)}`;
      case annualIncome > 180000:
        return `$ ${(Math.max(0, parseFloat(netCapitalGains)) * 0.45).toFixed(2)}`;
      default:
        return "$ 0";
    }
  };

  const handleAnnualIncome = (value) => {
    setAnnualIncome(value);
  };

  useEffect(() => {
    const taxes = taxToBePaid();
    setTax(taxes);
  }, [annualIncome, netCapitalGains]);

  const handleInvestmentTypeChange = (type) => {
    setInvestmentType(type);
  };

  useEffect(() => {
    if (purchasePrice !== null && salePrice !== null && expenses !== null) {
      const gains = salePrice - purchasePrice - expenses;
      setCapitalGains(gains);

      if (investmentType === "Long Term" && gains > 0) {
        setDiscount(gains / 2);
      } else {
        setDiscount(0);
      }
    }
  }, [purchasePrice, salePrice, expenses, investmentType]);

  useEffect(() => {
    const netGains =
      investmentType === "Long Term"
        ? capitalGains - discount
        : capitalGains;

    setNetCapitalGains(netGains.toFixed(2));
  }, [capitalGains, discount, investmentType]);

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-gray-200">
      <div className=" w-3/6 h-fit px-10 py-6 shadow-lg bg-white rounded-xl">
        <div className="border-b-2 pb-4">
          <div className="flex justify-between">
            <Dropdown
              label="Financial Year"
              options={[{ value: "2023-24", label: "FY 2023-24" }]}
              placeholder="Select Year"
              defaultValue="2023-24"
              onChange={() => {}}
            />
            <Dropdown
              label="Country"
              options={[{ value: "australia", label: "Australia" }]}
              placeholder="Select Country"
              defaultValue="australia"
              onChange={() => {}}
            />
          </div>
        </div>
        <div className="flex w-full justify-between mt-6">
          <InputField
            label="Enter purchase price of Crypto"
            type="number"
            value={purchasePrice}
            placeholder="Enter your purchase price"
            onChange={(value) => setPurchasePrice(parseFloat(value))}
            required
          />
          <InputField
            label="Enter sale price of Crypto"
            type="number"
            value={salePrice}
            placeholder="Enter your sale price"
            onChange={(value) => setSalePrice(parseFloat(value))}
            required
          />
        </div>
        <div className="flex w-full justify-between mt-6">
          <InputField
            label="Enter your expenses"
            type="number"
            value={expenses}
            placeholder="Enter your expenses"
            onChange={(value) => setExpenses(parseFloat(value))}
            required
          />
          <InvestmentTypeSelector onSelect={handleInvestmentTypeChange} />
        </div>
        <div className="flex w-full justify-between mt-6">
          <AnnualIncomeDropdown
            label="Select Your Annual Income"
            layout="top"
            options={[
              { value: "0", label: "$0 - $18,200" },
              { value: "18200", label: "$18,201 - $45,000" },
              { value: "45000", label: "$45,001 - $120,000" },
              { value: "120000", label: "$120,001 - $180,000" },
              { value: "180000", label: "$180,001+" },
            ]}
            placeholder="Select Annual Income"
            onChange={handleAnnualIncome}
          />
          <div className="flex flex-col justify-center pt-5 w-80 text-sm">
            <p>Tax Rate</p>
            <p>{getTaxRate(annualIncome)}</p>
          </div>
        </div>
        {investmentType === "Long Term" && (
          <div className="flex w-full justify-between mt-6">
            <InputField
              label="Capital gains amount"
              type="text"
              value={capitalGains}
              access={"readonly"}
              required
            />
            <InputField
              label={`Discount for ${investmentType} gains`}
              type="text"
              value={discount}
              access={"readonly"}
              required
            />
          </div>
        )}
        <div className="flex w-full justify-between mt-6">
          <div className="w-80 px-2 py-6 rounded-lg bg-green-100 flex flex-col justify-center items-center">
            <p className="font-semibold">Net Capital gains tax amount</p>
            <h1 className="text-green-600 text-2xl font-bold">
             $ {netCapitalGains}
            </h1>
          </div>
          <div className="w-80 px-2 py-6 rounded-lg bg-blue-100 flex flex-col justify-center items-center">
            <p className="font-semibold">The Tax you need to pay*</p>
            <h1 className="text-blue-700 text-2xl font-bold">{tax}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
