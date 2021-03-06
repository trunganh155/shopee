import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { BiError } from "react-icons/bi";
import { FaEye, FaEyeSlash, FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo2 from "../assets/images/logo-2.png";
import logo1 from "../assets/images/logoSP.png";
import Loading from "../components/Loading";
import "../styles/Login.scss";
import { loginSchema } from "../validations/UserValidation";
import { setUser } from "../redux/_user"; 
import { setCart } from "../redux/_cart";
import Footer from "../components/Footer";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      navigate("/");
    }
  }, []);

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

        localStorage.setItem("token", res.data.token);
        const token = localStorage.getItem("token");

        if (token !== null) {
          setIsLogin(true);
          await getUser(res.data.token);
          await getCart(res.data.token);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        setIsLogin(false);
      } finally {
        setLoading(false);
      }
    },
  });

  const getUser = async (token) => {
    try {
      const url = process.env.REACT_APP_API_BACKEND + "/user";

      const res = await axios({
        url: url,
        method: "get",
        headers: { token },
      });

      const action = setUser(res.data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const getCart = async (token) => {
    try {
      const url = process.env.REACT_APP_API_BACKEND + "/cart";

      const res = await axios({
        url: url,
        method: "get",
        headers: { token },
      });

      const action = setCart(res.data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        {loading && <Loading />}
        <header className="header__2">
          <div style={{ display: "flex", alignItems: "center", width: 300 }}>
            <img
              src={logo2}
              alt="logo"
              onClick={() => {
                navigate("/");
              }}
            />
            <span>????ng nh???p</span>
          </div>

          <a href="#">B???n c???u gi??p ??????</a>
        </header>
        <div className="login">
          <div className="login__logo">
            <img src={logo1} alt="logo" />
          </div>

          <div className="login__form">
            <span className="title">????ng nh???p</span>
            {isLogin === false ? (
              <div className="error_login">
                <BiError />
                <span>
                  S??? ??i???n tho???i ho???c m???t kh???u c???a b???n kh??ng ????ng, vui l??ng th???
                  l???i.
                </span>
              </div>
            ) : (
              <></>
            )}

            <form className="form" onSubmit={formik.handleSubmit}>
              <input
                name="phone"
                type="text"
                placeholder="S??? ??i???n tho???i"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
              {formik.errors.phone && formik.touched.phone && (
                <p className="error">{formik.errors.phone}</p>
              )}

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="M???t kh???u"
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
                ????ng nh???p
              </button>
            </form>

            <div className="forgotPass">
              <a href="#">Qu??n m???t kh???u</a>
              <a href="#">????ng nh???p v???i SMS</a>
            </div>

            <div className="or">
              <div className="line"></div>
              <span>Ho???c</span>
              <div className="line"></div>
            </div>

            <div className="or_container">
              <div className="or_items">
                <FaFacebook style={{ color: "#125195" }} />
                <span>Facebook</span>
              </div>
              <div className="or_items">
                <FcGoogle />
                <span>Google</span>
              </div>
              <div className="or_items">
                <FaApple />
                <span>Apple</span>
              </div>
            </div>

            <div className="guest">
              <span>B???n m???i bi???t ?????n Shopee? </span>
              <span
                className="navigate"
                onClick={() => {
                  navigate("/register");
                }}
              >
                ????ng k??
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
