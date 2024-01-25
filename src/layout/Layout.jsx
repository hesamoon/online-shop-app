/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// icons
import { PiShoppingCartSimpleBold } from "react-icons/pi";

// styles
import styles from "./Layout.module.css";

function Layout({ children }) {
  const state = useSelector((store) => store.cart);

  return (
    <>
      <header className={styles.header}>
        <Link to="/products">HesamoonShop</Link>
        <Link to="/checkout">
          <div>
            <PiShoppingCartSimpleBold />
            {!!state.itemsCounter && <span>{state.itemsCounter}</span>}
          </div>
        </Link>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>
          Developed by{" "}
          <a href="https://github.com/hesamoon" target="_blank">
            Hesamoon
          </a>{" "}
          with ❤
        </p>
      </footer>
    </>
  );
}

export default Layout;
