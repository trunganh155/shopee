import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import ProfilePage from "../pages/Profile";
import RegisterPage from "../pages/Register";
import PageNotFound from "../pages/PageNotFound";

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
    path: "/*",
    element: <PageNotFound />,
    private: false,
  },
];

export default routers;
