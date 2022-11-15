import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

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

export const setIsCartOpen = (bool) => 
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = clearCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

