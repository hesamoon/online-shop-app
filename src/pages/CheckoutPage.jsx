import { useSelector } from "react-redux";

// components
import BasketCart from "../components/BasketCart.jsx";
import BasketSidebar from "../components/BasketSidebar.jsx";

// empty shopping cart
import emptyCart from "../assets/empty-cart-rb.png"

// styles
import styles from "./CheckoutPage.module.css";

function CheckoutPage() {
  const state = useSelector((store) => store.cart);

  if (!state.itemsCounter) {
    return (
      <div className={styles.empty}>
        <img src={emptyCart} alt="empty" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <BasketSidebar state={state} />

      <div className={styles.products}>
        {state.selectedItems.map((product) => (
          <BasketCart key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}

export default CheckoutPage;
