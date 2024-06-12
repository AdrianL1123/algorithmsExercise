import React, { useState, useMemo, memo } from "react";

//* need to move up to avoid any re-rendering
const ProductList = memo(({ products, maxPrice }) => {
  console.log("ProductList rendered");
  const filteredByPrice = useMemo(() => {
    if (maxPrice) {
      return products.filter((product) => product.price <= maxPrice);
    } else {
      return products;
    }
  }, [products, maxPrice]);
  return (
    <ul>
      {filteredByPrice.map((product) => (
        <li key={product.id}>
          {product.name} - ${product.price}
        </li>
      ))}
    </ul>
  );
});

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50);

  const addProductNew = () => {
    const updatedProducts = products.concat({
      id: products.length + 1,
      name: newProductName,
      price: parseInt(newProductPrice),
    });
    setProducts(updatedProducts);
    setNewProductName("");
    setNewProductPrice("");
  };

  const calculateTotalPrice = useMemo(() => {
    return products.reduce((total, product) => total + product.price, 0);
  }, [products]);

  return (
    <div>
      <h1>Product List</h1>
      <ProductList products={products} />
      <input
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
      <ProductList products={products} maxPrice={maxPrice} />
      <h2>Total Price of Products: ${calculateTotalPrice}</h2>
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
