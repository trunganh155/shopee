import React from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/Category";
import Header from "../components/Header";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div>

      {/* Login, logout, search => Header */}
      <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
        <Header />
        Trang chủ
        {token === null ? (
          <div>
            <button
              onClick={() => {
                navigate("/register");
              }}
            >
              Đăng ký
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Đăng nhập
            </button>
          </div>
        ) : (
          <div>
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
                navigate("/");
              }}
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>

      <Category />
    </div>
  );
}
