import { useDispatch, useSelector } from "react-redux";
import { cartItemProps } from "../interfaces/CartItem.interface";

export const useCart = () => {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const creatCart = (payload: cartItemProps[]) =>
    dispatch({
      type: "CREATE_CART",
      payload
    });

  const addCartItem = (payload: cartItemProps) =>
    dispatch({
      type: "ADD_CART_ITEM",
      payload
    });
  const removeCartItem = (payload: cartItemProps) =>
    dispatch({
      type: "REMOVE_CART_ITEM",
      payload
    });
  const emptyCart = () => {
    dispatch({
      type: "EMPTY_CART"
    });
  };
  return { cart, creatCart, addCartItem, removeCartItem, emptyCart };
};
