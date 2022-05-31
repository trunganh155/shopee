import React from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/Category";
import Header from "../components/Header";
import Product from "../components/Product";

export default function Home() {
  return (

    <div
      style={{
        height: "1500px",
        backgroundColor: "#F5F5F5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <Category />
    </div>
  );
}
