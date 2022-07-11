import { CART_ACTION_TYPES } from './cart.types';

export const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const cartReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  console.log(CART_ACTION_TYPES);

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };

    case CART_ACTION_TYPES.SET_CART_IS_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      return state;
  }
};
