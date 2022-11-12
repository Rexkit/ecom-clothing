import { useEffect } from "react";
import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const newCartItems = [...cartItems];

  const cartItemIndex = newCartItems.findIndex(item => item.id === productToAdd.id);

  if (cartItemIndex !== -1) {
    newCartItems[cartItemIndex] = {
      ...newCartItems[cartItemIndex],
      quantity: newCartItems[cartItemIndex].quantity += 1
    }
  } else {
    return [...newCartItems, { ...productToAdd, quantity: 1 }];
  }

  return newCartItems;
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  totalAmount: 0,
  setTotalAmount: () => {}
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const newTotalAmount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setTotalAmount(newTotalAmount);
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, totalAmount };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
