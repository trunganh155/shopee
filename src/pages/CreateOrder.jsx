import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateOrder.scss";
import logo2 from "../assets/images/logo-2.png";
import { useDispatch, useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import Footer from "../components/Footer";
import { setCart } from "../redux/_cart";

export default function CreateOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [token] = useState(() => localStorage.getItem("token"));

  const { user } = useSelector((state) => state.userReducer); // dùng để lấy dữ liệu từ slice
  const { cart } = useSelector((state) => state.cartReducer); // dùng để lấy dữ liệu từ slice
  const [total] = useState(() => {
    let sum = 0;
    cart.products.map((item) => (sum += item.product.price * item.quantity));
    return sum;
  });

  const createOrder = async (productLst, userDetail, sumPrice) => {
    try {
      setLoading(true);
      //Create order
      await axios({
        method: "POST",
        url: process.env.REACT_APP_API_BACKEND + "/order",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        data: {
          user: userDetail._id,
          productLst,
          address: userDetail.address,
          phone: userDetail.phone,
          total_price: sumPrice,
        },
      });

      //Remove product in cart
      await axios({
        method: "PUT",
        url: process.env.REACT_APP_API_BACKEND + "/cart",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        data: {
          products: [],
        },
      });

      //Navigate to page list order
      alert("Bạn đã đặt đơn hàng thành công");
      dispatch(setCart(null)); //reset cart o redux
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <header>
          <div style={{ display: "flex", alignItems: "center", width: 300 }}>
            <img
              src={logo2}
              alt="logo"
              onClick={() => {
                navigate("/");
              }}
            />
            <span>Thanh toán</span>
          </div>
        </header>

        <div className="main__Cart">
          <div className="borderCart"></div>
          <div className="box__Cart">
            <div className="boxAddress__title">Địa chỉ nhận hàng</div>

            <div className="boxAddress__detail">
              <span className="namePhone">
                {user ? user.name : ""} - {user ? user.phone : ""}
              </span>
              <span className="address">{user ? user.address : ""}</span>
              <span className="optionDefault">Mặc định</span>
              <a href="#" className="btnChange">
                Thay đổi
              </a>
            </div>
          </div>

          <div className="box__Cart">
            <div className="cart_title_header">
              <span className="flex-4">Sản phẩm</span>
              <span className="flex-2">Phân loại</span>
              <span className="flex-1">Đơn giá</span>
              <span className="flex-1">Số lượng</span>
              <span className="flex-2">Thành tiền</span>
            </div>

            {cart.products.map((item, index) => (
              <div className="cart_detail" key={index}>
                <span className="flex-4">
                  <img
                    src={item.product.image}
                    alt=""
                    className="thumnail-img"
                  />

                  <span>{item.product.name}</span>
                </span>
                <span className="flex-2">{item.product.name}</span>
                <span className="flex-1">
                  <NumberFormat
                    value={item.product.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={""}
                  />
                </span>
                <span className="flex-1">{item.quantity}</span>
                <span className="flex-2">
                  <NumberFormat
                    value={item.product.price * item.quantity}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={""}
                  />
                </span>
              </div>
            ))}
          </div>

          <div className="cart_pay">
            <div className="cart_pay_lbl">
              <span>Tổng số tiền </span>

              <span>
                <NumberFormat
                  value={total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₫"}
                />
              </span>
            </div>

            <div className="cart_group_btn">
              <span>
                Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều
                khoản Shopee
              </span>

              <button
                className="btnCreateOrder"
                onClick={() => {
                  createOrder(cart.products, user, total);
                }}
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
