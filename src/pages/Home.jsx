import React from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/Category";
import Header from "../components/Header";

export default function Home() {
  return (

    <div
      style={{
        height: "1500px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <span>Trang chủ</span>

      <Category />
    </div>
  );
}
