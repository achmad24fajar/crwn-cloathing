import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector';
import {setIsCartOpen} from '../../store/cart/cart.action'

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  const toggle = () => dispatch(setIsCartOpen(!isCartOpen))
  return (
    <CartIconContainer onClick={toggle}>
      <ShoppingIcon/>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
