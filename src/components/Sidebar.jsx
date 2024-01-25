/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
// icons
import { FaListUl } from "react-icons/fa";

// helpers
import { createQueryObject } from "../helper/helper";

// constants
import { categories } from "../constant/list";

// styles
import styles from "./Sidebar.module.css";

function Sidebar({ query, setQuery }) {
  const categoryHandler = (event) => {
    const { tagName } = event.target;
    const category = event.target.innerText.toLowerCase();

    if (tagName !== "LI") return;

    setQuery((query) => createQueryObject(query, { category }));
  };

  return (
    <div className={styles.sidebar}>
      <div>
        <FaListUl />
        <p>Categories</p>
      </div>
      <ul onClick={categoryHandler}>
        {categories.map((category) => (
          <li
            key={category.id}
            className={
              query.category === category.type.toLowerCase()
                ? styles.selected
                : null
            }
          >
            {category.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
