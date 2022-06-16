import React from "react";
import { Link } from "react-router-dom";
import "../styles/Product.scss";

function Product({ product }) {
  return (
    <div className="product-card">
      <Link to={"/product/" + product._id}>
        <div className="product-image">
          <img src={product.image} alt="" />
        </div>

        <div>
          <span className="product-name-card">{product.name}</span>
        </div>

        <div className="product-info">
          <span className="product-price">
            {product.price.toLocaleString()}đ
          </span>
          <span className="product-solder">Đã bán 1.3k</span>
        </div>
      </Link>
    </div>
  );
}

export default Product;
