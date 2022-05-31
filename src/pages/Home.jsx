import React, { useState, useEffect } from "react";
import axios from "axios";
import Category from "../components/Category";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Product from "../components/Product";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState({
    items: [],
    limit: 10,
    page: 0,
    total_item: 0,
  });

  useEffect(() => {
    loadProductList();
  }, []);

  const loadProductList = async () => {
    setLoading(true);
    try {
      const endpoint = "https://k24-server-1.herokuapp.com/" + "product";

      const { data } = await axios({
        url: endpoint,
        method: "get",
        headers: {},
        data: {},
      });

      setProductList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "1500px",
        backgroundColor: "#F5F5F5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <Category />
      
      {loading ? (
        <Loading />
      ) : (
        <div
          className="product-list"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {productList.items.map((productItem, index) => (
            <Product
              className="product-item"
              key={index}
              product={productItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}
