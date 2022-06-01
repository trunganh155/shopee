import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.scss";
import logoWhite from "../assets/images/logoWhite.png";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";

function Header(props) {
  const navigate = useNavigate();

  const { user } = useSelector(state => state.userReducer);

  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    navigate("/search?keyword=" + search);
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
        />
        <button className="btnSearch" onClick={handleSearch}>
          <GoSearch />
        </button>
      </section>

      {/* <h1>{user ? user.name : ''}</h1> */}

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
            <span style={{ color: "#fff" }}>|</span>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Đăng nhập
            </button>
          </div>
        ) :
      <div className="header__user-name">{user ? user.name : ''}</div>
        // dùng tippy .

        // (
        //   <div>
        //     <button
        //       onClick={() => {
        //         navigate("/profile");
        //       }}
        //     >
        //       Tài khoản của bạn
        //     </button>
        //     <span style={{ color: "#fff" }}>|</span>
        //     <button
        //       onClick={() => {
        //         localStorage.removeItem("token");
        //         navigate("/");
        //       }}
        //     >
        //       Đăng xuất
        //     </button>
        //   </div>
        // )
        }
      </section>
    </div>
  );
}

export default Header;
