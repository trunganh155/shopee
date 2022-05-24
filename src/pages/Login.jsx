import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo1 from "../assets/images/logoSP.png";
import logo2 from "../assets/images/logo-2.png";
import Loading from "../components/Loading";
import "../styles/Login.scss";
import { loginSchema } from "../validations/UserValidation";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (data) => {
      try {
        setLoading(true);
        const res = await axios({
          method: "post",
          url: "https://k24-server-1.herokuapp.com/user/login",
          data: {
            phone: data.phone,
            password: data.password,
          },
        });

        localStorage.setItem("token", JSON.stringify(res.data.token));
        const token = localStorage.getItem("token");
        console.log(token);

        if (token !== "") {
          setIsLogin(true);
          navigate("/");
        }
      } catch (error) {
        console.log(error);

        console.log("LOGIN FAIL");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <header>
        <div style={{ display: "flex", alignItems: "center", width: 300 }}>
          <img src={logo2} alt="logo" />
          <span>Đăng nhập</span>
        </div>

        <a href="">Bạn cầu giúp đỡ?</a>
      </header>
      <div className="login">
        {loading && <Loading />}

        <div className="login__logo">
          <img src={logo1} alt="logo" />
        </div>

        <div className="login__form">
          <form className="form" onSubmit={formik.handleSubmit}>
            <span className="title">Đăng nhập</span>
            <input
              name="phone"
              type="text"
              placeholder="Số điện thoại"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className="error">{formik.errors.phone}</p>
            )}

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="error">{formik.errors.password}</p>
            )}

            <div className="showPassword">
              {showPassword ? (
                <FaEyeSlash
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                ></FaEyeSlash>
              ) : (
                <FaEye
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                ></FaEye>
              )}
            </div>

            <button type="submit" className="btnLogin">
              Đăng nhập
            </button>
          </form>

          <div className="forgotPass">
            <a href="">Quên mật khẩu</a>
            <a href="">Đăng nhập với SMS</a>
          </div>

          <div className="or">
            <div class="line"></div>
            <span>Hoặc</span>
            <div class="line"></div>
          </div>

          <div className="guest">
            <span>Bạn mới biết đến Shopee? </span>
            <span
              className="navigate"
              onClick={() => {
                navigate("/register");
              }}
            >
              Đăng ký
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
