import React, { useState } from "react";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { CgShoppingCart } from "react-icons/cg";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoWhite from "../assets/images/logoWhite.png";
import { setCart } from "../redux/_cart";
import "../styles/Header.scss";

function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");

  const { user } = useSelector((state) => state.userReducer);

  const { cart } = useSelector((state) => state.cartReducer);
  const products = cart ? cart.products : []; //lay product tu redux

  const handleSearch = () => {
    navigate("/search?keyword=" + search);
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      handleSearch();
    }
  };

  const handleCart = () => {
    if (token) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="header">
      <section className="header__logo">
        <img
          src={logoWhite}
          alt=""
          onClick={() => {
            navigate("/");
          }}
        />
      </section>

      <section className="header__search">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyPress={handleKeypress}
        />
        <button className="btnSearch" onClick={handleSearch}>
          <GoSearch />
        </button>
      </section>

      <section className="header__option">
        <button>Kênh người bán</button>
        <span>|</span>
        <button>Tải ứng dụng</button>
        <span>|</span>
        <button>Kết nối</button>
        <AiFillFacebook className="fb" />
        <AiFillInstagram className="ig" />
      </section>

      <section className="header__cart" onClick={handleCart}>
        <CgShoppingCart />
        <span className="quantity">{products && products.length}</span>
      </section>

      <section className="header__user">
        {token === null ? (
          <div>
            <button
              onClick={() => {
                navigate("/register");
              }}
            >
              Đăng ký
            </button>
            <span>|</span>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Đăng nhập
            </button>
          </div>
        ) : (
          <div className="header__user__avt">
            <img src={user && user.avatar} alt="" />

            <div className="drop-menu">
              <span className="username">{user && user.name}</span>

              <div className="menu-link">
                <div className="menu">
                  <button
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    Tài khoản của bạn
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      dispatch(setCart(null)); //reset cart trong redux khi dang xuat
                      navigate("/");
                    }}
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Header;
