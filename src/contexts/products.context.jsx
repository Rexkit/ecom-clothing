import { useEffect, useState, createContext } from "react";
import STORE_DATA from '../shop-data.json';

export const ProductsContext = createContext({
  products: [],
  setProducts: () => {}
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const value = { products, setProducts };

  useEffect(() => {
    setProducts(STORE_DATA);
  }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
