import { Outlet, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "@exploresg.frontend/ui";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { clearUser } from "./store/slices/userSlice";

const userLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];
const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 1. Select Data from Redux
  const { isAuthenticated, userInfo } = useAppSelector((state) => state.user);

  const handleLogin = () => {
    navigate("/signin");
  };
  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/signin");
  };

  const navbarUser = userInfo
    ? {
        name: `${userInfo.givenName} ${userInfo.familyName}`, // Combine names
        email: userInfo.email,
        picture: userInfo.picture,
      }
    : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        links={userLinks}
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
        user={navbarUser}
      />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
