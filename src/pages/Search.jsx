import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Product from "../components/Product";
import "../styles/Search.scss";

function Search(props) {
  let [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const [data, setData] = useState({
    items: [],
    limit: 10,
    page: 0,
    total_item: 0,
  });

  useEffect(() => {
    loadProducts();
  }, [keyword]);

  const loadProducts = async () => {
    try {
      const endpoint =  
        "https://k24-server-1.herokuapp.com/product?search=" + keyword;

      const { data } = await axios({
        url: endpoint,
        headers: {},
        data: {},
      });

      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      
      Search
      <div className="products">
        {data.items.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
}

export default Search;
