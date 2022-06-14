import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading.jsx";
import "../styles/Detail.scss";

function Detail(props) {
  const [product, setProduct] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loadingText, setLoadingText] = useState("Thêm vào giỏ hàng");

  const token = localStorage.getItem("token");

  let { id } = useParams();
  let navigate = useNavigate();

  const productInfo = async () => {
    setLoading(true);
    try {
      const url = process.env.REACT_APP_API_BACKEND + "/product/" + id;

      const res = await axios({
        url: url,
        method: "get",
      });

      setProduct(res.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    productInfo();
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const url = process.env.REACT_APP_API_BACKEND + "/cart";

      const { data } = await axios({
        url: url,
        method: "get",
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setCartItems(data.products);
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  };

  const handleAddCart = async () => {
    document.getElementById("addtocart").setAttribute("disabled", "disabled");
    setLoadingText("Đang xử lý...");

    try {
      const url = process.env.REACT_APP_API_BACKEND + "/cart";

      await axios({
        url: url,
        method: "put",
        headers: {
          token: localStorage.getItem("token"),
        },

        data: {
          products: [
            ...cartItems,
            {
              product: id,
              quantity: quantity,
            },
          ],
        },
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingText("Thành công...");

      setTimeout(function () {
        navigate("/cart");
      }, 1000);
    }
  };

  return (
    <>
      <Header />
      <div>
        {loading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className="container" style={{ marginTop: "150px" }}>
              <div className="product-detail-container">
                <div className="box-image">
                  <div className="gallery-item item-main">
                    <img src={product.image} />
                  </div>
                </div>

                <div className="box-info">
                  <h2 className="name">{product.name}</h2>

                  <div className="price-stock clearfix">
                    <div className="info-price">
                      {product.price && product.price.toLocaleString()}₫
                    </div>
                  </div>

                  <div className="description">
                     <span>=== ĐẢM BẢO ===</span>
                    <span>+ Hình ảnh sản phẩm giống 100%. </span>
                    <span>+ Chất lượng sản phẩm tốt nhất. </span>
                    <span>+ Sản phẩm được kiểm tra kĩ càng trước khi giao.</span>
                    <span>+ Hoàn tiền 100% nếu sản phẩm không đúng với mô tả. </span>
                    <span>+ Hỗ trợ đổi trả theo quy định của Shopee.</span>
                  </div>

                  <div className="detail-quantity">
                    <span>Số lượng</span>

                    <button
                      title="Giảm"
                      onClick={() => {
                        if (quantity > 1) {
                          setQuantity(quantity - 1);
                        }
                      }}
                    >
                      -
                    </button>

                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(parseInt(e.target.value));
                      }}
                    />

                    <button
                      title="Thêm"
                      onClick={() => {
                        setQuantity(quantity + 1);
                      }}
                    >
                      +
                    </button>

                    <span>3017 sản phẩm có sẵn</span>
                  </div>

                  <div className="add-to-cart">
                    {token ? (
                      <button
                        id="addtocart"
                        className="addtocart"
                        onClick={handleAddCart}
                        disabled={quantity > 0 ? false : true}
                      >
                        {loadingText}
                      </button>
                    ) : (
                      <button
                        className="btn-Login"
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        Đăng nhập
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Detail;
