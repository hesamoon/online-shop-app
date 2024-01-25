import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// fetch data from api
import { fetchProducts } from "../features/product/ProductSlice.js";

// icons
import { FaArrowLeft } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { SiOpenproject } from "react-icons/si";

// components
import Loader from "../components/Loader.jsx";

// styles
import styles from "./DetailsPage.module.css";

function DetailsPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const productDetails = useSelector((store) =>
    store.product.products.find((p) => p.id === +id)
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (!productDetails) return <Loader />;

  return (
    <div className={styles.container}>
      <img src={productDetails.image} alt={productDetails.title} />
      <div className={styles.information}>
        <h3 className={styles.title}>{productDetails.title}</h3>
        <p className={styles.description}>{productDetails.description}</p>
        <p className={styles.category}>
          <SiOpenproject />
          {productDetails.category}
        </p>

        <div>
          <span className={styles.price}>
            <IoMdPricetag />
            {productDetails.price} $
          </span>
          <Link to="/products">
            <FaArrowLeft />
            <span>Back to shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
