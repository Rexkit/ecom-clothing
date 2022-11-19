import { CategoryItem } from '../categories/category.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';
import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload,
} from '../../utils/reducer/reducer.utils';

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const newCartItems = [...cartItems];

  const cartItemIndex = newCartItems.findIndex(
    (item) => item.id === productToAdd.id
  );

  if (cartItemIndex !== -1) {
    newCartItems[cartItemIndex] = {
      ...newCartItems[cartItemIndex],
      quantity: (newCartItems[cartItemIndex].quantity += 1),
    };
  } else {
    return [...newCartItems, { ...productToAdd, quantity: 1 }];
  }

  return newCartItems;
};

const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CategoryItem
): CartItem[] => {
  const newCartItems = [...cartItems];

  const cartItemIndex = newCartItems.findIndex(
    (item) => item.id === productToRemove.id
  );

  if (newCartItems[cartItemIndex].quantity - 1 === 0) {
    newCartItems.splice(cartItemIndex, 1);
  } else {
    newCartItems[cartItemIndex] = {
      ...newCartItems[cartItemIndex],
      quantity: newCartItems[cartItemIndex].quantity - 1,
    };
  }

  return newCartItems;
};

const clearCartItem = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): CartItem[] => {
  const newCartItems = [...cartItems];

  const cartItemIndex = newCartItems.findIndex(
    (item) => item.id === cartItemToRemove.id
  );

  newCartItems.splice(cartItemIndex, 1);

  return newCartItems;
};

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher(
  (bool: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): SetCartItems => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CategoryItem
): SetCartItems => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): SetCartItems => {
  const newCartItems = clearCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};
