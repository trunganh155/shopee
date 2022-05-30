import React from "react";
import Header from "../components/Header";

export default function Home() {
  return (
    <div
      style={{
        height: "1500px",
        backgroundColor: "gray",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <span>Trang chủ</span>
    </div>
  );
}
