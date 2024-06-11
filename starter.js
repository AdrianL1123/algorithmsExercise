import React, { useState, useMemo, memo } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50);

  const addProductNew = () => {
    console.log("rendering list");
    const updatedProducts = products.concat({
      id: products.length + 1,
      name: newProductName,
      price: parseInt(newProductPrice),
    });
    setNewProductName("");
    setNewProductPrice("");
    console.log(updatedProducts);
    setProducts(updatedProducts);
  };

  const filterByPrice = () => {
    const filtered = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].price <= maxPrice) {
        filtered.push(products[i]);
      }
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      total += products[i].price;
    }
    return total;
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newProductName}
        onChange={(e) => setNewProductName(e.target.value)}
        placeholder="New Product Name"
      />
      <input
        type="number"
        value={newProductPrice}
        onChange={(e) => setNewProductPrice(e.target.value)}
        placeholder="New Product Price"
      />
      <button onClick={addProductNew}>Add Product</button>
      <h2>Products Priced Below ${maxPrice}:</h2>
      <ul>
        {filterByPrice().map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <h2>Total Price of Products: ${calculateTotalPrice()}</h2>
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Max Price"
      />
    </div>
  );
};

export default App;
