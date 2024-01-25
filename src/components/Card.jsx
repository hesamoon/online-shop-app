/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// icons
import { TbListDetails, TbShoppingBagCheck } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";

// helpers
import { productQuantity, shortenText } from "../helper/helper.js";

// styles
import styles from "./Card.module.css";

// get actions
import { addItem, removeItem, increment, decrement } from "../features/cart/CartSlice.js";

function Card({ data }) {
  const { id, title, image, price } = data;

  const state = useSelector((store) => store.cart)
  const dispatch = useDispatch();
  
  const quantity = productQuantity(state, id);

  const clickHandler = (type) => {
    switch (type) {
      case "ADD_ITEM":
        return dispatch(addItem(data));

      case "REMOVE_ITEM":
        return dispatch(removeItem(data))

      case "INCREASE":
        return dispatch(increment(data))

      case "DECREASE":
        return dispatch(decrement(data))

      default:
        return new Error("Invalid Action");
    }
  };

 

  return (
    <div className={styles.card}>
      <img src={image} alt={title} />
      <h3>{shortenText(title)}</h3>
      <p>{price} $</p>
      <div className={styles.actions}>
        <Link to={`/products/${id}`}>
          <TbListDetails />
        </Link>
        <div>
          {quantity === 1 && (
            <button onClick={() => clickHandler("REMOVE_ITEM")}>
              <MdDeleteOutline />
            </button>
          )}

          {quantity > 1 && (
            <button onClick={() => clickHandler("DECREASE")}>-</button>
          )}

          {quantity > 0 && <span>{quantity}</span>}

          {quantity === 0 ? (
            <button onClick={() => clickHandler("ADD_ITEM")}>
              <TbShoppingBagCheck />
            </button>
          ) : (
            <button onClick={() => clickHandler("INCREASE")}>+</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
