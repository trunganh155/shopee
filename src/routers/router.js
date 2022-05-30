import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import ProfilePage from "../pages/Profile";
import RegisterPage from "../pages/Register";
import Cart from "../pages/Cart"

const routers = [
  {
    path: "/",
    element: <HomePage />,
    private: false,
  },
  {
    path: "/login",
    element: <LoginPage />,
    private: false,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    private: true,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    private: false,
  },
  {
    path: "/cart",
    element: <Cart />,
    private: false,
  },
];

export default routers;
