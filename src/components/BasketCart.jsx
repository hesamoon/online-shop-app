/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";

// icons
import { MdDeleteOutline } from "react-icons/md";

// get actions
import {
  decrement,
  increment,
  removeItem,
} from "../features/cart/CartSlice.js";

// helpers
import { shortenText } from "../helper/helper";

// styles
import styles from "./BasketCart.module.css";

function BasketCart({ data }) {
  const { title, image, quantity } = data;

  const dispatch = useDispatch();

  return (
    <div className={styles.card}>
      <img src={image} alt={title} />
      <p>{shortenText(title)}</p>

      <div className={styles.actions}>
        {quantity === 1 && (
          <button onClick={() => dispatch(removeItem(data))}>
            <MdDeleteOutline />
          </button>
        )}

        {quantity > 1 && (
          <button onClick={() => dispatch(decrement(data))}>-</button>
        )}

        <span>{quantity}</span>

        <button onClick={() => dispatch(increment(data))}>+</button>
      </div>
    </div>
  );
}

export default BasketCart;
