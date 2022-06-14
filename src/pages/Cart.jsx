import { UilMinus, UilPlus, UilTrashAlt } from "@iconscout/react-unicons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo2 from "../assets/images/logo-2.png";
import Footer from "../components/Footer";
import { setCart } from "../redux/_cart";
import "../styles/Cart.scss";

function Cart(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(false);

  const token = localStorage.getItem("token");

  const { cart } = useSelector((state) => state.cartReducer);
  const products = cart ? cart.products : [];

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const data = await axios({
        method: "GET",
        url: process.env.REACT_APP_API_BACKEND + "/cart",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      const action = setCart(data.data);
      dispatch(action);
    } catch (error) {
      console.log(error.message);
    }
  };

  const convertData = () => {
    return products.map((product) => {
      return {
        product: product.product._id,
        quantity: product.quantity,
      };
    });
  };

  const apiUpdateQuantity = async (products, product) => {
    try {
      const resultfilter = products.filter((productItem) => {
        return productItem.product !== product.product;
      });
      await axios({
        method: "PUT",
        url: process.env.REACT_APP_API_BACKEND + "/cart",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        data: {
          products: [...resultfilter, product],
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const increaseQuantity = async (product) => {
    try {
      setDisabled(true);
      await apiUpdateQuantity(convertData(), {
        product: product.product._id,
        quantity: product.quantity + 1,
      });
      await getProduct();
      setDisabled(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const decreaseQuantity = async (product) => {
    try {
      setDisabled(true);
      await apiUpdateQuantity(convertData(), {
        product: product.product._id,
        quantity: product.quantity - 1,
      });
      await getProduct();
      setDisabled(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteProduct = async (product) => {
    try {
      const resultfilter = products.filter((productItem) => {
        return productItem.product !== product.product;
      });
      await axios({
        method: "PUT",
        url: process.env.REACT_APP_API_BACKEND + "/cart",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        data: {
          products: resultfilter,
        },
      });
      await getProduct();
    } catch (error) {
      console.log(error.message);
    }
  };

  const totalPrice = () => {
    let totalPrice = 0;
    products.forEach((item) => {
      return (totalPrice += item.product.price * item.quantity);
    });
    return totalPrice;
  };

  const updateQuantity = () => {};

  return (
    <>
      <div>
        <header className="header-cart">
          <div style={{ display: "flex", alignItems: "center", width: 300 }}>
            <img
              src={logo2}
              alt="logo"
              onClick={() => {
                navigate("/");
              }}
            />
            <h2>Giỏ Hàng</h2>
          </div>
        </header>

        <section className="content-product">
          <div className="content-product__main">
            <div className="_table">
              <div className="_product-lbl">Sản phẩm</div>
              <div className="_price-lbl">Đơn giá</div>
              <div className="_qty-lbl">Số lượng</div>
              <div className="_sub-total-lbl">Thành tiền</div>
              <div className="_remove-lbl">Thao tác</div>
              {/* <div className="_remove-lbl">Thao tác dfdxxx</div> */}
            </div>
            {products.map((product, index) => {
              return (
                <div className="tb-row" key={index}>
                  <div className="tb-row-detail">
                    <div className="content">
                      <div className="main-comtent">
                        <div className="tb-col-img">
                          <div className="img-name">
                            <Link to="detail">
                              <img src={product.product.image} alt="" />
                            </Link>

                            <div className="product-name">
                              <Link className="name" to="">
                                <h3>{product.product.name}</h3>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="tb-col-price">
                          <div>
                            <span className="span-price">
                              {product.product.price &&
                                product.product.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="tb-col-qty">
                          <div className="_update shopee-input-quantity">
                            <button
                              className="update-quantity"
                              onClick={() => {
                                decreaseQuantity(product);
                              }}
                              disabled={
                                product.quantity && product.quantity === 1
                                  ? true
                                  : disabled
                              }
                            >
                              <UilMinus />
                            </button>

                            <input
                              readOnly
                              type="text"
                              className="update-quantity input-qty"
                              value={product.quantity}
                              onChange={() => {
                                updateQuantity(product.product);
                              }}
                              disabled={disabled}
                            />

                            <button
                              className="update-quantity"
                              onClick={() => {
                                increaseQuantity(product);
                              }}
                              disabled={disabled}
                            >
                              <UilPlus />
                            </button>
                          </div>
                        </div>
                        <div className="tb-col-subTotal">
                          <span>
                            {(
                              product.product.price * product.quantity
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="tb-col-remove">
                          <button onClick={() => deleteProduct(product)}>
                            <UilTrashAlt />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <span></span>
              <span
                style={{
                  color: "#ee4d2d",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                {totalPrice().toLocaleString()}₫
              </span>
              <button
                className="btn-buy"
                onClick={() => {
                  navigate("/createOrder");
                }}
              >
                {" "}
                Mua Hàng{" "}
              </button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Cart;
