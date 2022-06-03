import React from "react";
import { Link } from "react-router-dom";
import "../styles/Product.scss";

function Product({ product }) {
  return (
    <div className="col-2-5">
      <div className="product">
        <Link to={"/product/" + product._id}>
          <div className="product__image">
            <img src={product.image} alt="" />
          </div>

          <span className="product-name">{product.name}</span>

          <div className="product-info">
            <span className="product-price">
              {product.price.toLocaleString()}đ
            </span>
            <span className="product-solder">Đã bán 1.3k</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Product;
