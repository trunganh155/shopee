import axios from "axios";
import React, { useEffect, useState } from "react";
import Category from "../components/Category";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Product from "../components/Product";
import "../styles/ProductHome.scss";

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
      const endpoint = process.env.REACT_APP_API_BACKEND + "/product";

      const { data } = await axios({
        url: endpoint,
        method: "get",
        headers: {},
        data: {},
        params: {
          page: 0,
          limit: 40,
        },
      });

      setProductList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div
        style={{
          height: "1500px",
          backgroundColor: "#F5F5F5",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="container">
          <div
            className="home-banner"
            style={{ marginTop: "120px", paddingTop: "20px" }}
          >
            <img
              style={{ width: "100%" }}
              src="https://cf.shopee.com.my/file/5e7d031649e162ee1b4fa73bc686bb43"
              alt="home-banner"
            />
          </div>
        </div>

        <Category />

        {loading ? (
          <Loading />
        ) : (
          <div className="product-home__main container">
            <div className="product-home__header">
              <div className="product-home__today">
                <h3 className="product-home__title">GỢI Ý HÔM NAY</h3>
              </div>
            </div>

            <div className="product-home__list">
              <div className="row">
                {productList.items.map((productItem, index) => (
                  <Product key={index} product={productItem} />
                ))}
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
}
