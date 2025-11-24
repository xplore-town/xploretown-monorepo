import { Outlet, useNavigate } from "react-router-dom";
import { Footer, Navbar, type NotificationItem } from "@exploresg.frontend/ui";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { clearUser } from "./store/slices/userSlice";

const userLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Booking Confirmed",
    message: "Your rental for BMW i8 is confirmed.",
    time: "2 mins ago",
    avatar: "https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png",
    isOnline: true,
  },
  {
    id: "2",
    title: "Payment Successful",
    message: "Payment of $450.00 received.",
    time: "1 hour ago",
    icon: "icon-[tabler--receipt-tax]", // Using an icon instead of avatar
  },
  {
    id: "3",
    title: "System Update",
    message: "ExploreSG will be down for maintenance at midnight.",
    time: "5 hours ago",
    isAway: true,
  },
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
        notifications={MOCK_NOTIFICATIONS}
      />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
