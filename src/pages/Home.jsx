import React from "react";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div
        style={{
          height: "1500px",
          paddingTop: "150px",
        }}
      >
        <span>Trang chủ</span>
      </div>
    </div>
  );
}
