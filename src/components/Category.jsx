import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Category.scss";

function Category(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const url = process.env.REACT_APP_API_BACKEND + "/category";

      const { data } = await axios({
        url: url,
        headers: {},
        data: {},
      });

      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="category-main">
      <div className="container">
        <div className="category-inner">
          <div className="category-header">Danh mục</div>

          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div className="category-list">
              {categories.map((Item, index) => (
                <div className="category-item" key={index}>
                  <Link to={"/category/" + Item._id + "/product"}>
                    <img
                      className="category-image"
                      src={Item.image}
                      alt={Item.image}
                    />
                    <h4 className="category-name">{Item.name}</h4>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
