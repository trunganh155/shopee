import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfile } from "../redux/_profile_slice";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const viewProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios({
        method: "get",
        url: "https://k24-server-1.herokuapp.com/user",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      dispatch(setProfile(res.data)); //lay thong tin cua nguoi dung luu vao profile trong redux

      navigate("/profile");
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  };
  return (
    <div>
      Home
      <button onClick={viewProfile}>Profile</button>
    </div>
  );
}
