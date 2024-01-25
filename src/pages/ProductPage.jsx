/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// icons
import { FaListUl } from "react-icons/fa";

// styles
import styles from "./ProductPage.module.css";

// components
import Card from "../components/Card.jsx";
import Loader from "../components/Loader.jsx";
import Sidebar from "../components/Sidebar.jsx";
import SearchBox from "../components/SearchBox.jsx";

// helpers
import {
  filterProducts,
  searchProducts,
  getInitialQuery,
} from "../helper/helper.js";

// fetch products from api
import { fetchProducts } from "../features/product/ProductSlice.js";

function ProductPage() {
  const { loading, products, error } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    setDisplayed(products);
    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "");

    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  return (
    <>
      {window.innerWidth < 480 ? (
        <div className={styles.wrap}>
          <button onClick={() => setOpen((prev) => !prev)}>
            <FaListUl />

            {open && (
              <div className={styles.filter}>
                <Sidebar query={query} setQuery={setQuery} />
              </div>
            )}
          </button>

          <SearchBox
            search={search}
            setSearch={setSearch}
            setQuery={setQuery}
          />
        </div>
      ) : (
        <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      )}

      <div className={styles.container}>
        <div className={styles.products}>
          {loading ? <Loader /> : null}
          {displayed.map((p) => (
            <Card key={p.id} data={p} />
          ))}
        </div>

        {window.innerWidth >= 480 ? (
          <Sidebar query={query} setQuery={setQuery} />
        ) : null}
      </div>
    </>
  );
}

export default ProductPage;
