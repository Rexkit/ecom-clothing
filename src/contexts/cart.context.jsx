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

const removeCartItem = (cartItems, productToRemove) => {
  const newCartItems = [...cartItems];

  const cartItemIndex = newCartItems.findIndex(item => item.id === productToRemove.id);

  if (newCartItems[cartItemIndex].quantity - 1 === 0) {
    newCartItems.splice(cartItemIndex, 1);
  } else {
    newCartItems[cartItemIndex] = {
      ...newCartItems[cartItemIndex],
      quantity: newCartItems[cartItemIndex].quantity - 1
    }
  }

  return newCartItems;
}

const clearCartItem = (cartItems, cartItemToRemove) => {
  const newCartItems = [...cartItems];

  const cartItemIndex = newCartItems.findIndex(item => item.id === cartItemToRemove.id);

  newCartItems.splice(cartItemIndex, 1);

  return newCartItems;
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  totalAmount: 0,
  setTotalAmount: () => {},
  cartTotal: 0,
  setCartTotal: () => {}
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newTotalAmount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setTotalAmount(newTotalAmount);
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    setCartTotal(newCartTotal);
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  }

  const clearItemFromCart = (cartItemToRemove) => {
    setCartItems(clearCartItem(cartItems, cartItemToRemove));
  }

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, totalAmount, cartTotal };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
